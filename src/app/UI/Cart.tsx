import React from 'react';
import CartItem from '@/app/UI/CartItem';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartProps {
    cart: { [key: number]: { quantity: number } & Product };
    removeFromCart: (id: number) => void;
    increment: (id: number) => void;
    decrement: (id: number) => void;
    checkout: () => void;
    products: Product[];
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, products, increment, decrement, checkout}) => {
    return (
        <div>
            <div className="p-4">
                <h1 className="text-center text-xl font-bold mb-4">My Cart</h1>
                {Object.values(cart).length === 0 ? (
                    <p className='text-center'>Your cart is empty.</p>
                ) : (
                    Object.values(cart).map((item, index) => (
                            <CartItem
                                key={item.id} 
                                productId={item.id}
                                quantity={item.quantity}
                                products={products}
                                removeFromCart={removeFromCart}
                                increment={increment}
                                decrement={decrement}
                            />
                        ))
                )}
                {Object.values(cart).length !==0 && (
                    <button onClick={checkout}>Checkout</button>
                )}
            </div> 
        </div>
    );
}

export default Cart;