import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Smartphone, Eye, EyeOff, Loader2, Sparkles, Star, Zap, Crown, Heart, Shield, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please try the demo accounts below.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    
    try {
      const success = await login(demoEmail, demoPassword);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse ${
                i % 3 === 0 ? 'w-1 h-1 bg-white/40' :
                i % 3 === 1 ? 'w-2 h-2 bg-blue-300/30' :
                'w-1.5 h-1.5 bg-purple-300/35'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Ultra Dynamic Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full blur-3xl transition-all duration-700 ease-out opacity-80"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Multiple Floating Shapes */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse floating"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl floating-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-xl floating"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-rose-400/20 to-red-400/20 rounded-full blur-xl floating-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full blur-xl floating"></div>

        {/* Enhanced Sparkle Effects */}
        <div className="absolute top-1/4 left-1/3 text-white/50 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute top-3/4 right-1/4 text-white/50 animate-pulse" style={{ animationDelay: '1s' }}>
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 left-1/4 text-white/50 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-7 h-7" />
        </div>
        <div className="absolute top-1/6 right-1/3 text-white/50 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Crown className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 left-1/6 text-white/50 animate-pulse" style={{ animationDelay: '2s' }}>
          <Heart className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Enhanced Header Section */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-32 h-32 glass-card mb-8 group cursor-pointer hover:scale-110 transition-all duration-500 pulse-glow relative">
              <Smartphone className="w-16 h-16 text-white group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute -top-3 -right-3">
                <Gift className="w-8 h-8 text-yellow-400 animate-bounce" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Shield className="w-6 h-6 text-green-400 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Telecom Portal
            </h1>
            <p className="text-white/90 text-2xl font-medium mb-3">Welcome back to the future</p>
            <div className="flex items-center justify-center space-x-3 text-purple-200">
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              <span className="text-base font-medium">Trusted by 10,000+ users worldwide</span>
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
          </div>

          {/* Enhanced Login Card */}
          <div className="card hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
            {/* Enhanced Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur"></div>
            
            <div className="card-body relative z-10">
              {error && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-xl animate-bounce-in shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Enhanced Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label group text-lg">
                    <Mail className="w-5 h-5 mr-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-14 pr-4 py-4 text-lg focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 transition-colors duration-200" />
                  </div>
                </div>

                {/* Enhanced Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label group text-lg">
                    <Lock className="w-5 h-5 mr-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-14 pr-14 py-4 text-lg focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 transition-colors duration-200" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Enhanced Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200 hover:scale-110"
                    />
                    <span className="ml-3 text-gray-600 group-hover:text-gray-800 transition-colors font-medium">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-bold transition-all duration-200 hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Enhanced Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center space-x-3 relative overflow-hidden group text-xl py-4 font-bold"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Sign In</span>
                      <svg className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Enhanced Social Login */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white text-gray-500 font-bold text-base">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="btn-secondary flex items-center justify-center space-x-2 group py-4 text-base font-medium">
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  
                  <button className="btn-secondary flex items-center justify-center space-x-2 group py-4 text-base font-medium">
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Sign Up Link */}
              <div className="text-center">
                <p className="text-gray-600 text-lg">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-500 font-bold text-xl transition-all duration-200 hover:underline"
                  >
                    Create an account →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Demo Credentials with Quick Login */}
          <div className="mt-8 glass-card p-6 text-white animate-fade-in hover:bg-white/30 transition-all duration-300">
            <h4 className="font-bold mb-6 flex items-center text-xl">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Demo Accounts - Quick Login
            </h4>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-100 flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                    Admin Access:
                  </span>
                  <button
                    onClick={() => handleDemoLogin('admin@telecom.com', 'admin123')}
                    disabled={isLoading}
                    className="btn-secondary text-sm py-2 px-4 hover:scale-105 transition-transform"
                  >
                    Quick Login
                  </button>
                </div>
                <code className="bg-white/20 px-3 py-2 rounded-lg font-mono text-sm block">
                  admin@telecom.com / admin123
                </code>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-100 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-green-400" />
                    Customer Access:
                  </span>
                  <button
                    onClick={() => handleDemoLogin('customer@email.com', 'customer123')}
                    disabled={isLoading}
                    className="btn-secondary text-sm py-2 px-4 hover:scale-105 transition-transform"
                  >
                    Quick Login
                  </button>
                </div>
                <code className="bg-white/20 px-3 py-2 rounded-lg font-mono text-sm block">
                  customer@email.com / customer123
                </code>
              </div>
            </div>
          </div>

          {/* Enhanced Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-white text-center hover:bg-white/30 transition-all duration-300 group">
              <Shield className="w-10 h-10 mx-auto mb-3 text-green-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-2 text-lg">Bank-Level Security</h4>
              <p className="text-sm text-white/80">256-bit encryption & multi-factor authentication</p>
            </div>
            
            <div className="glass-card p-6 text-white text-center hover:bg-white/30 transition-all duration-300 group">
              <Zap className="w-10 h-10 mx-auto mb-3 text-yellow-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-2 text-lg">Lightning Fast</h4>
              <p className="text-sm text-white/80">Instant access to all your telecom services</p>
            </div>
            
            <div className="glass-card p-6 text-white text-center hover:bg-white/30 transition-all duration-300 group">
              <Heart className="w-10 h-10 mx-auto mb-3 text-red-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-2 text-lg">24/7 Support</h4>
              <p className="text-sm text-white/80">Round-the-clock customer assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
