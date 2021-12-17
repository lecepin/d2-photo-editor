import React from "react";
import classnames from "classnames";

import "./view.less";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, type } = this.props;

    const typeMap = {
      jx: "https://img.alicdn.com/imgextra/i2/O1CN01Fe2s271gk1t3ZbnNi_!!6000000004179-2-tps-1192-720.png",
      d2: "https://img.alicdn.com/imgextra/i2/O1CN01FYoKj91X6nPwFoAvK_!!6000000002875-2-tps-601-105.png",
    };

    return (
      <img
        className={classnames(className, "banner-picture")}
        src={typeMap[type]}
      />
    );
  }
}
