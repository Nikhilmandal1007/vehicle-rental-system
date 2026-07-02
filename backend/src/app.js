import express from "express";

import cors from "cors";

import userRoutes from "./routes/user.routes.js";

import authRoutes from "./routes/auth.routes.js";

import profileRoutes from "./routes/profile.routes.js";

import hostRoutes from "./routes/host.routes.js";

import adminRoutes from "./routes/admin.routes.js";

import vehicleRoutes from "./routes/vehicle.routes.js";



const app = express();


app.use(cors());

app.use(express.json());


// Test API
app.get("/", (req,res)=>{
    res.send("Vehicle Rental API Running...");
});
app.use("/api/auth",authRoutes);

app.use("/api/profile",profileRoutes);

app.use("/api/host",hostRoutes);

// User Route
app.use("/api/users", userRoutes);


app.use("/api/admin",adminRoutes);

app.use("/api/vehicles",vehicleRoutes);
app.get("/test-vehicle",(req,res)=>{
    res.send("Vehicle route working");
});

export default app;