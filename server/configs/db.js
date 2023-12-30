import mongoose from 'mongoose'

//database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'keep-clone',
    })
    console.log('DB connected!')
  } catch (err) {
    console.error('Error connecting to DB:', err)
    process.exit(1)
  }
}

export default connectDB
