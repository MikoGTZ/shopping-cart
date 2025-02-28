'use client'

import React, { useState, useEffect, useReducer } from "react";
import ProductList from '@/app/UI/ProductList';
import Cart from '@/app/UI/Cart';

const initialProduct = [
    { id: 1, name: "Black T-Shirt", price: 120 },
    { id: 2, name: "Khaki Blazer", price: 290 },
    { id: 3, name: "Navy Blue Blazer", price: 310 },
    { id: 4, name: "White Long Sleeves", price: 200 },
    { id: 5, name: "White T-Shirt", price: 120 },
    { id: 6, name: "White Socks", price: 290 },
    { id: 7, name: "Black Blazer", price: 310 },
    { id: 8, name: "White T-Shirt", price: 120 },
];

export const ACTIONS = {
    ADD_TO_CART: 'add-to-cart',
    REMOVE_FROM_CART: 'remove-from-cart',
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    CHECKOUT: 'checkout'
};

const reducer = (cart: any, action: any) => {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART: {
            const { id } = action.payload;
            return {
                ...cart,
                [id]: cart[id]
                    ? { ...cart[id], quantity: cart[id].quantity + 1 }
                    : { ...action.payload, quantity: 1 },
            };
        }
        case ACTIONS.REMOVE_FROM_CART: {
            const { id } = action.payload;
            const newCart = { ...cart };
            delete newCart[id];
            return newCart;
        }
        case ACTIONS.INCREMENT: {
            const { productId } = action.payload;
            const newCart = { ...cart };
            if (newCart[productId]) {
                newCart[productId].quantity += 1;
            }
            return newCart;
        }
        case ACTIONS.DECREMENT: {
            const { productId } = action.payload;
            const newCart = { ...cart };
            if (newCart[productId]) {
                if (newCart[productId].quantity > 1) {
                    newCart[productId].quantity -= 1;
                } else {
                    delete newCart[productId];
                }
            }
            return newCart;
        }
        case ACTIONS.CHECKOUT: {
            console.log('Checkout successful! Cart cleared.');
            return {}; 
        }
        default:
            return cart;
    }
};

export default function Home() {
    const [products] = useState(initialProduct);
    const [searchProduct, setSearchProduct] = useState('');
    const [cart, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (typeof parsedCart === 'object' && parsedCart !== null) {
                Object.values(parsedCart).forEach(item => {
                    dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
                });
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId: number) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
            dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
        }
    };

    const removeFromCart = (productId: number) => {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { id: productId } });
    };

    const increment = (productId: number) => {
        dispatch({ type: ACTIONS.INCREMENT, payload: { productId } });
    };

    const decrement = (productId: number) => {
        dispatch({ type: ACTIONS.DECREMENT, payload: { productId } });
    };

    const checkout = () => {
        dispatch({ type: ACTIONS.CHECKOUT });
        localStorage.clear();
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return (
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
                <ProductList products={filteredProducts} addToCart={addToCart} />
            </div>
            <div className="top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform transform">
                <Cart 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    products={products} 
                    increment={increment} 
                    decrement={decrement}
                    checkout={checkout}
                />
            </div>
          </div>
        </div>
    );
}