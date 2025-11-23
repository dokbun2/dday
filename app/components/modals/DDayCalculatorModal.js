'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function DDayCalculatorModal({ isOpen, onClose }) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState(null);

  const calculateDDay = () => {
    if (!year || !month || !day || !days) return;

    const baseDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + parseInt(days));

    // D-Day 계산 (오늘로부터)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setResult({
      baseDate: baseDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      targetDate: targetDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      daysAdded: parseInt(days),
      dDay: diffDays
    });
  };

  const handleReset = () => {
    setYear('');
    setMonth('');
    setDay('');
    setDays('');
    setResult(null);
  };

  const handleNumberInput = (value, setter, max) => {
    const numValue = value.replace(/[^0-9]/g, '');
    if (numValue === '' || parseInt(numValue) <= max) {
      setter(numValue);
    }
  };

  const handleDaysInput = (value) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setDays(numValue);
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
          D-Day 계산기
        </h2>

        {/* Input Section */}
        {!result ? (
          <div className="space-y-6">
            {/* 기준일 입력 */}
            <div>
              <label className="block text-gray-300 mb-3 text-sm font-medium">
                기준일을 입력하세요
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
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
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
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
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
                    className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">일</p>
                </div>
              </div>
            </div>

            {/* 일수 입력 */}
            <div>
              <label className="block text-gray-300 mb-3 text-sm font-medium">
                며칠 후를 계산할까요?
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="예: 100"
                value={days}
                onChange={(e) => handleDaysInput(e.target.value)}
                className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-400 text-center mt-1">일</p>
            </div>

            <button
              onClick={calculateDDay}
              disabled={!year || !month || !day || !days}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              날짜 계산하기
            </button>
          </div>
        ) : (
          /* Result Section */
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="text-center pb-4 border-b border-white/10">
                <p className="text-gray-400 text-sm mb-1">기준일</p>
                <p className="text-white text-lg font-medium">{result.baseDate}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
                <p className="text-purple-300 text-sm mb-2 font-medium">
                  {result.daysAdded}일 후
                </p>
                <p className="text-white text-2xl font-bold mb-2">{result.targetDate}</p>
                {result.dDay !== 0 && (
                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <p className="text-purple-200 text-sm">
                      {result.dDay > 0
                        ? `오늘로부터 D-${result.dDay}`
                        : result.dDay === 0
                        ? '오늘입니다!'
                        : `${Math.abs(result.dDay)}일 지났습니다`
                      }
                    </p>
                  </div>
                )}
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
