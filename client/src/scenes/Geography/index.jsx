import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function MyScene() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    weight: '70 kg',
    height: '180 cm',
    address: '123 Main St, City, Country',
    gender: 'Male',
    dob: '01/01/1990',
    idCardNumber: '123456789',
    yearsOfExperience: '5 years',
    motivationalText: 'I am a highly motivated individual seeking new opportunities.',
  });

  const handleFileUpload = (fieldName, event) => {
    // Handle file upload logic
  };

  return (
    <div>
      <Typography variant="h4">Applicant Information</Typography>
      {Object.entries(formData).map(([key, value]) => (
        <TextField
          key={key}
          id={key}
          label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          value={value}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="outlined" component="label">
        Upload CV
        <input type="file" hidden onChange={(e) => handleFileUpload('cv', e)} />
      </Button>
      {/* Add similar buttons for other file uploads */}
    </div>
  );
}

export default MyScene;
