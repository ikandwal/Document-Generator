import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 relative overflow-hidden">
      {/* Left Side: Branding / Marketing */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-[#9b1cfc] to-[#6d00df] text-white p-12 lg:p-20 relative">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[120px]"></div>
          <div className="absolute top-[60%] right-[10%] w-[30%] h-[30%] rounded-full bg-black/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 flex items-center mb-16 space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md ring-1 ring-white/30">
            <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-none">Synthetix Studio</h1>
            <p className="text-white/70 text-[11px] font-medium tracking-wide">AI Document Creation</p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            Create Professional <br />Documents with AI
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-md">
            Transform your research and ideas into polished academic papers, reports, and proposals using local AI processing.
          </p>

          <div className="space-y-4 max-w-md">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/15">
              <div className="mt-1 w-8 h-8 rounded-lg bg-white/20 flex flex-shrink-0 items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">verified_user</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Secure & Private</h3>
                <p className="text-sm text-white/70 mt-0.5">All processing happens locally on your machine</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/15">
              <div className="mt-1 w-8 h-8 rounded-lg bg-white/20 flex flex-shrink-0 items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">bolt</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Lightning Fast</h3>
                <p className="text-sm text-white/70 mt-0.5">Generate professional documents in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 z-10 relative">
        <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-2">Sign in to continue to Synthetix Studio</p>
          </div>

          <div className="space-y-3 mb-8">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-[#0d1117] hover:bg-[#161b22] text-white font-semibold text-sm transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg>
              Continue with GitHub
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute border-t border-slate-200 w-full"></div>
            <span className="bg-white px-4 text-xs text-slate-400 relative">Or continue with email</span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-[#9b1cfc] focus:ring-2 focus:ring-[#9b1cfc]/20 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-[#9b1cfc] focus:ring-2 focus:ring-[#9b1cfc]/20 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-[#9b1cfc] focus:ring-[#9b1cfc] border-slate-300 accent-[#9b1cfc]" />
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-800 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-[#8a2be2] hover:text-[#6d00df] transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#a32cc4] hover:bg-[#8a2be2] text-white py-3 rounded-xl font-bold transition-all shadow-[0_4px_14px_rgba(163,44,196,0.39)] hover:shadow-[0_6px_20px_rgba(138,43,226,0.23)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500 font-medium">
            Don't have an account? <Link to="/signup" className="font-bold text-[#a32cc4] hover:text-[#8a2be2] ml-1 transition-colors">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
