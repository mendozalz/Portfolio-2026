import { useState, useCallback } from 'react';

interface Props {
  installCommand?: string;
  githubUrl?: string;
}

export default function Header({
  installCommand = 'npm i @cloudflare/sandbox',
  githubUrl = 'https://github.com/cloudflare/sandbox',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
    } catch {
      const el = document.createElement('textarea');
      el.value = installCommand;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [installCommand]);

  return (
    <header className="border flex justify-between items-center pr-2 sm:pr-4 h-10 sm:h-12 bg-background sticky top-6 z-30">
      <button
        type="button"
        onClick={handleCopy}
        className="h-full border-r px-3 sm:px-4 flex items-center gap-2 font-mono text-sm sm:text-base hover:bg-foreground hover:text-background transition-colors cursor-pointer"
        aria-label="Copy install command"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {copied ? (
            <polyline points="20 6 9 17 4 12"></polyline>
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </>
          )}
        </svg>
        <span>{copied ? 'Copied!' : installCommand}</span>
      </button>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 sm:px-4 h-full hover:bg-foreground hover:text-background transition-colors text-sm"
        aria-label="View on GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          aria-hidden="true"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
        <span className="hidden sm:inline">GitHub</span>
      </a>
    </header>
  );
}
