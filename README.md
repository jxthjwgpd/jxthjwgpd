# Quasar Admin Element Pro (quasar-element-pro)

A Quasar Framework app

### 预览
<img src='./statics/quasar-admin.jpg' width="100%" />

### 安装
```bash
# Node.js >= 8.9.0 is required.
$ npm install -g @quasar/cli

& npm install
```

### 更新
```bash
# 检查可升级的软件包
$ quasar upgrade

# 做实际的升级
$ quasar upgrade --install
```

### 开发环境
```bash
quasar dev
```

### 生成环境编译
```bash
quasar build
```

### 检查
```bash
npm run lint
```

### 开发工具设置（vs code）
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

### 一个部署案例（nginx）
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

### 更多自定义配置
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
