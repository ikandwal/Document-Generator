import { useState } from 'react';

const faqs = [
  { q: 'How does local-only processing work?', a: 'All AI inference runs on your local machine using quantized models. No data is ever sent to external servers during generation, ensuring your documents remain fully private.' },
  { q: 'What file formats can I upload?', a: 'Currently the platform accepts PDF, DOCX, and plain TXT files up to 50MB. Full PDF/DOCX text extraction is being implemented in the next release.' },
  { q: 'Why are my tokens exceeding the limit?', a: 'The token limit (8,192) is tied to your configured model\'s context window. You can adjust the "Max Token Limit" in Settings → Model & AI, or upgrade to a model with a larger context window.' },
  { q: 'How do I select a different AI model?', a: 'Go to Settings → Model & AI → Default Model. You need to have the model available locally via a compatible runner (Ollama, llama.cpp, etc.).' },
  { q: 'Can I use this without a GPU?', a: 'Yes! The platform works purely on CPU as well, though generation will be noticeably slower. A dedicated NVIDIA GPU with 8GB+ VRAM is recommended for the best experience.' },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-surface no-scrollbar">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-studio-gradient flex items-center justify-center mx-auto mb-6 shadow-[0_10px_25px_rgba(36,56,156,0.2)]">
            <span className="material-symbols-outlined text-on-primary text-3xl">help</span>
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background mb-3">Support Center</h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">Find answers, explore docs, or send us a message.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: 'menu_book', label: 'Documentation', desc: 'Read the full user guide', href: '#' },
            { icon: 'bug_report', label: 'Report a Bug', desc: 'Let us know what went wrong', href: '#' },
            { icon: 'forum', label: 'Community', desc: 'Chat with other researchers', href: '#' },
          ].map(a => (
            <a href={a.href} key={a.label} className="group flex flex-col items-center text-center p-6 bg-surface-container-lowest rounded-xl ring-1 ring-inset ring-outline-variant/10 hover:ring-primary/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary">{a.icon}</span>
              </div>
              <h3 className="font-semibold text-on-surface text-sm mb-1">{a.label}</h3>
              <p className="text-xs text-on-surface-variant">{a.desc}</p>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="font-headline text-xl font-bold text-on-surface mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl ring-1 ring-inset ring-outline-variant/10 overflow-hidden transition-all duration-200">
                <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-sm text-on-surface">{faq.q}</span>
                  <span className={`material-symbols-outlined text-outline transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 ring-1 ring-inset ring-outline-variant/10">
          <h2 className="font-headline text-xl font-bold text-on-surface mb-6">Send us a message</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Your Name</label>
                <input type="text" placeholder="Alex Researcher" className="w-full bg-surface-container rounded-lg px-4 py-3 text-sm text-on-surface outline-none ring-1 ring-inset ring-outline-variant/20 focus:ring-primary/30 transition-all placeholder:text-outline-variant" />
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Email</label>
                <input type="email" placeholder="alex@lab.local" className="w-full bg-surface-container rounded-lg px-4 py-3 text-sm text-on-surface outline-none ring-1 ring-inset ring-outline-variant/20 focus:ring-primary/30 transition-all placeholder:text-outline-variant" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Subject</label>
              <input type="text" placeholder="Issue with file upload..." className="w-full bg-surface-container rounded-lg px-4 py-3 text-sm text-on-surface outline-none ring-1 ring-inset ring-outline-variant/20 focus:ring-primary/30 transition-all placeholder:text-outline-variant" />
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Message</label>
              <textarea rows={4} placeholder="Describe your issue in detail..." className="w-full bg-surface-container rounded-lg px-4 py-3 text-sm text-on-surface outline-none ring-1 ring-inset ring-outline-variant/20 focus:ring-primary/30 transition-all placeholder:text-outline-variant resize-none"></textarea>
            </div>
            <div className="flex justify-end pt-2">
              <button className="bg-studio-gradient text-on-primary px-8 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">send</span>
                Send Message
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
