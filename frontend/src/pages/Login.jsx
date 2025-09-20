import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Gamepad2, User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('member'); // 'member' or 'admin'

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      if (loginType === 'admin') {
        response = await authAPI.adminLogin(formData);
      } else {
        response = await authAPI.login(formData);
      }

      // For now, we'll use the password as token (as per backend implementation)
      const userData = {
        username: formData.username,
        role: loginType,
        id: 'temp-id' // This should come from backend
      };

      login(userData, formData.password);
      navigate('/member');
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.data || 
        'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gaming-accent to-gaming-gold rounded-full flex items-center justify-center">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-gaming text-3xl font-bold bg-gradient-to-r from-gaming-accent to-gaming-gold bg-clip-text text-transparent mb-2">
            GameoN
          </h1>
          <p className="text-white/70">Welcome to the ultimate gaming experience</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex mb-6 bg-white/10 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginType('member')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              loginType === 'member'
                ? 'bg-gaming-accent text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Member Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              loginType === 'admin'
                ? 'bg-gaming-accent text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <LogIn className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-white/50 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-white/60 space-y-1">
              <div>Member: username/password</div>
              <div>Admin: admin/admin</div>
            </div>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/membership')}
              className="text-gaming-accent hover:text-gaming-gold transition-colors font-medium"
            >
              Create Membership
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;