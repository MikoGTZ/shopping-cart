import React from 'react';
import CartItem from '@/app/ui/CartItem';
import { useCart, ACTIONS} from '@/app/contexts/CartContext'
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const Cart = () => {
    // const {cart, dispatch} = useCart();
    const checkoutMutation = useMutation(api.cart.checkout);

    const cart = useQuery(api.cart.getCart) || [];
    const { dispatch } = useCart();

    const totalPrice = cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

    const checkout = async () => {
        // dispatch({ type: ACTIONS.CHECKOUT});

        await checkoutMutation();
    }

    return (
        <div>
            <div className="p-4 border rounded-md shadow-md">
                <h1 className="text-center text-xl font-bold mb-4">My Cart</h1>
                {cart.length === 0 
                ? <p>Your cart is empty.</p> 
                : cart.map((item: any) => <CartItem key={item._id} item={item} />)}
                <h3>Total: ${totalPrice}</h3>
                <button onClick={checkout}>Checkout</button>
            
            </div> 
        </div>
    );
}

export default Cart;