const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const dbConnect = require('./configs/dbConnection');
dotenv.config();
const http = require('http');
const cors = require('cors');
const sockestInitialize = require('./sockets/socketConnection');

dbConnect();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

sockestInitialize(server);



app.use("/api/auth", userRoutes)
app.use("/message", messageRoutes)

app.use((req, res) => {
    res.send("<h1>Home page</h1>")
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})