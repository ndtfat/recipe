import block from 'module-clsx';
import styles from '@/styles/auth.module.scss';
import { Header } from '@/components';
const clsx = block(styles);

export default function RootLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
