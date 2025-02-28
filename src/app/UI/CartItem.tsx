import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartItemProps {
    productId: number;
    products: Product[];
    quantity: number;
    removeFromCart: (id: number) => void;
    increment: (id: number) => void; 
    decrement: (id: number) => void; 
}

const CartItem: React.FC<CartItemProps> = ({ productId, products, quantity, removeFromCart, increment, decrement }) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div>
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-500">₱{product.price * quantity}</p>
                <p className="text-gray-500">Quantity: {quantity}</p>
            </div>
            <div className="flex items-center">
                <button 
                    className="ml-4 px-3 py-1 bg-gray-300 rounded"
                    onClick={() => decrement(productId)}
                >
                    -
                </button>
                <span className="mx-2">{quantity}</span>
                <button 
                    className="ml-4 px-3 py-1 bg-gray-300 rounded"
                    onClick={() => increment(productId)}
                >
                    +
                </button>
                <button 
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => removeFromCart(productId)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItem;