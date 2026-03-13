# 📱 Subscription Manager

A privacy-first, modern web application built with React to help you track and manage your recurring subscriptions.

![Subscription Manager Preview](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80)

## Demo

[Open the live demo on GitHub Pages](https://marcinkgit1.github.io/subscription_manager/)

## ✨ Features

- **Privacy First**: No backend, no databases, no tracking. All your data is stored strictly in your browser's `localStorage`. Your data never leaves your device.
- **Multi-language Support**: Fully translated into English and Polish.
- **Dark/Light Mode**: Automatic theme switching based on your system preferences, with a manual override toggle.
- **Dashboard & Analytics**: Visual summary of your monthly and yearly expenses.
- **Payment Reminders**: Visual indicators for upcoming payments (normal, warning, urgent, overdue).
- **Responsive Design**: Works flawlessly on desktops, tablets, and smartphones.

## 🛠️ Tech Stack

- **Framework**: [React 18+](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with persist middleware)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **i18n**: [react-i18next](https://react.i18next.com/)

## 🚀 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have Node.js installed on your computer.

- Download and install [Node.js](https://nodejs.org/) (version 18 or higher is recommended).

### Installation

1. **Clone the repository** (or download and extract the ZIP file):

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   cd YOUR_REPOSITORY_NAME
   ```

2. **Install dependencies**:
   Open your terminal in the project folder and run:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open the app**:
   Open your browser and navigate to the local address shown in your terminal (usually `http://localhost:5173` or `http://localhost:3000`).

## 📦 Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

This will generate a `dist` folder containing the compiled HTML, CSS, and JavaScript files. You can host this folder on any static hosting service like Vercel, Netlify, or GitHub Pages.

To preview the production build locally:

```bash
npm run preview
```

## 🔒 Privacy & Security

This application is completely serverless. It does not communicate with any external APIs to store your subscription data. Everything you input is saved securely in your browser's local storage. Clearing your browser data will result in the loss of your saved subscriptions.

---

_Built with ❤️ for a modern frontend portfolio._
