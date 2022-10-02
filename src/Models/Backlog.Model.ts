export enum Status {
  'TODO' = 'TODO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export type IBacklog = {
  [key in Status]: IBacklogItem[]
}

export interface IBacklogItem {
  id: string
  index?: number
  status: Status
  name: string
  description: string
}
