'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function AgeCalculatorModal({ isOpen, onClose }) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!year || !month || !day) return;

    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    // 만 나이 계산
    let koreanAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // 생일이 지나지 않았으면 1살 빼기
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      koreanAge--;
    }

    // 연 나이 (세는 나이) 계산
    const yearAge = today.getFullYear() - birth.getFullYear() + 1;

    setResult({
      korean: koreanAge,
      year: yearAge,
      birthDate: birth.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  };

  const handleReset = () => {
    setYear('');
    setMonth('');
    setDay('');
    setResult(null);
  };

  const handleNumberInput = (value, setter, max) => {
    const numValue = value.replace(/[^0-9]/g, '');
    if (numValue === '' || parseInt(numValue) <= max) {
      setter(numValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          나이 계산기
        </h2>

        {/* Input Section */}
        {!result ? (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-3 text-sm font-medium">
                생년월일을 입력하세요
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* 년도 */}
                <div className="col-span-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="년(YYYY)"
                    value={year}
                    onChange={(e) => handleNumberInput(e.target.value, setYear, 9999)}
                    maxLength="4"
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">년</p>
                </div>

                {/* 월 */}
                <div className="col-span-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="월(MM)"
                    value={month}
                    onChange={(e) => handleNumberInput(e.target.value, setMonth, 12)}
                    maxLength="2"
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">월</p>
                </div>

                {/* 일 */}
                <div className="col-span-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="일(DD)"
                    value={day}
                    onChange={(e) => handleNumberInput(e.target.value, setDay, 31)}
                    maxLength="2"
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">일</p>
                </div>
              </div>
            </div>

            <button
              onClick={calculateAge}
              disabled={!year || !month || !day}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              나이 계산하기
            </button>
          </div>
        ) : (
          /* Result Section */
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="text-center pb-4 border-b border-white/10">
                <p className="text-gray-400 text-sm mb-1">생년월일</p>
                <p className="text-white text-lg font-medium">{result.birthDate}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-4 text-center">
                  <p className="text-pink-300 text-sm mb-2 font-medium">만 나이</p>
                  <p className="text-white text-4xl font-bold">{result.korean}세</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
                  <p className="text-blue-300 text-sm mb-2 font-medium">연 나이</p>
                  <p className="text-white text-4xl font-bold">{result.year}세</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-bold transition-all"
            >
              다시 계산하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
