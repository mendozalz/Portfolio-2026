interface Props {
  text: string;
  count?: number;
}

export default function TextShadow({ text, count = 10 }: Props) {
  return (
    <span
      className="flex flex-col leading-[0.8] space-y-[var(--gap)]"
      style={{ '--gap': '-0.7em' } as React.CSSProperties}
      aria-label={text}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            WebkitTextStroke: '1px var(--foreground)',
            color: 'var(--background)',
          }}
          className="select-none"
          aria-hidden="true"
        >
          {text}
        </span>
      ))}
      <span>{text}</span>
    </span>
  );
}

declare namespace React {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
