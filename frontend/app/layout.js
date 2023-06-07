import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';
import Providers from '../redux/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Try & Taste',
    description: 'Share recipe and try thers recipe',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextTopLoader color="#ff3130" />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
