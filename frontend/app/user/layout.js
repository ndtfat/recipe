import { Header } from '@/components';

export default function RootLayout({ children }) {
    return (
        <div className="bg-[#f2f2f2]">
            <Header />
            {children}
        </div>
    );
}
