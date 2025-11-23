'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DDayCalculator() {
    const [targetDate, setTargetDate] = useState('');
    const [result, setResult] = useState(null);

    const calculateDDay = () => {
        if (!targetDate) return;
        const target = new Date(targetDate);
        const today = new Date();
        // Reset hours to compare dates only
        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const diffTime = target - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setResult(diffDays);
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">D-Day 계산기</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">목표 날짜</label>
                    <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white"
                    />
                </div>
                <button
                    onClick={calculateDDay}
                    className="w-full py-3 bg-white text-black rounded-lg font-bold shadow-md hover:bg-gray-200 transform hover:-translate-y-0.5 transition-all"
                >
                    확인하기
                </button>

                {result !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-center p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                        <p className="text-gray-400 text-sm mb-1">목표일까지</p>
                        <p className="text-4xl font-bold text-white">
                            {result === 0 ? 'D-Day' : result > 0 ? `D-${result}` : `D+${Math.abs(result)}`}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
