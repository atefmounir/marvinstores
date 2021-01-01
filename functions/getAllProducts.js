const Airtable = require('airtable');
require('dotenv').config()


Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table =base.table(process.env.AIRTABLE_TABLE)


exports.handler=async(event)=>{
  try {
    const products=await table.select().firstPage()
    const formattedProducts=products.map(product =>{
      const {id,fields:{name,price,image:[{url}],company,description,featured,category}}=product

      return{
        id,
        name,
        price,
        image:url,
        company,
        description,
        featured,
        category
      }
    })

    return{
      statusCode:200,
      body:JSON.stringify(formattedProducts)
    }
  }catch(err) {
    return{
      statusCode: 500,
      body: JSON.stringify({err:"Failed to load products from the server"})
    }
  }
}

