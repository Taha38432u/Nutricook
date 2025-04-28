const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http"); // ⬅️ Needed for socket.io
const { Server } = require("socket.io");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: "./conf.env" });

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("✅ DB connection successful");
});

// Initialize Express app
const app = require("./app");

// Create HTTP server manually (to attach Socket.IO)
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [
      "https://nutricook-frontend.vercel.app",
      /^http:\/\/localhost:\d+$/,
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  // Example listener
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {});
});

// Attach io to app so it’s available in controllers
app.set("io", io);

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`🚀 App running on port ${port} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥 Shutting down...");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
