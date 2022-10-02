import { db } from '../../firebase/config'
import { IBacklogItem, Status } from '../../Models/Backlog.Model'
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  collection,
} from '@firebase/firestore'
import user from '../user'

class BacklogRepository {
  createItem = async (data: IBacklogItem) => {
    const docRef = doc(db, user.id, data.id)
    await setDoc(docRef, data)
  }

  getItems = async (status: Status) => {
    const q = query(collection(db, user.id), where('status', '==', status))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((el) => el.data() as IBacklogItem)
  }

  updateItem = async (data: IBacklogItem) => {
    const docRef = doc(db, user.id, data.id)
    await updateDoc(docRef, data as any)
  }

  deleteItem = async (docId: string) => {
    const docRef = doc(db, user.id, docId)
    await deleteDoc(docRef)
  }
}

export default new BacklogRepository()
