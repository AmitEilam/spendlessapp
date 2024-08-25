import '../_styles/globals.css';
import Header from './_components/Header';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Welcome / SpendLess',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${raleway.className} antialiased bg-[#FAFAFA] text-primary-100 min-h-screen flex flex-col`}
      >
        <header>
          <Header />
        </header>
        <div className='flex-1 px-8 py-8 grid'>
          <main className='max-w-7xl mx-auto w-full'>{children}</main>
        </div>
      </body>
    </html>
  );
}
