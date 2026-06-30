import dotenv from "dotenv";
import app from "./app.js";
import bookingRoutes from "./routes/booking.routes.js";


app.use(
"/api/bookings",
bookingRoutes
);

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
Server is running 
`);
});