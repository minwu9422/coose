const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const { exec, execSync } = require('child_process');
const port = process.env.SERVER_PORT || process.env.PORT || 3000;        

// root route
app.get("/", function(req, res) {
  res.send("Hello world!");
});

// 新增代理中间件，将 /xyz 路径的请求转发到本地 8080 端口
app.use('/xyz', createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/xyz': '/', // 去掉路径前缀 /xyz
  }
}));


function runWeb() {
  const command1 = `nohup ./web -c ./web.json >/dev/null 2>&1 &`;
  exec(command1, (error) => {
    if (error) {
      console.error(`web running error: ${error}`);
    } else {
      console.log('web is running');

      setTimeout(() => {
        runServer();
      }, 2000);
    }
  });
}

app.listen(port, () => console.log(`App is listening on port ${port}!`));
