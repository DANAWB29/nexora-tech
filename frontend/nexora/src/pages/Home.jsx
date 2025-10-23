import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Cloud, Shield, Zap, Database, Smartphone } from 'lucide-react'

const Home = () => {
    const features = [
        {
            icon: Code,
            title: 'Custom Software',
            description: 'Tailored solutions that fit your unique business needs and drive growth.',
        },
        {
            icon: Cloud,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure to power your digital transformation.',
        },
        {
            icon: Shield,
            title: 'Cybersecurity',
            description: 'Comprehensive security solutions to protect your digital assets.',
        },
        {
            icon: Zap,
            title: 'AI & ML',
            description: 'Intelligent systems that learn and adapt to your business requirements.',
        },
        {
            icon: Database,
            title: 'Data Analytics',
            description: 'Transform raw data into actionable insights and business intelligence.',
        },
        {
            icon: Smartphone,
            title: 'Mobile Apps',
            description: 'Engaging mobile experiences that keep your customers connected.',
        },
    ]

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
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Innovating the{' '}
                            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                Future
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                        >
                            Nexora Technologies delivers cutting-edge software solutions that
                            transform businesses and drive digital innovation forward.
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link to="/services" className="btn-primary inline-flex items-center">
                                Explore Services
                                <ArrowRight className="ml-2" size={20} />
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Get In Touch
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                What We Offer
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Comprehensive technology solutions designed to elevate your
                                business to new heights of digital excellence.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="card p-6 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Let's discuss how Nexora Technologies can help you achieve
                            your digital transformation goals.
                        </p>
                        <Link
                            to="/contact"
                            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
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

export default Home