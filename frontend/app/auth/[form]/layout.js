import block from 'module-clsx';
import styles from '@/styles/auth.module.scss';
const clsx = block(styles);

export default function RootLayout({ children }) {
    return <div className={clsx('background')}>{children}</div>;
}
