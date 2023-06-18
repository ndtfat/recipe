import { Header } from '@/components';
import { UserProvider } from '@/contexts/UserContext';

export default function RootLayout({ children }) {
    return (
        <div className="bg-[#f2f2f2]">
            <Header />
            <UserProvider>{children}</UserProvider>
        </div>
    );
}
