'use client';

import { ICartItem } from '@/models/Cart';
import { updateCartItem, removeFromCart } from '@/actions/cartActions';
import { useState } from 'react';
import Image from 'next/image';

interface CartItemComponentProps {
  item: ICartItem;
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsUpdating(true);
    await updateCartItem(item.productId, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await removeFromCart(item.productId);
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
          sizes="96px"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <p className="font-bold text-blue-600 w-20 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          disabled={isUpdating}
          className="text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
