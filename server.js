const express = require('express');
const app = express();
const port = 4000;
const Router = require('./Router/router');
app.use(express.json());

app.use('/',Router)

app.listen(port,()=>{
    console.log(`MY SERVER RUNNING AT http://localhost:${port}`);
});
