import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "기념일 계산기 - 나이, D-day, 100일 계산",
  description: "만 나이 계산, D-day 확인, 커플 100일 계산까지. 당신의 소중한 날짜를 쉽고 예쁘게 계산해보세요.",
  openGraph: {
    title: "기념일 계산기 - 나이, D-day, 100일 계산",
    description: "만 나이 계산, D-day 확인, 커플 100일 계산까지. 당신의 소중한 날짜를 쉽고 예쁘게 계산해보세요.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "기념일 계산기 미리보기",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
