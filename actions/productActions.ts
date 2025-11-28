'use server';

import dbConnect from '@/lib/mongodb';
import Product, { IProduct } from '@/models/Product';
import { revalidatePath } from 'next/cache';

export async function getProducts(): Promise<IProduct[]> {
  try {
    await dbConnect();
    const products = await Product.find({}).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<IProduct | null> {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createProduct(data: Omit<IProduct, '_id'>): Promise<{ success: boolean; message: string; product?: IProduct }> {
  try {
    await dbConnect();
    const product = await Product.create(data);
    revalidatePath('/');
    return {
      success: true,
      message: 'Product created successfully',
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create product',
    };
  }
}

export async function updateProduct(id: string, data: Partial<IProduct>): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    await Product.findByIdAndUpdate(id, data);
    revalidatePath('/');
    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update product',
    };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(id);
    revalidatePath('/');
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete product',
    };
  }
}
