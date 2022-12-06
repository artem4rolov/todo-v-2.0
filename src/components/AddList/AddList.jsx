import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames";

import addListSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

export default function AddList({ colors, addList }) {
  const [visibleModal, setVisibleModal] = useState(false); // показываем модалку
  const [listName, setListName] = useState(""); // имя будущего списка
  const [selectedColor, setSelectedColor] = useState(2); // цвет кружочка
  const [loading, setLoading] = useState(false); // смена текста кнопки при добавлении нового списка

  // добавляем новый список и передаем в state App.jsx
  const onAddList = () => {
    if (!listName) {
      alert("Введите название списка!");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:3001/lists", {
        name: listName,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        // после фильтрации colors по id, у нас остается массив colors с одним объектом
        // чтобы обратиться к этому объекту, пишем [0], т.к. он один в массиве, затем
        // обращаемся к свойству этого объекта name, чтобы получить название цвета
        const color = colors.filter((item) => item.id === selectedColor)[0];
        // формируем новый объект списка с name, colorId, color: {color.name}, id задаст автоматически сервер
        const listObj = {
          ...data,
          color: { name: color.name, hex: color.hex },
        };
        // добавляем новый объект списка в state
        addList(listObj);
      })
      .catch(() => {
        alert("Не удалось добавить список!");
      })
      .finally(() => {
        // скрываем модалку после всего
        onCloseModal();
      });

    // передаем новый list в App.jsx
  };

  const onCloseModal = () => {
    setVisibleModal(false);
    setSelectedColor(1);
    setListName("");
    setLoading(false);
  };

  return (
    <>
      {visibleModal ? (
        <>
          <div className="add__modal-blured"></div>
          <div className="add__modal">
            <input
              type="text"
              className="field"
              placeholder="Название списка"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className="add__modal-colors">
              {colors
                ? colors.map((color, index) => {
                    return (
                      <i
                        key={color.id}
                        // активный кружок с цветом
                        className={`${color.name} ${
                          selectedColor === color.id && "active"
                        }`}
                        // задаем в state активный цвет кружка
                        onClick={() => setSelectedColor(color.id)}
                      />
                    );
                  })
                : null}
            </div>
            <button
              disabled={loading ? true : false}
              onClick={() => onAddList()}
              className="button"
            >
              {!loading ? "Добавить список" : "Добавление..."}
            </button>
            <img
              onClick={() => onCloseModal()}
              src={closeSvg}
              alt="close modal"
            />
          </div>
        </>
      ) : (
        <div
          onClick={() => setVisibleModal(!visibleModal)}
          className="add__list"
        >
          <img src={addListSvg} alt="добавить" />
          <span>Добавить список</span>
        </div>
      )}
    </>
  );
}
