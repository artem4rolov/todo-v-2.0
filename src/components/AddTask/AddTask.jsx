import React, { useState } from "react";

import addTaskSvg from "../../assets/img/add.svg";

import "./AddTask.scss";

export default function AddTask() {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <>
      {!showAddTask ? (
        <div onClick={() => setShowAddTask(true)} className="add__task-block">
          <img src={addTaskSvg} alt="add task" />
          <span>Добавить задачу</span>
        </div>
      ) : (
        <div className="add__task-form">
          <input type="text" className="field" />
          <button className="button">Добавить задачу</button>
          <button onClick={() => setShowAddTask(false)} className="button">
            Отмена
          </button>
        </div>
      )}
    </>
  );
}
