import { useState, useEffect } from 'react'; // Remove the React import
import React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);
  const [noMoreApplications, setNoMoreApplications] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/applications');
        const pendingApplications = response.data.filter(app => app.status === 'pending');
        console.log(pendingApplications)
        setApplications(pendingApplications);
        setLoading(false);
        if (pendingApplications.length === 0) {
          setNoMoreApplications(true);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5001/api/applications/${id}`, { status: newStatus });
      moveNextApplication();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const moveNextApplication = () => {
    if (currentApplicationIndex < applications.length - 1) {
      setCurrentApplicationIndex(prevIndex => prevIndex + 1);
    } else {
      setNoMoreApplications(true);
    }
  };

  const currentApplication = applications[currentApplicationIndex];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {noMoreApplications ? (
        <p>No more pending applications</p>
      ) : (
        currentApplication && (
          <div>
            <TextField
              id="applicant-name"
              label="Name"
              value={currentApplication.name} // Use value instead of defaultValue
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <TextField
              id="applicant-position"
              label="Position"
              value={currentApplication.position} // Use value instead of defaultValue
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <TextField
              id="applicant-experience"
              label="Experience"
              value={currentApplication.experience} // Use value instead of defaultValue
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <TextField
              id="applicant-status"
              label="Status"
              value={currentApplication.status} // Use value instead of defaultValue
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <button onClick={() => handleStatusChange(currentApplication._id, 'approved')}>
              Approve
            </button>
            <button onClick={() => handleStatusChange(currentApplication._id, 'declined')}>
              Decline
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Applications;