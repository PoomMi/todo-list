import { DispatchAction } from '../Models/DispatchAction.Model'
import cachData from '../utils/cacheData'

export const DoingReducer = (_, action: DispatchAction) => {
  let holdData = null

  switch (action.type) {
    case 'CREATE_DOING':
      cachData.updateDoing([...action.payload])
      break
    case 'ADD_DOING':
      holdData = cachData.getDoing()
      cachData.updateDoing([...holdData, action.payload])
      break
    case 'EDIT_DOING':
      const index = action.payload.index
      holdData = cachData.getDoing()
      cachData.updateDoing([
        ...holdData.slice(0, index),
        ...[action.payload],
        ...holdData.slice(index + 1),
      ])
      break
    case 'DELETE_DOING':
      const idx = action.payload
      holdData = cachData.getDoing()
      cachData.updateDoing([
        ...holdData.slice(0, idx),
        ...holdData.slice(idx + 1),
      ])
      break
  }

  return cachData.getDoingByFilter()
}
