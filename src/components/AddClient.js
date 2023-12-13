import { Button } from '@mui/material';
import React from 'react';
import './AppointmentForm.css';

function AddClient({ onAddClientClick }) {
  return (
    <div>
      <Button variant='contained' color="primary" onClick={onAddClientClick} className='addClient'>
        Add Client
      </Button>
    </div>
  );
}

export default AddClient;