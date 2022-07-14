import React from "react";
import { Button } from "antd";
export default function useTableData(handleEidt) {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "content_short",
      key: "content_short",
    },
    {
      title: "日期",
      dataIndex: "display_time",
      key: "display_time",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (_, data) => {
        return (
          <Button type="primary" onClick={() => handleEidt(data)}>
            编辑
          </Button>
        );
      },
    },
  ];
  const tableColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "身高",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "爱好",
      dataIndex: "hobbies",
      key: "hobbies",
    },
    {
      title: "职业",
      dataIndex: "job",
      key: "job",
    },
  ];
  return {
    columns,
    tableColumns,
  };
}
