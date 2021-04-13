import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import api from "services/api"
import { RootState } from "store/modules/rootReducer"
import { Market } from "types/app"

type UseMarketsResult = [{ data: Market[] | null }]

const useMarkets = () => {
  const { addresses, activeAddressId } = useSelector(
    (state: RootState) => state.user,
  )
  const activeAdress = addresses?.find(address => address.id === activeAddressId)
  const [marketsData, setMarketsData] = useState<Market[] | null>(null)
  
  useEffect(() => {
    async function getMarkets() {
      const response = await api.get(`/market?zipcode=${activeAdress ? activeAdress.zipcode : "25660-080"}`)
      setMarketsData(response.data.markets)
    }

      getMarkets()
  }, [activeAddressId])

  const result: UseMarketsResult = useMemo(() => [{ data: marketsData }], [marketsData, activeAddressId])
  return result
}

export default useMarkets