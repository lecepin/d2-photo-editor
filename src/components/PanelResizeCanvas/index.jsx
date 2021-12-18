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

    this.type = "hor"; // ver
    this.typeMap = {
      hor: '{"page":[{"id":"Picture_xJ27Wh9O3muw6haQPoKsO","componentName":"Picture","props":{"url":"https://img.alicdn.com/imgextra/i3/O1CN01oNV2HE1wltLn3iEtB_!!6000000006349-55-tps-300-200.svg","css":":root {width:600px;z-index:0;left:0px;top:0px}"}},{"id":"Logo_pQj-9HV36c7jzCq-gDafJ","componentName":"Logo","props":{"type":"jx","css":":root {width:129px;z-index:1;left:449px;top:290px}"}}]}',
      ver: '{"page":[{"id":"Picture_MarA0CsrJqB4bUGRkIRKi","componentName":"Picture","props":{"url":"https://img.alicdn.com/imgextra/i4/O1CN01N0gbIu1a6Hp83Ytej_!!6000000003280-55-tps-200-300.svg","css":":root {width:400px;z-index:0;left:0px;top:0px}"}},{"id":"Logo_3Lrzrwj_iKJqPIouRipMt","componentName":"Logo","props":{"type":"jx","css":":root {width:129px;z-index:2;left:271px;top:498px}"}}]}',
    };

    this.handleOnKeyExchange = this.handleOnKeyExchange.bind(this);
  }

  componentDidMount() {
    const { x, y } = this.state;
    setTimeout(() => {
      this.changeDomSize(x, y);
      this.changeDSL();
    });
    window.addEventListener("keydown", this.handleOnKeyExchange);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleOnKeyExchange);
  }

  handleOnKeyExchange(e) {
    // cmd + X
    if ((e.ctrlKey || e.metaKey) && e.keyCode == 88) {
      e.preventDefault();
      this.exchange();
    }
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

  changeDSL() {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");

    dslManager.setDSL(JSON.parse(this.typeMap[this.type]));
    // 防止存在上一个选中的状态
    ctx.get("canvas").selectNodeById();
  }

  exchange() {
    const { x, y } = this.state;

    this.type = this.type == "hor" ? "ver" : "hor";
    this.setState(
      {
        x: y,
        y: x,
      },
      () => {
        const { x, y } = this.state;
        this.changeDomSize(x, y);
        this.changeDSL();
      }
    );
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
            this.exchange();
          }}
        >
          (Cmd+X)
        </Button>
      </div>
    );
  }
}

export default PanelResizeCanvas;
