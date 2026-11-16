/**
 * Wraps each line/block inside an overflow-hidden 2D reveal mask so GSAP
 * can slide typography cleanly into view (`yPercent: 115 -> 0`).
 */
export function MaskedLine({ children, className = '', attr = 'data-reveal-line' }) {
  const dataProp = { [attr]: '' };
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span {...dataProp} className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

/**
 * Splits a headline or statement into individual word masks for kinetic
 * staggered 2D GSAP reveals (`yPercent: 115 -> 0`).
 */
export function SplitWords({
  text,
  className = '',
  wordAttr = 'data-split-word',
  accentLastWord = false,
}) {
  const words = text.trim().split(/\s+/);
  return (
    <span className={className}>
      {words.map((word, idx) => {
        const isLast = idx === words.length - 1;
        const dataProp = { [wordAttr]: '' };
        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-bottom mr-[0.23em] last:mr-0 pb-[0.04em]"
          >
            <span
              {...dataProp}
              className={`inline-block will-change-transform ${
                accentLastWord && isLast ? 'text-[#d9381e]' : ''
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}
