import axios from "axios";
import React, { useState } from "react";

import addTaskSvg from "../../assets/img/add.svg";

import "./AddTask.scss";

export default function AddTask({ list, onAddInTask }) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false); // смена текста кнопки при добавлении нового списка

  const onCloseModal = () => {
    setShowAddTask(false);
    setInputText("");
    setLoading(false);
  };

  const addTask = (taskName) => {
    if (!taskName) {
      alert("Введите название списка!");
      return;
    }

    setLoading(true);

    axios
      // .post(`http://localhost:3001/tasks/`, {
      //   text: inputText,
      //   completed: false,
      //   listId: list.id,
      // })
      .post(`https://empty-knowing-library.glitch.me/tasks/`, {
        id: Math.random(),
        text: inputText,
        completed: false,
        listId: list.id,
      })
      .then(({ data }) => {
        // передаем новый объект задачи в Tasks.jsx, затем в App.js (в стейт)
        onAddInTask(list, data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Не удалось добавить список!");
        console.log(err);
      })
      .finally(() => {
        // скрываем модалку после всего
        onCloseModal();
      });

    // передаем новый list в App.jsx
  };

  return (
    <>
      {!showAddTask ? (
        <div onClick={() => setShowAddTask(true)} className="add__task-block">
          <img src={addTaskSvg} alt="add task" />
          <span>Добавить задачу</span>
        </div>
      ) : (
        <div className="add__task-form">
          <input
            onChange={(e) => setInputText(e.target.value)}
            // onInput={(e) => setInputText(e.target.value)}
            value={inputText}
            type="text"
            className="field"
          />
          <button
            disabled={loading ? true : false}
            onClick={() => {
              addTask(inputText);
            }}
            className="button"
          >
            {loading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={() => setShowAddTask(false)} className="button">
            Отмена
          </button>
        </div>
      )}
    </>
  );
}
