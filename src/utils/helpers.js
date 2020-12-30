export const formatPrice = (number) => {
  return Intl.NumberFormat('EGP', {
    style: 'currency',
    currency: 'EGP'
  }).format(number / 100)
}


export const getUniqueValues = () => {}
