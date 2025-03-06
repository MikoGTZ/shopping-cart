import React, { useContext } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface CartItemProps {
    item: {
        productId: number;
        name: string;
        price: number;
        quantity: number;
    };
    userId: string;
}

const CartItem: React.FC<CartItemProps> = ({ item, userId }) => {
    const incrementMutation = useMutation(api.cart.increment);
    const decrementMutation = useMutation(api.cart.decrement);
    const removeFromCartMutation = useMutation(api.cart.removeFromCart);

    const decrement = async () => {
        await decrementMutation({
            userId,
            productId: item.productId
        })
    }

    const increment = async () => {
        await incrementMutation({
            userId,
            productId: item.productId
        })
    }

    const removeFromCart = async () => {
        await removeFromCartMutation({
            userId,
            productId: item.productId
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
                    className="ml-1 px-3 py-1 bg-gray-300 rounded"
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