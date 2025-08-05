import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield, Smartphone, Eye, EyeOff, Loader2, CheckCircle, Star, Sparkles, Crown, Zap, Heart, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'admin'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 25) return 'from-red-400 to-red-600';
    if (strength < 50) return 'from-yellow-400 to-orange-500';
    if (strength < 75) return 'from-blue-400 to-blue-600';
    return 'from-green-400 to-emerald-600';
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (success) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Dynamic Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse floating"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl floating-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-400/15 to-indigo-400/15 rounded-full blur-xl floating"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-rose-400/20 to-orange-400/20 rounded-full blur-xl floating-delayed"></div>

        {/* Sparkle Effects */}
        <div className="absolute top-1/4 left-1/3 text-white/40 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-3/4 right-1/4 text-white/40 animate-pulse" style={{ animationDelay: '1s' }}>
          <Star className="w-4 h-4" />
        </div>
        <div className="absolute top-1/2 left-1/4 text-white/40 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-5 h-5" />
        </div>
        <div className="absolute top-1/6 right-1/3 text-white/40 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Crown className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-28 h-28 glass-card mb-8 group cursor-pointer hover:scale-110 transition-all duration-500 pulse-glow relative">
              <Smartphone className="w-14 h-14 text-white group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute -top-2 -right-2">
                <Gift className="w-6 h-6 text-yellow-400 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight">
              Join Telecom Portal
            </h1>
            <p className="text-white/90 text-xl font-medium mb-2">Create your account and unlock amazing features</p>
            <div className="flex items-center justify-center space-x-2 text-purple-200">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm">Trusted by 10,000+ customers</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                    step >= stepNum 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-20 h-2 mx-2 rounded-full transition-all duration-500 ${
                      step > stepNum ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-white/80 text-sm font-medium">
                Step {step} of 3: {step === 1 ? 'Personal Info' : step === 2 ? 'Account Details' : 'Confirmation'}
              </span>
            </div>
          </div>

          {/* Registration Card */}
          <div className="card hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="card-body relative z-10">
              {error && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-xl animate-bounce-in shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-slide-up">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h3>
                      <p className="text-gray-600">We'd love to get to know you better!</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label group">
                        <User className="w-4 h-4 mr-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="input-field pl-12 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200" />
                        {isTyping && formData.fullName && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      {formData.fullName && (
                        <p className="text-green-600 text-xs mt-1 flex items-center animate-fade-in">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Looking good!
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="role" className="form-label group">
                        <Shield className="w-4 h-4 mr-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        Account Type
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                          formData.role === 'customer' 
                            ? 'border-purple-500 bg-purple-50 shadow-lg' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}>
                          <input
                            type="radio"
                            name="role"
                            value="customer"
                            checked={formData.role === 'customer'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <User className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <div className="font-semibold text-gray-900">Customer</div>
                            <div className="text-sm text-gray-600">Manage services</div>
                          </div>
                        </label>
                        
                        <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                          formData.role === 'admin' 
                            ? 'border-purple-500 bg-purple-50 shadow-lg' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}>
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <Crown className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <div className="font-semibold text-gray-900">Admin</div>
                            <div className="text-sm text-gray-600">System control</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Account Details */}
                {step === 2 && (
                  <div className="space-y-6 animate-slide-up">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure your account</h3>
                      <p className="text-gray-600">Choose a strong password to keep your account safe</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label group">
                        <Mail className="w-4 h-4 mr-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field pl-12 focus:ring-purple-500/30 focus:border-purple-500"
                          placeholder="Enter your email address"
                          required
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="form-label group">
                        <Lock className="w-4 h-4 mr-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          className="input-field pl-12 pr-12 focus:ring-purple-500/30 focus:border-purple-500"
                          placeholder="Create a strong password"
                          required
                          minLength={6}
                        />
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {formData.password && (
                        <div className="space-y-3 mt-3 animate-fade-in">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 font-medium">Password strength:</span>
                            <span className={`font-bold ${
                              passwordStrength >= 75 ? 'text-green-600' : 
                              passwordStrength >= 50 ? 'text-blue-600' : 
                              passwordStrength >= 25 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {getPasswordStrengthText(passwordStrength)}
                            </span>
                          </div>
                          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getPasswordStrengthColor(passwordStrength)} transition-all duration-500 rounded-full relative`}
                              style={{ width: `${passwordStrength}%` }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label group">
                        <CheckCircle className="w-4 h-4 mr-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="input-field pl-12 pr-12 focus:ring-purple-500/30 focus:border-purple-500"
                          placeholder="Confirm your password"
                          required
                          minLength={6}
                        />
                        <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formData.confirmPassword && (
                        <div className="mt-2">
                          {formData.password !== formData.confirmPassword ? (
                            <p className="text-red-600 text-xs flex items-center animate-fade-in">
                              <X className="w-3 h-3 mr-1" />
                              Passwords do not match
                            </p>
                          ) : (
                            <p className="text-green-600 text-xs flex items-center animate-fade-in">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Passwords match perfectly!
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <div className="space-y-6 animate-slide-up">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h3>
                      <p className="text-gray-600">Review your information and complete registration</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Full Name:</span>
                        <span className="font-bold text-gray-900">{formData.fullName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="font-bold text-gray-900">{formData.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Account Type:</span>
                        <span className="font-bold text-gray-900 capitalize flex items-center">
                          {formData.role === 'admin' ? <Crown className="w-4 h-4 mr-1 text-purple-600" /> : <User className="w-4 h-4 mr-1 text-purple-600" />}
                          {formData.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1 transition-all hover:scale-110"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-500 font-semibold hover:underline transition-colors">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-500 font-semibold hover:underline transition-colors">
                          Privacy Policy
                        </a>. I understand that my data will be processed securely.
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary flex items-center space-x-2 group"
                    >
                      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Previous</span>
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={
                          (step === 1 && (!formData.fullName || !formData.role)) ||
                          (step === 2 && (!formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword))
                        }
                        className="btn-primary flex items-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Continue</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary flex items-center space-x-2 relative overflow-hidden group text-lg px-8 py-4"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {isLoading ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span className="relative z-10 font-bold">Create Account</span>
                            <Star className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Social Registration */}
              {step === 3 && (
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">Or register with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="btn-secondary flex items-center justify-center space-x-2 group py-3">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    
                    <button className="btn-secondary flex items-center justify-center space-x-2 group py-3">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sign In Link */}
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-500 font-bold text-lg transition-all duration-200 hover:underline"
                  >
                    Sign in here →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 text-white text-center hover:bg-white/30 transition-all duration-300 group">
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-1">Secure & Safe</h4>
              <p className="text-sm text-white/80">Enterprise-grade security</p>
            </div>
            
            <div className="glass-card p-4 text-white text-center hover:bg-white/30 transition-all duration-300 group">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-1">Lightning Fast</h4>
              <p className="text-sm text-white/80">Instant account activation</p>
            </div>
            
            <div className="glass-card p-4 text-white text-center hover:bg-white/30 transition-all duration-300 group">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-1">24/7 Support</h4>
              <p className="text-sm text-white/80">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
