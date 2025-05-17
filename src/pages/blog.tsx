import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Digital Marketing',
    description: 'Boost your brand visibility and reach through SEO, SEM, social media, and content marketing strategies tailored to your business.',
    icon: '📈',
  },
  {
    title: 'Web Design & Development',
    description: 'Design and develop modern, responsive, and fast web applications tailored to your needs using the latest technologies.',
    icon: '💻',
  },
  {
    title: 'E-Commerce Development',
    description: 'Build scalable and secure e-commerce platforms that offer seamless shopping experiences and efficient management tools.',
    icon: '🛒',
  },
  {
    title: 'Technical Support',
    description: 'Get reliable technical support to resolve IT issues and maintain smooth operations for your digital infrastructure.',
    icon: '🛠️',
  },
  {
    title: 'IT Services',
    description: 'Comprehensive IT services including infrastructure management, cloud solutions, and network setup for enterprises.',
    icon: '🌐',
  },
];

export default function Blog() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Our IT Services
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="rounded-2xl shadow-lg p-6 bg-white hover:shadow-xl transition duration-300"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
