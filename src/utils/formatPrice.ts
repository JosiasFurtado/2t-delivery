export default function formatPrice(price: number) {
  const priceFormated = String((price * 0.01).toFixed(2)).replace('.', ',')
  return `R$ ${priceFormated}`
}
