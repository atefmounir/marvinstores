const Airtable = require('airtable');
require('dotenv').config()


Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table =base.table(process.env.AIRTABLE_TABLE)


function wait(ms=0){
  return new Promise((resolve, reject) =>{
    setTimeout(resolve, ms)
  })
}

exports.handler=async(event)=>{
  await wait(2000)

  try{
    const productId=event.queryStringParameters.id
    const body=JSON.parse(event.body)

    const product=await table.find(productId)
    const formattedProduct={
      id:product.id,
      company:product.fields.brand,
      description:product.fields.description,
      category:product.fields.type,
      featured:product.fields.featured,
      image:product.fields.image,
      name:product.fields.name,
      price:product.fields.price,
      reviews:product.fields.reviews,
      stars:product.fields.rating,
      stock:product.fields.stock,
    }

    if(body){
      return{
        statusCode:200,
        body:JSON.stringify(formattedProduct)
      }
    }
  }catch(err){
    return{
      statusCode: 500,
      body: JSON.stringify({err:"Failed to load product from the server"})
    }
  }
}