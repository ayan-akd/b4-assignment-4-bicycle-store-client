# Pedal Paradise Frontend

A modern, responsive web application built using  **React**, **Redux**, **TypeScript**, **Ant Design**, and **Tailwind CSS**. This frontend application provides an intuitive interface for the Pedal Paradise bicycle store, featuring a robust shopping experience and comprehensive admin dashboard.

## 🌐 Live Demo

- Frontend: [Pedal Paradise Frontend](https://pedal-paradise-client.vercel.app/)
- Backend API: [Pedal Paradise API](https://pedal-paradise-server.vercel.app)

## 🔑 Demo Credentials

To explore the admin features, you can use these demo credentials:

```
Email: admin@mail.com
Password: admin123
```

**Note:** This is a demo account. Please be mindful when testing the admin features.

## 📋 Features

- **Authentication System**

  - JWT-based authentication with secure token management
  - Protected routes based on user roles (Admin/Customer)
  - Persistent login state using Redux Persist

- **Shopping Experience**

  - Interactive product catalog
  - Secure checkout process
  - Secure SSL payment gateway integration
  - Payment status tracking
  - Order history and tracking system

- **Payment Features**
  - Secure payment gateway integration
  - Multiple payment methods
  - Payment verification system
  - Transaction history
  - Automatic order updates

- **User Dashboard**

  - Order history
  - Profile management
  - Password change functionality

- **Admin Features**
  - Sales analytics with Ant Design Charts
  - Order and payment management system
  - Transaction history tracking
  - Product inventory management
  - User management interface

## 🛠️ Tech Stack

- **Core**

  - Vite 6.0
  - React 18.3
  - TypeScript 5.6
  - React Router DOM 7.1

- **State Management**

  - Redux Toolkit
  - RTK Query
  - Redux Persist

- **UI Components**

  - Ant Design
  - Radix UI Primitives
  - Ant Design Charts
  - Tailwind CSS
  - Framer Motion
  - Lucide React Icons
  - React Icons

- **Form Handling**

  - React Hook Form
  - Zod validation
  - Hookform Resolvers

- **Development Tools**
  - ESLint
  - TypeScript ESLint
  - Autoprefixer
  - PostCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (>=14.x.x)
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayan-akd/b4-assignment-4-bicycle-store-client.git
   ```

2. Install dependencies:

   ```bash
   cd b4-assignment-4-bicycle-store-client
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   ├── layouts/          # Layout components
│   └── features/         # Feature-specific components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── pages/                # Page components
├── services/            # API services
├── store/               # Redux store
│   ├── api/             # RTK Query API slices
│   └── features/        # Redux slices
├── types/               # TypeScript types
└── utils/               # Helper functions
```

## 🔐 Authentication

The application uses JWT-based authentication with token persistence. Protected routes are implemented using React Router and Redux state management.

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Class Variance Authority for component variants
- Tailwind Animate for animations

## 🌐 API Integration

- RTK Query for data fetching and caching
- Type-safe API calls with TypeScript

## 💳 Payment Integration

- Secure payment gateway with ShurjoPay
- Real-time payment status verification
- Payment history tracking
- Multiple payment method support
- Automatic order status updates after payment

## 📱 Responsive Design

- Mobile-first approach
- Responsive layouts for all screen sizes
- Touch-friendly interface elements

## 🔄 State Management

- Redux Toolkit for global state
- RTK Query for server state
- Redux Persist for state persistence
- Local state with React hooks

## 🧪 Code Quality

- ESLint for code linting
- TypeScript for type safety
- Consistent code formatting
- Modern React best practices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Pedal Paradise Backend](https://github.com/ayan-akd/b4-assignment-4-bicycle-store-server)

## 🙏 Acknowledgments

- Thanks to all the open-source libraries and tools used in this project
- Special thanks to the React and Vite communities
- Ant Design team for their excellent component library
- Radix UI team for their accessible primitives

For more information about the technologies used, please refer to their respective documentation:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [Radix UI](https://www.radix-ui.com/)
