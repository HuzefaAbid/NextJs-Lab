'use server';

import dbConnect from '@/lib/mongodb';
import Cart, { ICart, ICartItem } from '@/models/Cart';
import Product from '@/models/Product';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('sessionId')?.value;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
  
  return sessionId;
}

async function setSessionId(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('sessionId', sessionId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getCart(): Promise<ICart | null> {
  try {
    await dbConnect();
    const sessionId = await getSessionId();
    
    let cart = await Cart.findOne({ sessionId }).lean();
    
    if (!cart) {
      return { sessionId, items: [], totalAmount: 0 } as ICart;
    }
    
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export async function addToCart(productId: string, quantity: number = 1): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    const sessionId = await getSessionId();
    await setSessionId(sessionId);
    
    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    
    if (product.stock < quantity) {
      return { success: false, message: 'Insufficient stock' };
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [], totalAmount: 0 });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      (item: ICartItem) => item.productId === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });
    }
    
    // Calculate total
    cart.totalAmount = cart.items.reduce(
      (total: number, item: ICartItem) => total + item.price * item.quantity,
      0
    );
    
    await cart.save();
    revalidatePath('/cart');
    
    return { success: true, message: 'Product added to cart' };
  } catch (error: unknown) {
    console.error('Error adding to cart:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add to cart',
    };
  }
}

export async function updateCartItem(productId: string, quantity: number): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    const sessionId = await getSessionId();
    
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }
    
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    
    const itemIndex = cart.items.findIndex(
      (item: ICartItem) => item.productId === productId
    );
    
    if (itemIndex === -1) {
      return { success: false, message: 'Item not found in cart' };
    }
    
    cart.items[itemIndex].quantity = quantity;
    
    // Recalculate total
    cart.totalAmount = cart.items.reduce(
      (total: number, item: ICartItem) => total + item.price * item.quantity,
      0
    );
    
    await cart.save();
    revalidatePath('/cart');
    
    return { success: true, message: 'Cart updated' };
  } catch (error: unknown) {
    console.error('Error updating cart:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update cart',
    };
  }
}

export async function removeFromCart(productId: string): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    const sessionId = await getSessionId();
    
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }
    
    cart.items = cart.items.filter((item: ICartItem) => item.productId !== productId);
    
    // Recalculate total
    cart.totalAmount = cart.items.reduce(
      (total: number, item: ICartItem) => total + item.price * item.quantity,
      0
    );
    
    await cart.save();
    revalidatePath('/cart');
    
    return { success: true, message: 'Item removed from cart' };
  } catch (error: unknown) {
    console.error('Error removing from cart:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to remove from cart',
    };
  }
}

export async function clearCart(): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();
    const sessionId = await getSessionId();
    
    await Cart.findOneAndUpdate(
      { sessionId },
      { items: [], totalAmount: 0 }
    );
    
    revalidatePath('/cart');
    
    return { success: true, message: 'Cart cleared' };
  } catch (error: unknown) {
    console.error('Error clearing cart:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to clear cart',
    };
  }
}
