import { useEffect, useState } from 'react';
import { ANKIT_PROFILE } from '../../data/ankitData.js';

function formatISTTime() {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '--:--';
  }
}

export function ContactDetailsLedger() {
  const [localTime, setLocalTime] = useState(formatISTTime);

  useEffect(() => {
    const id = setInterval(() => setLocalTime(formatISTTime()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      data-contact-stagger
      className="lg:col-span-5 border border-[#141413]/15 bg-[#e8e3d8]/55 p-7 sm:p-9 space-y-6"
    >
      <div
        data-contact-ledger-row
        className="flex items-center gap-4 border-b border-[#141413]/12 pb-6"
      >
        <img
          src={ANKIT_PROFILE.photos.hero}
          alt="Ankit Kumar"
          referrerPolicy="no-referrer"
          className="h-16 w-16 object-cover object-top border border-[#141413]/15"
        />
        <div>
          <p className="font-display text-2xl font-bold uppercase tracking-tight">
            {ANKIT_PROFILE.fullName}
          </p>
          <p className="text-xs text-[#141413]/65">{ANKIT_PROFILE.tagline}</p>
        </div>
      </div>

      <dl className="space-y-4 text-sm">
        <div data-contact-ledger-row>
          <dt className="font-mono-tabular text-xs uppercase text-[#141413]/50">Email</dt>
          <dd className="mt-1 font-semibold">
            <a href={`mailto:${ANKIT_PROFILE.email}`} className="hover:text-[#d9381e]">
              {ANKIT_PROFILE.email}
            </a>
          </dd>
        </div>
        <div data-contact-ledger-row>
          <dt className="font-mono-tabular text-xs uppercase text-[#141413]/50">Phone</dt>
          <dd className="mt-1 font-semibold">
            <a href={`tel:${ANKIT_PROFILE.phone}`} className="hover:text-[#d9381e]">
              {ANKIT_PROFILE.phoneDisplay}
            </a>
          </dd>
        </div>
        <div data-contact-ledger-row>
          <dt className="font-mono-tabular text-xs uppercase text-[#141413]/50">Address</dt>
          <dd className="mt-1 font-medium text-[#141413]/80">{ANKIT_PROFILE.addressFull}</dd>
        </div>
        <div data-contact-ledger-row>
          <dt className="font-mono-tabular text-xs uppercase text-[#141413]/50">Local Time</dt>
          <dd className="mt-1 font-mono-tabular font-medium">{localTime} IST (GMT+5:30)</dd>
        </div>
      </dl>

      <div
        data-contact-ledger-row
        className="border-t border-[#141413]/12 pt-5 flex flex-wrap gap-4 text-xs font-semibold"
      >
        <a
          href={ANKIT_PROFILE.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-underline"
        >
          LinkedIn
        </a>
        <a
          href={ANKIT_PROFILE.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-underline"
        >
          GitHub
        </a>
        <a
          href={ANKIT_PROFILE.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-underline"
        >
          Instagram
        </a>
        <a
          href={ANKIT_PROFILE.socials.certificates}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-underline"
        >
          Certificates
        </a>
        <a
          href={ANKIT_PROFILE.socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-underline"
        >
          Resume
        </a>
      </div>
    </div>
  );
}
