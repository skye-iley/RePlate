import express from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use("/planned", routes);

app.listen(PORT, () => {
  console.log(`PlannedDonations service running on port ${PORT}`);
}); 
