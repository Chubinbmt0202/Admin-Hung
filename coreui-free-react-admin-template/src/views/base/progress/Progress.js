import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardHeader,
  CCol,
  CCardTitle,
  CCardImage,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react';

const TripModal = ({ isOpen, toggle, onSave, trip }) => {
  const [formData, setFormData] = useState({
    title: trip ? trip.title : '',
    licensePlate: trip ? trip.licensePlate : '',
    time: trip ? trip.time : '',
    departure: trip ? trip.departure : '',
    bookedTickets: trip ? trip.bookedTickets : '',
    remainingTickets: trip ? trip.remainingTickets : '',
    price: trip ? trip.price : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    toggle();
  };

  return (
    <CModal visible={isOpen} onClose={toggle}>
      <CModalHeader closeButton>
        <CModalTitle>{trip ? 'Cập nhật tuyến xe' : 'Thêm tuyến xe'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="title">Tên tuyến</CFormLabel>
            <CFormInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="licensePlate">Biển số xe</CFormLabel>
            <CFormInput
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="time">Thời gian chạy</CFormLabel>
            <CFormInput
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="departure">Nơi đi</CFormLabel>
            <CFormInput
              id="departure"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="bookedTickets">Số lượng vé đã đặt</CFormLabel>
            <CFormInput
              id="bookedTickets"
              name="bookedTickets"
              type="number"
              value={formData.bookedTickets}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="remainingTickets">Số lượng vé còn lại</CFormLabel>
            <CFormInput
              id="remainingTickets"
              name="remainingTickets"
              type="number"
              value={formData.remainingTickets}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="price">Giá vé</CFormLabel>
            <CFormInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>Hủy</CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {trip ? 'Cập nhật' : 'Thêm'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const Progress = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: 'Cẩm lệ - Mdrac',
      licensePlate: '50B-12345',
      time: '8:00 - 12:00',
      departure: 'Hoà vang - Mdrac',
      bookedTickets: 20,
      remainingTickets: 4,
      price: 200000,
    },
    {
      id: 2,
      title: 'Another Trip',
      licensePlate: '51C-67890',
      time: '10:00 - 14:00',
      departure: 'Hoà vang - Đà Nẵng',
      bookedTickets: 15,
      remainingTickets: 10,
      price: 150000,
    },
    // Thêm nhiều chuyến đi hơn nếu cần
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSaveTrip = (trip) => {
    if (selectedTrip) {
      // Update existing trip
      setTrips(trips.map(t => (t.id === selectedTrip.id ? { ...trip, id: selectedTrip.id } : t)));
    } else {
      // Add new trip
      setTrips([...trips, { ...trip, id: trips.length + 1 }]);
    }
    setSelectedTrip(null);
  };

  const handleEditTrip = (trip) => {
    setSelectedTrip(trip);
    handleToggleModal();
  };

  return (
    <CRow style={{ marginLeft: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <h2>Danh sách chuyến đi trong tuyến : Đà Nẵng - Đăk Lăk</h2>
        <CButton color="primary" onClick={() => { setSelectedTrip(null); handleToggleModal(); }}>
          Thêm tuyến đi
        </CButton>
      </div>
      {trips.map((trip) => (
        <CCard key={trip.id} style={{ width: '24rem', marginTop: '20px' }}>
          <CCardImage orientation="top" />
          <CCardBody style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CCardTitle style={{ marginRight: '12px' }}>{trip.title}</CCardTitle>
              <CDropdown>
                <CDropdownToggle size="sm" color="secondary">Tuỳ chọn</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem style={{ cursor: 'pointer' }} onClick={() => handleEditTrip(trip)}>Xem chi tiết</CDropdownItem>
                  <CDropdownItem style={{ cursor: 'pointer' }} onClick={() => handleEditTrip(trip)}>Chỉnh sửa</CDropdownItem>
                  <CDropdownItem style={{ cursor: 'pointer' }} onClick={() => setTrips(trips.filter(t => t.id !== trip.id))}>Xoá chuyến</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            <CCardText style={{ marginTop: '20px' }}>
              Biển số xe: {trip.licensePlate}
            </CCardText>
            <CCardText>
              Thời gian chạy: {trip.time}
            </CCardText>
            <CCardText>
              Nơi đi: {trip.departure}
            </CCardText>
            <CCardText>
              Số luợng vé đã đặt: {trip.bookedTickets}
            </CCardText>
            <CCardText>
              Số luợng vé còn lại: {trip.remainingTickets}
            </CCardText>
            <CCardText>
              Giá vé: {trip.price.toLocaleString()} VND
            </CCardText>
          </CCardBody>
        </CCard>
      ))}
      <TripModal
        isOpen={modalOpen}
        toggle={handleToggleModal}
        onSave={handleSaveTrip}
        trip={selectedTrip}
      />
    </CRow>
  );
};

export default Progress;