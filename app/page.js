'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import AgeCalculatorModal from './components/modals/AgeCalculatorModal';
import DDayCalculatorModal from './components/modals/DDayCalculatorModal';

export default function Home() {
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isDDayModalOpen, setIsDDayModalOpen] = useState(false);

  useEffect(() => {
    // AdSense 광고 로드
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2764784359698938"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {/* Header Section */}
      <header className="py-10 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
          기념일 계산기
        </h1>
        <p className="text-l text-gray-400 max-w-1xl mx-auto leading-relaxed mb-12">
          나이, D-day, 그리고 100일 기념일까지.<br />
          당신의 소중한 순간을 가장 심플하게 확인하세요.
        </p>

        {/* Category Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 mt-12">
          <button
            onClick={() => setIsAgeModalOpen(true)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all hover:scale-105"
          >
            나이계산
          </button>
          <button
            onClick={() => setIsDDayModalOpen(true)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all hover:scale-105"
          >
            D-DAY
          </button>
        </nav>
      </header>

      {/* Body Section */}
      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-32">
        {/* Google AdSense 광고 */}
        <div className="flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-2764784359698938"
            data-ad-slot="1428164136"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      <footer className="py-12 text-center text-gray-800 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Day Calculator. All rights reserved.
      </footer>

      {/* Modals */}
      <AgeCalculatorModal
        isOpen={isAgeModalOpen}
        onClose={() => setIsAgeModalOpen(false)}
      />
      <DDayCalculatorModal
        isOpen={isDDayModalOpen}
        onClose={() => setIsDDayModalOpen(false)}
      />
    </main>
  );
}
