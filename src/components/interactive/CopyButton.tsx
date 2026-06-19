import { useState, useCallback } from 'react';

interface Props {
  text: string;
  label?: string;
  ariaLabel?: string;
  variant?: 'inline' | 'pill';
}

export default function CopyButton({
  text,
  label,
  ariaLabel = 'Copy to clipboard',
  variant = 'inline',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="font-mono text-3xl flex items-center justify-center h-[calc(100%+2px)] border rounded-full -my-px hover:bg-foreground hover:text-background transition-colors cursor-pointer w-full"
        aria-label={ariaLabel}
      >
        {copied ? '✓ copied!' : label ?? text}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 p-2 border bg-background hover:bg-foreground hover:text-background transition-all"
      aria-label={ariaLabel}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Copied</title>
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Copy</title>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  );
}
