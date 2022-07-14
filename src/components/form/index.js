import React, { useRef } from "react";
import { Form, Input, Select, Space } from "antd";
import { Button } from "antd";
import "./form.css";
const { Option } = Select;
export default function useMyForm(props) {
  const {
    formConfig,
    search,
    reset,
    formLayout = "inline",
    btn = false,
    modalContent,
  } = props;
  const formRef = useRef();
  //搜索
  const handleSearch = () => {
    search(formRef.current.getFieldsValue());
  };
  //重置
  const handleReset = () => {
    formRef.current.resetFields();
    reset();
  };
  const inputType = (item) => {
    if (item.type === "select") {
      return (
        <Select value={modalContent.name}>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      );
    } else {
      return (
        <Input
          placeholder={item.placeHolder}
          value={modalContent && modalContent[item.name]}
        ></Input>
      );
    }
  };
  return (
    <div className="wrapper">
      <Form
        ref={formRef}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        layout={formLayout}
        initialValues={{ layout: formLayout }}
        labelAlign="center"
      >
        {modalContent && modalContent.author}
        {formConfig.map((item, index) => {
          return (
            <Form.Item label={item.label} key={index} name={item.name}>
              {inputType(item)}
            </Form.Item>
          );
        })}
      </Form>
      <div className="btn">
        {btn ? (
          <Space>
            <div className="searach">
              <Button
                type="primary"
                size="middle"
                onClick={() => handleSearch()}
              >
                搜索
              </Button>
            </div>
            <div className="reset">
              <Button
                type="primary"
                size="middle"
                onClick={() => handleReset()}
              >
                重置
              </Button>
            </div>
          </Space>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
