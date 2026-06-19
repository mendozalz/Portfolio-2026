export interface Example {
  id: string;
  title: string;
  code: string;
  lang: 'typescript' | 'javascript' | 'shell';
}

export const examples: Example[] = [
  {
    id: 'file-ops',
    title: 'File Operations',
    lang: 'typescript',
    code: `import { getSandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env) {
    const sandbox = getSandbox(env.Sandbox, 'user-123');

    // Create a project structure
    await sandbox.mkdir('/workspace/project/src', {
      recursive: true
    });

    // Write files
    await sandbox.writeFile(
      '/workspace/project/package.json',
      JSON.stringify({ name: 'my-app', version: '1.0.0' })
    );

    // Read a file back
    const content = await sandbox.readFile(
      '/workspace/project/package.json'
    );
    return Response.json({ content });
  }
};`,
  },
  {
    id: 'ide',
    title: 'Interactive development environment',
    lang: 'typescript',
    code: `import { getSandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env) {
    const sandbox = getSandbox(env.Sandbox, 'user-123');

    // Clone a repository
    await sandbox.gitCheckout(
      'https://github.com/cloudflare/agents'
    );

    // Run tests
    const testResult = await sandbox.exec('npm test');

    return Response.json({
      tests: testResult.exitCode === 0 ? 'passed' : 'failed',
      output: testResult.stdout,
    });
  },
};`,
  },
  {
    id: 'preview',
    title: 'Expose services with preview URLs',
    lang: 'typescript',
    code: `import { getSandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env) {
    const sandbox = getSandbox(env.Sandbox, 'user-123');

    // Write and start a web server
    await sandbox.writeFile('/workspace/server.js', \`
      const http = require('http');
      http.createServer((req, res) => {
        res.end('Hello from sandbox!');
      }).listen(3000);
    \`);

    await sandbox.exec('node /workspace/server.js &');

    // Get a public preview URL for port 3000
    const previewUrl = await sandbox.getPreviewUrl(3000);

    return Response.json({ url: previewUrl });
  },
};`,
  },
  {
    id: 'nodejs',
    title: 'Run a Node.js app',
    lang: 'typescript',
    code: `import { getSandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env) {
    const sandbox = getSandbox(env.Sandbox, 'user-123');

    // Install dependencies
    await sandbox.exec('npm install express');

    // Write an Express app
    await sandbox.writeFile('/workspace/app.js', \`
      const express = require('express');
      const app = express();
      app.get('/', (req, res) => res.json({ status: 'ok' }));
      app.listen(3000);
    \`);

    // Start and expose it
    const { stdout } = await sandbox.exec('node /workspace/app.js &');
    const url = await sandbox.getPreviewUrl(3000);

    return Response.json({ url, stdout });
  },
};`,
  },
  {
    id: 'interpreter',
    title: 'Code Interpreter',
    lang: 'typescript',
    code: `import { getSandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env) {
    const sandbox = getSandbox(env.Sandbox, 'user-123');

    // Run Python code with rich output
    const result = await sandbox.runCode(\`
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({'x': [1,2,3,4,5], 'y': [2,4,6,8,10]})
plt.plot(df.x, df.y)
plt.savefig('/workspace/chart.png')
print(df.describe())
    \`, { language: 'python' });

    return Response.json({
      outputs: result.outputs,
      files: result.files,
    });
  },
};`,
  },
  {
    id: 'websockets',
    title: 'WebSocket Connections',
    lang: 'typescript',
    code: `import { getSandbox } from '@cloudflare/sandbox';

export default {
  async fetch(request: Request, env: Env) {
    // Upgrade to WebSocket
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 });
    }

    const sandbox = getSandbox(env.Sandbox, 'user-123');

    // Start a WebSocket server in the sandbox
    await sandbox.exec('node /workspace/ws-server.js &');

    // Connect directly to it
    const ws = await sandbox.connectWebSocket(8080);

    const [client, server] = Object.values(
      new WebSocketPair()
    );

    ws.accept();
    return new Response(null, { status: 101, webSocket: client });
  },
};`,
  },
];
