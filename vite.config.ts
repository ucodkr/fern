import path from "path"
import react from "@vitejs/plugin-react"
import { execSync } from 'child_process';
import { version } from './package.json';
import { defineConfig, loadEnv } from "vite"
// Git 태그가 있으면 태그를, 없으면 커밋 해시를 가져오기

import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig(({ mode }) => {
  let gitInfo;
  try {
    gitInfo = execSync('git describe --tags --abbrev=0').toString().trim(); // 태그 가져오기
  } catch (error) {
    gitInfo = execSync('git rev-parse --short HEAD').toString().trim(); // 태그가 없으면 커밋 해시 가져오기
  }

  const env = loadEnv(mode, process.cwd());
  const appTitle = env.VITE_APP_TITLE
  return {
    define: {
      __APP_VERSION__: JSON.stringify(version), // package.json의 버전 정보
      __GIT_TAG__: JSON.stringify(gitInfo), // git 태그 정보
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
          manualChunks (id) {
            if (id.includes('node_modules/react-icons')) {
              return 'react-icons';
            }
          }
        },
      },
    },

    plugins: [
      {
        name: 'custom-index-html',
        transformIndexHtml (html) {
          // 예시: 환경에 따라 제목(title) 변경
          if (appTitle) {
            return html.replace(
              '<title>UCOD DATE CRUD</title>',
              `<title>${appTitle}</title>`
            );
          }
          return html;
        },
      },
      {
        name: 'replace-index-html',
        buildStart () {
          // // 해당 환경에 맞는 index.html 파일이 있는지 확인 후 교체
          // if (fs.existsSync(customIndexHtmlPath)) {
          //   fs.copyFileSync(customIndexHtmlPath, srcIndexHtmlPath);
          //   console.log(`Using custom index.html for ${main} environment.`);
          // } else {
          //   console.log(`No custom index.html found for ${main}. Using default.`);
          // }
        },
      },
      react({
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),

      tsconfigPaths()],
    base: './',
    // base: '/services/react',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 4000,
    }
  }
}
)
