import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Check, Copy, Loader2, Send } from 'lucide-react';
import { ANKIT_PROFILE } from '../../data/ankitData.js';

const INQUIRY_TYPES = ['Full-Time MERN Role', 'Operations / CCO Role', 'Freelance Build'];

function buildMailtoHref(name, contact, topic, msg) {
  const subject = encodeURIComponent(`[Portfolio · ${topic}] Message from ${name || 'Visitor'}`);
  const body = encodeURIComponent(
    `Name: ${name || 'Not provided'}\nContact: ${contact}\nTopic: ${topic}\n\nMessage:\n${msg}`
  );
  return `mailto:${ANKIT_PROFILE.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [visitorName, setVisitorName] = useState('');
  const [visitorContact, setVisitorContact] = useState('');
  const [visitorMessage, setVisitorMessage] = useState('');
  const [status, setStatus] = useState({ kind: 'idle' });

  const statusBoxRef = useRef(null);

  useEffect(() => {
    if (status.kind === 'idle' || !statusBoxRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      statusBoxRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
  }, [status.kind]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(ANKIT_PROFILE.email).catch(() => {});
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedContact = visitorContact.trim();
    const trimmedMsg = visitorMessage.trim();
    const trimmedName = visitorName.trim();

    if (!trimmedContact) {
      setStatus({ kind: 'error', message: 'Please enter your email address or phone number.' });
      return;
    }
    if (!trimmedMsg || trimmedMsg.length < 3) {
      setStatus({ kind: 'error', message: 'Please write a brief message for Ankit.' });
      return;
    }

    setStatus({ kind: 'submitting' });
    const fallbackHref = buildMailtoHref(trimmedName, trimmedContact, inquiryType, trimmedMsg);

    try {
      const apiRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          inquiryType,
          message: trimmedMsg,
        }),
      });

      const apiData = await apiRes.json().catch(() => null);

      if (!apiRes.ok) {
        setStatus({
          kind: 'error',
          message: apiData?.error || 'Could not submit form. Please try again.',
        });
        return;
      }

      if (apiData?.delivered) {
        setStatus({
          kind: 'sent',
          message: `Message sent directly to ${ANKIT_PROFILE.email}. Ankit will reply soon.`,
        });
        setVisitorName('');
        setVisitorContact('');
        setVisitorMessage('');
        return;
      }

      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${ANKIT_PROFILE.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName || 'Portfolio Visitor',
            contact: trimmedContact,
            topic: inquiryType,
            message: trimmedMsg,
            _subject: `[Portfolio · ${inquiryType}] New message from ${trimmedName || 'Visitor'}`,
            _template: 'table',
          }),
        });
        const fsData = await fsRes.json().catch(() => null);

        if (fsRes.ok && (fsData?.success === 'true' || fsData?.success === true)) {
          setStatus({
            kind: 'sent',
            message: `Message forwarded to ${ANKIT_PROFILE.email}. Thank you for reaching out!`,
          });
          setVisitorName('');
          setVisitorContact('');
          setVisitorMessage('');
          return;
        }
      } catch {
        // Fallback below
      }

      setStatus({
        kind: 'saved_fallback',
        message:
          'Your message has been saved. You can also send it immediately using your email app below.',
        fallbackMailto: fallbackHref,
      });
      setVisitorName('');
      setVisitorContact('');
      setVisitorMessage('');
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error while sending message. Please try again or email directly.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div data-contact-stagger className="space-y-3 pt-1">
        <p className="font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/55">
          What are we talking about?
        </p>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setInquiryType(type)}
              className={`px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                inquiryType === type
                  ? 'bg-[#141413] text-[#f4f1ea] -translate-y-0.5'
                  : 'border border-[#141413]/20 bg-transparent text-[#141413] hover:border-[#141413]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <form
        data-contact-stagger
        onSubmit={handleSubmit}
        noValidate
        className="border border-[#141413]/15 bg-[#e8e3d8]/40 p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-[#141413]/12 pb-3">
          <span className="font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/65">
            Send a Direct Message
          </span>
          <span className="font-mono-tabular text-[11px] text-[#d9381e]">
            To: {ANKIT_PROFILE.email}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/60"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="e.g. Amit / Hiring Manager"
              maxLength={120}
              className="mt-2 w-full border-b border-[#141413]/30 bg-transparent py-2 text-sm font-medium text-[#141413] placeholder:text-[#141413]/40 focus:border-[#d9381e] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-info"
              className="block font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/60"
            >
              Your Contact (Email or Phone) *
            </label>
            <input
              id="contact-info"
              type="text"
              required
              value={visitorContact}
              onChange={(e) => setVisitorContact(e.target.value)}
              placeholder="email@company.com or +91..."
              maxLength={160}
              className="mt-2 w-full border-b border-[#141413]/30 bg-transparent py-2 text-sm font-medium text-[#141413] placeholder:text-[#141413]/40 focus:border-[#d9381e] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono-tabular text-xs uppercase tracking-wider text-[#141413]/60"
          >
            Message *
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={visitorMessage}
            onChange={(e) => setVisitorMessage(e.target.value)}
            placeholder={`Tell Ankit about the ${inquiryType.toLowerCase()} or project...`}
            maxLength={4000}
            className="mt-2 w-full resize-y border border-[#141413]/20 bg-[#f4f1ea]/70 p-3 text-sm leading-relaxed text-[#141413] placeholder:text-[#141413]/40 focus:border-[#d9381e] focus:outline-none"
          />
        </div>

        {status.kind !== 'idle' && status.kind !== 'submitting' && (
          <div
            ref={statusBoxRef}
            role="status"
            className={`border p-3.5 text-xs sm:text-sm leading-relaxed ${
              status.kind === 'error'
                ? 'border-[#d9381e] bg-[#d9381e]/10 text-[#141413]'
                : 'border-[#141413]/25 bg-[#f4f1ea] text-[#141413]'
            }`}
          >
            <p className="font-medium">{status.message}</p>
            {status.fallbackMailto && (
              <a
                href={status.fallbackMailto}
                className="mt-2 inline-flex items-center gap-1.5 font-mono-tabular text-xs font-semibold text-[#d9381e] hover:underline"
              >
                <span>Open in Email App</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={status.kind === 'submitting'}
            className="inline-flex items-center gap-2.5 bg-[#d9381e] px-6 py-3.5 text-sm font-semibold text-[#f4f1ea] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#141413] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {status.kind === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 border border-[#141413]/25 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-[#141413] hover:text-[#f4f1ea] cursor-pointer"
          >
            {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
