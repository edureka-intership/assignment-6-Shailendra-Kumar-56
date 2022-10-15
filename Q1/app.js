const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser')
const routes = require ('./routes/routes');

const port = 8500;
const hostname = 'localhost';
const dbUrl = 'mongodb://127.0.0.1:27017/zomato';
const DB = 'mongodb+srv://shailendra:Z1bG7N3T4OIvMCfK@zomato.snbvepr.mongodb.net/zomato?retryWrites=true&w=majority'



const app = express();

app.use(bodyParser.json())
app.use ('/', routes);

mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

.then( res => {
    app.listen(port, hostname, () => {
        console.log(`Server is running at ${hostname}:${port}`)
    });
})
.catch(err => console.log(err));