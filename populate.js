require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
    await connectDB(process.env.MONGO_URI)
        .then(() => {
            console.log("Populate connected to DB")
        })
        .catch((err) => {
            console.log(err)
        })
    await Product.deleteMany()
    await Product.create(jsonProducts)
        .then(() => {
            console.log("Database populated")
            process.exit(0)
        })
}
start().then(() => {
    console.log("All is working for populateJS")
})