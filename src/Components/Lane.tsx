import { useEffect } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { mockData } from '../mock-data/data'
import { IBacklog, IBacklogItem, Status } from '../Models/Backlog.Model'
import styles from '../Styles/Lane.module.scss'
import { createCard } from '../utils/dispatchAction'
import Card from './Card'
import backlogRepo from '../utils/repositories/backlogRepo'
import user from '../utils/user'

interface IComponentProps {
  id: string
  status: Status
  data?: IBacklogItem[]
}

const Lane = ({ id, status, data }: IComponentProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    // fetch data
    const d = !user.id ? [] : await backlogRepo.getItems(status)
    dispatch(createCard(status, d))
  }

  return (
    <div className={styles.laneContainer}>
      <div className={styles.laneTitle}>{status}</div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className={styles.cardContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data?.map((el, index) => (
              <Card key={index} index={index} data={el} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

const mapStateToProps = function (state: IBacklog, props: IComponentProps) {
  return {
    id: props.id,
    status: props.status,
    data: state[props.status],
  } as IComponentProps
}

export default connect(mapStateToProps)(Lane)
