const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Importing
const userRoutes = require("./Routes/UserRoutes");

dotenv.config();

const app = express(); // ✅ لازم تيجي هنا قبل استخدام app

const PORT = process.env.PORT || 3000;

// Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Accounting System API",
      version: "1.0.0",
      description: "API documentation for the Accounting System",
      contact: {
        name: "Your Name or Company",
      },
      servers: [`http://localhost:${PORT}`],
    },
  },
  apis: ["./Routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB Connection
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to DB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to DB:", err);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// API Routes
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server Start
app.listen(PORT, () => {
  console.log(
    `🚀 Accounting System app running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});
