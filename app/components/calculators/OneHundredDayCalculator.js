'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OneHundredDayCalculator() {
    const [startDate, setStartDate] = useState('');
    const [hundredthDay, setHundredthDay] = useState(null);

    const calculate100Days = () => {
        if (!startDate) return;
        const start = new Date(startDate);
        // Add 99 days to include the start date as day 1
        const target = new Date(start);
        target.setDate(start.getDate() + 99);

        setHundredthDay(target.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }));
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">100일 계산기</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">시작일 (1일)</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white"
                    />
                </div>
                <button
                    onClick={calculate100Days}
                    className="w-full py-3 bg-white text-black rounded-lg font-bold shadow-md hover:bg-gray-200 transform hover:-translate-y-0.5 transition-all"
                >
                    100일 날짜 보기
                </button>

                {hundredthDay && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-center p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                        <p className="text-gray-400 text-sm mb-1">100일이 되는 날은</p>
                        <p className="text-2xl font-bold text-white break-keep">{hundredthDay}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
