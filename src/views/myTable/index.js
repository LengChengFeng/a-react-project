import React, { useEffect, useMemo, useRef, useState } from "react";

import { GetData, GetOtherData } from "../../network/form";
import TableList from "../../components/table";
import FormList from "../../components/form";
import MyModal from "../../components/modal";
import useRenderData from "./renderData";

export default function Dashboard() {
  const modalRef = useRef();

  //存储两个表格数据
  const [formData, setFormData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [otherTable, setOtherTable] = useState([]);
  const [defaultSelectedData, setDefaultSelectedData] = useState([1]);
  const [modalContent, setModalContent] = useState({});
  const { columns, tableColumns, formConfig } = useRenderData(handleEdit);

  useEffect(() => {
    GetDataList();
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

  //获取总的数据
  const GetDataList = (data = {}, pageNum = 1) => {
    let params = {
      page: pageNum,
      limit: 10,
      title: data.title || "",
      author: data.author || "",
    };
    GetData(params).then((res) => {
      setFormData(res.data.items);
      setTotal(res.data.total);
    });
  };
  //分页
  const handlePagination = (page = 1) => {
    GetDataList({}, page);
    setCurrentPage(page);
  };
  //搜搜
  const handleSearch = (searchObj = {}) => {
    GetDataList(searchObj);
  };

  //编辑
  function handleEdit(data = {}) {
    modalRef.current.show();
    setModalContent(data);
  }
  //重置
  const handleReset = () => {
    GetDataList();
    setCurrentPage(1);
  };
  //radio的选中变化
  const rowSelection = {
    type: "radio",
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
  //点击表格选择结点
  const selectedKeys = (id) => {
    setDefaultSelectedData([id]);
  };
  return (
    <div className="table" style={{ padding: "0 20px" }}>
      {/* 搜索框 */}
      <FormList
        formConfig={formConfig}
        search={handleSearch}
        reset={handleReset}
        btn={true}
      />
      {/* 第一个表格 */}
      <div className="first-table">
        <TableList
          columns={columns}
          dataSource={formData}
          total={total}
          showpagination={true}
          paginationChange={handlePagination}
          rowSelection={rowSelection}
          currentPage={currentPage}
          selectedKeys={selectedKeys}
        />
      </div>
      {/* 第二个表格 */}
      <div className="second-table">
        <TableList columns={tableColumns} dataSource={otherTable} />
      </div>
      {/* Modal */}
      <div className="my-modal">
        <MyModal ref={modalRef} modalContent={modalContent} />
      </div>
    </div>
  );
}
