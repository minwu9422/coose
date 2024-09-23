const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const { exec, execSync } = require('child_process');
const port = process.env.SERVER_PORT || process.env.PORT || 3000;        

// root route
app.get("/", function(req, res) {
  res.send("Hello world!");
});

app.use('/xyz', createProxyMiddleware({
  target: 'http://127.0.0.1:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/xyz': '/', // 去掉路径前缀 /xyz
  }
}));

function runWeb() {
  const command1 = `nohup ./web -c ./config.json >/dev/null 2>&1 &`;
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
