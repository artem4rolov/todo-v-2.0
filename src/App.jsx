import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import AddList from "./components/AddList/AddList.jsx";
import List from "./components/List/List.jsx";
import Task from "./components/Task/Task.jsx";

import rightSvg from "./assets/img/right.svg";
import lightSvg from "./assets/img/light.svg";
import darkSvg from "./assets/img/dark.svg";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [theme, setTheme] = useState("light");
  let history = useHistory();

  // https://my-json-server.typicode.com//artem4rolov/todo-v-2.0

  // при каждом обновлении lists (добавление, удаление, изменение списков), обновляем списки с задачами
  useEffect(() => {
    axios
      // .get("https://artem4rolov.github.io/dbapi/db.json/lists?_expand=color&_embed=tasks")
      .get(
        "https://empty-knowing-library.glitch.me/lists?_expand=color&_embed=tasks"
      )
      .then(({ data }) => setLists(data))
      .catch(() => {
        alert("Не удалось загрузить список дел!");
      });

    axios
      // .get("http://localhost:3001/colors")
      .get("https://empty-knowing-library.glitch.me/colors")
      .then(({ data }) => setColors(data))
      .catch(() => {
        alert("Не удалось загрузить список цветов!");
      });
  }, []);

  const onAddList = (list) => {
    const newList = [...lists, list];
    setLists(newList);
    // console.log(lists);
  };

  const onAddTask = (activeList, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === activeList.id) {
        // проверяем, есть ли вообще массив tasks в конкретном списке list по id
        if (item.tasks) {
          // если есть - пихаем туда новую таску
          item.tasks = [...item.tasks, taskObj];
        } else {
          // если нет таск в нашем списке - создаем ее, она будет первая
          item.tasks = [taskObj];
        }
      }
      return item;
    });
    setLists(newList);
    // console.log(newList);
  };

  const onDeleteTask = (activeList, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === activeList.id) {
        // выбираем только те дела, id которых не совпадает с тем, которое мы удаляем (все id, кроме taskObj.id)
        item.tasks = item.tasks.filter((item) => item.id !== taskObj.id);
      }
      return item;
    });
    setLists(newList);
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios
      // .patch(`http://localhost:3001/tasks/${taskId}`, {
      //   completed,
      // })
      .patch(`https://empty-knowing-library.glitch.me/tasks/${taskId}`, {
        completed,
      })
      .catch(() => {
        alert("Не удалось обновить задачу!");
      });
  };

  const onEditTaskText = (listId, taskId, newText) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = newText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (lists) {
      const activeList = lists.find((list) => list.id === Number(listId));
      setActiveItem(activeList);
    }
    // console.log(history.location.pathname.split("lists/")[1]);
  }, [lists, history.location.pathname]);

  const showMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  return (
    <div className={`todo ${theme ? "light" : "dark"}`}>
      <div
        className={`todo__list ${mobileSidebar ? "mobile__menu-show" : null}`}
      >
        <img
          onClick={() => showMobileSidebar()}
          src={rightSvg}
          alt=""
          className={`mobile__menu-btn ${mobileSidebar ? "rotate" : null}`}
        />
        {/* кнопка Все задачи */}
        <List
          activeItem={activeItem}
          onClickItem={(list) => {
            history.push("/");
          }}
          items={[
            {
              // active: true,
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
          onClickItem={(list) => {
            history.push(`/lists/${list.id}`);
            // setActiveItem(list);
          }}
          activeItem={activeItem}
          items={lists}
          isRemovable
          deleteList={(list) => {
            const newList = lists.filter((item) => item.id !== list.id);
            setLists(newList);
            // устанавливаем активный список в null, чтобы не отображать задачи несуществующего списка
            // setActiveItem(null);
          }}
        />
        {/* кнопка добавить задачу */}
        <AddList colors={colors} addList={onAddList} />
        <div className="switch__theme">
          <img
            onClick={() =>
              setTimeout(() => {
                setTheme(!theme);
              }, 100)
            }
            src={theme ? lightSvg : darkSvg}
            alt="theme"
          />
        </div>
      </div>

      <div className={`todo__tasks ${mobileSidebar ? "blur" : null}`}>
        <Route exact path="/">
          {lists &&
            lists.map((list) => (
              <Task
                key={list.id}
                list={list}
                onAddTaskInApp={onAddTask}
                onDeleteTask={onDeleteTask}
                onEditTitle={onEditListTitle}
                onCompleteTask={onCompleteTask}
                onEditTaskText={onEditTaskText}
                withoutEmpty
              />
            ))}
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem && (
            <Task
              list={activeItem}
              onAddTaskInApp={onAddTask}
              onDeleteTask={onDeleteTask}
              onEditTitle={onEditListTitle}
              onCompleteTask={onCompleteTask}
              onEditTaskText={onEditTaskText}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
