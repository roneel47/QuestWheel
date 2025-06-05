import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from '@/components/layout/SiteHeader';

export const metadata: Metadata = {
  title: 'QuestWheel',
  description: 'Gamified daily task selector by Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
         {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
