# Aguadulce-Assessment
This repository contains a backend service for interacting with an auction smart contract deployed on the Ethereum blockchain using a node provider like Alchemy or Infura. The service should provide RESTful APIs for managing and querying data related to a single auction contract.

## Key Features:
- User Authentication: Implement user authentication using JSON Web Tokens (JWT). Users should be able to register, login, and logout.
- Auction Operations: The logged-in user should be able to access endpoints for
  - Auction Status: retrieve details of the auction (e.g., current highest bid, auction status)
  - Auction History: List of all bids so far
  - Submit a Bid: Allow a user to submit a bid in a secure manner
  - Show an error message when the submitted bid amount is less than the highest bid amount
  - Statistics: Show the total number of bids made and total ETH volume
- Added 1 complete unit and 1 integration test
- Implement an endpoint to deploy a new auction smart contract with parameters being the end time and the beneficiary wallet address.

## Technology Stack
 ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
 ![Node JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) 
## Environment Setup
| Tools/Technologies | Version Used |
| --- | --- |
| MySQL DB | 8.0.0 |
| Node JS | 16.17.0 |
| Express JS | 4.18.2 |

## Local Machine Setup
- Open Terminal and type
  ```
  git clone https://github.com/wajeehamushtaq/Aguadulce-assessment.git
  ```
### For Backend setup
- 
  ```
  cd backend
  ```
- Inside the backend folder, create `.env` file then copy and paste the envs from `.env.example` file into it
- Setup mysql database locally
- Install dependencies
  ```
  npm install
  ```
- Run Server
  ```
  npm run dev
  ```
- To run test cases
  ```
  npm run test
  ```
