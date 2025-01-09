# Clothing eCommerce App
This repository contains the codebase for a full-stack social media application built using Next.js, Prisma, and MySQL. The app provides a seamless user experience for connecting with others, sharing content, and interacting in a dynamic social media environment. It incorporates server actions for improved performance and scalability.


## Features
 
- User Authentication and Profiles:
      Secure user authentication with Clerk.js.
      Editable user profiles, including fields like name, avatar, cover, description, city, and more.


- Social Interactions:
      Follow/unfollow users and manage follow requests.
      Block and unblock users.
      View and respond to follow requests.


- Content Sharing:
      Create posts with optional images.
      Add comments to posts.
      Like/unlike posts and comments.

- Stories Feature:
      Upload temporary stories that expire after 24 hours.


##  Demo


## Technologies Used

- Front-End:
      Next.js 13 with App Router for server actions and dynamic routing.
      React for building a responsive user interface.


- Back-End:
      Prisma ORM for interacting with a MySQL database.
      Server-side data fetching and actions for efficient performance.


- Database:
      MySQL as the relational database.


- Validation:
      Zod for input validation to ensure data integrity.


- Additional Tools:
      Clerk.js for authentication.
      Tailwind CSS for styling.



## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Ahmed1492/full-stack-social-media-app.git
    ```
2. Set up your .env file with the required DATABASE_URL and Clerk credentials
 
3. Run database migrations using Prisma:
bash:
    ```bash
   npx prisma migrate dev
    ```
4. Start the development server:
:
    ```bash
    npm run dev
    ```
