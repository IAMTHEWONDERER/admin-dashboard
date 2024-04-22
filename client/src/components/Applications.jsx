import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Applications() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    weight: '70 kg',
    height: '180 cm',
    address: '123 Main St, City, status',
    gender: 'Male',
    dob: '01/01/1990',
    idCardNumber: '123456789',
    yearsOfExperience: '5 years',
    motivationalText: 'I am a highly motivated individual seeking new opportunities.',
  });

  const handleStatusChange = async (status) => {
    try {
      // Make API call to update application status
      const response = await fetch(`http://localhost:5001/applications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      // Handle successful status update
      console.log('Application status updated successfully');
    } catch (error) {
      // Handle status update error
      console.error('Error updating application status:', error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4"> Applicant Information</Typography>
      <Grid container spacing={0.5}>
        {Object.entries(formData).map(([key, value]) => (
          <React.Fragment key={key}>
            {key !== 'address' && (
              <Grid item xs={6}>
                <TextField
                  id={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={value}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
            )}
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <TextField
            id="address"
            label="Address"
            value={formData.address}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => handleStatusChange('approved')}
            sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#ce0000' : '#ce0000', color: '#ffffff', fontSize: '1.2rem', padding: '0.5rem 1.2rem' }}
          >
            Approve
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => handleStatusChange('declined')}
            sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff', fontSize: '1.2rem', padding: '0.5rem 1.2rem'  }}
          >
            Decline
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Applications;
