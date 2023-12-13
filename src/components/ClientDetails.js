// import React, { useState } from 'react';
// import { Card, Button, Typography  } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Dialog from '@mui/material/Dialog';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Avatar from '@mui/material/Avatar';
// import './clientDetails.css';

// const ClientDetails = ({client,  onEdit, onDelete}) => {
    
//     const [open, setOpen] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null);

//     const handleClickOpen = () => {
//       setOpen(true);
//     };

//     const handleClose = (event, reason) => {
//       if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
//         // User clicked outside the dialog or pressed the escape key
//         return;
//       }
//       setOpen(false);
//       setAnchorEl(null);

//     };

//     const handleMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
  
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//       };


//     const handleEdit = () => {
//       console.log(client.id,"CLient Id")
//       onEdit(client.id); // Call the onEdit function with the clientId
//       handleMenuClose();
//     };

//     const handleDelete = () => {
//       onDelete(client.id);
//       handleClose();
//       setAnchorEl(null);
//     };

//     if (!client || !client.firstName) {
//       return null; // or render an error message
//     }
  
//     const clientInfo = client;

//   return (
//     <Card className="card">
//         <div className="overlay">
//             <Avatar>{clientInfo.firstName.charAt(0)} {clientInfo.lastName.charAt(0)}</Avatar>
//             <Typography variant="h5">{clientInfo.firstName} {clientInfo.lastName}</Typography>
//             <Typography variant="h5">{clientInfo.location}</Typography>
//             {/* {console.log("Client details", clientInfo)} */}
//             {/* <Typography variant="h5">{clientInfo.appointmentDates}</Typography> */}
//         </div>
//         < div className="overlay2">
//             <Button
//               style={{ color: 'black' }}
//               size="small" 
//               onClick={handleMenuOpen}>
//               <MoreVertIcon fontSize="medium" />
//             </Button>
//         </div>
//         <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={handleEdit}>
//               <Button
//                 size="small" 
//                 color="secondary" 
//               >
//                 <EditIcon className='editIcon' fontSize="small" /> Edit
//               </Button>
//             </MenuItem>
//             <MenuItem onClick={handleClickOpen}>
//               <Button
//                 size="small" 
//                 color="secondary" 
//               >
//                 <DeleteIcon className='editIcon' fontSize="small" /> Delete
//               </Button>
//             </MenuItem>
//         </Menu>
//         <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
//           <DialogTitle>Delete Post</DialogTitle>
//           <DialogContent>Are you sure you want to delete this Client?</DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleDelete} color="secondary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//     </Card>
//   )
// }

// export default ClientDetails

import React, { useState } from 'react';
import { Card, Button, Typography, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './clientDetails.css';

const ClientDetails = ({ client, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
      // User clicked outside the dialog or pressed the escape key
      return;
    }
    setOpen(false);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(client.id);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(client.id);
    handleClose();
    setAnchorEl(null);
  };

  if (!client || !client.firstName) {
    return null;
  }

  const clientInfo = client;

  return (
    <Card className="card">
     <div className="overlay">
        <CardContent>
          <Avatar>{clientInfo.firstName.charAt(0)} {clientInfo.lastName.charAt(0)}</Avatar>
          <Typography variant="h5">{clientInfo.firstName} {clientInfo.lastName}</Typography>
          <Typography variant="h5">{clientInfo.location}</Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Appointment Dates and Times:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {clientInfo.appointments.map((appointment, index) => (
                  <div key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="body1">{`Date: ${appointment.date} Time: ${appointment.time}`}</Typography>
                      </CardContent>
                    </Card>
                  </div>
               ))}
              </AccordionDetails>
            </Accordion >
        </CardContent>
      </div>
      <div className="overlay2">
        <Button style={{ color: 'black' }} size="small" onClick={handleMenuOpen}>
          <MoreVertIcon fontSize="medium" />
        </Button>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>
          <Button size="small" color="secondary">
            <EditIcon className="editIcon" fontSize="small" /> Edit
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>
          <Button size="small" color="secondary">
            <DeleteIcon className="editIcon" fontSize="small" /> Delete
          </Button>
        </MenuItem>
      </Menu>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>Are you sure you want to delete this Client?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ClientDetails;