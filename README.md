# Kamino
**IN DEVELOPMENT**

Productivity Web App

## Getting Started (local)

### Setup Environment Variables

Set up the necessary environment variables by adding the following lines to your environment configuration file:

```plaintext
CONVEX_DEPLOYMENT =
NEXT_PUBLIC_CONVEX_URL =
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
CLERK_SECRET_KEY =
EDGE_STORE_ACCESS_KEY =
EDGE_STORE_SECRET_KEY =
```

### Run
Run both backend and frontend on seperate terminals
```bash
npx convex dev
npm run dev
```

### Web App

Navigate to [http://localhost:3000/](http://localhost:3000/) in your web browser to access the application interface

## Technologies Used
### User Interface
- [Lucide](https://lucide.dev/) (Icons)
- [shadcn-ui](https://ui.shadcn.com/) (Style)
- [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- [BlockNote](https://www.blocknotejs.org/docs) (Text editor)

### Frontend
- [React](https://react.dev/) + [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Convex](https://www.convex.dev/) (Realtime database)
- [Edge Store](https://edgestore.dev/) (Image storage - 1GB free)

### Authentication
- [Clerk](https://clerk.com/) (10,000 users free)
