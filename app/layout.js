import { Toaster } from 'react-hot-toast';
import '../_styles/globals.css';
import Header from './_components/Header';
import { ThemeProvider } from './_components/ThemeProvider';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${nunito.className} antialiased bg-[#FAFAFA] dark:bg-gray-900 text-black dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider>
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
                backgroundColor: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
