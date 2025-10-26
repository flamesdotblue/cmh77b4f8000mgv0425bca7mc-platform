import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Star } from 'lucide-react';

export default function Hero({ onExplore, onBuyNow }) {
  return (
    <section className="relative min-h-[78vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/50 to-neutral-950"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-white/70">
              <Star size={14} className="text-orange-400" /> India's premier IAS coaching platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Master the UPSC with expert mentors, modern pedagogy, and secure payments
            </h1>
            <p className="text-white/70 max-w-xl">
              Join thousands of aspirants accelerating their journey with structured courses, crisp notes, mock tests, and mentorship. Smooth animations, secure checkout, and a world-class experience.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={onBuyNow} className="px-5 py-3 rounded-md bg-white text-neutral-900 font-semibold flex items-center gap-2">
                <CreditCard size={18} /> Buy a Course
              </button>
              <button onClick={onExplore} className="px-5 py-3 rounded-md border border-white/20 hover:bg-white/10">Explore Courses</button>
            </div>
            <div className="flex items-center gap-6 pt-2 text-white/70">
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-cyan-400" /> PCI-DSS aligned flow</div>
              <div>UPI, Cards, Netbanking</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="md:pl-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="font-semibold text-lg mb-2">Why Zenith IAS?</h3>
              <ul className="space-y-2 text-white/70 text-sm list-disc pl-5">
                <li>Mentors from top services with a proven track record</li>
                <li>Modular courses for Prelims, Mains and Interview</li>
                <li>Weekly live doubt sessions and test series</li>
                <li>Instant access on payment and downloadable notes</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
