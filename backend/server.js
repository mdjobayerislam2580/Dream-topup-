const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(session({
  secret: "free_secret",
  resave: false,
  saveUninitialized: true
}));

let orders = [];

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USER)
    return res.status(401).json({ msg: "Invalid user" });

  const ok = await bcrypt.compare(password, process.env.ADMIN_PASS_HASH);
  if (!ok) return res.status(401).json({ msg: "Wrong password" });

  req.session.admin = true;
  res.json({ msg: "Admin login success" });
});

app.post("/api/order", (req, res) => {
  orders.push({ ...req.body, status: "Pending" });
  res.json({ msg: "Order saved" });
});

app.get("/api/admin/orders", (req, res) => {
  if (!req.session.admin) return res.status(403).json({ msg: "Forbidden" });
  res.json(orders);
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
