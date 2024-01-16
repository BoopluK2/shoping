import mongoose from "mongoose";

const coonectDatebase = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URL);
      console.log("Монго на связи")
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
};

export default coonectDatebase;