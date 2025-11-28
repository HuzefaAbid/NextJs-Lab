import Link from 'next/link';
import { getCart } from '@/actions/cartActions';

export default async function Header() {
  const cart = await getCart();
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100 transition-colors">
            🛍️ E-Commerce Store
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-100 transition-colors font-medium">
              Products
            </Link>
            <Link href="/cart" className="relative hover:text-blue-100 transition-colors font-medium">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
