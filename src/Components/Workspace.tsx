import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { Status } from '../Models/Backlog.Model'
import styles from '../Styles/Workspace.module.scss'
import { getCardByStatus, updateCardStatus } from '../utils/cardService'
import { addCard, deleteCard } from '../utils/dispatchAction'
import backlogRepo from '../utils/repositories/backlogRepo'
import user from '../utils/user'
import Lane from './Lane'

export default function Workspace() {
  const dispatch = useDispatch()
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    // !destination for undroppable area
    // destination.droppableId === source.droppableId for same area
    if (!destination || destination.droppableId === source.droppableId) {
      return
    }
    // get originId and destinationId
    const originId = source.droppableId as Status
    const desId = destination.droppableId as Status
    // get card info
    const card = getCardByStatus(draggableId, originId)
    const { data: oldData, index } = card
    // update card status
    const newData = updateCardStatus(oldData, desId)
    // dispatch store
    dispatch(deleteCard(originId, index))
    dispatch(addCard(desId, newData))
    // update db
    if (user.id) await backlogRepo.updateItem(newData)
  }

  return (
    <>
      <div className={styles.wsContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(Status).map((status: Status) => {
            return <Lane key={status} id={status} status={status} />
          })}
        </DragDropContext>
      </div>
    </>
  )
}
