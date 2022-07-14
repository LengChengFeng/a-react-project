import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal } from "antd";
import { Form, Input } from "antd";
const useMyModal = forwardRef((props, MyRef) => {
  const { modalContent = {} } = props;
  console.log(2);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(2);
  useImperativeHandle(MyRef, () => ({
    show,
  }));
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function show() {
    setIsModalVisible(true);
  }

  return (
    <div>
      <Modal
        visible={isModalVisible}
        ref={MyRef}
        onCancel={handleCancel}
        title="编辑"
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
        >
          <Form.Item label="作者">
            <Input value={modalContent.author} />
          </Form.Item>
          <Form.Item label="名称">
            <Input value={modalContent.title} />
          </Form.Item>
          <Form.Item label="内容">
            <Input value={modalContent.content_short} />
          </Form.Item>
          <Form.Item label="类型">
            <Input value={modalContent.type} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
export default useMyModal;
