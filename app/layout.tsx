import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactModal } from "@/lib/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Añover Añover San Diego & Primavera Law Offices",
  description:
    "We are a group of law practitioners with a collective experience spanning more than 50 years, gained from prestigious law firms, multinational conglomerates, respected corporations, and government offices. Apart from being lawyers, we are accountants, arbitrators, businessmen, consultants, economists, engineers, IT specialists, lecturers, managers, professors, and public servants. Our experience, energy, and dedication assure our clients that we can render unparalleled, transparent, and cost-effective legal service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContactModal>
          <Header />
          {children}
          <Footer />
        </ContactModal>
      </body>
    </html>
  );
}
