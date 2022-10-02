import { IBacklogItem, Status } from './Backlog.Model'

export type CreateAction = `CREATE_${Status}`
export type AddAction = `ADD_${Status}`
export type EditAction = `EDIT_${Status}`
export type DeleteAction = `DELETE_${Status}`
export type SearchAction = `SEARCH_${Status}` | `CLEAR_SEARCH_${Status}`

export interface ICreateDispatchAction {
  type: CreateAction
  payload: IBacklogItem[]
}

export interface IAddDispatchAction {
  type: AddAction
  payload: IBacklogItem
}

export interface ISearchDispatchAction {
  type: SearchAction
  payload: string | undefined
}

export interface IEditDispatchAction {
  type: EditAction
  payload: IBacklogItem
}

export interface IDeleteDispatchAction {
  type: DeleteAction
  payload: number
}

export type DispatchAction =
  | IAddDispatchAction
  | IEditDispatchAction
  | ICreateDispatchAction
  | ISearchDispatchAction
  | IDeleteDispatchAction
