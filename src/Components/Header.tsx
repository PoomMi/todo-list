import { useState, KeyboardEvent } from 'react'
import { Input, Button } from 'antd'
import styles from '../Styles/Header.module.scss'
import FormModal from './FormModal'
import { Status } from '../Models/Backlog.Model'
import { creatNewCard } from '../utils/cardService'
import { useDispatch } from 'react-redux'
import { addCard, searchCard } from '../utils/dispatchAction'
import cacheData from '../utils/cacheData'
import backlogRepo from '../utils/repositories/backlogRepo'
import user from '../utils/user'

const { Search } = Input

export default function Header() {
  const [isSearching, setIsSearching] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const dispatch = useDispatch()

  const searchHandler = (val: string) => {
    val ? onSearch(val) : onClearSearch()
  }

  const onSearchPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    searchHandler(value)
  }

  const onSearch = (val: string) => {
    if (val === cacheData.searchKey) return
    setIsSearching(true)

    cacheData.searchKey = val
    dispatch(searchCard(Status.TODO, val))
    dispatch(searchCard(Status.DOING, val))
    dispatch(searchCard(Status.DONE, val))

    setIsSearching(false)
  }

  const onClearSearch = () => {
    cacheData.searchKey = ''
    dispatch(searchCard(Status.TODO))
    dispatch(searchCard(Status.DOING))
    dispatch(searchCard(Status.DONE))
  }

  const modalHandler = () => {
    setIsShown(!isShown)
  }

  const onCreateCard = async (data: any) => {
    try {
      const payload = creatNewCard(data.title, data.description)

      if (user.id) await backlogRepo.createItem(payload)
      dispatch(addCard(Status.TODO, payload))
      modalHandler()
    } catch (error) {
      console.error('Create Error =>', error)
    }
  }

  return (
    <>
      <div className={styles.hdContainer}>
        <Search
          placeholder="Search Title"
          style={{ width: 250 }}
          loading={isSearching}
          onSearch={searchHandler}
          onPressEnter={onSearchPressEnter}
          enterButton
          allowClear
        />

        <Button type="primary" onClick={modalHandler}>
          Create
        </Button>
      </div>

      <FormModal
        isShown={isShown}
        submitText="Create"
        modalHandler={modalHandler}
        handleFunction={onCreateCard}
      />
    </>
  )
}
