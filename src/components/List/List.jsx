import React from "react";

import Badge from "../Badge/Badge";
import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({ items, isRemovable }) => {
  return (
    <>
      <ul className="list">
        {items.map((item, index) => {
          return (
            <li key={index} className={`list-item ${item.active && "active"}`}>
              {item.icon ? item.icon : <Badge color={item.color} />}
              <span>{item.name}</span>
              {isRemovable ? <img src={removeSvg} alt="remove item" /> : null}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
