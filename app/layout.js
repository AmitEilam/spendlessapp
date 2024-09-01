import { Toaster } from 'react-hot-toast';
import '../_styles/globals.css';
import Header from './_components/Header';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'], // הוסף את המשקלים שאתה צריך
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${nunito.className} antialiased bg-[#FAFAFA] text-black min-h-screen flex flex-col`}
      >
        <Header />
        <main className='p-5'>{children}</main>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
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
