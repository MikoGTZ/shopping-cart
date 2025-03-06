'use client';

import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const CartProvider = ({ children }: { children: ReactNode }) => {
   
    return (
        <ConvexProvider client={convex}>
            {children}      
        </ConvexProvider>
    );
};

export const useCart = () => {};