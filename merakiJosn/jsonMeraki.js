const axios = require('axios');
const fs = require('fs');

const dataFetch = function(){
    if(!fs.existsSync('./merakiCrud/merakiData.json')){
        axios('http://saral.navgurukul.org/api/courses').then((data)=>{
            fs.writeFileSync('./merakiCrud/merakiData.json',JSON.stringify(data.data,null,4))
            console.log('Data Inserted Successfully...');
        })
    }else{
        console.log("Data allready Inserted");
    }
}
dataFetch()

const dataparse = (()=>{
    var parseData = JSON.parse(fs.readFileSync('./merakiCrud/merakiData.json'))
    return parseData
})

module.exports = {dataFetch,dataparse}