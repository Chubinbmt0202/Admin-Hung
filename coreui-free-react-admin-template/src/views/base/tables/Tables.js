import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Tables = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleEditVehicle, setVisibleEditVehicle] = useState(false)
  const [data, setData] = useState([])
  const [dataTuyenXe, setDataTuyenXe] = useState([])
const navigate = useNavigate()
  const [currentRoute, setCurrentRoute] = useState(null)

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:9999/api/location')
      const responseDataTuyenXe = await fetch('http://localhost:9999/api/AlltuyenXe')
      const DataTuyenXe = await responseDataTuyenXe.json()
      const data = await response.json()
      console.log('Data tuyen xe:', DataTuyenXe.data)
      setDataTuyenXe(DataTuyenXe.data)
      setLocations(data.data) // Assuming the API returns an array of locations
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }
  useEffect(() => {
    fetchLocations()
  }, [])

  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)
  const [locations, setLocations] = useState([]) // Chứa danh sách các tỉnh và huyện
  const [selectedProvinceDeparture, setSelectedProvinceDeparture] = useState('') // Tỉnh điểm đi
  const [selectedDistrictDeparture, setSelectedDistrictDeparture] = useState('') // Huyện điểm đi
  const [selectedProvinceArrival, setSelectedProvinceArrival] = useState('') // Tỉnh điểm đến
  const [selectedDistrictArrival, setSelectedDistrictArrival] = useState('') // Huyện điểm đến
  const [isEditing, setIsEditing] = useState(false) // Trạng thái chỉnh sửa
  const [selectedRoute, setSelectedRoute] = useState(null) // Tuyến xe được chọn để chỉnh sửa
  const [nameTuyenDi, setNameTuyenDi] = useState('') // Tên tuyến đi
  const [khoangCach, setKhoangCach] = useState('') // Khoảng cách
  const [newRoute, setNewRoute] = useState({
    maTuyenDi: '',
    tenTuyenDi: nameTuyenDi,
    tinhDiemDi: selectedProvinceDeparture,
    huyenDiemDi: selectedDistrictDeparture,
    tinhDiemDen: selectedProvinceArrival,
    huyenDiemDen: selectedDistrictArrival,
    khoangCach: khoangCach,  
  })

  // Quản lý mã tuyến đi tự động tăng dần
  const [idCounter, setIdCounter] = useState(1)

  // Fetch tỉnh và huyện từ API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/location')
        const data = await response.json()
        setLocations(data.data) // Dữ liệu tỉnh và huyện
      } catch (error) {
        console.error('Error fetching locations:', error)
      }
    }
    fetchLocations()
  }, [])

  // Lấy các huyện dựa trên tỉnh đã chọn
  const handleProvinceChangeDeparture = (e) => {
    const province = e.target.value
    setSelectedProvinceDeparture(province)
    setSelectedDistrictDeparture('') // Reset huyện khi thay đổi tỉnh
  }

  const handleUpdate = (route, ten, khoangCach) => {
    setCurrentRoute(route)
    console.log('Route:', route, ten)
    setNameTuyenDi(ten)
    setSelectedRoute(route)
    setKhoangCach(khoangCach)
    setIsEditing(true)
  }

  const handleEdit = async (maTuyenDi) => {
    // Chuẩn bị dữ liệu để gửi tới API
    console.log('Ma tuyen di:', maTuyenDi)
    const requestData = {
      maTuyenDi: maTuyenDi,
      tenTuyenDi: newRoute.tenTuyenDi, // Tên tuyến đi
      tinhDiemDi: selectedProvinceDeparture, // Tỉnh điểm đi
      huyenDiemDi: selectedDistrictDeparture, // Huyện điểm đi
      tinhDiemDen: selectedProvinceArrival, // Tỉnh điểm đến
      huyenDiemDen: selectedDistrictArrival, // Huyện điểm đến
      khoangCach: parseFloat(newRoute.khoangCach), // Khoảng cách (đảm bảo là số)
    };
    console.log('Thông tin gửi tới API:', requestData);
    try {
      // Gửi yêu cầu PUT tới API
      const response = await fetch(`http://localhost:9999/api/updateTuyenXe/${maTuyenDi}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Chỉnh sửa tuyến đi thành công');
        setIsEditing(false);
        fetchLocations()
      } else {
        console.error('Chỉnh sửa tuyến đi thất bại:', result);
        alert('Không thể chỉnh sửa tuyến đi. Vui lòng kiểm tra lại.');
      }
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa tuyến đi:', error);
      alert('Đã xảy ra lỗi khi chỉnh sửa tuyến đi. Vui lòng thử lại.');
    }
  };

  const handleProvinceChangeArrival = (e) => {
    const province = e.target.value
    setSelectedProvinceArrival(province)
    setSelectedDistrictArrival('') // Reset huyện khi thay đổi tỉnh
  }

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRoute({ ...newRoute, [name]: value })
  }

  // Handle form submission for adding a new route
  const handleFormSubmit = async () => {
    // Chuẩn bị dữ liệu để gửi tới API
    const requestData = {
      diemDi: selectedProvinceDeparture, // Tỉnh điểm đi
      diemDen: selectedProvinceArrival, // Tỉnh điểm đến
      tenTuyenDi: newRoute.tenTuyenDi, // Tên tuyến đi
      KhoangCach: parseFloat(newRoute.khoangCach), // Khoảng cách (đảm bảo là số)
    };
  
    console.log('Thông tin gửi tới API:', requestData);
  
    try {
      // Gửi yêu cầu POST tới API
      const response = await fetch('http://localhost:9999/api/tuyenxe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Thêm tuyến đi thành công');
        fetchLocations()
        console.log('Thêm tuyến đi thành công:', result);
  
        // Cập nhật danh sách tuyến xe với dữ liệu từ API
        const updatedRoute = {
          maTuyenDi: idCounter, // ID tuyến đi nội bộ
          tenTuyenDi: newRoute.tenTuyenDi,
          tinhDiemDi: selectedProvinceDeparture,
          huyenDiemDi: selectedDistrictDeparture,
          tinhDiemDen: selectedProvinceArrival,
          huyenDiemDen: selectedDistrictArrival,
          khoangCach: newRoute.khoangCach,
        };
  
        setData([...data, updatedRoute]); // Thêm tuyến mới vào danh sách
        setIdCounter(idCounter + 1); // Tăng idCounter
  
        // Đóng modal và reset form
        setVisibleAddVehicle(false);
        setNewRoute({
          maTuyenDi: '',
          tenTuyenDi: '',
          tinhDiemDi: '',
          huyenDiemDi: '',
          tinhDiemDen: '',
          huyenDiemDen: '',
          khoangCach: '',
        });
      } else {
        console.error('Thêm tuyến đi thất bại:', result);
        alert('Không thể thêm tuyến xe. Vui lòng kiểm tra lại.');
      }
    } catch (error) {
      console.error('Lỗi khi thêm tuyến đi:', error);
      alert('Đã xảy ra lỗi khi thêm tuyến xe. Vui lòng thử lại.');
    }
  };
  
  // Xử lý xóa tuyến đi
  const handleDeleteRoute = async (routeId) => {
    console.log('Xóa tuyến xe với ID:', routeId);
    try {
      const response = await fetch(`http://localhost:9999/api/deleteTuyenXe/${routeId}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Xóa tuyến xe thành công:', result);
  
        // Xóa tuyến xe khỏi danh sách trong state
        setData((prevData) => prevData.filter((route) => route.maTuyenDi !== routeId));
        alert('Xóa tuyến xe thành công!');
        fetchLocations() // Tải lại danh sách tuyến xe
      } else {
        console.error('Xóa tuyến xe thất bại:', result);
        alert('Không thể xóa tuyến xe. Vui lòng kiểm tra lại.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa tuyến xe:', error);
      alert('Đã xảy ra lỗi khi xóa tuyến xe. Vui lòng thử lại.');
    }
  };

  const handleDetail = (id) => {
    console.log('Xem chi tiết tuyến xe với ID:', id);
    // TODO: Code to fetch and display route details
    navigate(`/DetailTuyenXe/${id}`);
  };


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
          <strong>Danh sách tuyến đi</strong>
        </CCardHeader>
        <div>
          <span style={{ marginRight: 10 }}>Tìm kiếm tuyến đi</span>
          <input style={{ borderRadius: 10, marginRight: 10, height: 30 }} type="text"></input>

          <CButton color="primary" onClick={() => setVisibleAddVehicle(true)}>
            Thêm tuyến đi
          </CButton>
        </div>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Mã tuyến đi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên tuyến đi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Điểm đi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Điểm đến</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Khoảng cách</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataTuyenXe.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{item.ID_TuyenXe}</CTableHeaderCell>
                      <CTableDataCell>{item.TenTuyenXe}</CTableDataCell>
                      <CTableDataCell>{item.DiemDi}</CTableDataCell>
                      <CTableDataCell>{item.DiemDen}</CTableDataCell>
                      <CTableDataCell>{item.KhoangCach}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                          <CDropdownItem onClick={() => handleDetail(item.ID_TuyenXe)}>
                              Xem chi tiết
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={() => {
                                setCurrentRoute(item)
                                setVisibleEditVehicle(true)
                                handleUpdate(item.ID_TuyenXe, item.TenTuyenXe, item.KhoangCach)
                              }}
                            >
                              Chỉnh sửa
                            </CDropdownItem>
                            <CDropdownItem onClick={() => handleDeleteRoute(item.ID_TuyenXe)}>
                              Xóa
                            </CDropdownItem>
                            <CDropdownDivider />
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

      {/* Add Vehicle Modal */}
      <CModal visible={visibleAddVehicle} onClose={() => setVisibleAddVehicle(false)}>
        <CModalHeader>
          <h5>Thêm tuyến đi</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="tenTuyenDi"
              name="tenTuyenDi"
              label="Tên tuyến đi"
              placeholder="Nhập tên tuyến đi"
              value={newRoute.tenTuyenDi}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="diemDi">Điểm đi</label>
              <div style={{ display: 'flex', width: '100%', margin: '10px 0', padding: '8px' }}>
                {' '}
                <div>
                  <label htmlFor="provinceDeparture">Chọn tỉnh</label>
                  <select
                    id="provinceDeparture"
                    name="provinceDeparture"
                    value={selectedProvinceDeparture}
                    onChange={handleProvinceChangeDeparture}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn tỉnh</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="districtDeparture">Chọn huyện</label>
                  <select
                    id="districtDeparture"
                    name="districtDeparture"
                    value={selectedDistrictDeparture}
                    onChange={(e) => setSelectedDistrictDeparture(e.target.value)}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn huyện</option>
                    {locations
                      .find((location) => location.name === selectedProvinceDeparture)
                      ?.district.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tương tự cho điểm đến */}
            <div>
              <label htmlFor="diemDen">Điểm đến</label>
              <div style={{ display: 'flex', width: '100%', margin: '10px 0', padding: '8px' }}>
                <div>
                  <label htmlFor="provinceArrival">Chọn tỉnh</label>
                  <select
                    id="provinceArrival"
                    name="provinceArrival"
                    value={selectedProvinceArrival}
                    onChange={handleProvinceChangeArrival}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn tỉnh</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="districtArrival">Chọn huyện</label>
                  <select
                    id="districtArrival"
                    name="districtArrival"
                    value={selectedDistrictArrival}
                    onChange={(e) => setSelectedDistrictArrival(e.target.value)}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn huyện</option>
                    {locations
                      .find((location) => location.name === selectedProvinceArrival)
                      ?.district.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <CFormInput
              type="text"
              id="khoangCach"
              name="khoangCach"
              label="Khoảng cách"
              placeholder="Nhập khoảng cách"
              value={newRoute.khoangCach}
              onChange={handleInputChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddVehicle(false)}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={handleFormSubmit}>
            Thêm
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Vehicle Modal */}
      <CModal visible={isEditing} onClose={() => setIsEditing(false)}>
        <CModalHeader>
          <h5>Chỉnh sửa tuyến đi</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="tenTuyenDi"
              name="tenTuyenDi"
              label="Tên tuyến đi"
              placeholder="Nhập tên tuyến đi"
              value={newRoute.tenTuyenDi}
              onChange={(e) => setNewRoute({ ...newRoute, tenTuyenDi: e.target.value })}
            />
            <div>
              <label htmlFor="diemDi">Điểm đi</label>
              <div style={{ display: 'flex', width: '100%', margin: '10px 0', padding: '8px' }}>
                {' '}
                <div>
                  <label htmlFor="provinceDeparture">Chọn tỉnh</label>
                  <select
                    id="provinceDeparture"
                    name="provinceDeparture"
                    value={selectedProvinceDeparture}
                    onChange={handleProvinceChangeDeparture}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn tỉnh</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="districtDeparture">Chọn huyện</label>
                  <select
                    id="districtDeparture"
                    name="districtDeparture"
                    value={selectedDistrictDeparture}
                    onChange={(e) => setSelectedDistrictDeparture(e.target.value)}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn huyện</option>
                    {locations
                      .find((location) => location.name === selectedProvinceDeparture)
                      ?.district.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tương tự cho điểm đến */}
            <div>
              <label htmlFor="diemDen">Điểm đến</label>
              <div style={{ display: 'flex', width: '100%', margin: '10px 0', padding: '8px' }}>
                <div>
                  <label htmlFor="provinceArrival">Chọn tỉnh</label>
                  <select
                    id="provinceArrival"
                    name="provinceArrival"
                    value={selectedProvinceArrival}
                    onChange={handleProvinceChangeArrival}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn tỉnh</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="districtArrival">Chọn huyện</label>
                  <select
                    id="districtArrival"
                    name="districtArrival"
                    value={selectedDistrictArrival}
                    onChange={(e) => setSelectedDistrictArrival(e.target.value)}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn huyện</option>
                    {locations
                      .find((location) => location.name === selectedProvinceArrival)
                      ?.district.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <CFormInput
              type="text"
              id="khoangCach"
              name="khoangCach"
              label="Khoảng cách"
              placeholder="Nhập khoảng cách"
              value={newRoute.khoangCach}
              onChange={handleInputChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsEditing(false)}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={() => handleEdit(selectedRoute)}>
            Chỉnh sửa
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Tables
