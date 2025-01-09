# Full Stack Social Media App Using Nextjs
This repository contains a full-stack social media application built using Next.js, Prisma, and MySQL. The app offers a modern and dynamic user experience, enabling seamless interaction through features like posts, likes, comments, and social connections. It leverages server actions for enhanced performance and scalability.




# Features
 
## User Authentication and Profiles:
- Secure user authentication with Clerk.js.
- Editable user profiles, including fields like name, avatar, cover, description, and city.


## Social Interactions:
- Follow/unfollow users and manage follow requests.
- Block and unblock users.
- View and respond to follow requests.


## Content Sharing:
- Create posts with optional images.
- Add comments to posts.
- Like/unlike posts and comments.

## Stories Feature:
- Upload temporary stories that expire after 24 hours.

## Efficient Rendering:
- Use Suspense for better rendering of asynchronous components.
- Reactively update UI with useOptimistic hook for a smooth user experience.
- Enhance form handling with useFormStatus hook for managing submission states.
- Use server actions to process interactions like posting, liking, commenting, and following directly on the server for optimized performance.

  
#  Demo


# Technologies Used

## Front-End:
 -  Next.js  with App Router for server actions and dynamic routing.
 -  React for building a responsive user interface and use react fetures like hooks in client side and handle intreractions .


## Back-End:
- Prisma ORM for interacting with a MySQL database.
- Server-side data fetching and actions for efficient performance.


## Database:
 - MySQL as the relational database.


## Validation:
 - Zod for input validation to ensure data integrity.


## Additional Tools:
- svix webhook service library for managing webhooks in an application
- Clerk.js for authentication.
- Tailwind CSS for styling.
- React Suspense, useOptimistic hook,
- and useFormStatus hook for advanced client-side interactions.


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
