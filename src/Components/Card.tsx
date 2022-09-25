import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { IBacklogItem } from "../Models/Backlog.Model";
import { getCardByStatus } from "../utils/cardService";
import { deleteCard, editCard } from "../utils/dispatchAction";
import FormModal from "./FormModal";
import { DeleteFilled } from "@ant-design/icons";
import { Tooltip, Modal } from "antd";
import "../Styles/Card.css";
const { confirm } = Modal;

interface IComponentProp {
  data: IBacklogItem;
  index: number;
}

export default function Card({ data, index }: IComponentProp) {
  const { status, name, description, id } = data;
  const [isShown, setIsShown] = useState(false);
  const [showDelete, setShownDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const modalHandler = () => setIsShown(!isShown);
  const showDeleteConfirm = () => setShownDelete(true);
  const hideDeleteConfirm = () => setShownDelete(false);

  const isChanged = (data: any) => {
    return name !== data.name || description !== data.description;
  };

  const onUpdateCard = async (data: any) => {
    try {
      const card = getCardByStatus(id, status);
      const payload: IBacklogItem = {
        id,
        index: card.index,
        status,
        name: data.title,
        description: data.description,
      };

      if (isChanged(payload)) dispatch(editCard(status, payload));
      modalHandler();
    } catch (error) {
      console.log("error =>", error);
    }
  };

  const onDeleteCard = async () => {
    const card = getCardByStatus(id, status);
    dispatch(deleteCard(status, card.index));
  };

  const showConfirmDelete = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    confirm({
      title: `Do you want to delete : ${name}?`,
      okText: "Delete",
      okType: "danger",
      onOk() {
        onDeleteCard();
      },
    });
  };

  return (
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <div
            className="card"
            onClick={modalHandler}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={showDeleteConfirm}
            onMouseLeave={hideDeleteConfirm}
          >
            <>
              {!showDelete ? (
                <div className={`tag ${status}`}>{status}</div>
              ) : (
                <Tooltip placement="bottom" title="Delete">
                  <div className={`tag delete`} onClick={showConfirmDelete}>
                    <DeleteFilled />
                  </div>
                </Tooltip>
              )}
            </>

            <div className="title">{name}</div>
            {description && <div className="detail">{description}</div>}
          </div>
        )}
      </Draggable>

      <FormModal
        isShown={isShown}
        submitText="Update"
        title={name}
        description={description}
        modalHandler={modalHandler}
        handleFunction={onUpdateCard}
      />
    </>
  );
}
