import { IBacklog, Status } from '../Models/Backlog.Model'

export const mockData: IBacklog = {
  [Status.TODO]: [
    {
      id: 't-1',
      status: 'TODO' as Status,
      name: 'test1-todo',
      description: 'test description',
    },
    {
      id: 't-2',
      status: 'TODO' as Status,
      name: 'test2-todo',
      description:
        'test overflow text, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, laboriosam.',
    },
    {
      id: 't-3',
      status: 'TODO' as Status,
      name: 'test3-todo',
      description: '',
    },
  ],
  [Status.DOING]: [
    {
      id: 't-4',
      status: 'DOING' as Status,
      name: 'test1-doing',
      description: '',
    },
  ],
  [Status.DONE]: [
    {
      id: 't-5',
      status: 'DONE' as Status,
      name: 'test1-done',
      description: 'my test finish',
    },
    {
      id: 't-6',
      status: 'DONE' as Status,
      name: 'test overflow title, Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
      description: 'Yay go done',
    },
  ],
}
