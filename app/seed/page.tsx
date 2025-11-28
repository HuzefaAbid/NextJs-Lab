import { seedProducts } from '@/actions/seedProducts';
import { redirect } from 'next/navigation';

export default async function SeedPage() {
  const result = await seedProducts();

  if (result.success) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">{result.message}</p>
      </div>
    </div>
  );
}
