import NavBar from "@/app/ui/NavBar";
import { CartProvider } from "@/app/contexts/CartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">        
                <NavBar />
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <CartProvider>
                    {children}
                </CartProvider>
            </div>
        </div>
    )
}