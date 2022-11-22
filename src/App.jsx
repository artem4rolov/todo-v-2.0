import React, { useState, useEffect } from "react";
import axios from "axios";

import AddList from "./components/AddList/AddList.jsx";
import List from "./components/List/List.jsx";
import Task from "./components/Task/Task.jsx";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(false);

  // при каждомв
  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color")
      .then(({ data }) => setLists(data))
      .catch(() => {
        alert("Не удалось загрузить список дел!");
      });

    axios
      .get("http://localhost:3001/colors")
      .then(({ data }) => setColors(data))
      .catch(() => {
        alert("Не удалось загрузить список цветов!");
      });
  }, []);

  const onAddList = (list) => {
    const newList = [...lists, list];
    setLists(newList);
  };

  const onDeleteList = (list) => {
    const newList = lists.filter((item) => item.id !== list.id);
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__list">
        {/* кнопка Все задачи */}
        <List
          items={[
            {
              name: "Все задачи",
              icon: (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                    fill="black"
                  />
                </svg>
              ),
            },
          ]}
        />

        {/* остальные списки */}
        <List
          onClickItem={(item) => setActiveItem(item)}
          activeItem={activeItem}
          items={lists}
          isRemovable
          deleteList={onDeleteList}
        />

        {/* кнопка добавить задачу */}
        <AddList colors={colors} addList={onAddList} />
      </div>

      <div className="todo__tasks">
        <Task
          tasks={[
            {
              id: 1,
              listId: 2,
              text: "Изучить JavaScript",
              completed: true,
            },
            {
              id: 2,
              listId: 2,
              text: "Изучить паттерны проектирования",
              completed: false,
            },
            {
              id: 3,
              listId: 2,
              text: "ReactJS Hooks (useState, useReducer, useEffect и т.д.)",
              completed: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
