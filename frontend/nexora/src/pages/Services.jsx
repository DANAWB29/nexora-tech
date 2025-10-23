import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Code,
    Cloud,
    Shield,
    Zap,
    Database,
    Smartphone,
    CheckCircle,
    ArrowRight
} from 'lucide-react'

const Services = () => {
    const services = [
        {
            icon: Code,
            title: 'Custom Software Development',
            description: 'Tailored software solutions built from the ground up to meet your specific business requirements.',
            features: ['Web Applications', 'Desktop Software', 'API Development', 'System Integration'],
            price: 'Starting at $25,000'
        },
        {
            icon: Cloud,
            title: 'Cloud Solutions & DevOps',
            description: 'Scalable cloud infrastructure and continuous deployment pipelines for modern applications.',
            features: ['AWS/Azure/GCP', 'Containerization', 'CI/CD Pipelines', 'Infrastructure as Code'],
            price: 'Starting at $15,000'
        },
        {
            icon: Shield,
            title: 'Cybersecurity Services',
            description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
            features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Incident Response'],
            price: 'Starting at $20,000'
        },
        {
            icon: Zap,
            title: 'AI & Machine Learning',
            description: 'Intelligent systems that learn from your data and automate complex business processes.',
            features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems'],
            price: 'Starting at $30,000'
        },
        {
            icon: Database,
            title: 'Data Analytics & BI',
            description: 'Transform your raw data into actionable insights and business intelligence.',
            features: ['Data Warehousing', 'Dashboard Development', 'ETL Processes', 'Real-time Analytics'],
            price: 'Starting at $18,000'
        },
        {
            icon: Smartphone,
            title: 'Mobile App Development',
            description: 'Engaging mobile experiences for iOS and Android that keep your customers connected.',
            features: ['Native iOS/Android', 'Cross-platform', 'UI/UX Design', 'App Store Deployment'],
            price: 'Starting at $22,000'
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
                            Our Services
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            Comprehensive technology solutions designed to drive your
                            business forward in the digital age.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="card p-8 group cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="text-white" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {service.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        Key Features:
                                    </h4>
                                    <ul className="space-y-2">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                                                <CheckCircle className="text-primary-500 mr-2" size={16} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                        {service.price}
                                    </span>
                                    <Link
                                        to="/contact"
                                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center"
                                    >
                                        Get Quote
                                        <ArrowRight className="ml-1" size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Let's discuss your project requirements and find the perfect
                            solution for your business needs.
                        </p>
                        <Link
                            to="/contact"
                            className="btn-primary inline-flex items-center"
                        >
                            Start Your Project
                            <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Services