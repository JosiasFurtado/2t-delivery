export default function formatPrice(price: string) {
  const priceFormated = Number(price).toFixed(2).replace('.', ',')
  return `R$ ${priceFormated}`
}
