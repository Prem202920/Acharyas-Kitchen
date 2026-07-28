import React, { useState } from 'react';
import { 
  Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Sparkles, 
  CheckCircle2, Eye, EyeOff, Check, X, AlertCircle 
} from 'lucide-react';
import { 
  auth, 
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile
} from '../firebase';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Strict Password validation criteria for registration
  const password = formData.password;
  const passwordCriteria = [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    { id: 'uppercase', label: 'At least 1 uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { id: 'lowercase', label: 'At least 1 lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { id: 'number', label: 'At least 1 number (0-9)', met: /[0-9]/.test(password) },
    { id: 'special', label: 'At least 1 special character (!@#$%^&*)', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) }
  ];

  const isPasswordValid = passwordCriteria.every((c) => c.met);

  const handleTabSwitch = (toLogin) => {
    setIsLogin(toLogin);
    setErrorMessage('');
    setSuccessMessage('');
    setShowPassword(false);
  };

  // Format Firebase Error Codes into friendly user messages
  const getFirebaseErrorMessage = (error) => {
    const code = error.code || '';
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email address. Please register first.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address format. Please enter a valid email.';
      case 'auth/weak-password':
        return 'Password is too weak. Please meet all password requirements.';
      case 'auth/too-many-requests':
        return 'Account access temporarily blocked due to many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in popup was closed before completing.';
      case 'auth/popup-blocked':
        return 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
      case 'auth/invalid-api-key':
        return 'Firebase config placeholder detected. Please add your VITE_FIREBASE_API_KEY in .env.local.';
      default:
        return error.message || 'An unexpected authentication error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    if (isLogin) {
      // Real Firebase Login Flow
      try {
        await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password);
        // Successful login is automatically detected via onAuthStateChanged listener in App.jsx
      } catch (error) {
        console.error("Firebase Login Error:", error);
        setErrorMessage(getFirebaseErrorMessage(error));
      } finally {
        setLoading(false);
      }
    } else {
      // Real Firebase Registration Flow
      if (!isPasswordValid) {
        setErrorMessage('Password does not meet all security requirements. Please check the rules below.');
        setLoading(false);
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email.trim(), 
          formData.password
        );
        
        // Update user profile display name if provided
        if (formData.name.trim() && userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: formData.name.trim()
          });
        }

        // Immediately sign out so user returns to login screen to sign in explicitly
        await signOut(auth);

        // Switch to Login tab and show success message
        setIsLogin(true);
        setSuccessMessage('Account created! Please log in.');
        setErrorMessage('');
        setFormData((prev) => ({ ...prev, password: '' }));
      } catch (error) {
        console.error("Firebase Registration Error:", error);
        setErrorMessage(getFirebaseErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await signInWithPopup(auth, googleProvider);
      // Successful sign in automatically triggers onAuthStateChanged in App.jsx and redirects to main dashboard
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-body selection:bg-primary selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-4">
        {/* Brand Logo */}
        <div className="inline-flex items-center justify-center gap-3 group cursor-pointer">
          <img 
            alt="Acharya's Kitchen Logo" 
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBqoCF2eJMk0dv6amHm_TTGFgisJdRw4S3VURCeL4r2TqA4tHJN9wtl2osP8XgB87WWG_2crCE-26wA5SFbNg2rBMD357op3qlI31kJ2w0Eu_LyecYYvSArssmnta7rt4C-oXX6olp2g9MaSg_lOvxka4m_nqlEllgNKJzCQshbhDd5uq2jL7n3r10exyLgag8CQJCKvyFIEkF3PyOBs3nev4USNEZnH8xkI6hdngsj3Xt5AGZDJCS-BnNSUQD8N67bDZ1c2kPC8" 
          />
          <h1 className="font-headline text-3xl font-bold text-primary tracking-tight">
            Acharya's Kitchen
          </h1>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-label font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          AUTHENTIC CLOUD KITCHEN PORTAL
        </div>

        <p className="font-headline text-xl text-on-surface font-medium italic">
          "Welcome to the Modern Hearth"
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-surface py-8 px-6 shadow-soft sm:rounded-2xl border border-outline-variant/30 sm:px-10 space-y-6">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-outline-variant/30">
            <button
              type="button"
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-3 text-center font-label text-label-lg font-semibold transition-colors border-b-2 ${
                isLogin
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-3 text-center font-label text-label-lg font-semibold transition-colors border-b-2 ${
                !isLogin
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Success Toast Banner */}
          {successMessage && (
            <div className="p-3.5 bg-secondary-container/80 text-on-secondary-container rounded-xl text-xs font-body font-semibold flex items-start gap-2.5 animate-fadeIn border border-secondary/30">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-error-container/80 text-on-error-container rounded-xl text-xs font-body font-semibold flex items-start gap-2.5 animate-fadeIn border border-error/30">
              <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1">
                <label className="block text-xs font-label font-semibold text-on-surface uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Chef Rajesh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                  <User className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-label font-semibold text-on-surface uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <Mail className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="block text-xs font-label font-semibold text-on-surface uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                  <Phone className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
                </div>
              </div>
            )}

            {/* Password Input Field with Visibility Toggle */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-label font-semibold text-on-surface uppercase tracking-wider">
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="text-xs text-primary hover:underline font-label font-medium">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <Lock className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
                
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Validation Checklist (Registration Mode) */}
            {!isLogin && (
              <div className="p-3 bg-surface-container-low/70 rounded-xl border border-outline-variant/30 space-y-1.5 font-body text-xs text-on-surface-variant">
                <p className="font-label text-[11px] font-semibold text-on-surface uppercase tracking-wider mb-1">
                  Password Requirements:
                </p>
                {passwordCriteria.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    {c.met ? (
                      <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-on-surface-variant/40 shrink-0" />
                    )}
                    <span className={c.met ? 'text-secondary font-medium' : 'text-on-surface-variant/70'}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-on-surface-variant font-body">
                  Remember me on this device
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-label text-label-lg font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 soft-shadow group disabled:opacity-60"
            >
              {loading ? (
                <span>Authenticating with Firebase...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Log In with Email' : 'Register with Email'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-2 text-on-surface-variant font-label">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface hover:bg-surface-container py-3 px-4 rounded-lg font-label text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3 soft-shadow hover:border-outline-variant/60"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Safety Notice */}
          <div className="pt-2 text-center text-xs text-on-surface-variant flex items-center justify-center gap-1.5 font-body">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>Firebase Auth SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
