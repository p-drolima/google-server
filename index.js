const express = require('express');
const app = express()
const axios = require('axios')
const fs = require('fs')

app.use(express.json())

let rdapData = {
                        
    status: 'success',
    available: false,
    tier: 'standard',
    reason: 'in use',

};
  
rdapData = JSON.stringify(rdapData);
fs.writeFileSync(`data.json`, rdapData);

function statusChange() {

    setTimeout( function() {

        rdapData = {
                        
            status: 'success',
            available: true,
            tier: 'standard',
            reason: 'in use',
        
        };
          
        rdapData = JSON.stringify(rdapData);
        fs.writeFileSync(`data.json`, rdapData);

    }, 20000)

}

statusChange()

async function domainStatus() {

    let currentStatus =  fs.readFileSync(`data.json`);

    currentStatus = JSON.parse(currentStatus);

    return currentStatus

}

app.post('/', async function(req, res) {

    let result = await domainStatus()

    console.log(result)

    res.send(result);

})

app.listen(3000)