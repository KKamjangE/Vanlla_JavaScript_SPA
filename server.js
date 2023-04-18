// express 모듈 불러오기
const express = require("express");
const path = require("path");

// express 사용
const app = express();

// Server.js의 실행경로 + "/static"을 localhost:port/static으로 마운트
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// get요청이 오면 frontend/index.html 파일을 읽고 내용을 클라이언트로 전송한다.
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

// 포트번호 5000에서 서버를 실행한다.
app.listen(process.env.PORT || 5000, () => console.log("Server running ...."));
