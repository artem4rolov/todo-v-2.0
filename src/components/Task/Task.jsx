import axios from "axios";
import React, { useState, useEffect } from "react";

import editSvg from "../../assets/img/edit.svg";
import removeSvg from "../../assets/img/remove.svg";
import AddTask from "../AddTask/AddTask";

import "./Task.scss";

export default function Task({
  list,
  onAddTaskInApp,
  onDeleteTask,
  onCompleteTask,
  withoutEmpty,
  onEditTitle,
  onEditTaskText,
}) {
  const [isChecked, setIsChecked] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editTask = (task) => {
    const newTaskText = window.prompt("Текст задачи", task.text);
    if (newTaskText) {
      axios
        // .patch(`http://localhost:3001/tasks/${task.id}`, {
        //   text: newTaskText,
        // })
        .patch(
          `https://my-json-server.typicode.com/artem4rolov/dbapi/tasks/${task.id}`,
          {
            text: newTaskText,
          }
        )
        .then(() => {
          onEditTaskText(list.id, task.id, newTaskText);
        })
        .catch(() => {
          alert("Не удалось изменить текст задачи!");
        });
    }
  };

  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        // .patch(`http://localhost:3001/lists/${list.id}`, {
        //   name: newTitle,
        // })
        .patch(
          `https://my-json-server.typicode.com/artem4rolov/dbapi/lists/${list.id}`,
          {
            name: newTitle,
          }
        )
        .catch(() => {
          alert("Не удалось обновить название списка!");
        });
    }
  };

  const onChangeCheckbox = (e, task) => {
    // передаем в App.jsx id нашего списка, id задачи, которую отмечаем, и объект события e.target.checked для инпутов
    onCompleteTask(list.id, task.id, e.target.checked);
  };

  const deleteTask = (task) => {
    if (window.confirm(`Вы хотите удалить задачу ${task.text}?`)) {
      setIsLoading(true);
      task.text = "удаление...";
      axios
        // .delete(`http://localhost:3001/tasks/${task.id}`)
        .delete(
          `https://my-json-server.typicode.com/artem4rolov/dbapi/tasks/${task.id}`
        )
        .then((data) => {
          // console.log(data);
          onDeleteTask(list, task);
        })
        .catch(() => {
          alert("Не удалось удалить задачу!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      return;
    }
  };

  // передаем функцию onAddInApp в компонент App, для того чтобы внести новую task в state
  const onAddInApp = (activeList, taskObj) => {
    // передаем activeList ()
    onAddTaskInApp(activeList, taskObj);
  };

  return (
    <div className="task__block">
      <div className="task__block-title">
        <h1 style={list.color ? { color: list.color.hex } : null}>
          {list.name}
        </h1>
        <img onClick={() => editTitle(1, "title")} src={editSvg} alt="" />
      </div>
      {!withoutEmpty && list.tasks === 0 && <p>Нет задач</p>}
      {list.tasks
        ? list.tasks.map((task) => {
            return (
              <div key={task.id} className="task__block-item">
                <div className="task__block-item-check">
                  <input
                    type="checkbox"
                    id={`${task.id}`}
                    checked={task.completed}
                    onChange={(e) => onChangeCheckbox(e, task)}
                    // onClick={() => checkOutTask(task)}
                  />
                  <label htmlFor={`${task.id}`}>
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                </div>

                <span className="task__block-item-text">{task.text}</span>
                <img
                  className="task__block-item-edit"
                  onClick={() => editTask(task)}
                  src={editSvg}
                  alt="edit item"
                />
                <img
                  className="task__block-item-remove"
                  onClick={() => deleteTask(task)}
                  src={removeSvg}
                  alt="remove item"
                />
              </div>
            );
          })
        : null}
      <AddTask list={list} onAddInTask={onAddInApp} />
    </div>
  );
}
