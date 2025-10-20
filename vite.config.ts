import { defineConfig, type PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  debugger;
  return {
    // plugins: getPlugins(command, mode),
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
});

function getPlugins(
  command: 'build' | 'serve',
  mode: string,
): PluginOption[] {
  const plugins: PluginOption = [];
  plugins.push(createHtmlPlugin({
    entry: mode === 'major' ? 'src/main.ts' : 'src/main2.ts'
  }));
  return plugins;
}