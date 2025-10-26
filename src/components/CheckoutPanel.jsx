import { useEffect, useMemo, useState } from 'react';
import { CreditCard, Trash2, X } from 'lucide-react';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPanel({ open, onClose, cart, total, user, onRemove, onClear, onRequireAuth }) {
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!open) {
      setProcessing(false);
      setPaid(false);
    }
  }, [open]);

  const formattedTotal = useMemo(() => new Intl.NumberFormat('en-IN').format(total), [total]);

  const handlePay = async () => {
    if (!user) return onRequireAuth?.();
    if (!total || cart.length === 0) return;

    setProcessing(true);

    // Try Razorpay Checkout (client-only demo). If unavailable, fall back to a simulated success.
    const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (ok && window.Razorpay) {
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag', // Test key; replace in production
        amount: total * 100,
        currency: 'INR',
        name: 'Zenith IAS Academy',
        description: `Payment for ${cart.length} course(s)`,
        image: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
        prefill: { name: user.name, email: user.email },
        theme: { color: '#06b6d4' },
        modal: { ondismiss: () => setProcessing(false) },
        handler: function () {
          setPaid(true);
          onClear();
          setProcessing(false);
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      return;
    }

    // Fallback simulation
    await new Promise((r) => setTimeout(r, 1200));
    setPaid(true);
    onClear();
    setProcessing(false);
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 transition ${open ? 'bg-black/50' : 'bg-transparent'} backdrop-blur-sm`}
      />
      <div className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-neutral-950 border-l border-white/10 transform transition duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="font-semibold">Your Cart</div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-white/10"><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {cart.length === 0 && !paid && (
            <div className="text-white/60 text-sm">Your cart is empty. Add a course to proceed.</div>
          )}

          {paid && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="font-medium text-emerald-300">Payment successful</div>
              <div className="text-emerald-200/80 text-sm">Access has been granted to your purchased courses. A receipt has been sent to {user?.email}.</div>
            </div>
          )}

          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 border border-white/10 rounded-lg p-3 bg-white/5">
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-white/60 text-xs">₹{new Intl.NumberFormat('en-IN').format(item.price)}</div>
              </div>
              <button onClick={() => onRemove(item.id)} className="p-2 rounded-md hover:bg-white/10 text-white/70" aria-label={`Remove ${item.title}`}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10 bg-gradient-to-t from-neutral-950/95 to-neutral-950/70">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-sm">Total</span>
            <span className="font-semibold">₹{formattedTotal}</span>
          </div>
          <button
            disabled={processing || cart.length === 0 || paid}
            onClick={handlePay}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-orange-500 to-cyan-500 text-neutral-950 font-semibold disabled:opacity-50">
            <CreditCard size={18} /> {processing ? 'Processing…' : paid ? 'Paid' : 'Pay Securely'}
          </button>
          <p className="text-[11px] text-white/50 mt-2">Use test details in demo. Production requires server-side order/session creation and webhook verification.</p>
        </div>
      </div>
    </div>
  );
}
