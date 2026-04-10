# Fish Journal

A full-stack fishing blog where users can write about their catches, share photos, and engage with the community through comments.

## Features

- **Authentication** — Sign up and log in via Clerk
- **Create Posts** — Rich text editor with image uploads for detailed fishing journal entries
- **Categories** — Filter posts by fishing category
- **Comments** — Comment on posts and delete your own comments
- **Bookmarks** — Save posts to read later
- **Search** — Find posts by keyword
- **Infinite Scroll** — Seamlessly browse all posts
- **Image Hosting** — Images managed through ImageKit

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- TanStack React Query
- React Router DOM v7
- React Quill (rich text editor)
- Clerk (auth)
- ImageKit React SDK

**Backend**
- Node.js + Express v5
- MongoDB + Mongoose
- Clerk (webhook sync)
- ImageKit SDK
- express-rate-limit
- Svix (webhook verification)

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance (local or Atlas)
- [Clerk](https://clerk.com) account
- [ImageKit](https://imagekit.io) account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/`:
   ```env
   MONGO=your_mongodb_connection_string
   IK_URL_ENDPOINT=https://ik.imagekit.io/your_id
   IK_PUBLIC_KEY=your_imagekit_public_key
   IK_PRIVATE_KEY=your_imagekit_private_key
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   CLIENT_URL=http://localhost:5173
   ```

3. Start the server:
   ```bash
   node index.js
   ```
   Server runs on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   npm install
   ```

2. Create a `.env` file in `client/`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_IK_URL_ENDPOINT=https://ik.imagekit.io/your_id
   VITE_IK_PUBLIC_KEY=your_imagekit_public_key
   VITE_API_URL=http://localhost:3000
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Project Structure

```
Fish_Journal_REVAMP/
├── backend/
│   ├── controllers/      # Route handler logic
│   ├── models/           # Mongoose schemas (User, Post, Comment)
│   ├── routes/           # Express route definitions
│   ├── rate_limit/       # Rate limiting configuration
│   ├── lib/              # Database connection
│   └── index.js          # Express app entry point
└── client/
    └── src/
        ├── components/   # Reusable UI components
        ├── routes/       # Page-level components
        ├── layouts/      # Layout wrappers
        └── types/        # TypeScript type definitions
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (paginated) |
| GET | `/api/posts/:slug` | Get a single post |
| POST | `/api/posts` | Create a post (auth required) |
| DELETE | `/api/posts/:id` | Delete a post (owner only) |
| GET | `/api/comments/:postId` | Get comments for a post |
| POST | `/api/comments/:postId` | Add a comment (auth required) |
| DELETE | `/api/comments/:id` | Delete a comment (owner only) |
| POST | `/api/users/save` | Save/unsave a post (auth required) |

## Notes

- Post creation and deletion are rate-limited (5 requests per 5 minutes)
- Images are sanitized with DOMPurify before rendering
- Clerk webhooks keep the local user database in sync with Clerk's user records
