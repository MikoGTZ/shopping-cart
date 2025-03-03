import React from 'react'
import { useCart, ACTIONS } from '@/app/contexts/CartContext';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
  const { dispatch } = useCart();
  
  return (
    <div>
      <div className='grid grid-row-5'>
        <div className='grid grid-cols-2 md:grid-cols-5'>
            {products.map((product) => 
                <div key={product.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ml-6 mt-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    <p>₱{product.price}</p>
                    <button onClick={() => dispatch({ type: ACTIONS.ADD_TO_CART, payload: product})} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
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
