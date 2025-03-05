'use client'

import ProductList from '@/app/ui/ProductList';
import Cart from '@/app/ui/Cart';

export default function page() {
    return ( 
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
    );
}