import React from "react";
import DSL from "./store";
import Skeleton from "./components/Skeleton";
import PanelGenImg from "./components/PanelGenImg";
import PanelAbout from "./components/PanelAbout";
import PanelTpl from "./components/PanelTpl";
import PanelLogo from "./components/PanelLogo";
import PanelComponent from "./components/PanelComponent";
import PanelAttribute from "./components/PanelAttribute";
import PanelCanvasAbsolute from "./components/PanelCanvasAbsolute";
import PanelResizeCanvas from "./components/PanelResizeCanvas";
import PanelOutline from "./components/PanelOutline";
import components from "./components/ComponentBanner";
import PanelDSL from "./components/PanelDSL";
import event from "./utils/SingleEventBus";

const ctx = new Map();
window.__ctx = ctx;

// ctx event
ctx.set("event", event);

// ctx component
ctx.set("component", new Map());
components.map((item) => {
  ctx.get("component").set(item.componentName, item);
});

// ctx dsl
const dslInstance = new DSL();
ctx.set("dsl", dslInstance);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ctx.get("skeleton").openDockByName("component");
  }

  render() {
    return (
      <div className="app">
        <Skeleton
          ctx={ctx}
          topArea={[
            {
              content: <PanelLogo />,
            },
            {
              align: "right",
              content: <PanelGenImg />,
            },
            {
              align: "center",
              content: <PanelResizeCanvas />,
            },
            {
              align: "right",
              content: <PanelTpl />,
            },
            {
              align: "right",
              content: <PanelAbout />,
            },
          ]}
          leftArea={[
            {
              name: "component",
              title: "组件面板",
              icon: "https://img.alicdn.com/imgextra/i2/O1CN01SpaA3D1dJ3gIsZltR_!!6000000003714-2-tps-128-128.png",
              content: <PanelComponent />,
            },
            {
              name: "outline",
              title: "大纲面板",
              hidden: false,
              icon: "https://img.alicdn.com/imgextra/i1/O1CN01ED4RnW1OVgMdOEZkH_!!6000000001711-2-tps-128-128.png",
              content: <PanelOutline />,
            },
            {
              name: "dsl",
              title: "源码",
              align: "bottom",
              icon: "https://img.alicdn.com/imgextra/i3/O1CN01liE81S23dpeqriifl_!!6000000007279-2-tps-128-128.png",
              content: <PanelDSL />,
              width: "500px",
              boxType: "float",
            },
          ]}
          centerArea={[
            {
              content: <PanelCanvasAbsolute />,
            },
          ]}
          rightArea={[
            {
              content: <PanelAttribute />,
            },
          ]}
        />
      </div>
    );
  }
}

export default App;
