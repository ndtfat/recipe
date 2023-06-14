import { Header } from '@/components';

export default function RootLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
