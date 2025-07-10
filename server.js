const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = {}; // Dữ liệu giả

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(409).json({ message: "Tài khoản đã tồn tại" });
  users[username] = { password, balance: 0 };
  res.json({ success: true, message: "Đăng ký thành công" });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username]) return res.status(404).json({ message: "Tài khoản không tồn tại" });
  if (users[username].password !== password) return res.status(401).json({ message: "Sai mật khẩu" });
  res.json({ success: true, message: "Đăng nhập thành công", user: { username, balance: users[username].balance } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API chạy trên cổng ${PORT}`);
});
