import Setters from "./../../PropSetters";
import UploaderSetter from "./setter.uploader";
import view from "./designView";

export default {
  title: "Logo",
  componentName: "Logo",
  category: "基础",
  icon: (
    <svg
      t="1639665991757"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7480"
      width="128"
      height="128"
    >
      <path
        d="M810.666667 469.333333H469.333333v255.786667h341.333334V469.333333z m170.666666 341.333334V212.48C981.333333 165.546667 942.933333 128 896 128H128C81.066667 128 42.666667 165.546667 42.666667 212.48V810.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h768c46.933333 0 85.333333-38.4 85.333333-85.333333z m-85.333333 0.853333H128V212.053333h768v599.466667z"
        p-id="7481"
      ></path>
    </svg>
  ),
  view: view,
  canOperate: true,
  hidden: false,
  props: [
    // {
    //   name: "url",
    //   title: "地址",
    //   description: "",
    //   supportVariable: true,
    //   value:
    //     "https://img.alicdn.com/imgextra/i2/O1CN01Fe2s271gk1t3ZbnNi_!!6000000004179-2-tps-1192-720.png",
    //   setter: <UploaderSetter />,
    //   // display: "none",
    // },
    {
      name: "type",
      title: "类型",
      description: "",
      supportVariable: true,
      value: "jx",
      setter: (
        <Setters.SelectSetter
          dataSource={[
            { title: "精心", value: "jx" },
            { title: "D2", value: "d2" },
            ,
          ]}
        />
      ),
    },
    {
      name: "css",
      value: ":root{width: 129px}",
      display: "none",
    },
  ],
};
