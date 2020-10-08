import { tailwind } from 'lib/styles'
import moment from 'moment'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React, { useMemo } from 'react'
import {
  FlatList,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface HoursProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const windows: Window[] = [
  {
    id: 2,
    weekDay: 'tuesday',
    startsAt: '09:00',
    endsAt: '20:00',
    createdAt: '2020-10-06T02:35:35.468Z',
    updatedAt: '2020-10-06T02:35:35.468Z',
    marketId: 6,
  },
  {
    id: 3,
    weekDay: 'sunday',
    startsAt: '09:00',
    endsAt: '13:00',
    createdAt: '2020-10-06T02:35:35.465Z',
    updatedAt: '2020-10-06T02:35:35.465Z',
    marketId: 6,
  },
  {
    id: 5,
    weekDay: 'monday',
    startsAt: '09:00',
    endsAt: '20:00',
    createdAt: '2020-10-06T02:35:35.476Z',
    updatedAt: '2020-10-06T02:35:35.476Z',
    marketId: 6,
  },
  {
    id: 6,
    weekDay: 'wednesday',
    startsAt: '09:00',
    endsAt: '20:00',
    createdAt: '2020-10-06T02:35:35.476Z',
    updatedAt: '2020-10-06T02:35:35.476Z',
    marketId: 6,
  },
  {
    id: 7,
    weekDay: 'friday',
    startsAt: '09:00',
    endsAt: '12:00',
    createdAt: '2020-10-06T02:35:35.496Z',
    updatedAt: '2020-10-06T02:35:35.496Z',
    marketId: 6,
  },
  {
    id: 71,
    weekDay: 'friday',
    startsAt: '13:00',
    endsAt: '20:00',
    createdAt: '2020-10-06T02:35:35.496Z',
    updatedAt: '2020-10-06T02:35:35.496Z',
    marketId: 6,
  },
  {
    id: 8,
    weekDay: 'saturday',
    startsAt: '09:00',
    endsAt: '20:00',
    createdAt: '2020-10-06T02:35:35.695Z',
    updatedAt: '2020-10-06T02:35:35.695Z',
    marketId: 6,
  },
  {
    id: 9,
    weekDay: 'thursday',
    startsAt: '09:00',
    endsAt: '10:00',
    createdAt: '2020-10-08T16:03:28.339Z',
    updatedAt: '2020-10-08T16:03:28.339Z',
    marketId: 6,
  },
  {
    id: 10,
    weekDay: 'thursday',
    startsAt: '11:00',
    endsAt: '12:00',
    createdAt: '2020-10-08T16:03:28.355Z',
    updatedAt: '2020-10-08T16:03:28.355Z',
    marketId: 6,
  },
  {
    id: 11,
    weekDay: 'thursday',
    startsAt: '10:00',
    endsAt: '11:00',
    createdAt: '2020-10-08T16:03:28.363Z',
    updatedAt: '2020-10-08T16:03:28.363Z',
    marketId: 6,
  },
  {
    id: 12,
    weekDay: 'thursday',
    startsAt: '12:00',
    endsAt: '13:00',
    createdAt: '2020-10-08T16:03:28.363Z',
    updatedAt: '2020-10-08T16:03:28.363Z',
    marketId: 6,
  },
]

interface Window {
  id: number
  weekDay: WeekDay
  startsAt: string
  endsAt: string
  createdAt: string
  updatedAt: string
  marketId: number
}
type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

const Hours: React.FC<HoursProps> = ({
  style,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  moment.locale('en')

  const dayToMoment =
    Number(deliveryOrPickup?.day) < 10
      ? '0' + deliveryOrPickup?.day
      : deliveryOrPickup?.day
  const dateString = moment().format()
  const dateToWindow = dateString.slice(0, 8) + dayToMoment
  const todayWeekDay = moment(dateToWindow).format('dddd').toLowerCase()

  const deliveryTimesArr = useMemo(
    () => windows.filter(item => item.weekDay === todayWeekDay),
    [todayWeekDay, deliveryOrPickup?.day],
  )

  const handleChangeHourOption = (hourId: number) => {
    setDeliveryOrPickup({
      delivery: true,
      hour: hourId,
      day: deliveryOrPickup?.day || null,
    })
  }

  const renderItem = ({ item }: { item: Window }) => (
    <TouchableOpacity
      onPress={() => handleChangeHourOption(item.id)}
      style={tailwind(
        `border border-primary-500 px-2 py-3 rounded mr-2 ${
          item.id === deliveryOrPickup?.hour ? 'bg-primary-500' : 'bg-white'
        }`,
      )}
    >
      <Text
        style={tailwind(
          `text-center ${
            item.id === deliveryOrPickup?.hour
              ? 'text-white'
              : 'text-primary-500'
          }`,
        )}
      >
        {item.startsAt.slice(0, 2)} - {item.endsAt}h
      </Text>
    </TouchableOpacity>
  )

  const memoizedValue = useMemo(() => renderItem, [
    deliveryTimesArr,
    deliveryOrPickup,
  ])
  return (
    <View style={[tailwind('items-center'), style]}>
      <FlatList
        data={deliveryTimesArr}
        horizontal
        pagingEnabled
        maxToRenderPerBatch={30}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={memoizedValue}
      />
    </View>
  )
}

Hours.displayName = 'Hours'

export default Hours
