const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const qr = require('qrcode')

/* APP SET */
app.set('view engine', 'ejs')

/* APP USE */
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/assets', express.static('assets'))

/* RENDER */
app.get('/', (req, res) => {
    res.render('index')
})

/* POST */
app.post('/generateQR', async (req, res) => {

    const text = await req.body.text

    if(!text){
        res.send({
            status: false,
            message: 'Fill the input...'
        })
    } else{
        qr.toDataURL(text, (err,data)=>{
            if(err){console.log(err)}
            else{
                res.send({
                    status: true,
                    qr: data
                })
            }
        })
    }

})

/* SERVER */
const port = 3000
app.listen(port, (err,data) => {
    if(err){console.log('SERVER ERROR:', err)}
    else{console.log('SERVER LISTEN ON:', port)}
})