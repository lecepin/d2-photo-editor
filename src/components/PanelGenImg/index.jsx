import React from "react";
import html2canvas from "html2canvas";
import { Button, Modal, message } from "antd";

import "antd/lib/button/style/index.css";
import "antd/lib/modal/style/index.css";
import "antd/lib/message/style/index.css";

class PanelGenImg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleOpenDialog() {
    const { ctx } = this.props;
    const hideMsg = message.loading("生成中……");

    html2canvas(document.getElementById(ctx.get("canvas").containerId), {
      allowTaint: true,
      useCORS: true,
      scale: 4,
    })
      .then((canvas) => {
        hideMsg();
        this.setState(
          {
            visible: true,
          },
          () => {
            this.refPreview.src = canvas.toDataURL();

            this.refDownloadA.href = this.refPreview.src;
            this.refDownloadA.download = Date.now() + ".png";
          }
        );
      })
      .finally(() => {
        // 触发 selectGhost 计算位置
        window.document.body.click();
      });
  }

  handleCloseDialog() {
    this.setState({
      visible: false,
    });
  }

  handleDownload() {
    this.refDownloadA.click();
  }

  render() {
    const { ctx } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.handleOpenDialog}>
          生成图片
        </Button>

        <Modal
          title="生成图片"
          visible={visible}
          onCancel={this.handleCloseDialog}
          maskClosable={false}
          footer={[
            <Button type="primary" onClick={this.handleDownload} key="1">
              下载图片
            </Button>,
          ]}
        >
          <a ref={(_) => (this.refDownloadA = _)}></a>
          <div style={{ textAlign: "center" }}>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "60vh",
                border: "1px dashed ",
              }}
              ref={(_) => (this.refPreview = _)}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default PanelGenImg;
