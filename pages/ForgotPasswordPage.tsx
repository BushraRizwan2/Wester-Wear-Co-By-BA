import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would trigger a password reset flow here (e.g., API call to send email).
    // For this demo, we'll just simulate the success state.
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-lg shadow-lg">
        {submitted ? (
          <div className="text-center">
             <h2 className="mt-6 text-center text-2xl font-serif font-bold text-text-primary">
                Check your inbox
            </h2>
            <p className="mt-4 text-text-secondary">
              If an account with the email <strong>{email}</strong> exists, we've sent instructions to reset your password.
            </p>
            <Link to="/login" className="mt-6 inline-block font-medium text-accent hover:text-primary">
              &larr; Back to Sign in
            </Link>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-serif font-bold text-text-primary">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-text-secondary">
                Enter your email address and we will send you instructions to reset your password.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
             <div className="text-center text-sm">
                <Link to="/login" className="font-medium text-accent hover:text-primary">
                Remembered your password? Sign in
                </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;