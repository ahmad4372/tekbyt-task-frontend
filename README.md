# TekByte Task 1 - Frontend

This is a modern, high-performance frontend application built with Next.js for the TekByte technical task. It connects to a headless WordPress backend using GraphQL to deliver a seamless user experience.

## 🏗️ Architecture

The project follows a modern headless architecture:

- **Framework**: [Next.js 16.1 (App Router)](https://nextjs.org/) - Utilizing React 19 features like Server Components and optimized rendering.
- **Backend**: Headless WordPress - Serves as the Content Management System (CMS).
- **API Layer**: [GraphQL](https://graphql.org/) - Efficient data fetching via `WPGraphQL`.
- **Data Fetching**: Custom `fetchGraphQL` utility residing in `lib/graphql.js`, supporting both public and authenticated requests (for draft previews).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first styling for rapid development and maintainable design systems.
- **Error Handling**: Centralized error management using global Error Boundaries (`app/error.tsx`) and dynamic Toast notifications.

## 🛠️ Key Decisions

1.  **App Router & Server Components**: We prioritized Server Components to minimize client-side JavaScript, improving Initial Page Load (IPL) and SEO.
2.  **GraphQL for WordPress**: Chose GraphQL over the REST API to avoid over-fetching and to allow more complex data requirements in a single request.
3.  **Draft Preview System**: Implemented a secure preview system using Next.js `draftMode` and WordPress Application Passwords, allowing editors to see content before it's published.
4.  **Utility-First Styling**: Tailwind CSS 4 was selected for its performance optimizations and simplicity in creating responsive, accessible UI components.
5.  **Robust Error Boundaries**: Implemented a global `error.tsx` to ensure the application remains stable even if individual API requests fail.

## 🚀 How to Run Locally

Follow these steps to set up the project on your local machine:

### 1. Prerequisites

- **Node.js** (v18.17.0 or higher)
- **npm** (or yarn/pnpm)

### 2. Setup

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following configuration:

```env
# WordPress GraphQL Endpoint
WP_URL=https://your-wordpress-site.com/graphql

# WordPress Credentials (for draft previews)
WP_USER=your_username
WP_APP_PASSWORD=your_application_password

# Preview Secret
HEADLESS_SECRET=your_secret_token
```

### 4. Run Development Server

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### 5. Production Build

To test the production build locally:

```bash
npm run build
npm start
```
