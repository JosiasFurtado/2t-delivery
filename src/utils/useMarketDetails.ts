import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import api from "services/api"
import { RootState } from "store/modules/rootReducer"
import { MarketWithCategories, Payments } from "types/app"

type UseMarketDetailsResult = [{ data: MarketWithCategories | undefined, payments: Payments | undefined }]

const useMarketDetails = (id: number) => {
  const { addresses, activeAddressId } = useSelector(
    (state: RootState) => state.user,
  )
  const activeAdress = addresses?.find(address => address.id === activeAddressId)
  const [marketDetails, setMarketDetails] = useState<MarketWithCategories | undefined>()
  const [marketPayments, setMarketPayments] = useState<Payments | undefined>()

  async function getMarketDetails() {
    const response = await api.get(`/market/${id}?zipcode=${activeAdress ? activeAdress.zipcode : "25660-080"}`)
    const responsePayments = await api.get(`/market/${id}/payments`)
    setMarketPayments(responsePayments.data.payments)
    setMarketDetails(response.data.market)
  }

  useEffect(() => {
    if (!marketDetails) {
      getMarketDetails()
    }
  }, [marketDetails, activeAdress])

  useEffect(() => {
      getMarketDetails()
  }, [id])

  const result: UseMarketDetailsResult = useMemo(() => [{ data: marketDetails, payments: marketPayments }], [marketDetails, id])
  return result
}

export default useMarketDetails