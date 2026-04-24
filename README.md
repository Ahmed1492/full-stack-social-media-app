# Connectly — Social Network

A full-stack social media application built with **Next.js 15**, **Prisma**, **Clerk**, and **Tailwind CSS**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | MySQL via Aiven (hosted) |
| ORM | Prisma 6 |
| Auth | Clerk |
| Styling | Tailwind CSS v3 |
| Image Upload | Cloudinary |
| Deployment | Vercel |

---


## 🚀 Live Demo  

[![Live Demo](https://img.shields.io/badge/View%20Live-Vercel-blue?style=for-the-badge&logo=vercel)](https://full-stack-social-media-app-nu.vercel.app/)

---

## 🎥 Recorded Demo  

[![Recorded Demo](https://img.shields.io/badge/Watch%20Demo-LinkedIn-green?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/posts/ahmed-mohamed-8a8619259_excited-to-share-my-latest-project-ugcPost-7284176430408622080-Ev9M?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-hKsAB1QXZ1eSyBx8nGWP48RuYiBX5Bdg)




---




## ✨ Features

- **Authentication** — Sign up / sign in via Clerk (Google OAuth + email)
- **Feed** — Create posts with text and images, like, comment, delete
- **Stories** — Upload and view 24h stories with Instagram-style viewer
- **Profile** — Cover photo, avatar, bio, stats, media grid with lightbox
- **Friends** — Follow/unfollow, friend requests, block users
- **Messages** — Conversations UI (mock data)
- **Notifications** — Activity feed (mock data)
- **Search** — Real-time user search + full search page
- **Explore** — Marketplace, Events, Groups, Videos pages
- **Settings** — Account preferences, privacy toggles
- **Responsive** — Mobile-friendly with hamburger menu
- **Animations** — Slide-up, fade-in, scale-in, shimmer skeletons
- **Post Modal** — Click image to open full post with comments
- **Media Lightbox** — Click profile media grid to open fullscreen viewer

---

## 🛠️ Local Development

### 1. Clone & install

```bash
git clone <your-repo-url>
cd next-social-starter
npm install
```

### 2. Environment variables

Create a `.env` file:

```env
# Database (Aiven MySQL)
DATABASE_URL="mysql://user:password@host:port/social?ssl-mode=REQUIRED"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
SIGNING_SECRET=whsec_...
WEBHOOK_SECRET=whsec_...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Push database schema

```bash
npx prisma db push
```

### 4. Run dev server

```bash
npm run dev
```

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env`
4. Deploy — Vercel runs `prisma generate && next build` automatically

### After deploy — update Clerk webhook

- Clerk Dashboard → Webhooks → edit endpoint URL
- Change from ngrok URL to: `https://your-app.vercel.app/api/webhooks/clerk`
- Subscribe to: `user.created`, `user.updated`, `user.deleted`

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home feed
│   ├── profile/[username]/ # User profile
│   ├── friends/            # Friends page
│   ├── messages/           # Messages
│   ├── notifications/      # Notifications
│   ├── search/             # Search
│   ├── settings/           # Settings
│   ├── marketplace/        # Marketplace
│   ├── events/             # Events
│   ├── groups/             # Groups
│   ├── videos/             # Videos
│   └── api/webhooks/clerk/ # Clerk webhook handler
├── components/
│   ├── feed/               # Post, Feed, Comments, PostModal
│   ├── leftMenue/          # Sidebar navigation
│   ├── rightMenue/         # User info, media, friend requests
│   └── ...                 # Navbar, Stories, AddPost, etc.
└── lib/
    ├── actions.ts          # Server actions
    └── client.ts           # Prisma client
```

---

## 🔮 Roadmap

- [ ] Dark mode (commented out, to be rebuilt)
- [ ] Real-time messaging with WebSockets
- [ ] Push notifications
- [ ] Video upload support
- [ ] Mobile app (React Native)

---

© 2026 **Connectly** — Built by **Ahmed Mohamed**. All rights reserved.


- Dark mode is currently **disabled** (code is commented out, will be rebuilt with a better implementation)
- Mock data is used for: Messages, Notifications, Events, Groups, Marketplace, Videos, Online Friends
- Webhook requires ngrok for local development or a deployed URL for production
