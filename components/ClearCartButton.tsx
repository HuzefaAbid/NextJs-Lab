'use client';

import { clearCart } from '@/actions/cartActions';
import { useState } from 'react';

export default function ClearCartButton() {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      setIsClearing(true);
      await clearCart();
      setIsClearing(false);
    }
  };

  return (
    <button
      onClick={handleClearCart}
      disabled={isClearing}
      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-red-400"
    >
      {isClearing ? 'Clearing...' : 'Clear Cart'}
    </button>
  );
}
