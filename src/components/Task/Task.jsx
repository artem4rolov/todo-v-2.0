import axios from "axios";
import React, { useEffect, useState } from "react";

import editSvg from "../../assets/img/edit.svg";
import removeSvg from "../../assets/img/remove.svg";
import AddTask from "../AddTask/AddTask";

import "./Task.scss";

export default function Task({ list, onAddTaskInApp, onDeleteTask }) {
  const [isChecked, setIsChecked] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   checkOutTask();
  // });

  const checkOutTask = (task) => {
    axios
      .patch(`http://localhost:3001/tasks?listId=${list.id}`)
      .then(({ data }) => {
        const taskStatus = data.filter((item) => item.id === task.id)[0]
          .completed;
      });

    // .then(({ data }) => {
    //   const tasksInBase = data.filter(
    //     (taskInBase) => taskInBase.listId === list.id
    //   );
    //   const taskStatus = tasksInBase.filter((item) => item.id === task.id)[0]
    //     .completed;
    //   setIsChecked(taskStatus);
    // });
  };

  const deleteTask = (task) => {
    if (window.confirm(`Вы хотите удалить задачу ${task.text}?`)) {
      setIsLoading(true);
      task.text = "удаление...";
      axios
        .delete(`http://localhost:3001/tasks/${task.id}`)
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
        <h1 style={{ color: list.color.hex }}>{list.name}</h1>
        <img src={editSvg} alt="" />
      </div>
      {list.tasks === 0 && <p>Нет задач</p>}
      {list.tasks ? (
        list.tasks.map((task) => {
          return (
            <div key={task.id} className="task__block-item">
              <div className="task__block-item-check">
                <input
                  type="checkbox"
                  id={`${task.id}`}
                  checked={task.completed}
                  onChange={() => checkOutTask(task)}
                  // onClick={() => checkOutTask(task)}
                />
                <label
                  htmlFor={`${task.id}`}
                  // onClick={(e) => console.log(e.target)}
                >
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
                className="task__block-item-remove"
                onClick={() => deleteTask(task)}
                src={removeSvg}
                alt="remove item"
              />
            </div>
          );
        })
      ) : (
        <p>Нет задач</p>
      )}
      <AddTask list={list} onAddInTask={onAddInApp} />
    </div>
  );
}
