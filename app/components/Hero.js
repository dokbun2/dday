'use client';

import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ scrollToCalculators }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          특별한 날을 기억하세요
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md">
          나이, D-day, 그리고 100일 기념일까지. <br />
          당신의 소중한 순간을 가장 아름답게 계산해드립니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToCalculators('100day')}
            className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105"
          >
            100일 계산기
          </button>
          <button 
            onClick={() => scrollToCalculators('dday')}
            className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-bold text-lg shadow-lg hover:bg-white/30 transition-all transform hover:scale-105"
          >
            날짜 계산기
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDown className="w-10 h-10 text-white/80" />
      </motion.div>
    </div>
  );
}
