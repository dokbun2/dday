'use client';

import { motion } from 'framer-motion';

export default function CalculatorCard({ icon: Icon, title, description, onClick }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl cursor-pointer hover:bg-white/20 transition-colors"
            onClick={onClick}
        >
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">{title}</h3>
            <p className="text-white/80 text-center leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
