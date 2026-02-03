# Tech-Bay E-Commerce Platform - Developer Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Environment Setup](#3-environment-setup)
4. [Frontend Documentation](#4-frontend-documentation)
5. [Backend Documentation](#5-backend-documentation)
6. [API Documentation](#6-api-documentation)
7. [Database Schema](#7-database-schema)
8. [Security Considerations](#8-security-considerations)
9. [Deployment Guide](#9-deployment-guide)

---

## 1. Project Overview

### What is Tech-Bay?

Tech-Bay is a full-stack e-commerce platform specializing in electronics and tech products. It provides a complete online shopping experience with user authentication, product browsing, cart management, order processing, and user profile management.

### Core Features

**User Management**
- Email/Password registration and login
- Google OAuth social login
- JWT-based authentication
- Profile photo upload
- Password change functionality

**Product Catalog**
- Product listing with pagination
- Advanced filtering (price, category, brand)
- Product search functionality
- Single product details view
- Product reviews and ratings

**Shopping Features**
- Shopping cart management
- Add/remove/update quantities
- Wishlist functionality
- Checkout process
- Order placement

**Order Management**
- Order history
- Order details view
- Order cancellation

**Address Management**
- Multiple shipping addresses
- Add/edit/delete addresses
- Address type (Home/Office)

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Redux Toolkit, Tailwind CSS, Vite |
| Backend | Python Flask, Flask-JWT-Extended, Flask-CORS |
| Database | MongoDB Atlas |
| Authentication | JWT, Google OAuth 2.0 |
| Image Storage | Cloudinary |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 2. Folder Structure

### Root Structure

```
tech-bay/
├── frontend/                 # React frontend application
├── backend/                  # Flask backend API
├── Report.md                 # Academic project report
└── DOCUMENTATION.md          # This file
```

### Frontend Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── Components/
│   │   ├── checkout/
│   │   │   ├── AddressForm.jsx       # Shipping address form
│   │   │   ├── PaymentForm.jsx       # Payment information form
│   │   │   └── OrderConfirmation.jsx # Order success page
│   │   ├── home/
│   │   │   ├── Header.jsx            # Hero banner section
│   │   │   ├── Category.jsx          # Category display
│   │   │   ├── FeaturedProducts.jsx  # Featured products grid
│   │   │   └── TrustedCompanies.jsx  # Brand partnerships
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   ├── Footer.jsx            # Footer section
│   │   │   └── SearchBar.jsx         # Search functionality
│   │   ├── product/
│   │   │   ├── ProductSidebar.jsx    # Product filters
│   │   │   ├── ProductsProduct.jsx   # Product card component
│   │   │   └── SingleProductPage.jsx # Product detail layout
│   │   ├── Profile/
│   │   │   ├── PersonalDetails.jsx   # User info display
│   │   │   ├── ProfileUpdate.jsx     # Profile edit modal
│   │   │   ├── ChangePassword.jsx    # Password change form
│   │   │   ├── AddressButtonForm.jsx # Address management
│   │   │   ├── EditAddressModal.jsx  # Address edit modal
│   │   │   ├── MyOrders.jsx          # Order history
│   │   │   ├── OrderDetails.jsx      # Order detail view
│   │   │   └── DeleteModel.jsx       # Account deletion modal
│   │   ├── singleproduct/
│   │   │   ├── ProductDetails.jsx    # Product information
│   │   │   ├── CustomerReviews.jsx   # Review section
│   │   │   └── RelatedProducts.jsx   # Similar products
│   │   ├── ui/
│   │   │   └── button.jsx            # Reusable button
│   │   └── ToastNortification.jsx    # Toast handler
│   ├── Context/
│   │   └── authcontext/
│   │       └── AuthContext.jsx       # Auth context provider
│   ├── Pages/
│   │   ├── Home.jsx                  # Home page
│   │   ├── Products.jsx              # Products listing
│   │   ├── SingleProductPage.jsx     # Product detail page
│   │   ├── Cart.jsx                  # Shopping cart
│   │   ├── Checkout.jsx              # Checkout page
│   │   ├── Wishlist.jsx              # Wishlist page
│   │   ├── Profile.jsx               # User profile
│   │   ├── Login.jsx                 # Login page
│   │   └── Signup.jsx                # Registration page
│   ├── redux/
│   │   ├── store.js                  # Redux store config
│   │   └── slices/
│   │       ├── authSlice.js          # Authentication state
│   │       ├── cartSlice.js          # Cart state
│   │       ├── wishlistSlice.js      # Wishlist state
│   │       ├── productSlice.js       # Products state
│   │       ├── filterSlice.js        # Filter state
│   │       ├── addressSlice.js       # Addresses state
│   │       ├── orderSlice.js         # Orders state
│   │       └── uiSlice.js            # UI state
│   ├── services/
│   │   └── api.js                    # Axios API client
│   ├── App.jsx                       # Main app component
│   ├── App.css                       # App styles
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── index.html                        # HTML template
├── package.json                      # Dependencies
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── eslint.config.js                  # ESLint configuration
└── vercel.json                       # Vercel deployment config
```

### Backend Structure

```
backend/
├── app.py                    # Main Flask application
├── authentication.py         # JWT token validation
├── signup.py                 # Auth routes (login, signup, OAuth)
├── product.py                # Product endpoints
├── cart.py                   # Cart operations
├── wishlist.py               # Wishlist operations
├── order.py                  # Order management
├── profile.py                # Profile and address management
├── review.py                 # Product reviews
├── home.py                   # Home page data
├── oauth_config.py           # OAuth initialization
├── db.py                     # Database configuration
├── requirements.txt          # Python dependencies
├── Procfile                  # Deployment config
├── runtime.txt               # Python version
└── .env                      # Environment variables (not tracked)
```

---

## 3. Environment Setup

### Prerequisites

- Node.js v18.x or higher
- Python 3.9 or higher
- npm v9.x or higher
- pip (latest version)
- Git
- MongoDB Atlas account
- Cloudinary account
- Google Cloud Console project (for OAuth)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-bay/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd tech-bay/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file**
   Create a `.env` file in the backend directory:
   ```env
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key
   MongoClient_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/techbay
   CLIENT_ID=your-google-oauth-client-id
   CLIENT_SECRET=your-google-oauth-client-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_SECRET_KEY=your-cloudinary-secret-key
   ```

5. **Start development server**
   ```bash
   python app.py
   ```
   The backend will be available at `http://localhost:5000`

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| SECRET_KEY | Flask secret key for sessions | Yes |
| JWT_SECRET_KEY | Secret for JWT token signing | Yes |
| MongoClient_URI | MongoDB Atlas connection string | Yes |
| CLIENT_ID | Google OAuth 2.0 client ID | Yes |
| CLIENT_SECRET | Google OAuth 2.0 client secret | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_SECRET_KEY | Cloudinary API secret | Yes |

---

## 4. Frontend Documentation

### Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.1 | UI library |
| react-dom | 19.1.1 | React DOM renderer |
| react-router-dom | 7.9.5 | Client-side routing |
| @reduxjs/toolkit | 2.11.2 | State management |
| react-redux | 9.5.1 | React-Redux bindings |
| redux-persist | 6.0.0 | State persistence |
| axios | 1.13.2 | HTTP client |
| tailwindcss | 4.1.16 | CSS framework |
| @mui/material | latest | UI components |
| @mui/icons-material | latest | Material icons |
| react-hook-form | 7.66.0 | Form handling |
| react-toastify | 11.0.5 | Toast notifications |
| swiper | 12.0.3 | Carousel component |

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with categories and featured products |
| Products | `/product` | Product listing with filters |
| SingleProduct | `/products/:id` | Product details page |
| Cart | `/cart` | Shopping cart management |
| Checkout | `/checkout` | Order checkout process |
| Wishlist | `/wishlist` | User's saved products |
| Profile | `/profile` | User profile and settings |
| Login | `/login` | User login page |
| Signup | `/signup` | User registration page |
| OrderSuccess | `/order-success` | Order confirmation |

### Components

#### Layout Components

**Navbar.jsx**
- Main navigation bar
- Responsive mobile drawer
- User authentication status display
- Cart item count badge
- Links to all main sections

**Footer.jsx**
- Site footer with links
- Social media links
- Copyright information

**SearchBar.jsx**
- Product search input
- Search suggestions dropdown
- Redirects to products with query

#### Home Components

**Header.jsx**
- Hero banner section
- Promotional content
- Call-to-action buttons

**Category.jsx**
- Product category cards
- Category images and names
- Links to filtered products

**FeaturedProducts.jsx**
- Featured products carousel
- Product cards with quick actions
- Swiper integration for sliding

#### Product Components

**ProductSidebar.jsx**
- Price range slider (0 - 500,000)
- Category checkboxes
- Brand checkboxes
- Mobile filter drawer

**ProductsProduct.jsx**
- Individual product card
- Product image, title, price
- Add to cart button
- Add to wishlist button

#### Profile Components

**PersonalDetails.jsx**
- User information display
- Profile photo
- Edit profile button

**MyOrders.jsx**
- Order history list
- Order status display
- View details link

### State Management

#### Redux Store Configuration

```javascript
// store.js
const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['auth', 'cart', 'wishlist']
};
```

#### Redux Slices

**authSlice.js**
```javascript
// State structure
{
  token: null,
  user: null,
  loading: false,
  error: null
}

// Async thunks
- login(credentials)
- signup(userData)
- fetchUserProfile()

// Actions
- clearAuth()
```

**cartSlice.js**
```javascript
// State structure
{
  items: [],
  loading: false,
  error: null,
  lastUpdated: null
}

// Async thunks
- fetchCart()
- addToCart({ productId, quantity })
- removeFromCart(productId)

// Actions
- setCart(items)
- clearCartLocal()
```

**productSlice.js**
```javascript
// State structure
{
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
  lastFetched: null
}

// Async thunks
- fetchProducts()
- fetchSingleProduct(productId)

// Actions
- clearSingleProduct()
```

**filterSlice.js**
```javascript
// State structure
{
  priceRange: [0, 500000],
  selectedCategories: [],
  selectedBrands: [],
  minRating: 0,
  inStockOnly: false
}

// Actions
- setPriceRange([min, max])
- toggleCategory(category)
- toggleBrand(brand)
- setMinRating(rating)
- setInStock(boolean)
- clearFilters()
- resetFilters()
```

**addressSlice.js**
```javascript
// State structure
{
  list: [],
  loading: false,
  error: null
}

// Async thunks
- fetchAddresses()
- addAddress(addressData)
- updateAddress({ id, data })
- deleteAddress(id)
```

**orderSlice.js**
```javascript
// State structure
{
  orders: [],
  loading: false,
  error: null
}

// Async thunks
- fetchOrders()
- confirmOrder({ addressId, paymentId })
- cancelOrder(orderId)
```

**uiSlice.js**
```javascript
// State structure
{
  sidebarOpen: false,
  modal: { isOpen: false, type: null },
  toast: { show: false, message: '', type: '' },
  globalLoading: false
}

// Actions
- toggleSidebar()
- openSidebar()
- closeSidebar()
- openModal(type)
- closeModal()
- showToast({ message, type })
- hideToast()
```

### API Integration

**api.js Configuration**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://techbay-j8hr.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 5. Backend Documentation

### Server Setup

**app.py Main Configuration**
```python
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta

app = Flask(__name__)

# CORS Configuration
CORS(app, supports_credentials=True)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

### Routes Overview

| File | Routes | Description |
|------|--------|-------------|
| signup.py | /signup, /login, /googlesignup, /googlelogin, /callback | Authentication |
| home.py | /, /feature | Home page data |
| product.py | /products, /products/<id> | Product operations |
| cart.py | /addtocart, /viewcart, /deletefromcart | Cart management |
| wishlist.py | /addtowishlist, /viewwishlist, /removefromwishlist | Wishlist |
| order.py | /confirmorder, /vieworders, /cancelorder | Orders |
| profile.py | /viewprofile, /addaddress, /viewaddress | Profile |
| review.py | /reviewproduct, /reviewbyproduct | Reviews |

### Controllers

#### Authentication Controller (signup.py)

**signup_user()**
```python
@app.route('/signup', methods=['POST'])
def signup_user():
    """
    Register new user with email and password.

    Request Body:
    {
        "username": "string",
        "email": "string",
        "password": "string",
        "confirm_password": "string"
    }

    Returns:
    - 201: User created with access and refresh tokens
    - 400: Validation error
    - 409: Email already exists
    """
```

**login_user()**
```python
@app.route('/login', methods=['POST'])
def login_user():
    """
    Authenticate user and return tokens.

    Request Body:
    {
        "email": "string",
        "password": "string"
    }

    Returns:
    - 200: Login successful with tokens
    - 401: Invalid credentials
    - 404: User not found
    """
```

#### Product Controller (product.py)

**products_page()**
```python
@app.route('/products', methods=['GET'])
def products_page():
    """
    Get all products.

    Returns:
    - 200: List of products with details
    """
```

**single_product(product_id)**
```python
@app.route('/products/<product_id>', methods=['GET'])
def single_product(product_id):
    """
    Get single product by ID.

    Parameters:
    - product_id: MongoDB ObjectId string

    Returns:
    - 200: Product details
    - 404: Product not found
    """
```

#### Cart Controller (cart.py)

**add_to_cart()**
```python
@app.route('/addtocart', methods=['POST'])
@token_required
def add_to_cart(current_user):
    """
    Add product to user's cart.

    Headers:
    - Authorization: Bearer <token>

    Request Body:
    {
        "product_id": "string",
        "quantity": number
    }

    Returns:
    - 200: Product added to cart
    - 401: Unauthorized
    """
```

### Services

#### Database Service (db.py)

```python
from pymongo import MongoClient
import os

client = MongoClient(os.getenv('MongoClient_URI'))
db = client['techbay']

# Collections
users = db['users']
products = db['products']
categories = db['categories']
orders = db['orders']
addresses = db['addresses']
reviews = db['reviews']
```

### Middleware

#### Authentication Middleware (authentication.py)

```python
from functools import wraps
from flask import request, jsonify
import jwt
import os

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'message': 'Token format invalid'}), 401

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(
                token,
                os.getenv('SECRET_KEY'),
                algorithms=['HS256']
            )
            current_user = users.find_one({'email': data['sub']})
            if not current_user:
                return jsonify({'message': 'User not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated
```

### Authentication Flow

**Standard Authentication**
1. User submits credentials to `/login` or `/signup`
2. Backend validates credentials
3. If valid, generates JWT access token and refresh token
4. Returns tokens to frontend
5. Frontend stores access_token in localStorage
6. Frontend includes token in Authorization header for protected routes

**Google OAuth Flow**
1. User clicks "Login with Google"
2. Frontend redirects to `/googlesignup` or `/googlelogin`
3. Backend redirects to Google OAuth consent screen
4. User authorizes the application
5. Google redirects to `/callback` with auth code
6. Backend exchanges code for access token
7. Backend fetches user info from Google
8. Backend creates/updates user in database
9. Backend generates JWT tokens
10. Backend redirects to frontend with token in URL parameter
11. Frontend extracts and stores token

### Authorization

Protected routes use the `@token_required` decorator which:
1. Extracts token from Authorization header
2. Validates token signature and expiry
3. Retrieves user from database
4. Passes user object to route handler
5. Returns 401 if token is invalid or missing

---

## 6. API Documentation

### Base URL

- Development: `http://localhost:5000`
- Production: `https://techbay-j8hr.onrender.com`

### Authentication Endpoints

#### POST /signup

Register a new user account.

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- 400: `{ "message": "All fields are required" }`
- 400: `{ "message": "Passwords do not match" }`
- 409: `{ "message": "Email already exists" }`

---

#### POST /login

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- 401: `{ "message": "Invalid credentials" }`
- 404: `{ "message": "User not found" }`

---

#### GET /googlesignup

Initiate Google OAuth signup flow.

**Response:** Redirects to Google OAuth consent screen.

---

#### GET /googlelogin

Initiate Google OAuth login flow.

**Response:** Redirects to Google OAuth consent screen.

---

#### GET /callback

Google OAuth callback handler.

**Query Parameters:**
- code: Authorization code from Google

**Response:** Redirects to frontend with token parameter.

---

### Home Endpoints

#### GET /

Get all product categories.

**Success Response (200):**
```json
{
  "categories": [
    { "_id": "...", "name": "Smartphones" },
    { "_id": "...", "name": "Laptops" },
    { "_id": "...", "name": "Accessories" }
  ]
}
```

---

#### GET /feature

Get featured products.

**Success Response (200):**
```json
{
  "products": [
    {
      "_id": "...",
      "title": "iPhone 15 Pro",
      "price": 129999,
      "image": "https://...",
      "rating": 4.5
    }
  ]
}
```

---

### Product Endpoints

#### GET /products

Get all products.

**Success Response (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Product Name",
      "description": "Product description...",
      "category": "Smartphones",
      "brand": "Apple",
      "price": 99999,
      "rating": 4.5,
      "inStock": true,
      "image": "https://cloudinary.com/..."
    }
  ]
}
```

---

#### GET /products/:product_id

Get single product details.

**Path Parameters:**
- product_id: MongoDB ObjectId string

**Success Response (200):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Product Name",
    "description": "Detailed product description...",
    "category": "Smartphones",
    "brand": "Apple",
    "price": 99999,
    "rating": 4.5,
    "inStock": true,
    "image": "https://cloudinary.com/..."
  }
}
```

**Error Response:**
- 404: `{ "message": "Product not found" }`

---

#### POST /products/categories

Get products by category.

**Request Body:**
```json
{
  "category": "Smartphones"
}
```

**Success Response (200):**
```json
{
  "products": [...]
}
```

---

#### POST /products/brand

Get products by brand.

**Request Body:**
```json
{
  "brand": "Apple"
}
```

**Success Response (200):**
```json
{
  "products": [...]
}
```

---

#### POST /products/price_range

Get products within price range.

**Request Body:**
```json
{
  "min_price": 10000,
  "max_price": 50000
}
```

**Success Response (200):**
```json
{
  "products": [...]
}
```

---

#### GET /products/search

Search products by query.

**Query Parameters:**
- q: Search query string

**Example:** `/products/search?q=iphone`

**Success Response (200):**
```json
{
  "products": [...]
}
```

---

### Cart Endpoints

#### POST /addtocart

Add product to cart. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "product_id": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Success Response (200):**
```json
{
  "message": "Product added to cart",
  "cart": [...]
}
```

**Error Responses:**
- 401: `{ "message": "Token is missing" }`

---

#### GET /viewcart

Get user's cart contents. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "cart": [
    {
      "product_id": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "product": {
        "title": "Product Name",
        "price": 99999,
        "image": "https://..."
      }
    }
  ]
}
```

---

#### DELETE /deletefromcart

Remove product from cart. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "product_id": "507f1f77bcf86cd799439011"
}
```

**Success Response (200):**
```json
{
  "message": "Product removed from cart"
}
```

---

#### POST /reducefromcart

Reduce product quantity in cart. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "product_id": "507f1f77bcf86cd799439011"
}
```

**Success Response (200):**
```json
{
  "message": "Quantity reduced"
}
```

---

### Wishlist Endpoints

#### POST /addtowishlist/:product_id

Add product to wishlist. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- product_id: Product ObjectId

**Success Response (200):**
```json
{
  "message": "Product added to wishlist"
}
```

---

#### GET /viewwishlist

Get user's wishlist. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "wishlist": [
    {
      "_id": "...",
      "product_id": "507f1f77bcf86cd799439011",
      "product": {
        "title": "Product Name",
        "price": 99999,
        "image": "https://..."
      }
    }
  ]
}
```

---

#### DELETE /removefromwishlist/:product_id

Remove product from wishlist. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- product_id: Product ObjectId

**Success Response (200):**
```json
{
  "message": "Product removed from wishlist"
}
```

---

### Order Endpoints

#### POST /confirmorder

Create a new order. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "address": "507f1f77bcf86cd799439011",
  "paymentId": "pay_ABC123XYZ"
}
```

**Success Response (201):**
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "...",
    "amount": 199998,
    "status": "confirmed"
  }
}
```

**Error Responses:**
- 400: `{ "message": "Cart is empty" }`

---

#### GET /vieworders

Get user's order history. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "orders": [
    {
      "_id": "...",
      "amount": 199998,
      "status": "confirmed",
      "createdAt": "2024-01-15T10:30:00Z",
      "products": [...]
    }
  ]
}
```

---

#### GET /order/:order_id

Get specific order details. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- order_id: Order ObjectId

**Success Response (200):**
```json
{
  "order": {
    "_id": "...",
    "amount": 199998,
    "status": "confirmed",
    "address": {...},
    "products": [...]
  }
}
```

---

#### DELETE /cancelorder/:order_id

Cancel an order. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- order_id: Order ObjectId

**Success Response (200):**
```json
{
  "message": "Order cancelled successfully"
}
```

**Error Responses:**
- 403: `{ "message": "Not authorized to cancel this order" }`

---

### Profile Endpoints

#### GET /viewprofile

Get user profile details. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "user": {
    "username": "John Doe",
    "email": "john@example.com",
    "image": "https://cloudinary.com/..."
  }
}
```

---

#### POST /upload-profile-photo

Upload profile picture. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body:**
- file: Image file (JPEG, PNG)

**Success Response (200):**
```json
{
  "message": "Profile photo updated",
  "image_url": "https://cloudinary.com/..."
}
```

---

#### POST /addaddress

Add new shipping address. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "address": "123 Main Street",
  "mobile": "9876543210",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "type": "Home"
}
```

**Success Response (201):**
```json
{
  "message": "Address added successfully",
  "address": {...}
}
```

---

#### GET /viewaddress

Get user's addresses. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "addresses": [
    {
      "_id": "...",
      "name": "John Doe",
      "address": "123 Main Street",
      "mobile": "9876543210",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "type": "Home"
    }
  ]
}
```

---

#### PUT /updateaddress/:address_id

Update shipping address. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- address_id: Address ObjectId

**Request Body:**
```json
{
  "name": "John Doe",
  "address": "456 New Street",
  "mobile": "9876543210",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "type": "Office"
}
```

**Success Response (200):**
```json
{
  "message": "Address updated successfully"
}
```

---

#### DELETE /deleteaddress/:address_id

Delete shipping address. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- address_id: Address ObjectId

**Success Response (200):**
```json
{
  "message": "Address deleted successfully"
}
```

---

#### POST /changepassword

Change user password. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "old_password": "currentPassword123",
  "new_password": "newPassword456"
}
```

**Success Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

**Error Responses:**
- 400: `{ "message": "Current password is incorrect" }`

---

### Review Endpoints

#### POST /reviewproduct/:product_id

Submit product review. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- product_id: Product ObjectId

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Great product, highly recommended!"
}
```

**Success Response (201):**
```json
{
  "message": "Review submitted successfully",
  "review": {...}
}
```

---

#### GET /reviewbyproduct/:product_id

Get reviews for a product.

**Path Parameters:**
- product_id: Product ObjectId

**Success Response (200):**
```json
{
  "reviews": [
    {
      "_id": "...",
      "rating": 4,
      "comment": "Great product!",
      "username": "John Doe",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

#### PUT /updatereview/:review_id

Update product review. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- review_id: Review ObjectId

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Updated review comment"
}
```

**Success Response (200):**
```json
{
  "message": "Review updated successfully"
}
```

**Error Responses:**
- 403: `{ "message": "Not authorized to update this review" }`

---

#### DELETE /deletereview/:review_id

Delete product review. **Requires Authentication.**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Path Parameters:**
- review_id: Review ObjectId

**Success Response (200):**
```json
{
  "message": "Review deleted successfully"
}
```

---

### Health Check

#### GET /health

Check API health status.

**Success Response (200):**
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

---

## 7. Database Schema

### Collections Overview

| Collection | Description |
|------------|-------------|
| users | User accounts and authentication data |
| products | Product catalog |
| categories | Product categories |
| orders | Order records |
| addresses | Shipping addresses |
| reviews | Product reviews |

### users Collection

```javascript
{
  _id: ObjectId,              // Primary key
  username: String,           // Display name
  email: String,              // Unique, indexed
  password: String,           // Bcrypt hashed (null for OAuth)
  image: String,              // Profile photo URL
  cart: [                     // Embedded cart items
    {
      product_id: ObjectId,   // Reference to products
      quantity: Number        // Item quantity
    }
  ],
  wishlist: [                 // Embedded wishlist
    {
      _id: ObjectId,
      product_id: ObjectId    // Reference to products
    }
  ],
  refreshToken: String,       // JWT refresh token
  createdAt: DateTime,        // Auto-generated
  updatedAt: DateTime         // Auto-updated
}
```

### products Collection

```javascript
{
  _id: ObjectId,              // Primary key
  title: String,              // Product name
  description: String,        // Product description
  category: String,           // Category name
  brand: String,              // Brand name
  price: Number,              // Price in INR
  rating: Number,             // Average rating (1-5)
  inStock: Boolean,           // Availability status
  image: String               // Product image URL
}
```

### categories Collection

```javascript
{
  _id: ObjectId,              // Primary key
  name: String                // Category name
}
```

### orders Collection

```javascript
{
  _id: ObjectId,              // Primary key
  owner: ObjectId,            // Foreign key to users
  address: ObjectId,          // Foreign key to addresses
  paymentId: String,          // Payment transaction ID
  products: [                 // Snapshot of ordered items
    {
      product_id: ObjectId,   // Reference to products
      quantity: Number        // Ordered quantity
    }
  ],
  amount: Number,             // Total order amount
  status: String,             // Order status
  createdAt: DateTime,        // Order creation time
  updatedAt: DateTime         // Last update time
}
```

### addresses Collection

```javascript
{
  _id: ObjectId,              // Primary key
  owner: ObjectId,            // Foreign key to users
  name: String,               // Recipient name
  address: String,            // Street address
  mobile: String,             // Contact number
  city: String,               // City name
  state: String,              // State name
  pincode: String,            // Postal code
  type: String,               // "Home" or "Office"
  createdAt: DateTime,        // Creation time
  updatedAt: DateTime         // Last update time
}
```

### reviews Collection

```javascript
{
  _id: ObjectId,              // Primary key
  user_id: ObjectId,          // Foreign key to users
  product_id: ObjectId,       // Foreign key to products
  rating: Number,             // Rating (1-5)
  comment: String,            // Review text
  createdAt: DateTime,        // Review creation time
  updatedAt: DateTime         // Last update time
}
```

### Indexes

| Collection | Index | Type | Purpose |
|------------|-------|------|---------|
| users | email | Unique | Fast lookup, prevent duplicates |
| products | category | Regular | Category filtering |
| products | brand | Regular | Brand filtering |
| orders | owner | Regular | User order queries |
| reviews | product_id | Regular | Product review queries |
| addresses | owner | Regular | User address queries |

---

## 8. Security Considerations

### Authentication Security

**Password Security**
- Passwords are hashed using Bcrypt with 10 salt rounds
- Plain text passwords are never stored
- Password comparison uses timing-safe comparison

**JWT Security**
- Tokens are signed with HS256 algorithm
- Secret key stored in environment variables
- Access tokens expire after 30 days
- Refresh tokens allow session renewal

**Token Storage**
- Access token stored in localStorage (frontend)
- Refresh token stored in database (backend)
- Tokens transmitted via Authorization header

### Authorization

**Protected Routes**
- All user-specific operations require valid JWT
- Token validation middleware checks every protected request
- User ownership verified for sensitive operations (orders, reviews, addresses)

**Resource Authorization**
- Users can only access their own data
- Order cancellation validates ownership
- Review updates/deletes check author
- Address operations verify owner

### Data Validation

**Input Validation**
- Required fields checked on all endpoints
- Email format validation on signup
- Password confirmation matching
- Data type validation for numeric fields

**Database Security**
- MongoDB connection uses authentication
- Connection string stored in environment variables
- Database user has limited permissions

### API Security

**CORS Configuration**
- CORS enabled with credentials support
- Origin restrictions for production
- Pre-flight request handling

**Request Security**
- Content-Type validation
- JSON parsing with error handling
- File upload size limits for images

### Best Practices Implemented

1. **Environment Variables**: All secrets stored in .env files, not in code
2. **HTTPS**: Production deployments use HTTPS only
3. **Password Hashing**: Bcrypt with appropriate cost factor
4. **Token Expiration**: JWT tokens have finite lifespan
5. **Input Sanitization**: User input validated before database operations
6. **Error Handling**: Generic error messages to prevent information leakage

### Security Recommendations

1. **Rate Limiting**: Implement request rate limiting to prevent abuse
2. **CSRF Protection**: Add CSRF tokens for state-changing operations
3. **Two-Factor Authentication**: Add 2FA option for user accounts
4. **Account Lockout**: Lock accounts after multiple failed login attempts
5. **Audit Logging**: Log security-relevant events for monitoring
6. **Input Length Limits**: Enforce maximum length for all string inputs

---

## 9. Deployment Guide

### Frontend Deployment (Vercel)

1. **Prerequisites**
   - Vercel account
   - GitHub repository with frontend code

2. **Deployment Steps**

   a. Connect repository to Vercel:
   ```
   - Go to vercel.com
   - Click "New Project"
   - Import Git repository
   - Select the frontend folder
   ```

   b. Configure build settings:
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

   c. Set environment variables:
   ```
   VITE_API_URL=https://techbay-j8hr.onrender.com
   ```

   d. Deploy:
   ```
   - Click "Deploy"
   - Vercel will build and deploy automatically
   ```

3. **vercel.json Configuration**
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### Backend Deployment (Render)

1. **Prerequisites**
   - Render account
   - GitHub repository with backend code

2. **Deployment Steps**

   a. Create new Web Service:
   ```
   - Go to render.com
   - Click "New" > "Web Service"
   - Connect GitHub repository
   - Select the backend folder
   ```

   b. Configure service:
   ```
   Name: techbay-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```

   c. Set environment variables:
   ```
   SECRET_KEY=<your-secret-key>
   JWT_SECRET_KEY=<your-jwt-secret>
   MongoClient_URI=<your-mongodb-uri>
   CLIENT_ID=<google-oauth-client-id>
   CLIENT_SECRET=<google-oauth-client-secret>
   CLOUDINARY_CLOUD_NAME=<cloudinary-name>
   CLOUDINARY_API_KEY=<cloudinary-key>
   CLOUDINARY_SECRET_KEY=<cloudinary-secret>
   ```

   d. Deploy:
   ```
   - Click "Create Web Service"
   - Render will build and deploy automatically
   ```

3. **Procfile Configuration**
   ```
   web: gunicorn app:app
   ```

4. **runtime.txt Configuration**
   ```
   python-3.11.4
   ```

### Database Setup (MongoDB Atlas)

1. **Create Cluster**
   ```
   - Go to mongodb.com/atlas
   - Create free cluster (M0)
   - Choose cloud provider and region
   ```

2. **Configure Access**
   ```
   - Add database user with password
   - Add IP addresses to whitelist (0.0.0.0/0 for all)
   ```

3. **Get Connection String**
   ```
   - Click "Connect" on cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace <password> with actual password
   ```

### Cloudinary Setup

1. **Create Account**
   ```
   - Go to cloudinary.com
   - Sign up for free account
   ```

2. **Get Credentials**
   ```
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
   ```

3. **Configure Upload Preset** (Optional)
   ```
   - Go to Settings > Upload
   - Add upload preset for unsigned uploads
   ```

### Google OAuth Setup

1. **Create Project**
   ```
   - Go to console.cloud.google.com
   - Create new project
   ```

2. **Configure OAuth Consent Screen**
   ```
   - Go to APIs & Services > OAuth consent screen
   - Choose External user type
   - Add app name, email, and authorized domains
   ```

3. **Create Credentials**
   ```
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - http://localhost:5000/callback (development)
     - https://techbay-j8hr.onrender.com/callback (production)
   ```

4. **Copy Credentials**
   ```
   - Copy Client ID and Client Secret
   - Add to backend environment variables
   ```

### Production Checklist

- [ ] Environment variables set correctly
- [ ] CORS configured for production domain
- [ ] Debug mode disabled in Flask
- [ ] HTTPS enabled on all services
- [ ] Database indexes created
- [ ] Cloudinary folder structure set up
- [ ] Google OAuth redirect URIs updated
- [ ] Error monitoring configured
- [ ] Backup strategy for database
- [ ] SSL certificates valid

---

## Support

For issues and feature requests, please create an issue in the GitHub repository.

---

*Documentation Version: 1.0*
*Last Updated: 2024*
