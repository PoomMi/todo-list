import { IBacklogItem } from '../Models/Backlog.Model'

class Cache {
  private todo: IBacklogItem[] = []
  private doing: IBacklogItem[] = []
  private done: IBacklogItem[] = []
  searchKey: string = ''

  // get data
  getTodo = () => {
    return [...this.todo]
  }
  getDoing = () => {
    return [...this.doing]
  }
  getDone = () => {
    return [...this.done]
  }

  getTodoByFilter = () => {
    return !Boolean(this.searchKey)
      ? this.getTodo()
      : this.todo.filter((el) => el.name.includes(this.searchKey))
  }
  getDoingByFilter = () => {
    return !Boolean(this.searchKey)
      ? this.getDoing()
      : this.doing.filter((el) => el.name.includes(this.searchKey))
  }
  getDoneByFilter = () => {
    return !Boolean(this.searchKey)
      ? this.getDone()
      : this.done.filter((el) => el.name.includes(this.searchKey))
  }

  //update data
  updateTodo = (data: IBacklogItem[]) => {
    this.todo = data
  }
  updateDoing = (data: IBacklogItem[]) => {
    this.doing = data
  }
  updateDone = (data: IBacklogItem[]) => {
    this.done = data
  }
}

export default new Cache()
