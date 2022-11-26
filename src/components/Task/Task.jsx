import axios from "axios";
import React, { useEffect, useState } from "react";

import checkSvg from "../../assets/img/check.svg";
import editSvg from "../../assets/img/edit.svg";
import AddTask from "../AddTask/AddTask";

import "./Task.scss";

export default function Task({ list, onAddTask }) {
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get()
  // }, [])

  return (
    <div className="task__block">
      <div className="task__block-title">
        <h1 style={{ color: list.color.name }}>{list.name}</h1>
        <img src={editSvg} alt="" />
      </div>

      {list.tasks ? (
        list.tasks.map((task) => {
          return (
            <div key={task.id} className="task__block-item">
              <div className="task__block-item-check">
                <input type="checkbox" id={`${task.id}`} />
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
            </div>
          );
        })
      ) : (
        <p>Нет задач</p>
      )}
      <AddTask list={list} onAddTask={onAddTask} />
    </div>
  );
}
