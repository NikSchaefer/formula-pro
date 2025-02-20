import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CalculatorProvider } from "./context";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Calculator",
    description: "Calculator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} antialiased min-h-screen bg-background text-foreground`}
            >
                <Toaster richColors position="top-center" />
                <CalculatorProvider>{children}</CalculatorProvider>
            </body>
        </html>
    );
}
