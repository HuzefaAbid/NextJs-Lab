'use client';

import { IProduct } from '@/models/Product';
import { addToCart } from '@/actions/cartActions';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    setIsAdding(true);
    setMessage('');
    
    const result = await addToCart(product._id!, 1);
    
    setMessage(result.message);
    setIsAdding(false);
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
            }`}
          >
            {isAdding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
        {message && (
          <p className={`text-sm mt-2 ${message.includes('success') || message.includes('added') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
