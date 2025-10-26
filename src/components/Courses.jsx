import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const COURSE_DATA = [
  {
    id: 'prelims-foundation',
    title: 'UPSC Prelims Foundation',
    desc: 'Comprehensive coverage with PYQs, crisp notes, and practice sets.',
    price: 4999,
    highlights: ['NCERT to Advanced', 'Weekly tests', 'Mentorship calls'],
  },
  {
    id: 'mains-enrichment',
    title: 'Mains Enrichment Programme',
    desc: 'Answer writing drills, case studies, value addition notes.',
    price: 6999,
    highlights: ['Daily practice', 'Model answers', 'Peer review'],
  },
  {
    id: 'ethics-gs4',
    title: 'GS-IV Ethics Mastery',
    desc: 'Case study frameworks, thinkers, quotes, diagrams.',
    price: 3499,
    highlights: ['Ethics toolkit', 'Live case labs', 'Scoring strategies'],
  },
  {
    id: 'essay-bootcamp',
    title: 'Essay Bootcamp',
    desc: 'Structure, themes, brainstorming frameworks, feedback loops.',
    price: 2999,
    highlights: ['Brainstorm sheets', 'Topic vault', '2x detailed reviews'],
  },
];

export default function Courses({ addToCart, cart }) {
  const inCart = (id) => cart.some((c) => c.id === id);

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-950 to-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Choose your course</h2>
            <p className="text-white/60 mt-2">Hand-picked modules to maximise your score.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSE_DATA.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <span className="text-sm px-2 py-1 rounded-md bg-orange-500/20 text-orange-300">₹{course.price}</span>
              </div>
              <p className="text-white/60 text-sm mt-2 min-h-[48px]">{course.desc}</p>
              <ul className="mt-4 space-y-2 text-white/70 text-sm">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> {h}</li>
                ))}
              </ul>
              <div className="mt-5">
                {inCart(course.id) ? (
                  <button disabled className="w-full py-2.5 rounded-md border border-white/20 text-white/70 cursor-not-allowed">Added</button>
                ) : (
                  <button onClick={() => addToCart(course)} className="w-full py-2.5 rounded-md bg-white text-neutral-900 font-medium">Add to Cart</button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
