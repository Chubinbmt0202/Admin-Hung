import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'

const Tables = () => {
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)
  const [locations, setLocations] = useState([])
  const [newRoute, setNewRoute] = useState({
    tenTuyenDi: '',
    diemDi: '',
    diemDen: '',
    khoangCach: '',
  })

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/location')
        const data = await response.json()
        setLocations(data.data) // Assuming API response has 'data'
      } catch (error) {
        console.error('Error fetching locations:', error)
      }
    }
    fetchLocations()
  }, [])

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRoute({ ...newRoute, [name]: value })
  }

  // Handle form submission
  const handleFormSubmit = () => {
    console.log('Saving new route:', newRoute)
    setVisibleAddVehicle(false)
    setNewRoute({
      tenTuyenDi: '',
      diemDi: '',
      diemDen: '',
      khoangCach: '',
    })
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisibleAddVehicle(true)}>
        Thêm tuyến đi
      </CButton>

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

            {/* Dropdown for Điểm đi */}
            <div> 
              <label htmlFor="diemDi">Điểm đi</label>
              <div>
                <div>
                  <label htmlFor="province">Tỉnh</label>
                  <select
                    id="province"
                    name="province"
                    value={newRoute.province}
                    onChange={handleProvinceChange}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                  >
                    <option value="">Chọn tỉnh</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="diemDen">Huyện</label>
                  <select
                    id="diemDen"
                    name="diemDen"
                    value={newRoute.district}
                    onChange={handleDistrictChange}
                    style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
                    disabled={!newRoute.province} // Disable district select if no province selected
                  >
                    <option value="">Chọn huyện</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Dropdown for Điểm đến */}
            <div>
              <label htmlFor="diemDen">Điểm đến</label>
              <select
                id="diemDen"
                name="diemDen"
                value={newRoute.diemDen}
                onChange={handleInputChange}
                style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
              >
                <option value="">Chọn điểm đến</option>
                {locations.map((location) => (
                  <optgroup key={location.id} label={location.name}>
                    {location.district.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
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
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleFormSubmit}>
            Lưu
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Tables
