'use server';

import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// Script to seed sample products into the database
export async function seedProducts() {
  try {
    await dbConnect();

    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 25,
      },
      {
        name: 'Smart Watch',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and notifications.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 15,
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable laptop backpack with multiple compartments and water-resistant material.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        category: 'Accessories',
        stock: 40,
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with customizable keys and premium switches.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 20,
      },
      {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        category: 'Home',
        stock: 30,
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe and auto-brew feature.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
        category: 'Kitchen',
        stock: 12,
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes with excellent cushioning and breathable material.',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Sports',
        stock: 35,
      },
      {
        name: 'Yoga Mat',
        description: 'Premium yoga mat with non-slip surface and extra cushioning.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        category: 'Sports',
        stock: 50,
      },
    ];

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    return { success: true, message: 'Sample products added successfully!' };
  } catch (error: unknown) {
    console.error('Error seeding products:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to seed products',
    };
  }
}
