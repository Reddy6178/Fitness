

import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertDialog from './AlertDialog'; // Import the AlertDialog component
import './AppointmentForm.css';

const AppointmentForm = ({
  isOpen,
  onClose,
  onSave,
  editedAppointment,
  isEdit,
}) => {
  const initialDate = new Date();

  const initialAppointment = {
    id: new Date().getTime(),
    appointments: [{ date: initialDate, time: '09:00' }],
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    appointments: [initialAppointment],
  });

  const [formErrors, setFormErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        location: '',
        appointments: [initialAppointment],
      });
      setFormErrors({});
    } else if (editedAppointment) {
      const { firstName, lastName, location, appointments } = editedAppointment;
      setFormData({
        firstName,
        lastName,
        location,
        appointments: appointments.map(appointment => ({
          ...appointment,
          date: new Date(appointment.date),
        })),
      });
      setFormErrors({});
    }
  }, [isOpen, editedAppointment]);

  const validateForm = () => {
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    const dateErrors = formData.appointments.reduce((acc, appointment, index) => {
      if (!appointment.date) {
        acc[index] = { ...acc[index], date: 'Date is required' };
      }

      if (!appointment.time) {
        acc[index] = { ...acc[index], time: 'Time is required' };
      }

      return acc;
    }, {});

    if (Object.keys(dateErrors).length > 0) {
      errors.appointments = dateErrors;
    }

    return errors;
  };

  const handleDateChange = (date, dateIndex) => {
    setFormData((prevData) => {
      const newAppointments = [...prevData.appointments];
      newAppointments[dateIndex] = { ...newAppointments[dateIndex], date };

      // Clear the error message for the changed date
      const newFormErrors = { ...formErrors };
      if (newFormErrors.appointments && newFormErrors.appointments[dateIndex]) {
        newFormErrors.appointments[dateIndex] = { ...newFormErrors.appointments[dateIndex], date: undefined };
      }

      return { ...prevData, appointments: newAppointments };
    });
  };

  const handleTimeChange = (e, dateIndex) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const newAppointments = [...prevData.appointments];
      newAppointments[dateIndex] = { ...newAppointments[dateIndex], time: value };

      // Clear the error message for the changed time
      const newFormErrors = { ...formErrors };
      if (newFormErrors.appointments && newFormErrors.appointments[dateIndex]) {
        newFormErrors.appointments[dateIndex] = { ...newFormErrors.appointments[dateIndex], time: undefined };
      }

      return { ...prevData, appointments: newAppointments };
    });
  };

  const handleAddDate = () => {
    setFormData((prevData) => ({
      ...prevData,
      appointments: [...prevData.appointments, initialAppointment],
    }));
  };

  const handleRemoveDate = (dateIndex) => {
    setFormData((prevData) => {
      const newAppointments = [...prevData.appointments];
      newAppointments.splice(dateIndex, 1);
      return { ...prevData, appointments: newAppointments };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Check for uniqueness of date and time combinations
      const uniqueAppointments = new Set();
      const isUnique = formData.appointments.every((appointment) => {
        const dateTimeString = `${appointment.date.toISOString()} ${appointment.time}`;
        if (uniqueAppointments.has(dateTimeString)) {
          setErrorModalMessage('Appointments should be unique.');
          setShowErrorModal(true);
          return false;
        }
        uniqueAppointments.add(dateTimeString);
        return true;
      });

      if (isUnique) {
        const formattedData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          location: formData.location,
          appointments: formData.appointments.map((appointment) => ({
            date: appointment.date,
            time: appointment.time,
          })),
        };

        isEdit ? toast.success('Update successful!', { autoClose: 2000 }) : toast.success('Submit successful!', { autoClose: 2000 });
        onSave(formattedData);

        onClose();

      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!value) {
      setFormErrors({ ...formErrors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
    } else {
      const { [name]: removedError, ...rest } = formErrors;
      setFormErrors(rest);
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      location: '',
      appointments: [initialAppointment],
    });
    setFormErrors({});
  };

  return (
    <div>
      <ToastContainer position='bottom-center' />
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle className='title'>{isEdit ? 'Edit' : 'Add'} Client</DialogTitle>
        <DialogActions>
          <CloseIcon onClick={onClose} className='close' />
        </DialogActions>
        <DialogContent>
          <form autoComplete='off' onSubmit={handleSubmit} name='appointmentForm' id='appointmentForm'>
            <TextField
              name='firstName'
              variant='outlined'
              label='First Name'
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              error={Boolean(formErrors.firstName)}
              helperText={formErrors.firstName}
              className='userText'
            />

            <TextField
              name='lastName'
              variant='outlined'
              label='Last Name'
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              error={Boolean(formErrors.lastName)}
              helperText={formErrors.lastName}
              className='userText'
            />

            <TextField
              name='location'
              variant='outlined'
              label='Location'
              fullWidth
              value={formData.location}
              onChange={handleChange}
              error={Boolean(formErrors.location)}
              helperText={formErrors.location}
              className='userText'
            />

            <div className='appointments'>
              <Typography variant="h5">{isEdit ? 'Edit' : 'Select'} Appointment Date and Time :</Typography>
              {formData.appointments.map((appointment, index) => (
                <div key={index} className='form-field'>
                  <div className='date-time-container'>
                    <div className='date-picker-container'>
                      <label htmlFor={`date-${index}`}>Date:</label>
                      <DatePicker
                        id={`date-${index}`}
                        selected={appointment.date}
                        onChange={(date) => handleDateChange(date, index)}
                        dateFormat='MM/dd/yyyy'
                        minDate={new Date()}
                        value={appointment.date}
                        placeholderText="Select Date"
                      />

                      {/* Display error for date */}
                      {formErrors.appointments && formErrors.appointments[index] && formErrors.appointments[index].date && (
                        <div className="error-message">{formErrors.appointments[index].date}</div>
                      )}
                    </div>
                    <div className='time-picker-container'>
                      <label htmlFor={`time-${index}`}>Time:</label>
                      <select
                        id={`time-${index}`}
                        value={appointment.time}
                        onChange={(e) => handleTimeChange(e, index)}
                        required
                        placeholder='Select Time'
                      >
                        <option value="" default>Select time</option>
                        {Array.from({ length: 19 }, (_, i) => {
                          const hour = Math.floor(i / 2) + 9;
                          const minute = i % 2 === 0 ? '00' : '30';
                          const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
                          return (
                            <option key={i} value={timeString}>
                              {timeString}
                            </option>
                          );
                        })}
                      </select>
                      {/* Display error for time */}
                      {formErrors.appointments && formErrors.appointments[index] && formErrors.appointments[index].time && (
                        <div className="error-message">{formErrors.appointments[index].time}</div>
                      )}
                    </div>
                    {index > 0 && (
                      <div className="remove-button-container">
                        <button type='button' className="remove-button" onClick={() => handleRemoveDate(index)}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}


              <div className='button-group'>
                <Button variant='contained' color="primary" onClick={handleAddDate} >
                  Add Date
                </Button>
              </div>
            </div>

            <div className='submit-reset-buttons'>
              <Button variant="contained" color="success" type='submit'>
                {isEdit ? 'Update' : 'Submit'}
              </Button>
              {!isEdit && (
                <Button variant="outlined" color="error" onClick={handleClear}>
                  Clear
                </Button>
              )}
            </div>

          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={errorModalMessage}
      />
    </div>
  );
};

export default AppointmentForm;
