import React, { useContext } from 'react';
import { useCart, ACTIONS } from '@/app/contexts/CartContext';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface CartItemProps {
    item: {
        id: string;
        productId: number;
        name: string;
        price: number;
        quantity: number;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { dispatch } = useCart();

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-500">₱{item.price * item.quantity}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center">
                <button 
                    className="ml-4 px-3 py-1 bg-gray-300 rounded"
                    onClick={() => dispatch({ type: ACTIONS.DECREMENT, payload: {id: item.id}})}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                    className="ml-4 px-3 py-1 bg-gray-300 rounded"
                    onClick={() => dispatch({ type: ACTIONS.INCREMENT, payload: {id: item.id}})}
                >
                    +
                </button>
                <button 
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: {id: item.id}})}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItem;