/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CFormSelect,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CCardHeader,
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
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CProgress,
  CProgressBar,
  CFormInput,
  CContainer,
} from '@coreui/react'

const Accordion = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [dataOrder, setDataOrder] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleStatus, setVisibleStatus] = useState(false)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filteredData = allOrders.filter(
        (item) =>
          item.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.MaDH.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setDataOrder(filteredData)
    } else {
      setDataOrder(allOrders)
    }
  }, [searchQuery, allOrders])

  useEffect(() => {
    filterOrdersByStatus()
  }, [currentStatus, allOrders])

  const filterOrdersByStatus = () => {
    if (currentStatus === 'Tất cả') {
      setDataOrder(allOrders)
    } else {
      const filteredData = allOrders.filter((item) => item.TrangThai === currentStatus)
      setDataOrder(filteredData)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ' '
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  const [filters, setFilters] = useState({
    search: '',
    departureTime: '',
    vehicleNumber: '',
    departureDate: '',
    seat: '',
    paymentStatus: '',
    trip: '',
    customerName: '',
    tripName: '',
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }
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
        {' '}
        <CForm className="row g-3">
          {' '}
          <CCol xs="auto">
            {' '}
            <CFormLabel htmlFor="vehicleNumber" className="visually-hidden">
              {' '}
              Biển số xe{' '}
            </CFormLabel>{' '}
            <CFormInput
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              placeholder="Biển số xe"
            />{' '}
          </CCol>{' '}
          <CCol xs="auto">
            {' '}
            <CFormLabel htmlFor="departureDate" className="visually-hidden">
              {' '}
              Ngày đi{' '}
            </CFormLabel>{' '}
            <CFormInput
              type="date"
              id="departureDate"
              name="departureDate"
              placeholder="Ngày đi"
            />{' '}
          </CCol>{' '}
          <CCol xs="auto">
            {' '}
            <CFormLabel htmlFor="paymentStatus" className="visually-hidden">
              {' '}
              Trạng thái thanh toán{' '}
            </CFormLabel>{' '}
            <CFormSelect id="paymentStatus" name="paymentStatus">
              {' '}
              <option value="Đã thanh toán">Đã thanh toán</option>{' '}
              <option value="Chưa thanh toán">Chưa thanh toán</option>{' '}
            </CFormSelect>{' '}
          </CCol>{' '}
          <CCol xs="auto">
            {' '}
            <CFormLabel htmlFor="trip" className="visually-hidden">
              {' '}
              Chuyến đi{' '}
            </CFormLabel>{' '}
            <CFormInput type="text" id="trip" name="trip" placeholder="Chuyến đi" />{' '}
          </CCol>{' '}
          <CCol xs="auto">
            {' '}
            <CFormLabel htmlFor="customerName" className="visually-hidden">
              {' '}
              Tên khách hàng{' '}
            </CFormLabel>{' '}
            <CFormInput
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Tên khách hàng"
            />{' '}
          </CCol>{' '}
          <CCol xs="auto">
            {' '}
            <CButton color="primary" type="submit" className="mb-3">
              {' '}
              Tìm kiếm{' '}
            </CButton>{' '}
          </CCol>{' '}
        </CForm>{' '}
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Tất cả'}
                  onClick={() => setCurrentStatus('Tất cả')}
                >
                  Tất cả
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Chưa giao hàng'}
                  onClick={() => setCurrentStatus('Chưa giao hàng')}
                >
                  Chờ xử lý
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang giao hàng'}
                  onClick={() => setCurrentStatus('Đang giao hàng')}
                >
                  Đang chạy
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đã giao hàng'}
                  onClick={() => setCurrentStatus('Đã giao hàng')}
                >
                  Đã hoàn tất
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Mã vé</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Khách hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày đặt hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày khởi hành</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataOrder.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">{item.MaDH}</CTableHeaderCell>
                      <CTableDataCell>{item.TenKH}</CTableDataCell>
                      <CTableDataCell>{formatDate(item.NgayDatHang)}</CTableDataCell>
                      <CTableDataCell>
                        {item.NgayGiaoHang ? formatDate(item.NgayGiaoHang) : ' '}
                      </CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.TrangThai === 'Đang giao hàng'
                              ? 'green'
                              : item.TrangThai === 'Chưa giao hàng'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.TrangThai}
                      </CTableDataCell>
                      <CTableDataCell>{item.KhoiLuong}</CTableDataCell>
                      <CTableDataCell>{item.TongTien}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            {item.TrangThai === 'Chưa giao hàng' && (
                              <>
                                <CDropdownItem onClick={() => handleProcessOrder(item.MaDH)}>
                                  Xử lý
                                </CDropdownItem>
                                <CDropdownItem onClick={() => handleUpdate(item.MaDH)}>
                                  Chỉnh sửa
                                </CDropdownItem>
                              </>
                            )}
                            {item.TrangThai === 'Đang giao hàng' && (
                              <CDropdownItem onClick={() => handleViewStatus(item.MaDH)}>
                                Xem trạng thái
                              </CDropdownItem>
                            )}
                            {item.TrangThai === 'Đã giao hàng' && (
                              <CDropdownItem onClick={() => handleDetailOrder(item.MaDH)}>
                                Xem chi tiết
                              </CDropdownItem>
                            )}
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal
        size="lg"
        backdrop="static"
        visible={visibleStatus}
        onClose={() => setVisibleStatus(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Tiến trình giao hàng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow className=" justify-content-between">
              <CCol sm="auto">Đang lấy hàng</CCol>
              <CCol sm="auto">Đang di chuyển</CCol>
              <CCol sm="auto">Giao hàng hoàn tất</CCol>
            </CRow>
            <CProgress height={20}>
              <CProgressBar value={25}></CProgressBar>
            </CProgress>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Accordion
