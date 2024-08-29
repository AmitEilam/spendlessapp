import { Toaster } from 'react-hot-toast';
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
        <main className='p-5'>{children}</main>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 5000 },
            error: { duration: 5000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'white',
              color: 'var(--color-primary-800)',
            },
          }}
        />
      </body>
    </html>
  );
}
