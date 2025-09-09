require('dotenv/config');
const express = require('express');
const api = require('../backend/routers/api/');
const app = express();
const cors = require('cors');
const path = require('path');
const {connectDb} = require('./db');
const config = require("./config");
const {allowedDomains} = config;

connectDb();

app.set('port', process.env.PORT);

//middlewares
app.use(cors({origin: allowedDomains}));
app.use(express.json());
app.use(express.static('uploads'));
app.use("/admin", express.static('uploads'));
app.use('/', api);

if (process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('../client/build'));
    app.get('/*', (req, res) => {
        //console.log("d dir", path.resolve(__dirname, '../client'))
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'), function(err){
            if(err) {
                res.status(500).send(err)
            }
        });
    });
}
else {
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'), function(err){
            if(err) {
                res.status(500).send(err)
            }
        });
    });
}


app.listen(app.get('port'), function(){
    console.log(`listening to port`);
});
