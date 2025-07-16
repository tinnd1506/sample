import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

// Define your fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Next.js App",
  description: "A modern Next.js application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={`min-h-screen bg-gray-50 font-sans antialiased ${inter.className}`}>
        <Navbar />
        <main className="py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
