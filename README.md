# Rule Engine with AST

This project is a rule engine that allows users to create, modify, and evaluate rules based on conditions like age, department, salary, etc. The engine uses an Abstract Syntax Tree (AST) to represent rules, providing dynamic rule creation, combination, and evaluation.


## Technology Stack

- **Frontend**: React + vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

### Features
- **Create Rules**  
  Users can write rules using conditions such as:
  - `age > 30 AND department = 'Sales'`
  - `(age < 25 AND salary > 50000)`  
  The rules are parsed and converted into an **AST** for efficient evaluation.

- **Combine Multiple Rules**  
  Users can combine multiple rules into one using logical operators like **AND** and **OR**.  
  Example:  
  - `((age > 30 AND department = 'Sales') OR (age < 25)) AND (salary > 50000)`

- **Evaluate Rules**  
  Once the rules are created, users can provide data to evaluate them.  
  Example:  
  - **Input Data**: `{ age: 35, department: 'Sales', salary: 60000 }`  
  The engine will return `True` or `False` based on the rule evaluation.

- **Update Rules**  
  Modify any part of an existing rule (conditions, operators) and the AST will automatically update.
  

## Deployment
  - The application is deployed at: [https://rule-engine-with-ast-ten.vercel.app/](https://rule-engine-with-ast-ten.vercel.app/)

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/PAVAN28GIT/Rule-Engine-with-AST.git
   cd Rule-Engine-with-AST
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **create .env.development files**
   
   ```sh
   VITE_API_URL=http://localhost:8000  # paste this inside .env.development file
   ```

5. **Run the development server in both frontend and backend folder**
   ```sh
   npm run dev # in both frontend and backend folders
   ```
6. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```


## ScreenShots

<img width="1440" alt="Screenshot 2024-10-24 at 2 40 24 PM" src="https://github.com/user-attachments/assets/60323912-c4f4-4878-a7ec-106d84647317">
<img width="1440" alt="Screenshot 2024-10-24 at 2 40 24 PM 1" src="https://github.com/user-attachments/assets/59524c5b-8da5-4b97-847e-9a1dcc28b0f6">
<img width="1440" alt="Screenshot 2024-10-24 at 2 38 28 PM 3" src="https://github.com/user-attachments/assets/02dd33c2-464c-4052-bb5e-4269f484f03a">
<img width="1440" alt="Screenshot 2024-10-24 at 2 41 08 PM" src="https://github.com/user-attachments/assets/acffee2a-702a-4302-ab1c-1942971a9608">
<img width="1440" alt="Screenshot 2024-10-24 at 2 41 14 PM" src="https://github.com/user-attachments/assets/0c88f9d8-315c-4654-982c-c652a629ec09">
<img width="1440" alt="Screenshot 2024-10-24 at 2 43 00 PM" src="https://github.com/user-attachments/assets/9993063e-65e2-48a3-b1fd-2750a24281ad">


