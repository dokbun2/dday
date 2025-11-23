'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);

    const calculateAge = () => {
        if (!birthDate) return;
        const birth = new Date(birthDate);
        const today = new Date();

        let internationalAge = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            internationalAge--;
        }

        // Korean age (traditional) - usually year - birthYear + 1, but recently changed. 
        // However, users often expect the traditional one or the new "man-nai".
        // Let's show "만 나이" (International Age) as it's the legal standard now in Korea.

        setAge(internationalAge);
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">나이 계산기</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">생년월일</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-white"
                    />
                </div>
                <button
                    onClick={calculateAge}
                    className="w-full py-3 bg-white text-black rounded-lg font-bold shadow-md hover:bg-gray-200 transform hover:-translate-y-0.5 transition-all"
                >
                    계산하기
                </button>

                {age !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-center p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                        <p className="text-gray-400 text-sm mb-1">당신의 만 나이는</p>
                        <p className="text-4xl font-bold text-white">{age}세<span className="text-lg font-normal text-gray-400 ml-1">입니다</span></p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
