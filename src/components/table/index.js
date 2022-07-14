import React from "react";
import { Table, Pagination } from "antd";
import "./table.css";
export default function MyTable(props) {
  const {
    columns,
    dataSource,
    total,
    paginationChange,
    rowSelection = {},
    showpagination = false,
    currentPage,
    selectedKeys = () => {},
  } = props;
  //把页数和size传递给父亲
  const handlePaginationChange = (page, size) => {
    paginationChange(page, size);
  };
  return (
    <div className="my-table">
      <div className="table">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          pagination={false}
          rowSelection={rowSelection}
          onRow={(record) => {
            return {
              onClick: () => {
                console.log(typeof selectedKeys);
                selectedKeys(record.id);
              },
            };
          }}
        />
      </div>
      <div className="pagination">
        {showpagination ? (
          <Pagination
            current={currentPage}
            total={total}
            showQuickJumper
            showSizeChanger={false}
            onChange={(page, size) => handlePaginationChange(page, size)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
