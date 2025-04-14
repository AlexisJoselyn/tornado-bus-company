import { Metadata } from 'next';
import { inter } from './ui/fonts';
import "./globals.css";
import Header from './ui/header';
import CartModal from './ui/cart/cart-modal';

export const metadata: Metadata = {
  title: {
    template: '%s | Tornado Bus Company',
    default: 'Tornado Bus Company',
  },
  description: 'Tornado Bus Company',
  keywords: 'Tornado Bus Company, Tornado, Bus, Company',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <CartModal />
        {children}
      </body>
    </html>
  );
}