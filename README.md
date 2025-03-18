# 준비

```

```

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18
npm install -g yarn
```

UI : http://ui.shadcn.com

style https://tailwindcss.com

시작하기

```
npm i -g yarn
yarn
cp .env.sample .env
// 환경설정 수정
VITE_APP_API_URL=http://localhost:8080/api/prelab
yarn dev
```

[http://localhost:4000 으로 확인하기.](http://localhost:3000)
