'use client'

import ProductList from '@/app/ui/ProductList';
import Cart from '@/app/ui/Cart';
import { CartProvider} from "@/app/contexts/CartContext";

export default function Home() {
    return ( 
        <CartProvider>
            
            <div className='flex-grow p-6 md:overflow-y-auto md:p-12'> 
                {/* <div className="grid-flow-col grid">
                <div className="p-[150px] md:p-3 "> */}
                    <ProductList/>
                {/* </div> */}
                {/* <div className="right-0">
                    <Cart />
                </div> */}
            
            {/* </div> */}
            </div>
        </CartProvider>
    );
}