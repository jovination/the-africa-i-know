import type { Metadata } from "next";
import { Inter, Abhaya_Libre } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "theme-color": "#ffffff",
  },
  openGraph: {
    title: "The Africa I Know | The Great Africans Podcast",
    description: "The Africa I Know (TAIK) is the definitive digital home for African stories, voices, and innovation, amplifying Pan-African narratives through The Great Africans Podcast.",
    type: "website",
    url: "https://africaiknow.com",
    images: [
      {
        url: "https://africaiknow.com/og-image.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Africa I Know | The Great Africans Podcast",
    description: "The Africa I Know (TAIK) is the definitive digital home for African stories, voices, and innovation, amplifying Pan-African narratives through The Great Africans Podcast.",
    images: ["https://africaiknow.com/og-image.webp"],
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
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}