import React, { useState } from "react";

import addListSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

export default function AddList({ colors }) {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      {visibleModal ? (
        <div className="add__modal">
          <input type="text" className="field" placeholder="Название списка" />
          <div className="add__modal-colors">
            {colors.map((color, index) => {
              return (
                <i
                  key={index}
                  className={color.name}
                  onClick={() => console.log(index)}
                />
              );
            })}
          </div>
          <button className="button">Добавить список</button>
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
