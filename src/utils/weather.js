const request= require('request')

const weather =(address ,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=0b94d8742b1ac6a54b3149c4ab1d3345&query=${address}`
  
    request({url:url,json:true},(error,data)=>{
      if(error){
        callback('Unable to connect the weather services',undefined)
      }
      else{
        callback(undefined,data)
      }
    })
  }
  
  module.exports=weather