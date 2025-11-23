'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function DDayCalculatorModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('days'); // 'days' or 'date'

  // 첫 번째 탭: 일수 계산
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [days, setDays] = useState('');

  // 두 번째 탭: 날짜 계산
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');

  const [result, setResult] = useState(null);

  const calculateByDays = () => {
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
      type: 'days',
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

  const calculateByDate = () => {
    if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay) return;

    const startDate = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay));
    const endDate = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay));

    // 두 날짜 사이의 일수 계산
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 오늘로부터 종료일까지의 D-Day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    const ddayTime = end - today;
    const dDay = Math.ceil(ddayTime / (1000 * 60 * 60 * 24));

    setResult({
      type: 'date',
      startDate: startDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      endDate: endDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      daysBetween: diffDays,
      dDay: dDay
    });
  };

  const handleReset = () => {
    setYear('');
    setMonth('');
    setDay('');
    setDays('');
    setStartYear('');
    setStartMonth('');
    setStartDay('');
    setEndYear('');
    setEndMonth('');
    setEndDay('');
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResult(null);
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

        {/* Tabs */}
        {!result && (
          <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-lg">
            <button
              onClick={() => handleTabChange('days')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'days'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              일수로 계산
            </button>
            <button
              onClick={() => handleTabChange('date')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'date'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              날짜로 계산
            </button>
          </div>
        )}

        {/* Input Section */}
        {!result ? (
          activeTab === 'days' ? (
            // 첫 번째 탭: 일수 계산
            <div className="space-y-6">
              {/* 기준일 입력 */}
              <div>
                <label className="block text-gray-300 mb-3 text-sm font-medium">
                  기준일을 입력하세요
                </label>
                <div className="grid grid-cols-3 gap-3">
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
                onClick={calculateByDays}
                disabled={!year || !month || !day || !days}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                날짜 계산하기
              </button>
            </div>
          ) : (
            // 두 번째 탭: 날짜 계산
            <div className="space-y-6">
              {/* 시작일 입력 */}
              <div>
                <label className="block text-gray-300 mb-3 text-sm font-medium">
                  시작일을 입력하세요
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="년(YYYY)"
                      value={startYear}
                      onChange={(e) => handleNumberInput(e.target.value, setStartYear, 9999)}
                      maxLength="4"
                      className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">년</p>
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="월(MM)"
                      value={startMonth}
                      onChange={(e) => handleNumberInput(e.target.value, setStartMonth, 12)}
                      maxLength="2"
                      className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">월</p>
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="일(DD)"
                      value={startDay}
                      onChange={(e) => handleNumberInput(e.target.value, setStartDay, 31)}
                      maxLength="2"
                      className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">일</p>
                  </div>
                </div>
              </div>

              {/* 종료일 입력 */}
              <div>
                <label className="block text-gray-300 mb-3 text-sm font-medium">
                  종료일을 입력하세요
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="년(YYYY)"
                      value={endYear}
                      onChange={(e) => handleNumberInput(e.target.value, setEndYear, 9999)}
                      maxLength="4"
                      className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">년</p>
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="월(MM)"
                      value={endMonth}
                      onChange={(e) => handleNumberInput(e.target.value, setEndMonth, 12)}
                      maxLength="2"
                      className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">월</p>
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="일(DD)"
                      value={endDay}
                      onChange={(e) => handleNumberInput(e.target.value, setEndDay, 31)}
                      maxLength="2"
                      className="w-full p-4 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white text-center text-lg placeholder:text-gray-500"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">일</p>
                  </div>
                </div>
              </div>

              <button
                onClick={calculateByDate}
                disabled={!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                일수 계산하기
              </button>
            </div>
          )
        ) : (
          /* Result Section */
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              {result.type === 'days' ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="text-center pb-4 border-b border-white/10">
                    <p className="text-gray-400 text-sm mb-1">시작일</p>
                    <p className="text-white text-lg font-medium">{result.startDate}</p>
                  </div>

                  <div className="text-center pb-4 border-b border-white/10">
                    <p className="text-gray-400 text-sm mb-1">종료일</p>
                    <p className="text-white text-lg font-medium">{result.endDate}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
                    <p className="text-purple-300 text-sm mb-2 font-medium">
                      두 날짜 사이
                    </p>
                    <p className="text-white text-4xl font-bold mb-2">
                      {Math.abs(result.daysBetween)}일
                    </p>
                    {result.daysBetween < 0 && (
                      <p className="text-purple-200 text-xs">
                        (종료일이 시작일보다 이전입니다)
                      </p>
                    )}
                    {result.dDay !== 0 && (
                      <div className="mt-4 pt-4 border-t border-purple-500/20">
                        <p className="text-purple-200 text-sm">
                          {result.dDay > 0
                            ? `종료일까지 D-${result.dDay}`
                            : result.dDay === 0
                            ? '종료일은 오늘입니다!'
                            : `종료일로부터 ${Math.abs(result.dDay)}일 지났습니다`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
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
