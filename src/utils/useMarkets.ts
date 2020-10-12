import { useEffect, useMemo, useState } from "react"
import api from "services/api"
import { Market } from "types/app"

type UseMarketsResult = [data: Market[] | null]

const useMarkets = () => {
  const [marketsData, setMarketsData] = useState<Market[] | null>(null)
  
  async function getMarkets() {
    const response = await api.get('/market')
    setMarketsData(response.data.markets)
  }

  useEffect(() => {
    if(!marketsData) {
      getMarkets()
    }
  }, [marketsData])

  const result: UseMarketsResult = useMemo(() => [marketsData], [marketsData])
  return result
}

export default useMarkets