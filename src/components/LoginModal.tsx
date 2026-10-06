import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginModal() {
  const {
    isLoginOpen,
    closeLogin,
    authMode,
    setAuthMode,
    login,
    register,
    loginWithSocial,
  } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // 3D Tilt & Mouse reflection states
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<{
    transform: string;
    spotlightX: number;
    spotlightY: number;
  }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    spotlightX: 50,
    spotlightY: 50,
  });

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginOpen) {
        closeLogin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoginOpen, closeLogin]);

  // Lock background scroll when open
  useEffect(() => {
    if (isLoginOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMessage(null);
      setIsSuccess(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginOpen]);

  // Reset form when changing auth modes
  useEffect(() => {
    setErrorMessage(null);
    setIsSuccess(false);
  }, [authMode]);

  // Mouse move handler for realistic 3D tilt & dynamic reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on touch devices or reduced motion
    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max 3.5 degrees
    const rotateY = ((x - centerX) / centerX) * 3.2;
    const rotateX = -((y - centerY) / centerY) * 3.2;

    const spotlightX = (x / rect.width) * 100;
    const spotlightY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`,
      spotlightX,
      spotlightY,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)',
      spotlightX: 50,
      spotlightY: 50,
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        const res = await login(email, password, rememberMe);
        if (res.success) {
          setIsSuccess(true);
          setTimeout(() => {
            closeLogin();
            setIsSuccess(false);
          }, 1200);
        } else {
          setErrorMessage(res.error || 'Login failed. Please verify your credentials.');
          triggerErrorShake();
        }
      } else if (authMode === 'register') {
        const res = await register(name, email, password);
        if (res.success) {
          setIsSuccess(true);
          setTimeout(() => {
            closeLogin();
            setIsSuccess(false);
          }, 1200);
        } else {
          setErrorMessage(res.error || 'Registration failed.');
          triggerErrorShake();
        }
      } else if (authMode === 'forgot') {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (!email || !email.includes('@')) {
          setErrorMessage('Please enter a valid email address.');
          triggerErrorShake();
        } else {
          setIsSuccess(true);
          setTimeout(() => {
            setAuthMode('login');
            setIsSuccess(false);
          }, 2000);
        }
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
      triggerErrorShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerErrorShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 550);
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await loginWithSocial(provider);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          closeLogin();
          setIsSuccess(false);
        }, 1100);
      }
    } catch {
      setErrorMessage(`Failed to sign in with ${provider}.`);
      triggerErrorShake();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoginOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* ========================================================
          ATMOSPHERIC BACKGROUND & AMBIENT LIGHT BLOBS
          ======================================================== */}
      <div
        className="fixed inset-0 bg-background/60 dark:bg-black/75 backdrop-blur-md transition-opacity duration-500 ease-out"
        onClick={closeLogin}
        aria-hidden="true"
      />

      {/* Floating Ambient Blobs with soft cyan/indigo glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Blob 1: Cyan specular core */}
        <div
          className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#00f2fe]/25 via-[#4facfe]/15 to-transparent blur-[85px] animate-liquid-ambient-1"
        />
        {/* Blob 2: Deep Indigo / Violet refraction */}
        <div
          className="absolute -bottom-28 -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[#0a192f]/50 dark:from-[#00f2fe]/20 via-[#4facfe]/20 to-transparent blur-[95px] animate-liquid-ambient-2"
        />
        {/* Blob 3: Center ambient light shimmer */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-r from-[#00f2fe]/10 via-[#4facfe]/10 to-indigo-500/10 blur-[80px] animate-liquid-ambient-3"
        />
      </div>

      {/* ========================================================
          LIQUID GLASS CARD (Main Modal Window)
          ======================================================== */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: tiltStyle.transform,
        }}
        className={`relative w-full max-w-md my-auto rounded-[28px] overflow-hidden liquid-glass-card animate-card-entry ${
          isShaking ? 'animate-glass-shake' : ''
        }`}
      >
        {/* Realistic liquid glass multi-layer specular border */}
        <div className="liquid-glass-specular-border" aria-hidden="true" />

        {/* Dynamic mouse-following specular spotlight highlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${tiltStyle.spotlightX}% ${tiltStyle.spotlightY}%, rgba(0, 242, 254, 0.16), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Continuous slow-moving liquid glass sheen reflection */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.14] dark:via-white/[0.08] to-transparent animate-sheen-sweep"
          />
        </div>

        {/* Top glossy edge light reflection */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/70 dark:via-cyan-300/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={closeLogin}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground bg-white/30 dark:bg-white/[0.06] hover:bg-white/60 dark:hover:bg-white/[0.14] border border-white/30 dark:border-white/10 backdrop-blur-md transition-all duration-200 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ========================================================
            CARD INTERIOR CONTENT
            ======================================================== */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Logo & Header with glass badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-secondary to-secondary-dark opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
                  <span className="text-white font-extrabold text-2xl leading-none">N</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-dark dark:text-secondary border border-secondary/20 mb-2 animate-float-badge">
              <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
              <span>NexStore Liquid Glass Access</span>
            </div>

            <h2
              id="auth-modal-title"
              className="text-2xl font-bold tracking-tight text-foreground transition-all duration-300"
            >
              {authMode === 'login' && 'Welcome Back'}
              {authMode === 'register' && 'Create Your Account'}
              {authMode === 'forgot' && 'Reset Password'}
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              {authMode === 'login' &&
                'Enter your credentials to securely access your cart, orders & wishlist.'}
              {authMode === 'register' &&
                'Join thousands of happy shoppers and unlock member perks & discounts.'}
              {authMode === 'forgot' &&
                'Enter your registered email and we will send a password reset code.'}
            </p>
          </div>

          {/* Success State Overlay */}
          {isSuccess && (
            <div className="py-8 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {authMode === 'forgot' ? 'Reset Email Sent!' : 'Authentication Successful!'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {authMode === 'forgot'
                  ? 'Check your inbox for further instructions.'
                  : 'Preparing your personalized store experience...'}
              </p>
            </div>
          )}

          {!isSuccess && (
            <>
              {/* Error Notification Alert */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 p-3 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive flex items-start space-x-2.5 text-xs animate-in fade-in slide-in-from-top-2 duration-250 backdrop-blur-sm"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="flex-1 font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field (Register Mode Only) */}
                {authMode === 'register' && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    <label
                      htmlFor="auth-name"
                      className="block text-xs font-semibold text-foreground/80 tracking-wide"
                    >
                      Full Name
                    </label>
                    <div className="relative group">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary-dark dark:group-focus-within:text-secondary transition-colors" />
                      <input
                        id="auth-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 liquid-glass-input focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="auth-email"
                    className="block text-xs font-semibold text-foreground/80 tracking-wide"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary-dark dark:group-focus-within:text-secondary transition-colors" />
                    <input
                      id="auth-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 liquid-glass-input focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field (Login & Register Modes) */}
                {authMode !== 'forgot' && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="auth-password"
                        className="block text-xs font-semibold text-foreground/80 tracking-wide"
                      >
                        Password
                      </label>
                      {authMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-xs text-muted-foreground hover:text-secondary-dark dark:hover:text-secondary transition-colors font-medium hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary-dark dark:group-focus-within:text-secondary transition-colors" />
                      <input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 liquid-glass-input focus:outline-none font-mono"
                      />
                      {/* Password Eye Toggle with subtle smooth rotation */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-transform duration-200 active:scale-90"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 transition-all duration-300 rotate-0" />
                        ) : (
                          <Eye className="w-4 h-4 transition-all duration-300 rotate-0" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember Me Checkbox (Login Mode) */}
                {authMode === 'login' && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/20 rounded cursor-pointer accent-[#00f2fe]"
                      />
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors select-none">
                        Remember me on this device
                      </span>
                    </label>
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full group overflow-hidden mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary via-primary-light to-primary dark:from-[#00f2fe] dark:via-[#4facfe] dark:to-[#00f2fe] dark:text-[#020617] shadow-lg shadow-secondary/15 hover:shadow-secondary/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {/* Moving reflection shine across button */}
                  <div
                    className="absolute inset-0 w-[150%] pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent animate-btn-shine"
                    aria-hidden="true"
                  />

                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {authMode === 'login' && 'Sign In to Account'}
                          {authMode === 'register' && 'Create Free Account'}
                          {authMode === 'forgot' && 'Send Reset Code'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Social Login Options (for Login and Register modes) */}
              {authMode !== 'forgot' && (
                <div className="mt-6 space-y-4">
                  {/* OR Divider with subtle glass line */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-border/60" />
                    <span className="absolute px-3 text-[11px] font-medium tracking-wider uppercase bg-card/80 dark:bg-slate-900/80 backdrop-blur-sm text-muted-foreground rounded-full border border-border/40">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Google Button */}
                    <button
                      type="button"
                      onClick={() => handleSocialAuth('google')}
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-foreground/90 bg-white/40 dark:bg-white/[0.04] hover:bg-white/70 dark:hover:bg-white/[0.1] border border-white/50 dark:border-white/10 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                      <span>Google</span>
                    </button>

                    {/* GitHub Button */}
                    <button
                      type="button"
                      onClick={() => handleSocialAuth('github')}
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-foreground/90 bg-white/40 dark:bg-white/[0.04] hover:bg-white/70 dark:hover:bg-white/[0.1] border border-white/50 dark:border-white/10 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mode Switching (Register / Login / Back) */}
              <div className="mt-6 pt-4 border-t border-border/40 text-center">
                {authMode === 'login' ? (
                  <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="font-semibold text-secondary-dark dark:text-secondary hover:underline underline-offset-4 transition-all ml-1"
                    >
                      Sign up for free
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="font-semibold text-secondary-dark dark:text-secondary hover:underline underline-offset-4 transition-all ml-1"
                    >
                      Return to Sign In
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
