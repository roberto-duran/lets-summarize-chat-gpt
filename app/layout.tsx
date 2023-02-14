import './globals.css'
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className="container grid grid-rows-[0.05fr_2fr_0.1fr] mx-auto max-w-6xl mt-7 h-[97vh]
                             bg-[#f8f9fa] text-[#202122]">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
