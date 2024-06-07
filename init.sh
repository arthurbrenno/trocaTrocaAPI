# Verificar se o arquivo de marcação existe
if [ ! -f /application/trocaTroca/api/.initialized ]; then
  # Criando um package.json com o script start
  cat <<EOF > /application/trocaTroca/api/package.json
  {
    "name": "troca-troca-api",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "start": "nodemon --legacy-watch ./public --ext ts --exec \"ts-node ./public/index.ts\""
    }
  }
EOF
  # Comandos a serem executados apenas na primeira inicialização
  npm install -g npm@latest
  npm install ts-node
  npm install --save-dev nodemon 
  npm install --save-dev typescript 
  npm install express
  npm install --save-dev @types/express
  npm install --save-dev @types/node
  npm install crypto
  npm install bip39
  npm install firebase-admin

  echo '{"compilerOptions":{"target":"ES6","module":"commonjs","outDir":"./dist","strict":true,"esModuleInterop":true, "skipLibCheck": true}, "include": ["*/*.ts"], "exclude": ["node_modules"]}' > /application/trocaTroca/api/tsconfig.json
  npm install --prefix /application/trocaTroca/api

  # Criar o arquivo de marcação
  touch /application/trocaTroca/api/.initialized
fi

# Comando principal do contêiner
exec "$@"
