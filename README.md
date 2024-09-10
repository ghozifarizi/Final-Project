# API Testing Instructions using Postman
This guide provides an overview of the API endpoints and their workflows, from registration to creating a transaction, and explains how to test each one using Postman.

## Prerequisites
- [ ] Node.js and npm installed
- [ ] MongoDB installed and running
- [ ] Postman installed
- [ ] Server running with the required endpoints implemented

## Step-by-Step Workflow in Postman

### 1. User Registration
Endpoint: POST /api/register
Description: This endpoint registers a new user in the system.

#### Steps in Postman:
- [ ] Open Postman, create a new POST request.
- [ ] Set the URL: [http://localhost:3000/api/register.](http://localhost:7000/digistar/user/register)
- [ ] Go to the Body tab, select raw, and choose JSON format.
- [ ] Add the request body as shown below.
- [ ] Request Body Example:

json
<br> {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password123"
}
Send the request and check for the response.
Expected Response:

json

Salin kode
{
    "username": "ghozi4",
    "email": "ghozi14@example.com",
    "password": "password123",
    "Address": "depok",
    "role":"Admin"
  
}</br>

### 2. User Login
Endpoint: POST /api/login
Description: This endpoint allows a user to log in and obtain a token for authenticated requests.

#### Steps in Postman:
- [ ] Create a new POST request.
- [ ] Set the URL: http://localhost:7000/digistar/user/login
- [ ] In the Body tab, add the login details.
- [ ] Request Body Example:

- json

{
  "email": "john.doe@example.com",
  "password": "Password123"
}
Send the request and copy the returned JWT token for future requests.
Expected Response:

- json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}

### 3. Create a Role
- [ ] Endpoint: POST /api/roles
- [ ] Description: This endpoint allows creating a new user role. Requires authentication.

#### Steps in Postman:
- [ ] Create a new POST request.
- [ ] Set the URL: http://localhost:7000/digistar/role
- [ ] In the Body tab, add the role data.
- [ ] Request Body Example:
 
 json
Salin kode
{
    "name": "Customer",
    "position": "Customer",
    "stacks": ["nodejs", "react"]
}
Send the request.
Expected Response:

- json
{
  "message": "Role created successfully",
  "role": {
    "id": "unique_role_id",
    "role_name": "Admin",
    "permissions": ["read", "write", "delete"]
  }
}

## 4. Create a Customer
- [ ] Endpoint: POST /api/customers
- [ ] Description: This endpoint allows creating a new customer. Requires authentication.

#### Steps in Postman:
- [ ] Create a new POST request.
- [ ] Set the URL: http://localhost:3000/api/customers.
- [ ] In the Headers tab, add Authorization and set it to Bearer <jwt_token>.
- [ ] In the Body tab, add the customer details.
- [ ] Request Body Example:

json
Salin kode
{
  "customer_id": "CUST123456",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": [
    {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip_code": "10001",
      "country": "USA"
    }
  ]
}
Send the request.
Expected Response:

json
Salin kode
{
  "message": "Customer created successfully",
  "customer": {
    "customer_id": "CUST123456",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": [
      {
      "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zip_code": "10001",
        "country": "USA"
      }
    ]
  }
}
### 5. Create a Transaction
- [ ] Endpoint: POST /api/transactions
- [ ] Description: This endpoint allows creating a transaction for a customer. Requires authentication.

#### Steps in Postman:
- [ ] Create a new POST request.
- [ ] Set the URL: http://localhost:3000/api/transactions.
- [ ] In the Headers tab, add Authorization and set it to Bearer <jwt_token>.
- [ ] In the Body tab, add the transaction details.
- [ ] Request Body Example:

json
Salin kode
{
  "transaction_id": "TXN123456",
  "customer_id": "CUST123456",
  "amount": 500,
  "transaction_date": "2024-09-10"
}
Send the request.
Expected Response:

json
Salin kode
{
  "message": "Transaction created successfully",
  "transaction": {
    "transaction_id": "TXN123456",
    "customer_id": "CUST123456",
    "amount": 500,
    "transaction_date": "2024-09-10"
  }
}

## Summary of Workflow
- [ ] Register a user using the /api/register endpoint.
- [ ] Log in with the registered user using /api/login to get a JWT token.
- [ ] Create a role using the /api/roles endpoint.
- [ ] Create a customer using the /api/customers endpoint.
- [ ] Create a transaction for the customer using the /api/transactions endpoint.
- [ ] Be sure to copy the JWT token from the login response and add it to the Authorization header of all subsequent requests.

