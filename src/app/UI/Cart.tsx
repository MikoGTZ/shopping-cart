import React, {useEffect, useState} from 'react';
import CartItem from '@/app/ui/CartItem';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const checkoutMutation = useMutation(api.cart.checkout);
    const [userId, setUserId] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            router.push('/');
        } else {
            setUserId(storedUserId);
        }
    }, [router]);

    const cart = useQuery(api.cart.getCart, userId ? { userId } : "skip") || [];

    const totalPrice = cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

    const checkout = async () => {
        if(userId){
            await checkoutMutation({userId});
        }
    }

    return (
        <div>
            <div className="p-4 border rounded-md shadow-md">
                <h1 className="text-center text-xl font-bold mb-4">My Cart</h1>
                {cart.length === 0 
                ? <p>Your cart is empty.</p> 
                : cart.map((item: any) => <CartItem key={item._id} item={item} userId={userId}/>)}
                <h3 className='font-semibold mt-2'>Total: ₱ {totalPrice}</h3>
                <button onClick={checkout} className='bg-blue-700 rounded text-white px-4 py-2'>Checkout</button>
            </div> 
        </div>
    );
}

export default Cart;

function userEffect(arg0: () => void) {
    throw new Error('Function not implemented.');
}
