import React, { useState, useEffect, useCallback } from 'react';
import AppointmentsList from './AppointmentsList';
import AddClient from './AddClient';
import AppointmentForm from './AppointmentForm';
import { v4 as uuid } from 'uuid';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {

  const [clients, setClients] = useState([]);
  const [editedAppointment, setEditedAppointment] = useState(null);
  const [isEdited, setEdited] = useState(false);
  const [isAppointmentFormOpen, setAppointmentFormOpen] = useState(false);


  const handleAddClientClick = () => {
    setAppointmentFormOpen(true);
    setEdited(false);
  };

  const handleCloseAppointmentForm = (event, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      // User clicked outside the dialog or pressed the escape key
      return;
    }
    setAppointmentFormOpen(false);
    setEditedAppointment(null);
  };

  const handleDeleteClient = (clientId) => {
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);

    toast.success('Deleted successful!', { autoClose: 2000 });

  }

  const handleEditClient = (clientId) => {
    // Find the client with the given clientId
    const clientToEdit = clients.find((client) => client.id === clientId);

    // Set the edited appointment to the found client
    setEditedAppointment(clientToEdit);
    setEdited(true);

    // Open the appointment form
    setAppointmentFormOpen(true);
  };

  const handleSaveAppointment = (appointment) => {
    if (editedAppointment !== null) {
      // Update existing appointment
      setClients((prevClients) => {
        const updatedClients = prevClients.map((client) =>
          client.id === editedAppointment.id
            ? { ...client, ...appointment }
            : client
        );
        return updatedClients;
      });
      setEditedAppointment(null);
    } else {
      // Add new appointment
      setClients((prevClients) => [...prevClients, { id: uuid(), ...appointment }]);
    }
  };

  // Example of enhanced error handling in fetchData function
  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        // Handle the error (e.g., display a message to the user)
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Header />
      <AppointmentsList
        clients={clients}
        onDelete={handleDeleteClient}
        onEdit={handleEditClient}
      />
      <ToastContainer position='bottom-center' />
      <AddClient onAddClientClick={handleAddClientClick} />
      <AppointmentForm
        isOpen={isAppointmentFormOpen}
        onClose={handleCloseAppointmentForm}
        onSave={handleSaveAppointment}
        editedAppointment={editedAppointment}
        isEdit={isEdited}
      />

    </div>
  )
}

export default Home