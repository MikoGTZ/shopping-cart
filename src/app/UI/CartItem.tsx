import React, { useContext } from 'react';
import { useCart, ACTIONS } from '@/app/contexts/CartContext';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartItemProps {
    item: {
        _id: number;
        name: string;
        price: number;
        quantity: number;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { dispatch } = useCart();

    const incrementMutation = useMutation(api.cart.increment);
    const decrementMutation = useMutation(api.cart.decrement);
    const removeFromCartMutation = useMutation(api.cart.removeFromCart);

    const decrement = async () => {
        dispatch({ type: ACTIONS.DECREMENT, payload: {id: item._id}})

        await decrementMutation({
            productId: item._id
        })
    }

    const increment = async () => {
        dispatch({ type: ACTIONS.INCREMENT, payload: {id: item._id}})

        await incrementMutation({
            productId: item._id
        })
    }

    const removeFromCart = async () => {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload:  {id: item._id}})

        await removeFromCartMutation({
            productId: item._id
        })
    }

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
                    onClick={decrement}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                    className="ml-4 px-3 py-1 bg-gray-300 rounded"
                    onClick={increment}
                >
                    +
                </button>
                <button 
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    onClick={removeFromCart}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItem;