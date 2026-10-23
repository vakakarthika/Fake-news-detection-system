import JSZip from 'jszip';

export async function downloadProjectZip() {
  try {
    // Primary method: fetch full archive directly from server endpoint
    const response = await fetch('/api/download-project-zip');
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'veritas-ai-fake-news-detector.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      return { success: true, method: 'server' };
    }
  } catch (err) {
    console.warn('Server zip download endpoint failed, generating client bundle:', err);
  }

  // Fallback: client-side zip creation using JSZip
  const zip = new JSZip();

  zip.file(
    'README.md',
    `# Veritas AI - Fake News Detector & Credibility Analysis Studio

A modern, high-precision misinformation forensic application built with React, TypeScript, Tailwind CSS, Express, and Google Gemini 3.8 Flash.

## Quick Start in VS Code:
1. Open this folder in VS Code
2. Run \`npm install\`
3. (Optional) Set \`GEMINI_API_KEY\` in your \`.env\` file
4. Run \`npm run dev\`
5. Open \`http://localhost:3000\`
`
  );

  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'veritas-fake-news-detector',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'tsx server.ts',
          build: 'vite build',
          start: 'tsx server.ts',
          preview: 'vite preview',
          lint: 'tsc --noEmit',
        },
        dependencies: {
          '@google/genai': '^2.4.0',
          '@tailwindcss/vite': '^4.3.3',
          '@vitejs/plugin-react': '^6.1.1',
          dotenv: '^17.2.3',
          express: '^4.21.2',
          jszip: '^3.10.2',
          'lucide-react': '^0.546.0',
          motion: '^12.23.24',
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          vite: '^8.3.0',
        },
        devDependencies: {
          '@types/express': '^4.17.21',
          '@types/jszip': '^3.4.1',
          '@types/node': '^22.14.0',
          '@types/react': '^19.3.0',
          '@types/react-dom': '^19.3.0',
          tsx: '^4.21.0',
          typescript: '^7.0.2',
        },
      },
      null,
      2
    )
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = window.URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'veritas-ai-fake-news-detector.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  return { success: true, method: 'client' };
}
