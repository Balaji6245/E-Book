import { mongoose } from "../helpers/path";

export async function connectDB() {
    await mongoose.connect(process.env.DB_STRING + "e-book")
        .then(() => console.log(`Database connected successfully`.green.bold))
        .catch(() => console.log(`Could not connected database`.red.bold));
}