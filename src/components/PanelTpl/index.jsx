import React from "react";
import { Menu, Dropdown, Input, Modal, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/lib/button/style/index.css";

class PanelTpl extends React.Component {
  state = {
    show: false,
    value: "",
    list: [
      {
        title: "横向照片",
        value:
          '{"page":[{"id":"Picture_xJ27Wh9O3muw6haQPoKsO","componentName":"Picture","props":{"url":"https://img.alicdn.com/imgextra/i3/O1CN01oNV2HE1wltLn3iEtB_!!6000000006349-55-tps-300-200.svg","css":":root {width:600px;z-index:0;left:0px;top:0px}"}},{"id":"Logo_pQj-9HV36c7jzCq-gDafJ","componentName":"Logo","props":{"type":"jx","css":":root {width:129px;z-index:1;left:449px;top:290px}"}}]}',
        canDel: false,
      },
      {
        title: "纵向照片",
        value:
          '{"page":[{"id":"Picture_MarA0CsrJqB4bUGRkIRKi","componentName":"Picture","props":{"url":"https://img.alicdn.com/imgextra/i4/O1CN01N0gbIu1a6Hp83Ytej_!!6000000003280-55-tps-200-300.svg","css":":root {width:400px;z-index:0;left:0px;top:0px}"}},{"id":"Logo_3Lrzrwj_iKJqPIouRipMt","componentName":"Logo","props":{"type":"jx","css":":root {width:129px;z-index:2;left:271px;top:498px}"}}]}',
        canDel: false,
      },
    ],
  };

  componentDidMount() {
    try {
      const list = JSON.parse(localStorage.getItem("_d2_tpl_data"));
      this.setState({
        list: [...this.state.list, ...list],
      });
    } catch (e) {}
  }

  handleCloseDialog() {
    this.setState({ show: false });
  }

  handleSaveTpl(text, value) {
    this.setState(
      {
        list: [...this.state.list, { title: text, value, canDel: true }],
        show: false,
      },
      () => {
        localStorage.setItem(
          "_d2_tpl_data",
          JSON.stringify(this.state.list.filter((item) => item.canDel))
        );
        message.success("保存模板成功");
      }
    );
  }

  render() {
    const { ctx } = this.props;
    const dslManager = ctx.get("dsl");
    const { show, value, list } = this.state;

    return (
      <div>
        <Dropdown.Button
          onClick={() => {
            this.setState({
              show: true,
              value: new Date().toLocaleString(),
            });
          }}
          overlay={
            <Menu
              onClick={({ key }) => {
                dslManager.setDSL(JSON.parse(list[key].value));
                message.info("已载入模板");
              }}
            >
              {list?.map((item, index) => (
                <Menu.Item key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{item.title}</span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        list.splice(index, 1);
                        this.setState({ list }, () => {
                          localStorage.setItem(
                            "_d2_tpl_data",
                            JSON.stringify(
                              this.state.list.filter((item) => item.canDel)
                            )
                          );
                        });
                      }}
                      danger
                      disabled={!item.canDel}
                      type="text"
                      icon={<DeleteOutlined />}
                    ></Button>
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          保存模板
        </Dropdown.Button>
        <Modal
          title="保存模板"
          visible={show}
          onCancel={() => this.handleCloseDialog()}
          onOk={() => this.handleSaveTpl(value, JSON.stringify(dslManager.dsl))}
          cancelText="取消"
          okText="保存"
        >
          <Input
            value={value}
            onChange={(e) => this.setState({ value: e.target.value })}
            prefix={<div>模板名称：</div>}
            autoFocus
          />
        </Modal>
      </div>
    );
  }
}

export default PanelTpl;
