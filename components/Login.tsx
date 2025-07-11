
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-gray-800 p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
      <p className="text-center text-gray-400 mb-8">Sign in to access your collection</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
        >
          Sign In
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-6 text-center">
        <strong>Note:</strong> This is a simplified sign-in for demonstration. Your video list is stored locally in this browser, not in a cloud database.
      </p>
    </div>
  );
};

export default Login;
