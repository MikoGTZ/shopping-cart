'use client'

import React, { useState, useEffect, useReducer, useContext } from "react";
import ProductList from '@/app/ui/ProductList';
import Cart from '@/app/ui/Cart';
import { initialProducts, CartProvider, useCart} from "@/app/contexts/CartContext";

export default function Home() {
    const [searchProduct, setSearchProduct] = useState('');

    const filteredProducts = initialProducts.filter(product => 
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return ( 
        <CartProvider>
            <div> 
                <div className="grid-flow-col grid">
                <div className="p-[150px] md:p-3 ">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-400 rounded-md px-4 py-2 w-1/2"
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                    />
                    <ProductList products={filteredProducts}/>
                </div>
                <div className="right-0">
                    <Cart />
                </div>
            
            </div>
            </div>
        </CartProvider>
    );
}