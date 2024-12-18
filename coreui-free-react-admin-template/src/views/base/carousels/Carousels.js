/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react';
import ReactImg from 'src/assets/images/react.jpg';

const Carousels = () => {

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <CCardHeader style={{ marginBottom: '10px' }}>
          <strong>Tài khoản và phân cấp</strong>
          <div>
            <span style={{ marginRight: '200px', fontSize: 'larger' }}>
              Tổng số nhân viên: <span style={{ color: 'blue', fontSize: 'x-large' }}></span>
            </span>
          </div>
        </CCardHeader>
        {/* Giữ nguyên nút thêm tài khoản */}
        <CButton color="primary">
          <Link to="/base/Spinners" style={{ color: 'white', textDecoration: 'none' }}>+ Thêm tài khoản</Link>
        </CButton>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Tên Tài Xế</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số Điện Thoại</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày Sinh</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Giới Tính</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    {/* Xem chi tiết chuyển đến /base/progress */}
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> 
    </>
  );
};

export default Carousels;
