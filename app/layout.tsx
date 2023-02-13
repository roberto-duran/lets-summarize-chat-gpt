import './globals.css'
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className="container mx-auto max-w-6xl mt-7 bg-[#f8f9fa] text-[#202122]">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
