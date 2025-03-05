'use client'

import ProductList from '@/app/ui/ProductList';
import Cart from '@/app/ui/Cart';
import { ConvexCartProvider} from "@/app/contexts/CartContext";
import NavBar from "@/app/ui/NavBar";

export default function Home() {
    return ( 
        <ConvexCartProvider>
            <NavBar />
            <div> 
                <div className="grid-flow-col grid">
                <div className="p-[150px] md:p-3 ">
                    <ProductList/>
                </div>
                <div className="right-0">
                    <Cart />
                </div>
            
            </div>
            </div>
        </ConvexCartProvider>
    );
}