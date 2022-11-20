import React from "react";

import "./Task.scss";

export default function Task() {
  return (
    <div className="task__block">
      <h1 className="task__block-title">Фронтенд</h1>

      <div className="task__block-item">
        <div className="task__block-item-check">
          <input type="checkbox" id="happy" />
          <label htmlFor="happy" />
        </div>

        <span className="task__block-item-text">
          Of course, you can do this, man!
        </span>
      </div>
    </div>
  );
}
