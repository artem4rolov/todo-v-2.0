import React from "react";

import allListSvg from "../../assets/img/list.svg";

import "./List.scss";

const List = ({ items }) => {
  return (
    <>
      <ul className="list">
        {items.map((item, index) => {
          return (
            <li key={index} className="list-item">
              <i>{item.icon ? item.icon : null}</i>
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
