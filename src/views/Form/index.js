import React, { useEffect, useRef, useState } from "react";
import { Input, Button, Table, Pagination, Form, Space, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import formModuleCss from "./Form.module.css";
import { GetData, GetOtherData } from "../../network/form";
import useTableData from "./hooks";

export default function FormList() {
  //存储两个表格数据
  const [formData, setFormData] = useState([]);
  const [otherTable, setOtherTable] = useState([]);
  const [total, setTotal] = useState(0);
  const formRef = useRef();
  const [ModalContent, setModalContent] = useState([]);
  //弹框的代码
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [defaultSelectedData, setDefaultSelectedData] = useState([1]);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    title: "",
    author: "",
  });

  useEffect(() => {
    GetDataList({
      page: 1,
      limit: 10,
      title: "",
      author: "",
    });
  }, []);
  useEffect(() => {
    GetOtherData({ id: 1 }).then((res) => {
      if (!res) {
        setOtherTable([]);
      } else {
        setOtherTable(res.res.data);
      }
    });
  }, []);

  const handleEdit = (data) => {
    setModalContent(data);
    setIsModalVisible(true);
  };
  const { columns, tableColumns } = useTableData(handleEdit);

  //获取总的数据
  const GetDataList = (data) => {
    GetData(data).then((res) => {
      setFormData(res.data.items);
      setTotal(res.data.total);
    });
  };
  //处理表格中的选中
  const rowSelection = {
    selectedRowKeys: defaultSelectedData,
    onChange: (selectedRowKeys, selectedRows) => {
      setDefaultSelectedData(selectedRowKeys);
      GetOtherData({ id: selectedRows[0].id }).then((res) => {
        if (!res) {
          setOtherTable([]);
        } else {
          setOtherTable(res.res.data);
        }
      });
    },
  };
  //分页器
  const handleChange = (page, size) => {
    const params = { ...searchParams };
    params.page = page;
    params.limit = size;
    setSearchParams(params);
    GetDataList(params);
  };
  //搜索
  const handleSearch = () => {
    console.log(formRef.current.getFieldsValue());
    const params = { ...searchParams, ...formRef.current.getFieldsValue() };
    console.log(params);
    GetDataList(params);
  };
  //重置
  const handleReset = () => {
    formRef.current.resetFields();
    searchParams.page = 1;
    GetDataList({
      page: 1,
      limit: 10,
      title: "",
      author: "",
    });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={formModuleCss.formList}>
      <div className={formModuleCss.search}>
        <Form className={formModuleCss.search_input} ref={formRef}>
          <Space align="center">
            <Form.Item name="author">
              <Input
                placeholder="请输入作者"
                name="author"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item name="title">
              <Input placeholder="请输入名称" name="title" />
            </Form.Item>
          </Space>
        </Form>
        <div className={formModuleCss.btn}>
          <Space>
            <Button type="primary" onClick={() => handleSearch()}>
              筛选
            </Button>
            <Button type="primary" onClick={() => handleReset()}>
              重置
            </Button>
            <Button type="primary">打印</Button>
          </Space>
        </div>
      </div>
      <div className={formModuleCss.formData}>
        {/* {formData && ( */}
        <Table
          columns={columns}
          dataSource={formData}
          rowKey="id"
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          pagination={false}
        />
        {/* )} */}
      </div>
      <div className={formModuleCss.pagination}>
        {/* {total && ( */}
        <Pagination
          current={searchParams.page}
          total={total}
          onChange={(page, size) => handleChange(page, size)}
          showQuickJumper
        />
        {/* )} */}
      </div>

      <div className={formModuleCss.table}>
        {/* {otherTable && ( */}
        <Table
          columns={tableColumns}
          rowKey="name"
          dataSource={otherTable}
          pagination={false}
        />
        {/* )} */}
      </div>
      {/* {ModalContent && ( */}
      <Modal
        title="编辑"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <Input value={ModalContent.author} />
          </Form.Item>
          <Form.Item label="名称">
            <Input value={ModalContent.title} />
          </Form.Item>
          <Form.Item label="内容">
            <Input value={ModalContent.content_short} />
          </Form.Item>
          <Form.Item label="类型">
            <Input value={ModalContent.type} />
          </Form.Item>
        </Form>
      </Modal>
      {/* )} */}
    </div>
  );
}
