# Personal Finance Management System

- The Personal Finance Management System is a comprehensive API for managing users, categories, budgets, transactions, and financial reports. It offers secure authentication, robust data handling, and currency conversion features to help users effectively track and manage their personal finances.


## Table of Contents

- [Prerequisites](#prerequistes)

- [Installation](#installation)

- [Environment Variables](#environment-variable)

- [Usage](#usage)

- [API Endpoints](#api-endpoints)

- [Prisma Schema](#prisma-schema)
- [Deployed Link](#deployed-link)

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB
- Prisma

### Installation

- Clone the repository:


            git clone https://github.com/yourusername/expense-tracker-api.git
            cd expense-tracker-api
- Install the dependencies:


       npm install

- Generate the Prisma client:


            npx prisma generate

### Environment Variables
- Create a .env file in the root of the project and add the following environment variables:

            DATABASE_URL=mongodb+srv://manoj:manoj@cluster0.gf9pf1i.mongodb.net/kaptive
            JWT_SECRET="secret"
            API_KEY="695b50c8460d2f8c18490a02"
            PORT=4500
### Usage
- Start the server:


                npm run server 

- The server will start on the port specified in the .env file.

### API Endpoints
`User Routes`

##### Register a new user

- Method : POST
- Endpoint : /users/register
- Request Body:


            {
            "email": "manojsfstm5@gmail.com",
            "name": "Manoj kumar",
            "password": "23456"
            }
#### Login a user


- Method : POST
- Endpoint : /users/login
Request Body:


        {
        "email": "user@example.com",
        "password": "password"
        }

`Category Routes`

#### Add a new category

- Method : POST
- Endpoint : /categories/add
- Request Body:

           
            {
            "name": "Category Name"
            }
#### Get all categories

- Method : GET
- Endpoint: /categories/all
- Response :

            [
            {
                "id": "6655348713f82b084ba29947",
                "name": "Electronic"
            },
            {
                "id": "6655357f4729788962020fe4",
                "name": "Electronic"
            },
            {
                "id": "6655827d72202fa6ba0079ba",
                "name": "rent"
            },
            {
                "id": "6655ba3a61af99a9ebdca380",
                "name": "plumber"
            }
            ]
       

#### Update a category

- Method : PUT
- Endpoint :  /categories/edit/:id
- Request Body:


        {
        "name": "New Category Name"
        }
#### Delete a category
- Method : DELETE
- Endpoint : /categories/remove/:id
- Response : Category deleted successfully

`Budget Routes`

#### Add a new budget

- Method : POST
- Endpoint : /budgets/add
- Request Body:


        {
        "amount": 1000,
        "month": 5,
        "year": 2024
        }
#### Get all budgets
- Method : GET

- Endpoint :/budgets/all
- Response : 

             [
        {
            "id": "665571d4592e499efa258165",
            "amount": 300,
            "month": 3,
            "year": 2024,
            "userId": "66556b254e4169eb31428339"
        },
        {
            "id": "6655ba6d61af99a9ebdca382",
            "amount": 600,
            "month": 5,
            "year": 2024,
            "userId": "66556b254e4169eb31428339"
        }
        ]
        

#### Update a budget
- Method : PUT

- Endpoint : /budgets/edit/:id
- Request Body:

            {
            "amount": 1200,
            "month": 6,
            "year": 2024
            }
- Response : Budget updated successfully    

#### Delete a budget
- Method : DELETE

- Endpoint : /budgets/remove/:id
- Response : Budget deleted successfully  

`Transaction Routes`

#### Add a new transaction

- Method : POST

- Endpoint : /transactions/add
- Request Body:


            {
            "amount":1000,
            "type":"expense",
            "categoryId":"6655ba3a61af99a9ebdca380"
            }
- Response : Transaction created successfully

### Get all transactions

- Method : GET

- Endpoint : /transactions/all
- Response : 

                [
        {
            "id": "6655747ee8affdfbe3b901d8",
            "type": "expense",
            "amount": 300,
            "date": "2024-05-28T06:06:53.085Z",
            "categoryId": "6655827d72202fa6ba0079ba",
            "userId": "66556b254e4169eb31428339",
            "category": {
            "id": "6655827d72202fa6ba0079ba",
            "name": "rent"
            }
        },
        {
            "id": "6655831872202fa6ba0079bd",
            "type": "income",
            "amount": 500,
            "date": "2024-05-28T07:09:12.436Z",
            "categoryId": "6655357f4729788962020fe4",
            "userId": "66556b254e4169eb31428339",
            "category": {
            "id": "6655357f4729788962020fe4",
            "name": "Electronic"
            }
        },
        {
            "id": "6655bb1861af99a9ebdca385",
            "type": "expense",
            "amount": 1000,
            "date": "2024-05-28T11:08:08.528Z",
            "categoryId": "6655ba3a61af99a9ebdca380",
            "userId": "66556b254e4169eb31428339",
            "category": {
            "id": "6655ba3a61af99a9ebdca380",
            "name": "plumber"
            }
        }
        ]

#### Update a transaction

- Method : PUT

- Endpoint : /transactions/edit/:id
- Request Body:


            {
            "amount": 250,
            "type": "income",
            "categoryId": "category_id"
            }
- Response : Transaction update successfully

#### Delete a transaction

- Method : DELETE

- Endpoint : /transactions/remove/:id
- Response : Transaction deleted successfully

`Report Routes`

#### Get category-wise report

- Method : GET

- Endpoint : /reports/categoryWise
- Response : 

            {
  "rent": {
    "income": 0,
    "expense": 300
  },
  "Electronic": {
    "income": 500,
    "expense": 0
  },
  "plumber": {
    "income": 0,
    "expense": 1000
  }
}


#### Get monthly transactions

- Method : GET

- Endpoint : /reports/monthly?month=5&year=2024
- Response :
                {
            "total": 1800,
            "categories": {
                "rent": 300,
                "Electronic": 500,
                "plumber": 1000
            }
            }
        
`Currency Conversion Route`
#### Convert currency

- Method : GET
- Endpoint : /currency/convert?from=USD&to=EUR&amount=100
- Response : 

        {
        "from": "INR",
        "to": "USD",
        "amount": "100",
        "convertedAmount": 1.203
        }

### Prisma Schema
- This is the Prisma schema used for the database models:

        generator client {
        provider = "prisma-client-js"
        }

        datasource db {
        provider = "mongodb"
        url      = env("DATABASE_URL")
        }

        model User {
        id          String       @id @default(auto()) @map("_id") @db.ObjectId
        email       String       @unique
        password    String
        name        String
        transactions Transaction[]
        budgets     Budget[]
        }

        model Transaction {
        id          String       @id @default(auto()) @map("_id") @db.ObjectId
        type        String
        amount      Float
        date        DateTime     @default(now())
        categoryId  String       @db.ObjectId
        userId      String       @db.ObjectId
        user        User         @relation(fields: [userId], references: [id])
        category    Category     @relation(fields: [categoryId], references: [id])
        }

        model Category {
        id           String        @id @default(auto()) @map("_id") @db.ObjectId
        name         String
        transactions Transaction[]
        }

        model Budget {
        id           String   @id @default(auto()) @map("_id") @db.ObjectId
        amount       Float
        month        Int
        year         Int
        userId       String   @db.ObjectId
        user         User     @relation(fields: [userId], references: [id])
        }

        enum TransactionType {
        income
        expense
        }

### Deployed Link

[Live](https://kaptive-ujn1.onrender.com/)