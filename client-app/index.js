const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8080/api",
    changeOrigin: true,
  })
);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const port = 5173;
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
