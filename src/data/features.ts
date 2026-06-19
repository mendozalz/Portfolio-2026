export interface Feature {
  id: string;
  title: string;
  description: string;
  gridX: number;
  gridY: number;
  gridWidth: number;
}

export const features: Feature[] = [
  {
    id: 'long-running',
    title: 'Long-running processes',
    description:
      'Safely execute tasks that require extended computation or monitoring without risking system stability or security.',
    gridX: 2,
    gridY: 2,
    gridWidth: 3,
  },
  {
    id: 'streaming',
    title: 'Real time streaming',
    description:
      'Listen to standard output & error streams live when executing long-running commands',
    gridX: 5,
    gridY: 3,
    gridWidth: 3,
  },
  {
    id: 'preview-urls',
    title: 'Preview URLs',
    description:
      'Instantly expose any container port as a public URL with automatic subdomain routing',
    gridX: 2,
    gridY: 4,
    gridWidth: 3,
  },
  {
    id: 'code-interpreter',
    title: 'Code interpreter',
    description:
      'Run Python/JavaScript code directly, with rich outputs (charts, tables, images) parsed automatically for you',
    gridX: 5,
    gridY: 5,
    gridWidth: 3,
  },
  {
    id: 'filesystem',
    title: 'File system',
    description:
      'Easy methods for basic filesystem operations and cloning git repositories on the container filesystem',
    gridX: 2,
    gridY: 6,
    gridWidth: 3,
  },
  {
    id: 'exec',
    title: 'Command execution',
    description:
      'Run any shell command with proper exit codes, streaming, and error handling',
    gridX: 5,
    gridY: 7,
    gridWidth: 3,
  },
  {
    id: 'websockets',
    title: 'WebSockets',
    description:
      'Enable real-time, bidirectional communication by connecting directly to WebSocket servers running in the sandbox',
    gridX: 2,
    gridY: 8,
    gridWidth: 3,
  },
  {
    id: 'terminals',
    title: 'Interactive terminals',
    description:
      'Full PTY support for interactive terminal sessions with xterm-256color emulation, resize handling, and real-time I/O',
    gridX: 5,
    gridY: 9,
    gridWidth: 3,
  },
  {
    id: 'cloud-storage',
    title: 'Cloud storage mounting',
    description:
      'Mount S3-compatible buckets (R2, S3, GCS) as local filesystem paths for seamless data access',
    gridX: 2,
    gridY: 10,
    gridWidth: 3,
  },
  {
    id: 'docker',
    title: 'Custom Docker images',
    description:
      'Add sandbox capabilities to any Docker image with a single COPY command using the standalone binary',
    gridX: 5,
    gridY: 11,
    gridWidth: 3,
  },
  {
    id: 'ai-agents',
    title: 'AI coding agents',
    description:
      'Run AI coding assistants like OpenCode and Claude Code directly in the sandbox with pre-configured environments',
    gridX: 2,
    gridY: 12,
    gridWidth: 3,
  },
];
