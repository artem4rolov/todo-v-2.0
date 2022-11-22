import React, { useState } from "react";
import axios from "axios";

import Badge from "../Badge/Badge";
import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({ items, isRemovable, deleteList, onClickItem, activeItem }) => {
  const [loading, setLoading] = useState(false);

  const onDeleteList = (list) => {
    if (
      window.confirm(`Вы действительно хотите удалить список ${list.name}?`)
    ) {
      setLoading(true);
      list.name = "удаление...";
      axios
        .delete("http://localhost:3001/lists/" + list.id)
        .then(() => {
          deleteList(list);
        })
        .catch(() => {
          alert("Не удалось удалить список!");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return;
    }
  };

  return (
    <>
      <ul className="list">
        {items
          ? items.map((item, index) => {
              return (
                <li
                  key={item.id + index}
                  // сначала передаем в App.jsx item для установки activeItem в стейт
                  onClick={() => onClickItem(item)}
                  // затем проверяем, есть ли вообще activeItem в state App.jsx
                  // затем, сравниваем activeItem.id с нашим item.id
                  // если true - присваиваем класс active
                  className={`list-item ${
                    activeItem ? activeItem.id === item.id && "active" : null
                  }`}
                >
                  {item.icon ? item.icon : <Badge color={item.color.name} />}
                  <span>{item.name}</span>
                  {/* {console.log(item)} */}
                  {isRemovable ? (
                    <img
                      onClick={() => onDeleteList(item)}
                      src={removeSvg}
                      alt="remove item"
                    />
                  ) : null}
                </li>
              );
            })
          : "Загрузка..."}
      </ul>
    </>
  );
};

export default List;
