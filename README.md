# E-Commerce Store - Next.js with MongoDB

A modern e-commerce application built with Next.js 15, TypeScript, MongoDB Atlas, and Server Actions.

## Features

- 🛍️ Product listing with responsive grid layout
- 🛒 Shopping cart functionality
- ➕ Add/remove items from cart
- 🔢 Update product quantities
- 💾 Persistent cart with session management
- 🎨 Modern UI with Tailwind CSS
- ⚡ Server Actions for backend operations
- 🗄️ MongoDB Atlas for database
- 🚀 Ready for Vercel deployment

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (free tier available)
4. Click "Connect" on your cluster
5. Add your IP address to the IP Access List
6. Create a database user with username and password
7. Get your connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 2. Environment Variables

1. Open the `.env.local` file in the project root
2. Replace the placeholder with your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Seed Sample Data (Optional)

To populate your database with sample products, visit:

```
http://localhost:3000/seed
```

This will add 8 sample products to your database.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ecommerce-app/
├── actions/              # Server Actions
│   ├── cartActions.ts    # Cart CRUD operations
│   ├── productActions.ts # Product CRUD operations
│   └── seedProducts.ts   # Database seeding
├── app/                  # App Router pages
│   ├── cart/            # Shopping cart page
│   ├── seed/            # Seed data page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page (product listing)
├── components/          # React components
│   ├── CartItem.tsx     # Individual cart item
│   ├── ClearCartButton.tsx
│   ├── Header.tsx       # Navigation header
│   └── ProductCard.tsx  # Product display card
├── lib/                 # Utilities
│   └── mongodb.ts       # Database connection
├── models/              # Mongoose schemas
│   ├── Cart.ts          # Cart model
│   └── Product.ts       # Product model
└── .env.local          # Environment variables
```

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable during deployment or in Vercel dashboard
```

### Important Deployment Notes

- Make sure to add your `MONGODB_URI` environment variable in Vercel project settings
- After deployment, visit `/seed` route to populate your database with sample products
- Update MongoDB Atlas IP whitelist to allow connections from anywhere (0.0.0.0/0) for production

## API Routes (Server Actions)

### Product Actions
- `getProducts()` - Fetch all products
- `getProductById(id)` - Fetch single product
- `createProduct(data)` - Create new product
- `updateProduct(id, data)` - Update product
- `deleteProduct(id)` - Delete product

### Cart Actions
- `getCart()` - Get current cart
- `addToCart(productId, quantity)` - Add item to cart
- `updateCartItem(productId, quantity)` - Update item quantity
- `removeFromCart(productId)` - Remove item from cart
- `clearCart()` - Clear entire cart

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas with Mongoose
- **Styling**: Tailwind CSS
- **State Management**: Server Actions & Server Components
- **Deployment**: Vercel

## Features Explained

### Server Actions
All backend logic is implemented using Next.js Server Actions, providing:
- Type-safe API calls
- Automatic revalidation
- No API routes needed
- Direct database access from components

### Session Management
Cart persists using:
- HTTP-only cookies for session ID
- MongoDB storage for cart data
- 7-day session expiration

### Image Optimization
Using Next.js Image component for:
- Automatic image optimization
- Responsive images
- Lazy loading

## License

MIT
