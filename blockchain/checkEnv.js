import * as dotenv from "dotenv";
dotenv.config();

console.log("Försöker läsa .env-filen...");
console.log("Värdet för SEPOLIA_RPC_URL är:", process.env.SEPOLIA_RPC_URL);
console.log("Värdet för SEPOLIA_PRIVATE_KEY är:", process.env.SEPOLIA_PRIVATE_KEY);