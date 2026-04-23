import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 relative overflow-hidden">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-[#9b1cfc] to-[#6d00df] text-white p-12 lg:p-20 relative">
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
            Join Our <br />Community
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-md">
            Start creating professional documents with the power of AI. Your data stays private and secure.
          </p>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 z-10 relative">
        <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-sm text-slate-500 mt-2">Sign up to start your journey</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-[#9b1cfc] focus:ring-2 focus:ring-[#9b1cfc]/20 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#a32cc4] hover:bg-[#8a2be2] text-white py-3 rounded-xl font-bold transition-all shadow-[0_4px_14px_rgba(163,44,196,0.39)] hover:shadow-[0_6px_20px_rgba(138,43,226,0.23)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="font-bold text-[#a32cc4] hover:text-[#8a2be2] ml-1 transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
