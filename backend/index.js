const express=require('express');
const connectToMongo=require('./db');
const app = express()
const port = 5000;
var cors = require('cors')
 
app.use(cors())

connectToMongo();
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.get("/",(req,res)=>{
  res.send("hello there");
})

app.listen(port, () => {
  console.log(`CloudNotes backend listening on http://localhost:${port}`)
})