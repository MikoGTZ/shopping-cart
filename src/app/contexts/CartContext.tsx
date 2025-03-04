'use client'

import {ConvexProvider, ConvexReactClient, useQuery} from 'convex/react';
import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export const ACTIONS = {
    ADD_TO_CART: 'add-to-cart',
    REMOVE_FROM_CART: 'remove-from-cart',
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    CHECKOUT: 'checkout'
};

const cartReducer = (cart: CartItemType[], action: any): CartItemType[] => {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART: 
            const existingItem = cart.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return cart.map((item) =>
                    item.id === action.payload.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            } else {
                return [...cart, { ...action.payload, quantity: 1 }];
            }    

        case ACTIONS.REMOVE_FROM_CART: 
            return cart.filter((item) => item.id !== action.payload.id);

        case ACTIONS.INCREMENT: 
            return cart.map((item) =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        case ACTIONS.DECREMENT: 
            return cart
                .map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
        
    
        case ACTIONS.CHECKOUT:
            return []; 

        default:
            return cart;
    }
};

const CartContext = createContext<any>(null);

export const ConvexCartProvider = ({ children }: { children: ReactNode }) => {
    // const [cart, dispatch] = useReducer(cartReducer, [], () => {
    //     const storedCart = localStorage.getItem('cart');
    //     return storedCart ? JSON.parse(storedCart) : [];
    // });

    const [cart, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId: number) => {
        const product = initialProducts.find((p) => p.id === productId);
        if (product) {
            dispatch({ type: ACTIONS.ADD_TO_CART, payload: {...product, productId } });
        }
    };

    const removeFromCart = (productId: number) => {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { productId } });
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

    return (
        <ConvexProvider client={convex}>
            <CartContext.Provider value={{cart, dispatch}}>
                    {children}      
            </CartContext.Provider>
        </ConvexProvider>
    );

};

export const initialProducts = [
    { id: 1, name: "Black T-Shirt", price: 120 },
    { id: 2, name: "Khaki Blazer", price: 290 },
    { id: 3, name: "Navy Blue Blazer", price: 310 },
    { id: 4, name: "White Long Sleeves", price: 200 },
    { id: 5, name: "White T-Shirt", price: 120 },
    { id: 6, name: "White Socks", price: 290 },
    { id: 7, name: "Black Blazer", price: 310 },
    { id: 8, name: "Black Shoes", price: 120 },
];

export const useCart = () => useContext(CartContext);