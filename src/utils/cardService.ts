import { v4 as uuidv4 } from 'uuid'
import { Status, IBacklogItem } from '../Models/Backlog.Model'
import cacheData from './cacheData'

export const creatNewCard = (name: string, desscription: string) => {
  return {
    id: uuidv4(),
    name: name,
    description: desscription || '',
    status: Status.TODO,
  } as IBacklogItem
}

export const getCardByStatus = (id: string, status: Status) => {
  let data: IBacklogItem[]
  if (status === Status.TODO) data = cacheData.getTodo()
  else if (status === Status.DOING) data = cacheData.getDoing()
  else data = cacheData.getDone()

  let idx: number
  const result = data.find((el, index) => {
    if (el.id === id) {
      idx = index
      return true
    }
  })

  return { data: result, index: idx }
}

export const updateCardStatus = (item: IBacklogItem, newSatus: Status) => {
  return {
    id: item.id,
    name: item.name,
    status: newSatus,
    description: item.description,
  } as IBacklogItem
}
