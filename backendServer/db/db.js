import mongoose from "mongoose"



async function dbConnect(){

try {
    const connection = await mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`);
        
} catch (error) {
    console.log(error.message);
    process.exit(1);
}
    

}

export default dbConnect