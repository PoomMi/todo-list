import { DispatchAction } from '../Models/DispatchAction.Model'
import cachData from '../utils/cacheData'

export const DoneReducer = (_, action: DispatchAction) => {
  let holdData = null

  switch (action.type) {
    case 'CREATE_DONE':
      cachData.updateDone([...action.payload])
      break
    case 'ADD_DONE':
      holdData = cachData.getDone()
      cachData.updateDone([...holdData, action.payload])
      break
    case 'EDIT_DONE':
      const index = action.payload.index
      holdData = cachData.getDone()
      cachData.updateDone([
        ...holdData.slice(0, index),
        ...[action.payload],
        ...holdData.slice(index + 1),
      ])
      break
    case 'DELETE_DONE':
      const idx = action.payload
      holdData = cachData.getDone()
      cachData.updateDone([
        ...holdData.slice(0, idx),
        ...holdData.slice(idx + 1),
      ])
      break
  }

  return cachData.getDoneByFilter()
}
