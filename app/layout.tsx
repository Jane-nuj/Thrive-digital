import Header from "../components/Header"; // Changed to relative path
import Footer from "../components/Footer"; // Changed to relative path
import "./globals.css";
import { Manrope, Poppins } from "next/font/google";

// Configure Poppins font for body text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Include 300 weight for paragraphs, 400 for buttons
  variable: "--font-poppins", // Optional: CSS variable for Poppins
  display: "swap",
});

// Configure Manrope font for headings
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "600", "700", "800"], // Include 300 weight for headings
  variable: "--font-manrope", // CSS variable for Manrope
  display: "swap",
});

export const metadata = {
  title: "Thrive Digital – Jane Fletcher",
  description: "Product, strategy and delivery – from concept to launch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply font variables to the html tag for global access
    <html lang="en" className={`${poppins.variable} ${manrope.variable}`}>
      {/* Apply Poppins as the default body font */}
      {/* Added flex structure to potentially help with footer positioning */}
      <body className={`${poppins.className} bg-charcoal text-white flex flex-col min-h-screen`}>
        <Header />
        {/* Added flex-grow to make main content area fill available space */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
