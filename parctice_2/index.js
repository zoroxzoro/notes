const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const NotesRoute = require('./routes/notes')



// connection to mpngodb
connectDB()

// middleware
app.use(bodyParser.json())
app.use('/notes',NotesRoute)
app.use(express.static('public'))


app.listen(port,()=>{
    console.log(`server is running on PORT:${port}`);
})