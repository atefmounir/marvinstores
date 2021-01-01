export const formatPrice = (number) => {
  return Intl.NumberFormat('EGP', {
    style: 'currency',
    currency: 'EGP'
  }).format(number / 100)
}


export const getUniqueValues = (data,type) => {
  let unique =data.map((item)=>item[type])

  if(type ==='colors'){                              //since colors are already in array format
    unique = unique.flat()                           //result will be ["red","orange","..."]
  }

  return ['all',...new Set(unique)]                  //result will be ["all","category1","category2","..."]
}
