const express= require('express')
const path= require('path')
const hbs= require('hbs')
const weather= require('./utils/weather.js')
const app= express()

const port = process.env.PORT || 3000

//defines paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static library to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Ruthvik'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Ruthvik"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"What do you need help with ?",
        title:"help",
        name:"Ruthvik"
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return  res.send({
           error:"You must provide address."
       })
    }


    weather(req.query.address,(error,data={})=>{
        if(error){
        return res.send({error})
        }
        
        res.send({
                address:req.query.address,
                temperature:data.body.current.temperature,
                country:data.body.location.country
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"Help article not found",
        name:"Ruthvik"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"Page not found",
        name:"Ruthvik"
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})