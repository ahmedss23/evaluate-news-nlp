var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const https = require('https')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

const APIKey = process.env.API_KEY;
const lang = "en"  // 2-letter code, like en es fr ...

app.post('/test', function (req, res) {
    let data = ''

    const ReqData = new TextEncoder().encode(
        JSON.stringify({
                key: APIKey,
                txt: req.body.text,
                lang
        })
    )

    const options = {
        hostname: 'api.meaningcloud.com',
        port: 443,
        path: '/sentiment-2.1',
        mathod: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': ReqData.length
        }
    }

    const APIReq = https.request(options, resp=>{
        console.log(`statusCode: ${resp.statusCode}`)
        resp.on('data', chunk=>{
            data += chunk
        })
        
        resp.on('end', ()=>{
            res.send(JSON.parse(data))
        })

        req.on('error', error=>{
            console.log(error)
        })
    })
    APIReq.write(ReqData)
    APIReq.end()

})
