import { useState, useCallback } from 'react';

export interface HighlightedExample {
  id: string;
  title: string;
  html: string;
  code: string;
}

interface Props {
  examples: HighlightedExample[];
}

export default function ExamplesTabs({ examples }: Props) {
  const [activeId, setActiveId] = useState(examples[0]?.id ?? '');
  const [copied, setCopied] = useState(false);

  const active = examples.find((e) => e.id === activeId) ?? examples[0];

  const handleCopy = useCallback(async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.code);
    } catch {
      const el = document.createElement('textarea');
      el.value = active.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [active]);

  return (
    <div className="lg:grid lg:grid-cols-8 lg:border-l lg:auto-rows-fr flex flex-col lg:block">
      {/* Desktop: 15 empty filler squares */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="hidden lg:block border-r border-b aspect-square" />
      ))}

      {/* Mobile tab list */}
      <div className="lg:hidden border border-t-0 divide-y">
        {examples.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => setActiveId(ex.id)}
            className={`w-full text-left text-base sm:text-lg p-4 transition-colors flex items-center justify-between ${
              activeId === ex.id
                ? 'bg-foreground text-background'
                : 'hover:bg-foreground/10'
            }`}
          >
            <span>{ex.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        ))}
      </div>

      {/* Mobile code panel */}
      <div className="lg:hidden border border-t-0 overflow-x-auto">
        <div className="p-2 sm:p-4 relative h-full min-h-[300px]">
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 p-2 border bg-background hover:bg-foreground hover:text-background transition-all"
            aria-label="Copy code to clipboard"
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
          <div
            className="h-full w-full border bg-background pl-6 sm:pl-8 pr-3 sm:pr-4 pt-8 sm:pt-12 pb-3 sm:pb-4 overflow-auto"
            style={
              {
                '--default-mono-font-family': 'var(--font-mono)',
                '--background': 'transparent',
              } as React.CSSProperties
            }
            dangerouslySetInnerHTML={{ __html: active?.html ?? '' }}
          />
        </div>
      </div>

      {/* Desktop: tab list columns (2-wide, rows 2-4) */}
      <div
        className="col-start-[var(--x)] row-start-[var(--y)] border-r border-b border-foreground relative col-span-[var(--width)] row-span-[var(--height)] hidden lg:grid"
        style={{ '--x': 2, '--y': 2, '--width': 2, '--height': 3 } as React.CSSProperties}
      >
        <div className="divide-y h-full">
          {examples.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActiveId(ex.id)}
              className={`text-lg flex leading-tight items-center justify-between px-6 cursor-pointer transition-colors w-full text-left ${
                activeId === ex.id
                  ? 'bg-foreground text-background'
                  : 'hover:bg-foreground/10'
              }`}
              style={{ height: `${100 / examples.length}%` }}
            >
              <span>{ex.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: code panel (4-wide, 4-tall) */}
      <div
        className="col-start-[var(--x)] row-start-[var(--y)] border-r border-b border-foreground relative col-span-[var(--width)] row-span-[var(--height)] hidden lg:block"
        style={
          {
            '--x': 4,
            '--y': 2,
            '--width': 4,
            '--height': 4,
            aspectRatio: '1',
          } as React.CSSProperties
        }
      >
        <div className="p-2 sm:p-4 relative h-full group">
          {/* Corner decorations */}
          {[
            'top-0 left-0',
            'top-0 right-0',
            'bottom-0 left-0',
            'bottom-0 right-0',
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute size-[17px] ${pos} hidden lg:block [stroke:hsl(0,0%,0%)] dark:[stroke:hsl(0,0%,30%)]`}
            >
              <svg width="100%" height="100%" aria-hidden="true">
                {pos.includes('right') && pos.includes('top') ? (
                  <line y1="17" x2="17" stroke="currentColor" />
                ) : pos.includes('left') && pos.includes('bottom') ? (
                  <line y1="17" x2="17" stroke="currentColor" />
                ) : (
                  <line x2="17" y2="17" stroke="currentColor" />
                )}
              </svg>
            </div>
          ))}

          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 p-2 border bg-background hover:bg-foreground hover:text-background transition-all"
            aria-label="Copy code to clipboard"
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

          <div
            className="h-full w-full border bg-background pl-6 sm:pl-8 pr-3 sm:pr-4 pt-8 sm:pt-12 pb-3 sm:pb-4 overflow-auto"
            style={
              {
                '--default-mono-font-family': 'var(--font-mono)',
                '--background': 'transparent',
              } as React.CSSProperties
            }
            dangerouslySetInnerHTML={{ __html: active?.html ?? '' }}
          />
        </div>
      </div>
    </div>
  );
}

// Needed for CSSProperties with custom vars
declare namespace React {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
