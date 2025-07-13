import type { Metadata } from 'next';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import ToastProvider from '@/components/ToastProvider/toast.provider';
import { ThemeProvider } from '@mui/material/styles';

import theme_dark from '../mui_theme/theme_dark';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import styles from './page.module.css';

import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Calculation',
  description: 'Calculation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme_dark}>
        <html lang='en' suppressHydrationWarning>
          <body suppressHydrationWarning>
            <ToastProvider>
              <Navbar />
              <main id='main' className={styles.main}>
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  );
}
