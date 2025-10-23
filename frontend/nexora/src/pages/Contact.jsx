import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config'

const response = await axios.post(`${API_URL}/api/contact`, formData)
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'hello@nexoratech.com',
            link: 'mailto:hello@nexoratech.com'
        },
        {
            icon: Phone,
            title: 'Phone',
            content: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: MapPin,
            title: 'Office',
            content: '123 Tech Boulevard, San Francisco, CA 94105',
            link: 'https://maps.google.com'
        }
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await axios.post('/api/contact', formData)
            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                company: '',
                subject: '',
                message: ''
            })
        } catch (error) {
            setSubmitStatus('error')
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Get In Touch
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            Ready to transform your business? Let's discuss your project
                            and explore how we can help you achieve your goals.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* Contact Information */}
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Let's Talk
                            </h2>

                            <div className="space-y-6 mb-8">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={info.title}
                                        href={info.link}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group cursor-pointer"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <info.icon className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {info.content}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                                <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 2:00 PM</p>
                                <p className="mt-4 text-primary-100">
                                    We typically respond to all inquiries within 24 hours.
                                </p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="card p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                                            placeholder="Your company name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                                            placeholder="What is this regarding?"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-vertical"
                                        placeholder="Tell us about your project or inquiry..."
                                    />
                                </div>

                                {/* Submit Status */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center"
                                    >
                                        <CheckCircle className="text-green-500 mr-3" size={20} />
                                        <span className="text-green-800 dark:text-green-200">
                                            Thank you! Your message has been sent successfully. We'll get back to you soon.
                                        </span>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center"
                                    >
                                        <AlertCircle className="text-red-500 mr-3" size={20} />
                                        <span className="text-red-800 dark:text-red-200">
                                            Sorry, there was an error sending your message. Please try again.
                                        </span>
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2" size={20} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Contact