import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Mail, href: '#', label: 'Email' },
    ]

    const footerLinks = [
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Contact', href: '/contact' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Cookie Policy', href: '#' },
            ],
        },
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="col-span-1 md:col-span-2"
                    >
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg"></div>
                            <span className="text-2xl font-bold">Nexora Technologies</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Innovating the future with cutting-edge technology solutions.
                            We help businesses transform and thrive in the digital age.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors duration-200"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Sections */}
                    {footerLinks.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Nexora Technologies. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm mt-2 md:mt-0">
                        Building the future, one innovation at a time.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer