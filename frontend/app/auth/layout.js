import block from 'module-clsx';
import styles from '@/styles/auth.module.scss';
const clsx = block(styles);

import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({ children }) {
    return (
        <div className="h-screen grid place-items-center bg-secondary">
            <NextTopLoader color="#ff3130" />
            {children}
        </div>
    );
}
