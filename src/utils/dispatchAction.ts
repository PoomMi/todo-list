import { IBacklogItem, Status } from "../Models/Backlog.Model";
import { DispatchAction } from "../Models/DispatchAction.Model";

export const createCard = (
  key: Status,
  data: IBacklogItem[]
): DispatchAction => {
  return {
    type: `CREATE_${key}`,
    payload: data,
  };
};

export const addCard = (key: Status, data: IBacklogItem): DispatchAction => {
  return {
    type: `ADD_${key}`,
    payload: data,
  };
};

export const editCard = (key: Status, data: IBacklogItem): DispatchAction => {
  return {
    type: `EDIT_${key}`,
    payload: data,
  };
};


export const deleteCard = (key: Status, index: number): DispatchAction => {
  return {
    type: `DELETE_${key}`,
    payload: index,
  };
};
