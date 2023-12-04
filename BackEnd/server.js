const express = require('express')
const app = express()
const port = 4000
// const cors = require('cors');

// {/*Made a new folder in React App and called BackEnd and added a file to that folder called
// server.js. */}
// {/*In server.js i intalled express and cors.*/}
// {/*In server.js in the terminal section i intalled body parser.*/}



// {/*in my server.js i added a few lines of code to to avoid a CORS error.*/}
// app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const path = require('path');
const bodyParser = require("body-parser");
{/*Here we are configuring express to use body-parser as middle-ware.*/}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@advanceddatabase.hug3cfs.mongodb.net/?retryWrites=true&w=majority');


}
const bookSchema = new mongoose.Schema({
  title:String,
  cover:String,
  author:String

})

const bookModel = mongoose.model('books', bookSchema);



// Serve the static files from the React app
{/*Serve static files from the 'build' directory at the root level*/}
{/*Serve static files from the 'build/static' directory under the '/static' route*/}

app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));






app.delete('/api/book/:id', async (req,res)=>{
  console.log("Delete: "+req.params.id);

  let book = await bookModel.findByIdAndDelete (req.params.id);
  res.send(book);
})



{/*Changed the React app so that it now makes a post request to the server (sending a
”book” object to the server).*/}

{/*Added a post method on the Express Server */}
app.post('/api/books', (req,res) =>{
    console.log(req.body);


    bookModel.create({
      title:req.body.title,
      cover:req.body.title,
      author:req.body.author
    })


    .then(
      ()=>{res.send("Data recieved")}
    )
    .catch(
      ()=>{res.send("Data NOT recieved")}
    )


   
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})



{/*added api books here from lab 5 */}
{/* Wrote a method that reads all data from the database and gets it to display on the react
app*/}

app.get('/api/books', async (req, res)=>{
    let books = await bookModel.find({});
    console.log(books);
    res.json(books);

})
/* added in an put component to allow updates*/
app.put('/api/book/:identifier' , async (req, res)=>{
  console.log("Edit: " +req.params.identifier)

  let book = await bookModel.findByIdAndUpdate(req.params.identifier,req.body,{new:true});
  res.send(book);
})

/*Write a method that reads a document/book by id from your database in your node/express
server*/



app.get('/api/book/:id', async (req,res)=>{
  console.log(req.params.id);
  let book = await bookModel.findById({_id:req.params.id})
  res.send(book);
})




{/*add at the bottom just over app.listen*/}
{/*Handles requests that don't match the ones above */}
{/*Send the 'index.html' file as the response for any route*/}
{/*dirname represents the current directory, and '/../build/index.html' is the path to the HTML file*/}
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})