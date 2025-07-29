# Prediction Market API Documentation

## Overview

**Base URL**: `http://localhost:8001/api/v1/`

## Authentication

The API uses Token-based authentication for user-specific operations.

### User Registration

```http
POST /users/register/
Content-Type: application/json

{
    "username": "johndoe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "0x...",
    "country": "US",
    "password": "securepassword123",
    "password_confirm": "securepassword123"
}
```

**Response (201 Created):**
```json
{
    "user": {
        "id": 1,
        "username": "johndoe",
        "email": "john@example.com",
        "phone": "1234567890",
        "address": "0x234562345...",
        "country": "US",
        "cusd_balance": "0.00",
        "balances": {},
        "orders_count": 0,
        "active_orders_count": 0,
        "date_joined": "2025-06-29T16:30:00Z",
        "last_login": null
    },
    "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
    "message": "User created successfully"
}
```

### Using the Authentication Token

Include the token in the `Authorization` header for authenticated requests:

```http
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

## API Endpoints

### 📖 Public Endpoints (No Authentication Required)

#### Get All Categories
```http
GET /core/public/categories/
```
Returns all available categories.

#### Get Subcategories (optionally filtered by category)
```http
GET /core/public/subcategories/
GET /core/public/subcategories/?category_id=1
```

#### Get Events (optionally filtered by category or subcategory)
```http
GET /core/public/events/
GET /core/public/events/?category_id=1
GET /core/public/events/?subcategory_id=1
GET /core/public/events/?category_id=1&subcategory_id=2
```
**Note**: You can filter by `category_id`, `subcategory_id`, or both. When both are provided, events must match both criteria.

#### Get Outcomes for an Event
```http
GET /core/public/outcomes/?event_id=1
```

#### Get Homepage Data
```http
GET /core/public/homepage/
```
Returns trending events and featured categories for the homepage.

**Response:**
```json
{
    "trending_events": [
        {
            "id": 1,
            "name": "World Cup Final 2026",
            "description": "Predict the outcome of the 2026 World Cup Final",
            "category_name": "Sports",
            "start_date": "2026-07-15T20:00:00Z",
            "end_date": "2026-07-15T22:00:00Z",
            "outcomes_count": 3
        }
    ],
    "featured_categories": [
        {
            "id": 1,
            "name": "Sports",
            "description": "Sports-related predictions",
            "icon_url": "https://example.com/sports-icon.png",
            "events_count": 15
        }
    ]
}
```

### 🔐 Authenticated User Endpoints

#### User Profile Management

**Get User Profile:**
```http
GET /users/profile/
Authorization: Token YOUR_TOKEN_HERE
```

**Update User Profile:**
```http
PUT /users/profile/{user_id}/
Authorization: Token YOUR_TOKEN_HERE
Content-Type: application/json

{
    "address": "456 New Address St",
    "country": "CA"
}
```

**Update User Balance (from blockchain wallet):**
```http
PUT /users/profile/update_balance/
Authorization: Token YOUR_TOKEN_HERE
Content-Type: application/json

{
    "cusd_balance": "100.50",
    "balances": {
        "CUSD": "100.50",
        "cUSD": "100.50"
    }
}
```

#### User Statistics
```http
GET /users/stats/
Authorization: Token YOUR_TOKEN_HERE
```

**Response:**
```json
{
    "total_orders": 25,
    "active_orders": 5,
    "completed_orders": 18,
    "cancelled_orders": 2,
    "total_amount_placed": 1250.75,
    "cusd_balance": 100.50,
    "balances": {
        "CUSD": "100.50"
    },
    "member_since": "2025-01-15"
}
```

#### User Orders

**Get User's Orders:**
```http
GET /core/user/orders/
Authorization: Token YOUR_TOKEN_HERE
```

#### Order Management

**Place a New Order:**
```http
POST /core/user/order-management/
Authorization: Token YOUR_TOKEN_HERE
Content-Type: application/json

{
    "outcome": 1,
    "type": "back",
    "amount": "50.00",
    "price": "0.75"
}
```

**Cancel an Order:**
```http
POST /core/user/order-management/{order_id}/cancel/
Authorization: Token YOUR_TOKEN_HERE
```

**Close an Order:**
```http
POST /core/user/order-management/{order_id}/close/
Authorization: Token YOUR_TOKEN_HERE
```

#### Orderbook

**Get Orderbook for an Outcome:**
```http
GET /core/user/orderbook/{outcome_id}/
Authorization: Token YOUR_TOKEN_HERE
```

**Response:**
```json
{
    "outcome": {
        "id": 1,
        "name": "Team A Wins",
        "description": "Team A will win the match",
        "event_name": "Championship Final",
        "total_orders": 12
    },
    "orders": [
        {
            "id": 1,
            "user_email": "user@example.com",
            "type": "back",
            "amount": "25.00",
            "price": "0.80",
            "status": "active",
            "started_timestamp": "2025-06-29T15:30:00Z"
        }
    ]
}
```

### 👑 Admin Endpoints (Staff Users Only)

#### Category Management
```http
GET /core/admin/categories/
POST /core/admin/categories/
PUT /core/admin/categories/{category_id}/
DELETE /core/admin/categories/{category_id}/
```

#### Event Management
```http
GET /core/admin/events/
GET /core/admin/events/?category_id=1
GET /core/admin/events/?subcategory_id=1
POST /core/admin/events/
PUT /core/admin/events/{event_id}/
DELETE /core/admin/events/{event_id}/
```

#### Outcome Management
```http
GET /core/admin/outcomes/
POST /core/admin/outcomes/
PUT /core/admin/outcomes/{outcome_id}/
DELETE /core/admin/outcomes/{outcome_id}/
```

#### User Management
```http
GET /users/admin/users/
GET /users/admin/users/?email=john@example.com
GET /users/admin/users/?username=johndoe
```

#### Order Management (Admin View)
```http
GET /core/admin/orders/
```

## Data Models

### User
```typescript
interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    cusd_balance: string;
    balances: Record<string, string>;
    date_joined: string;
    last_login: string | null;
}
```

### Category
```typescript
interface Category {
    id: number;
    name: string;
    description: string;
    icon_url: string;
    created_at: string;
    updated_at: string;
}
```

### Event
```typescript
interface Event {
    id: number;
    name: string;
    description: string;
    subcategory: number;
    subcategory_name: string;
    category_name: string;
    type: "multi-outcome" | "single-outcome";
    start_date: string;
    end_date: string;
    outcomes_count: number;
    created_at: string;
    updated_at: string;
}
```

### Outcome
```typescript
interface Outcome {
    id: number;
    event: number;
    event_name: string;
    name: string;
    description: string;
    total_orders: number;
    created_timestamp: string;
    updated_timestamp: string;
}
```

### Order
```typescript
interface Order {
    id: number;
    user: number;
    outcome: number;
    outcome_name: string;
    event_name: string;
    type: "limit" | "market";
    amount: string;
    price: string;
    potential_profit: string;
    status: "pending" | "active" | "completed" | "cancelled" | "closed";
    started_timestamp: string;
    completed_timestamp: string | null;
}
```

## Error Handling

### HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Response Format
```json
{
    "error": "Error message describing what went wrong",
    "details": {
        "field_name": ["Field-specific error message"]
    }
}
```

## Frontend Integration Examples

### React/JavaScript Example

```javascript
// Authentication service
class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:8001/api/v1';
        this.token = localStorage.getItem('token');
    }

    async register(userData) {
        const response = await fetch(`${this.baseURL}/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            const data = await response.json();
            this.token = data.token;
            localStorage.setItem('token', data.token);
            return data;
        }
        throw new Error('Registration failed');
    }

    getAuthHeader() {
        return this.token ? { 'Authorization': `Token ${this.token}` } : {};
    }
}

// API service
class PredictionMarketAPI {
    constructor(authService) {
        this.baseURL = 'http://localhost:8001/api/v1';
        this.auth = authService;
    }

    async getHomepage() {
        const response = await fetch(`${this.baseURL}/core/public/homepage/`);
        return response.json();
    }

    async getCategories() {
        const response = await fetch(`${this.baseURL}/core/public/categories/`);
        return response.json();
    }

    async getEvents(filters = {}) {
        const params = new URLSearchParams();
        if (filters.category_id) params.append('category_id', filters.category_id);
        if (filters.subcategory_id) params.append('subcategory_id', filters.subcategory_id);
        
        const url = `${this.baseURL}/core/public/events/${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);
        return response.json();
    }

    async getUserOrders() {
        const response = await fetch(`${this.baseURL}/core/user/orders/`, {
            headers: this.auth.getAuthHeader()
        });
        return response.json();
    }

    async placeOrder(orderData) {
        const response = await fetch(`${this.baseURL}/core/user/order-management/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.auth.getAuthHeader()
            },
            body: JSON.stringify(orderData)
        });
        return response.json();
    }
}
```

## Permission Levels Summary

1. **Public** - No authentication required
   - View categories, events, outcomes
   - Homepage data
   - User registration

2. **Authenticated Users** - Token required
   - Manage profile and balance
   - View and place orders
   - Access orderbook
   - View user statistics

3. **Admin Users** - Staff privileges required
   - Full CRUD operations on categories, events, outcomes
   - View all users and orders
   - Administrative management

## Rate Limiting & Best Practices

- **Caching**: Cache public data (categories, events) on the frontend
- **Error Handling**: Always handle network errors and display user-friendly messages
- **Token Management**: Store tokens securely and handle token expiration
- **Data Validation**: Validate data on the frontend before sending requests
- **Loading States**: Show loading indicators during API calls

## Testing the API

You can test the API using tools like:
- **Postman** - Import the endpoints and test manually
- **curl** - Command line testing
- **Browser DevTools** - Network tab for debugging

Example curl command:
```bash
curl -X GET "http://localhost:8001/api/v1/core/public/homepage/" \
     -H "Content-Type: application/json"
```

For authenticated requests:
```bash
curl -X GET "http://localhost:8001/api/v1/users/profile/" \
     -H "Authorization: Token YOUR_TOKEN_HERE" \
     -H "Content-Type: application/json"
``` 