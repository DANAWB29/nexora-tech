import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize database
const db = new sqlite3.Database(
  process.env.DATABASE_PATH || './database.sqlite',
  (err) => {
    if (err) {
      console.error('Error opening database:', err.message)
    } else {
      console.log('Connected to SQLite database.')
    }
  }
)

// Promisify database methods for async/await
const dbRun = promisify(db.run.bind(db))
const dbGet = promisify(db.get.bind(db))
const dbAll = promisify(db.all.bind(db))

// Initialize tables
const initDatabase = async () => {
  try {
    await dbRun(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_read BOOLEAN DEFAULT FALSE
      )
    `)
    console.log('Database tables initialized successfully.')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

// Contact message functions
const saveContactMessage = async (messageData) => {
  const { name, email, company, subject, message } = messageData
  
  try {
    const result = await dbRun(
      `INSERT INTO contact_messages (name, email, company, subject, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, company, subject, message]
    )
    
    return { id: result.lastID, ...messageData }
  } catch (error) {
    console.error('Error saving contact message:', error)
    throw error
  }
}

const getContactMessages = async () => {
  try {
    const messages = await dbAll(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`
    )
    return messages
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    throw error
  }
}

const markMessageAsRead = async (messageId) => {
  try {
    await dbRun(
      `UPDATE contact_messages SET is_read = TRUE WHERE id = ?`,
      [messageId]
    )
  } catch (error) {
    console.error('Error marking message as read:', error)
    throw error
  }
}

export {
  db,
  initDatabase,
  saveContactMessage,
  getContactMessages,
  markMessageAsRead
}