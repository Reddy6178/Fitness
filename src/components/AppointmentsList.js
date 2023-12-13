import {Grid } from '@mui/material';
import React from 'react';
import ClientDetails from './ClientDetails';

const AppointmentsList = ({ clients, onDelete, onEdit }) => {
  
  return (
    <Grid container spacing={2} style={{ marginTop: '10px' }} >
      {clients.map((client) => (
        <Grid key={client.id} item xs={12} sm={6} md={4} lg={4}>
          <ClientDetails client={client} onDelete={onDelete} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AppointmentsList;