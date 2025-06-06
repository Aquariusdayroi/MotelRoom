import React from "react";
import { Dropdown as BsDropdown } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import '../../../styles/ActionDropdown.css'

export default function ActionDropdown() {
  return (
    <BsDropdown align="end">
      <BsDropdown.Toggle
        variant="light"
        className="p-0 text-muted border-0 action-dropdown-toggle"
        style={{ backgroundColor: "transparent" }}
      >
        <ThreeDotsVertical size={18} />
      </BsDropdown.Toggle>
      <BsDropdown.Menu className="shadow-sm">
        <BsDropdown.Item>Chi tiết</BsDropdown.Item>
        <BsDropdown.Item>Xoá</BsDropdown.Item>
        <BsDropdown.Item>Ẩn</BsDropdown.Item>
      </BsDropdown.Menu>
    </BsDropdown>
  );
}