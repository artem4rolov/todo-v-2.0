import React from "react";

import "./Badge.scss";

export default function Badge({ color }) {
  return <i className={`badge badge--${color}`} />;
}
