# Quasar Admin Element Pro (quasar-element-pro)

A Quasar Framework app

## Make sure you have Node >=8 and NPM >=5 installed on your machine.
```bash

# Node.js >= 8.9.0 is required.

$ yarn global add @quasar/cli
# or
$ npm install -g @quasar/cli

& npm install
```

### Developing
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```

### Lint the files
```bash
npm run lint
```

### User Settings JSON
```json
setting.json shift+ctrl+p

{
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false,
    "javascript.format.placeOpenBraceOnNewLineForFunctions": false,
    "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
    "typescript.format.placeOpenBraceOnNewLineForControlBlocks": false,
    "typescript.format.placeOpenBraceOnNewLineForFunctions": false,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatter.js": "vscode-typescript"
}
```

### An example config for nginx may look like this
```bash
server {
    listen 80 http2;
    server_name quasar.myapp.com;

    root /home/user/quasar.myapp.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/quasar.myapp.com-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
