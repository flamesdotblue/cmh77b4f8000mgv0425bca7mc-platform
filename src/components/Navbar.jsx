import { useEffect, useState } from 'react';
import { BookOpen, LogIn, LogOut, ShoppingCart, User } from 'lucide-react';

export default function Navbar({ user, onLogin, onLogout, cartCount, onOpenCheckout }) {
  const [openAuth, setOpenAuth] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) setOpenAuth(false);
  }, [user]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    onLogin({ id: crypto.randomUUID(), ...form });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-backdrop-blur:bg-neutral-950/60 bg-neutral-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-cyan-500 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div className="font-semibold tracking-tight">Zenith IAS Academy</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCheckout}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <ShoppingCart size={18} />
            <span className="text-sm">Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-orange-500/90 text-white">{cartCount}</span>
            )}
          </button>

          {!user ? (
            <button
              onClick={() => setOpenAuth((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-orange-500 to-cyan-500 text-neutral-950 font-medium">
              <LogIn size={18} />
              <span className="text-sm">Login</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-white/80">
                <User size={16} />
                <span className="text-sm">{user.name}</span>
              </div>
              <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 hover:bg-white/10">
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {openAuth && !user && (
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                type="email"
                className="px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <button type="submit" className="px-4 py-2 rounded-md bg-white text-neutral-900 font-medium">Continue</button>
            </form>
            <p className="text-xs text-white/50 mt-2">We’ll create your account instantly; no password required. A magic link can be sent later.</p>
          </div>
        </div>
      )}
    </header>
  );
}
