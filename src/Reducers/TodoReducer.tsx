import { DispatchAction } from '../Models/DispatchAction.Model'
import cachData from '../utils/cacheData'

export const TodoReducer = (_, action: DispatchAction) => {
  let holdData = null

  switch (action.type) {
    case 'CREATE_TODO':
      cachData.updateTodo([...action.payload])
      break
    case 'ADD_TODO':
      holdData = cachData.getTodo()
      cachData.updateTodo([...holdData, action.payload])
      break
    case 'EDIT_TODO':
      const index = action.payload.index
      holdData = cachData.getTodo()
      cachData.updateTodo([
        ...holdData.slice(0, index),
        ...[action.payload],
        ...holdData.slice(index + 1),
      ])
      break
    case 'DELETE_TODO':
      const idx = action.payload
      holdData = cachData.getTodo()
      cachData.updateTodo([
        ...holdData.slice(0, idx),
        ...holdData.slice(idx + 1),
      ])
      break
  }

  return cachData.getTodoByFilter()
}
