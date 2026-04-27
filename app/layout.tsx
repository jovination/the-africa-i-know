import type { Metadata } from "next";
import { Inter, Abhaya_Libre } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const abhayaLibre = Abhaya_Libre({
  variable: "--font-abhaya-libre",
  subsets: ["latin"],
  weight: ["800"],
});

const kaufmann = localFont({
  src: "./fonts/KaufmannBT.ttf",
  variable: "--font-kaufmann",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Africa I Know | The Great Africans Podcast",
  description: "The Africa I Know (TAIK) is the definitive digital home for African stories, voices, and innovation, amplifying Pan-African narratives through The Great Africans Podcast.",
  keywords: "African podcast, Pan-African movement, African leadership stories, Africa I Know, TAIK, The Great Africans Podcast, African stories, African voices, African innovation, Diaspora Africans",
  openGraph: {
    title: "The Africa I Know | The Great Africans Podcast",
    description: "The Africa I Know (TAIK) is the definitive digital home for African stories, voices, and innovation, amplifying Pan-African narratives through The Great Africans Podcast.",
    type: "website",
    url: "https://africaiknow.com",
    images: [
      {
        url: "https://africaiknow.com/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Africa I Know | The Great Africans Podcast",
    description: "The Africa I Know (TAIK) is the definitive digital home for African stories, voices, and innovation, amplifying Pan-African narratives through The Great Africans Podcast.",
    images: ["https://africaiknow.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${abhayaLibre.variable} ${kaufmann.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}