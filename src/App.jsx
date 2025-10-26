import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import CheckoutPanel from './components/CheckoutPanel';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem('ias_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      const c = localStorage.getItem('ias_cart');
      return c ? JSON.parse(c) : [];
    } catch {
      return [];
    }
  });
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    localStorage.setItem('ias_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('ias_user', JSON.stringify(user));
    else localStorage.removeItem('ias_user');
  }, [user]);

  const total = useMemo(() => cart.reduce((t, i) => t + i.price, 0), [cart]);

  const addToCart = (course) => {
    if (!cart.find((c) => c.id === course.id)) setCart((c) => [...c, course]);
  };
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar
        user={user}
        onLogin={setUser}
        onLogout={() => setUser(null)}
        cartCount={cart.length}
        onOpenCheckout={() => setShowCheckout(true)}
      />
      <main>
        <Hero onExplore={() => {
          const el = document.getElementById('courses');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }} onBuyNow={() => setShowCheckout(true)} />
        <div id="courses">
          <Courses addToCart={addToCart} cart={cart} />
        </div>
      </main>

      <CheckoutPanel
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        total={total}
        user={user}
        onRemove={removeFromCart}
        onClear={clearCart}
        onRequireAuth={() => alert('Please login to proceed to payment.')}
      />

      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Zenith IAS Academy. All rights reserved.</p>
          <div className="text-xs text-white/50">Secure payments. Smooth learning. Crafted with care.</div>
        </div>
      </footer>
    </div>
  );
}
