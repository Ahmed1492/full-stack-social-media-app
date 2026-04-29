# Connectly — Social Network

A full-stack social media application built with **Next.js 15**, **Prisma**, **Clerk**, and **Tailwind CSS**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | PostgreSQL via Neon (serverless) |
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

### Auth
- Sign up / sign in via Clerk (Google OAuth + email)
- Protected routes — all pages require authentication
- Auto-sync user profile from Clerk on login

### Feed
- Create posts with text and images (drag & drop, max 5MB validation)
- Like, comment, edit and delete posts
- Skeleton loading state after posting
- Post detail page — open any post directly via `/post/[id]`
- Post modal — click image to open fullscreen with comments

### Stories
- Upload 24h stories with image upload to Cloudinary
- Instagram-style fullscreen viewer with progress bars and auto-advance
- Dedicated `/stories` page with grid layout
- Keyboard navigation (arrow keys, Escape)

### Profile
- Cover photo (gradient fallback when none set) and avatar
- Editable bio, city, school, work, website
- Clickable stats — Posts / Followers / Following open a modal with real lists
- Media grid with lightbox viewer

### Friends
- Follow / unfollow with request system
- Accept / decline friend requests with optimistic UI
- Real friends page — Mutual Friends, Following, Followers sections
- Block / unblock users

### Messages (real-time style)
- Full conversation system stored in database
- Start new conversations from people you follow
- Optimistic message sending with read receipts (✓ / ✓✓)
- Message button on every profile
- Conversations sorted by latest activity

### Notifications (real)
- Bell popup in navbar — fetches fresh data on every open
- Polls every 30 seconds for badge count updates
- Triggered by: likes, comments, follow requests, follow accepts, messages
- Smart routing — each notification type goes to the right page:
  - Like / Comment → `/post/[id]` (the exact post)
  - Friend Request → `/friends`
  - Message → `/messages?conv=[id]` (the exact conversation)
  - Follow Accept → sender's profile

### Search
- Real-time user search in navbar
- Full search page

### Other
- Responsive layout with mobile hamburger menu
- Smooth animations — slide-up, fade-in, scale-in, shimmer skeletons
- Explore pages — Marketplace, Events, Groups, Videos
- Settings page

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
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

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

## 🗄️ Database Schema

| Model | Description |
|---|---|
| `User` | Profile, avatar, cover, bio fields |
| `Post` | Text + optional image, belongs to user |
| `Comment` | Belongs to post + user |
| `Like` | Polymorphic — on posts or comments |
| `Follower` | Follow relationship between users |
| `FollowerRequest` | Pending follow requests |
| `Block` | Block relationship |
| `Story` | 24h expiring image stories |
| `Notification` | Like, comment, follow, message events |
| `Conversation` | Message thread between two users |
| `ConversationParticipant` | Join table for conversations |
| `Message` | Individual message in a conversation |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env`
4. Deploy — Vercel runs `prisma generate && next build` automatically

### After deploy — update Clerk webhook

- Clerk Dashboard → Webhooks → edit endpoint URL
- Set to: `https://your-app.vercel.app/api/webhooks/clerk`
- Subscribe to: `user.created`, `user.updated`, `user.deleted`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home feed
│   ├── post/[postId]/            # Single post page
│   ├── profile/[username]/       # User profile
│   ├── friends/                  # Friends + requests
│   ├── messages/                 # Conversations + chat
│   ├── notifications/            # Notification history
│   ├── stories/                  # Stories grid page
│   ├── search/                   # User search
│   ├── settings/                 # Account settings
│   ├── marketplace/              # Marketplace
│   ├── events/                   # Events
│   ├── groups/                   # Groups
│   ├── videos/                   # Videos
│   └── api/webhooks/clerk/       # Clerk webhook handler
├── components/
│   ├── feed/                     # Post, Feed, Comments, PostModal, Skeleton
│   ├── leftMenue/                # Sidebar with real badge counts
│   ├── rightMenue/               # User info, media, friend requests
│   ├── messages/                 # MessagesClient chat UI
│   ├── NotificationPopup.jsx     # Navbar bell with live polling
│   ├── ProfileStats.jsx          # Clickable stats with modal
│   ├── ProfileStatsModal.jsx     # Posts/Followers/Following modal
│   ├── FriendRequestButtons.jsx  # Accept/decline with optimistic UI
│   ├── Stories.jsx               # Stories strip on home
│   ├── StoryList.jsx             # Story circles + upload
│   ├── OpenedStory.jsx           # Fullscreen story viewer
│   └── ...
└── lib/
    ├── actions.ts                # All server actions
    └── client.ts                 # Prisma singleton client
```

---

## 🔮 Roadmap

- [ ] Real-time messaging with WebSockets / Server-Sent Events
- [ ] Push notifications (browser)
- [ ] Dark mode
- [ ] Video upload support
- [ ] Mobile app (React Native)

---

© 2026 **Connectly** — Built by **Ahmed Mohamed**. All rights reserved.
