import React, {useState} from 'react'
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useCart, ACTIONS } from '@/app/contexts/CartContext';
import { supabase } from '@/app/lib/supabase'

interface Product {
    _id: string;
    productId: number;
    name: string;
    price: number;
  
}

interface ProductListProps {
    products: Product[];
}

const ProductList = () => {
  const { dispatch } = useCart();
  const products = useQuery(api.product.getProducts) || [];
  const addToCartMutation = useMutation(api.cart.addToCart);

   const [searchProduct, setSearchProduct] = useState('');
  
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

  const addToCart = async (product: Product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART,  payload: product});

    await addToCartMutation({
      productId: product.productId,
      name: product.name,
      price: product.price
    })
  }

  // const addToCart = async (product: Product) => {
  //   dispatch({ type: ACTIONS.ADD_TO_CART, payload: product })

  //   const { data, error } = await supabase
  //     .from('cart')
  //     .select('*')
  //     .eq('id', product.id);
      
  //   console.log('Supabase response:', { data, error });
      
      
  //   if (data && data.length > 0) {
  //     const existingItem = data[0];
  //     console.log('Updating existing item:', existingItem);
        
  //     const { error: updateError } = await supabase
  //       .from('cart')
  //       .update({ quantity: existingItem.quantity + 1 })
  //       .eq('id', existingItem.id);
        
  //      if (updateError) {
  //       console.error('Error updating cart:', updateError);
  //     }
  //   } else {
  //     console.log('Adding new item to cart');
        
  //     const { error: insertError } = await supabase
  //       .from('cart')
  //       .insert({
  //         id: product.id,  
  //         name: product.name, 
  //         price: product.price, 
  //         quantity: 1
  //       });
        
  //     if (insertError) {
  //       console.error('Error inserting to cart:', insertError);
  //     }
  //   }
  // }
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-400 rounded-md px-4 py-2 md:w-1/4 md:ml-6"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
      />
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-5'>
            {filteredProducts.map((product) => 
                <div key={product.productId} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 md:ml-6 mt-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    <p>₱{product.price}</p>
                    <button onClick={() => addToCart(product)} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        Add To Cart
                    </button>
                </div>
            )}          
        </div>
      </div>
    </div>
  )
}

export default ProductList