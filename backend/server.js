import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { 
  initDatabase, 
  saveContactMessage, 
  getContactMessages,
  markMessageAsRead 
} from './database.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'https://nexora.vercel.app', // Your Vercel URL
    'http://localhost:3000'
  ].filter(Boolean),
  credentials: true
}))
// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Initialize database
initDatabase()

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send notification email
const sendNotificationEmail = async (messageData) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Contact Form Submission: ${messageData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${messageData.name}</p>
            <p><strong>Email:</strong> ${messageData.email}</p>
            <p><strong>Company:</strong> ${messageData.company || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${messageData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0ea5e9;">
              ${messageData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            This message was sent from the Nexora Technologies contact form.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Notification email sent successfully')
  } catch (error) {
    console.error('Error sending notification email:', error)
    throw error
  }
}

// Send confirmation email to user
const sendConfirmationEmail = async (messageData) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: messageData.email,
      subject: 'Thank you for contacting Nexora Technologies',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0;">Nexora Technologies</h1>
            <p style="color: #64748b; margin: 5px 0 0 0;">Innovating the Future</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1e293b; margin-top: 0;">Thank You for Reaching Out!</h2>
            
            <p style="color: #475569; line-height: 1.6;">
              Dear <strong>${messageData.name}</strong>,
            </p>
            
            <p style="color: #475569; line-height: 1.6;">
              Thank you for contacting Nexora Technologies. We have received your message and our team will review it shortly.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 4px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; color: #475569;"><strong>Your Message:</strong></p>
              <p style="margin: 0; color: #64748b; font-style: italic;">"${messageData.message}"</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              We typically respond to all inquiries within 24 hours during business days. 
              If you have any urgent questions, please feel free to call us at +1 (555) 123-4567.
            </p>
            
            <p style="color: #475569; line-height: 1.6;">
              Best regards,<br>
              <strong>The Nexora Technologies Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Nexora Technologies. All rights reserved.<br>
              123 Tech Boulevard, San Francisco, CA 94105
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Confirmation email sent to user')
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    // Don't throw error here to avoid failing the main contact submission
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Nexora Technologies API is running',
    timestamp: new Date().toISOString()
  })
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, subject, and message are required'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      })
    }

    // Save to database
    const savedMessage = await saveContactMessage({
      name,
      email,
      company,
      subject,
      message
    })

    // Send emails (non-blocking)
    Promise.allSettled([
      sendNotificationEmail(savedMessage),
      sendConfirmationEmail(savedMessage)
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Email ${index === 0 ? 'notification' : 'confirmation'} failed:`, result.reason)
        }
      })
    })

    res.status(201).json({
      message: 'Contact form submitted successfully',
      data: {
        id: savedMessage.id,
        name: savedMessage.name,
        email: savedMessage.email
      }
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      error: 'Internal server error. Please try again later.'
    })
  }
})

// Get contact messages (protected - would normally require auth)
app.get('/api/contact/messages', async (req, res) => {
  try {
    const messages = await getContactMessages()
    res.json({ messages })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Mark message as read
app.patch('/api/contact/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params
    await markMessageAsRead(id)
    res.json({ message: 'Message marked as read' })
  } catch (error) {
    console.error('Error marking message as read:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nexora Technologies backend server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
  console.log(`📧 Email notifications: ${process.env.NOTIFICATION_EMAIL ? 'Enabled' : 'Disabled'}`)
})