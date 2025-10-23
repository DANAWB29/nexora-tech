import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Award, Globe } from 'lucide-react'

const About = () => {
    const stats = [
        { icon: Users, number: '50+', label: 'Team Members' },
        { icon: Target, number: '200+', label: 'Projects Completed' },
        { icon: Award, number: '15+', label: 'Industry Awards' },
        { icon: Globe, number: '25+', label: 'Countries Served' },
    ]

    const values = [
        {
            title: 'Innovation',
            description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
        },
        {
            title: 'Excellence',
            description: 'We strive for perfection in every project, ensuring the highest quality standards.',
        },
        {
            title: 'Collaboration',
            description: 'We believe in the power of teamwork and building strong partnerships with our clients.',
        },
        {
            title: 'Integrity',
            description: 'We maintain transparency and honesty in all our business dealings and relationships.',
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
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
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
                            About Nexora Technologies
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            We are a forward-thinking technology company dedicated to
                            transforming businesses through innovative digital solutions.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="text-white" size={28} />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Story
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Founded in 2015, Nexora Technologies began as a small startup
                                with a big vision: to make cutting-edge technology accessible
                                to businesses of all sizes.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Today, we've grown into a trusted partner for organizations
                                worldwide, delivering innovative solutions that drive digital
                                transformation and business growth.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Our team of experts combines technical excellence with
                                business acumen to create solutions that not only work
                                flawlessly but also deliver tangible business value.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-lg mb-6">
                                    To empower businesses with innovative technology solutions
                                    that drive growth, efficiency, and competitive advantage
                                    in the digital age.
                                </p>
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-lg">
                                    To be the world's most trusted technology partner,
                                    known for delivering exceptional value through
                                    cutting-edge solutions and unparalleled service.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Our Values
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                The principles that guide everything we do at Nexora Technologies
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="card p-8"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default About