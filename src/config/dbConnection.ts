import mongoose from "mongoose"
export class mongoDB {
    public static async connectDB() {
        try {
            const connect = await mongoose.connect(process.env.mongoDbConnectionUrl as string);
            console.log("connection succesful", connect.connection.name);
            return
        } catch (error) {
            console.log(error);
            throw new Error("Error during Database connection");
        }
    }
}
