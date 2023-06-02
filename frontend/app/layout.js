import './globals.css';
import { Inter } from 'next/font/google';

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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
