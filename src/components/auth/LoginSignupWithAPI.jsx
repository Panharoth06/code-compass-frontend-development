'use client';
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle, Loader2, Settings } from 'lucide-react';

// ✅ Enhanced helper to safely parse responses
async function parseResponseSafe(response) {
  const text = await response.text();
  
  // Check if response looks like HTML (CORS proxy error page)
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    throw new Error('CORS proxy error - received HTML instead of JSON. Please check your API configuration.');
  }
  
  try {
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.warn("Non-JSON response:", text);
    return { message: text };
  }
}

const LoginSignupWithAPI = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 🔧 Different CORS handling options
  const [corsOption, setCorsOption] = useState('direct'); // 'direct', 'proxy', 'allorigins'
  
  const getApiUrl = () => {
    const baseApi = 'http://code-compass.devith.it.com';
    switch (corsOption) {
      case 'proxy':
        return `https://cors-anywhere.herokuapp.com/${baseApi}`;
      case 'allorigins':
        return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(baseApi);
      case 'direct':
      default:
        return baseApi;
    }
  };

  const toggleMode = () => {
    setIsAnimating(true);
    setMessage({ type: '', text: '' });
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
      setFormData({ username: '', email: '', password: '', firstName: '', lastName: '' });
    }, 300);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (message.text) setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Email and password are required' });
      return false;
    }
    if (!isLogin) {
      if (!formData.username || !formData.firstName || !formData.lastName) {
        setMessage({ type: 'error', text: 'All fields are required for signup' });
        return false;
      }
      if (formData.password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }
    return true;
  };

  const makeApiRequest = async (endpoint, data = null) => {
    const apiBase = getApiUrl();
    const url = `${apiBase}/api/v1/code-compass/auth/${endpoint}`;
    
    const options = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const responseData = await parseResponseSafe(response);
      
      if (!response.ok) {
        throw new Error(responseData.message || `API Error: ${response.status} ${response.statusText}`);
      }
      
      return responseData;
    } catch (error) {
      if (error.message.includes('CORS') || error.name === 'TypeError') {
        throw new Error(`CORS Error: ${error.message}. Try switching CORS handling method.`);
      }
      throw error;
    }
  };

  const handleRegister = async () => {
    const registerData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    const data = await makeApiRequest('register', registerData);
    setMessage({ type: 'success', text: 'Account created successfully! You can now login.' });
    setTimeout(() => {
      setFormData({ username: '', email: formData.email, password: '', firstName: '', lastName: '' });
      setIsLogin(true);
    }, 2000);
    return data;
  };

  const handleLogin = async () => {
    // Since login endpoint might not exist, we'll simulate it
    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      
      // Try to make the request, but handle if endpoint doesn't exist
      await makeApiRequest('login', loginData);
      setMessage({ type: 'success', text: 'Login successful!' });
    } catch (error) {
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        setMessage({ type: 'info', text: 'Login endpoint not found in API. Registration works!' });
      } else {
        throw error;
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      console.error('API Error:', error);
      setMessage({ type: 'error', text: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Please enter your email address first' });
      return;
    }
    setIsLoading(true);
    try {
      await makeApiRequest('request-reset-password', { email: formData.email });
      setMessage({ type: 'success', text: 'Password reset email sent! Check your inbox.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to send reset email' });
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'info': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'error': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors z-10"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 z-10">
          <h3 className="text-white font-semibold mb-3">CORS Handling</h3>
          <div className="space-y-2">
            {[
              { value: 'direct', label: 'Direct (may fail due to CORS)' },
              { value: 'proxy', label: 'CORS Anywhere Proxy' },
              { value: 'allorigins', label: 'AllOrigins Proxy' }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-2 text-sm text-white/80">
                <input
                  type="radio"
                  value={option.value}
                  checked={corsOption === option.value}
                  onChange={(e) => setCorsOption(e.target.value)}
                  className="w-4 h-4"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 text-xs text-white/60">
            Current API: {getApiUrl()}
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/70">
              {isLogin ? 'Sign in to continue your journey' : 'Join us and start your journey'}
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`flex items-center gap-2 p-3 rounded-lg mb-6 border ${getMessageColor(message.type)}`}>
              {getMessageIcon(message.type)}
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          {/* Form */}
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="space-y-4">
              {/* Name fields for signup */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Username for signup */}
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Forgot Password */}
            {isLogin && (
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full mt-4 text-white/70 hover:text-white transition-colors text-sm disabled:opacity-50"
              >
                Forgot your password?
              </button>
            )}

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <span className="text-white/70 text-sm">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </span>
              <button
                onClick={toggleMode}
                className="ml-2 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-6 text-center text-white/50 text-xs">
          <p>Having CORS issues? Use the settings button (⚙️) to try different proxy methods.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupWithAPI;