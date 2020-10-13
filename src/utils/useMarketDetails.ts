import { useEffect, useMemo, useState } from "react"
import api from "services/api"
import { MarketWithCategories } from "types/app"

type UseMarketDetailsResult = [data: MarketWithCategories | null]

const useMarketDetails = (id: number) => {
  const [marketDetails, setMarketDetails] = useState<MarketWithCategories | null>(null)

  async function getMarketDetails() {
    const response = await api.get(`/market/${id}`)
    setMarketDetails(response.data.market)
  }

  useEffect(() => {
    if(!marketDetails) {
      getMarketDetails()
    }
  }, [marketDetails, id])

  const result: UseMarketDetailsResult = useMemo(() => [marketDetails], [marketDetails, id])
  return result
}

export default useMarketDetails