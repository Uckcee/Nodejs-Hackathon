const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const userroute = require('./app/route/user.route')
const transfer = require('./app/route/transaction.route')
const wallet = require('./app/route/wallet.route')

const server = express()
const port = 8083

// server.use(cors())
server.use(express.json())
server.use(userroute)
server.use(transfer)
server.use(wallet)
const dbURL =
  "mongodb+srv://uchekelechi002:sancheazy04@cluster0.q5jvlui.mongodb.net/?retryWrites=true&w=majority";


try {
    mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once("open", (error, db) => {
      if (error) {
        console.log("Error connecting to the database");
      } else {
        console.log("Connection Successful!");
      }
    });

}   catch (error) {
    console.log(error)
}

server.listen(port, () => {
    console.log('Connected')
})