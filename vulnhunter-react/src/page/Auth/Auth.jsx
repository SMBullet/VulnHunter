import React from 'react';
import './Auth.css';
import SignupForm from './SignupForm';
import { useLocation, useNavigate } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import SigninForm from './SigninForm';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen flex">
      {/* Left Side: VulnHunter */}
      <div className="flex-shrink-0 w-1/3 bg-gray-700 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">VulnHunter</span>
      </div>
      
      {/* Right Side: Form Container */}
      <div className="w-2/3 bg-gray-800 bg-opacity-75 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {location.pathname === '/signup' ? (
            <section>
              <SignupForm />
              <div className="mt-4 text-center">
                <span>Already have an account?</span>
                <Button onClick={() => navigate('/signin')} variant="ghost" className="ml-2">
                  Login
                </Button>
              </div>
            </section>
          ) : location.pathname === '/forgot-password' ? (
            <section>
              <ForgotPasswordForm />
              <div className="mt-4 text-center">
                <span>Back to login</span>
                <Button onClick={() => navigate('/signin')} variant="ghost" className="ml-2">
                  Login
                </Button>
              </div>
            </section>
          ) : (
            <section>
              <SigninForm />
              <div className="mt-4 text-center">
                <span>Don't have an account?</span>
                <Button onClick={() => navigate('/signup')} variant="ghost" className="ml-2">
                  Register
                </Button>
              </div>
              <div className="mt-6">
                <Button className="w-full py-3" onClick={() => navigate('/forgot-password')} variant="outline">
                  Forgot Password
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
