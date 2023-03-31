import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiCircle } from "react-icons/gi";
import { BsCheck2Circle } from "react-icons/bs";

const ListItem = ({
  item,
  toggleCompleted,
  deleteTodo,
  completed,
  handleDragStart,
  index,
}) => {
  const handleChange = (event) => {
    toggleCompleted(item.id, event.target.checked);
  };
  return (
    <li
      key={item.id}
      onClick={() => {
        toggleCompleted(item.id);
      }}
      draggable="true"
      onDragStart={handleDragStart}
      data-index={index}
    >
      {/* <input
        title={completed ? "Mark as incomplete" : "Mark as complete"}
        type="checkbox"
        checked={completed}
        className=""
        onClick={() => {
          toggleCompleted(item.id);
        }}
        onChange={handleChange}
      ></input> */}

      {completed ? (
        <div
          title={completed ? "Mark as incomplete" : "Mark as complete"}
          className="complete-btn"
          onClick={() => {
            toggleCompleted(item.id);
          }}
          onChange={handleChange}
        >
          <BsCheck2Circle size={20} />
        </div>
      ) : (
        <div
          title={completed ? "Mark as incomplete" : "Mark as complete"}
          className="complete-btn"
          onClick={() => {
            toggleCompleted(item.id);
          }}
          onChange={handleChange}
        >
          <GiCircle size={20} />
        </div>
      )}

      <span className={completed ? "completed" : undefined}>{item.text}</span>
      <button
        title="Delete todo"
        className="delete-btn"
        onClick={(e) => {
          deleteTodo(e, item.id);
        }}
      >
        <RiDeleteBin6Line size="17" />
      </button>
    </li>
  );
};

export default ListItem;
