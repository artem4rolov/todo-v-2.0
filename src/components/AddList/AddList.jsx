import React, { useState } from "react";

import addListSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

export default function AddList({ colors }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [listName, setListName] = useState(""); // имя будущего списка
  const [selectedColor, setSelectedColor] = useState(1); // цвет кружочка

  const onAddList = (value) => {
    setListName(value);
  };

  return (
    <>
      {visibleModal ? (
        <div className="add__modal">
          <input
            type="text"
            className="field"
            placeholder="Название списка"
            value={listName}
            onInput={(e) => onAddList(e.target.value)}
          />
          <div className="add__modal-colors">
            {colors.map((color, index) => {
              return (
                <i
                  key={color.id}
                  className={`${color.name} ${
                    selectedColor === color.name && "active"
                  }`}
                  onClick={() => setSelectedColor(color.name)}
                />
              );
            })}
          </div>
          <button
            onClick={() => console.log(listName, selectedColor)}
            className="button"
          >
            Добавить список
          </button>
          <img
            onClick={() => setVisibleModal(false)}
            src={closeSvg}
            alt="close modal"
          />
        </div>
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
