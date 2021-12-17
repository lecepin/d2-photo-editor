import React from "react";
import { Button, InputNumber } from "antd";
import { SwapOutlined } from "@ant-design/icons";

import "antd/lib/button/style/index.css";
import "antd/lib/input-number/style/index.css";

class PanelResizeCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // d2 size
      x: 600,
      y: 400,
    };
  }

  componentDidMount() {
    const { x, y } = this.state;
    setTimeout(() => {
      this.changeDomSize(x, y);
    });
  }

  handleOnChange(name, value) {
    this.setState({ [name]: value }, () => {
      const { x, y } = this.state;
      this.changeDomSize(x, y);
    });
  }

  changeDomSize(x, y) {
    const { ctx } = this.props;
    const canvasDOM = document.getElementById(ctx.get("canvas").containerId);

    canvasDOM.style.width = x + "px";
    canvasDOM.style.height = y + "px";
  }

  render() {
    const { x, y } = this.state;
    //
    return (
      <div>
        <InputNumber
          size="small"
          value={x}
          onChange={(value) => this.handleOnChange("x", value)}
        />
        &nbsp;x&nbsp;
        <InputNumber
          size="small"
          value={y}
          onChange={(value) => this.handleOnChange("y", value)}
        />
        <Button
          type="text"
          icon={<SwapOutlined />}
          onClick={() => {
            this.setState(
              {
                x: y,
                y: x,
              },
              () => {
                const { x, y } = this.state;
                this.changeDomSize(x, y);
              }
            );
          }}
        />
      </div>
    );
  }
}

export default PanelResizeCanvas;
