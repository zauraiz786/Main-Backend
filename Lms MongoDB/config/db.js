import mongoose from "mongoose";
import { MONGO_URI } from "./environmentVariables.js";

mongoose.connect(MONGO_URI)

export default mongoose