import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Snackbar, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../../components/confirmation";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [fullName, setFullName] = useState("");
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState(null);
  const [actionType, setActionType] = useState("");


  const handleBanClick = (coachId) => {
    setSelectedCoachId(coachId);
    setActionType("ban"); // Set the action type for the confirmation dialog
    setConfirmationOpen(true);
  };

  const handleDeleteClick = (coachId) => {
    setSelectedCoachId(coachId);
    setActionType("delete"); // Set the action type for the confirmation dialog
    setConfirmationOpen(true);
  };

  const handleConfirmAction = async () => {
    // Handle ban or delete action based on the actionType state
    if (actionType === "ban") {
      await banCoach(selectedCoachId);
    } else if (actionType === "delete") {
      await deleteCoach(selectedCoachId);
    }
    setConfirmationOpen(false); // Close the confirmation dialog
  };

  const banCoach = async (coachId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3111/coaches/bancoach/${coachId}`,
        {
          flag_system: "banned",
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Ban Coach Response:", response.data);
      const updatedCoach = response.data;
      const updatedCoaches = coaches.map((coach) =>
        coach._id === updatedCoach._id ? updatedCoach : coach
      );
      setCoaches(updatedCoaches);
      setFilteredCoaches(updatedCoaches);
      const confirmationMessage = `Coach with ID ${coachId} successfully banned`;
      console.log(confirmationMessage);
    } catch (error) {
      console.error("Error banning coach:", error);
    }
  };

  const deleteCoach = async (coachId) => {
    try {
      await axios.delete(`http://localhost:3111/coaches/deletecoach/${coachId}`);
      console.log(`Coach with ID ${coachId} deleted`);
      const updatedCoaches = coaches.filter((coach) => coach._id !== coachId);
      setCoaches(updatedCoaches);
      setFilteredCoaches(updatedCoaches);
      const confirmationMessage = `Coach with ID ${coachId} successfully deleted`;
      console.log(confirmationMessage);
    } catch (error) {
      console.error("Error deleting coach:", error);
    }
  };


  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleCloseConfirmation = () => {
    setSelectedCoachId(null);
    setConfirmationOpen(false);
  };


const handleSearchChange = (event) => {
  const searchText = event.target.value.toLowerCase();
  setSearchText(searchText);
  const filteredCoaches = coaches.filter(
    (coach) =>
      coach._id.toLowerCase().includes(searchText) ||
      coach.email.toLowerCase().includes(searchText) ||
      coach.fullname.toLowerCase().includes(searchText) ||
      coach.flag_system.toLowerCase().includes(searchText)
  );
  setFilteredCoaches(filteredCoaches);
};

useEffect(() => {
  axios.get("http://localhost:3111/coaches/getallcoaches")
    .then(response => {
      console.log(response.data); // Check the structure of received data
      setCoaches(response.data);
      setFilteredCoaches(response.data);
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
}, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    setFullName(decodedToken.fullname); // Update fullName state
  } else {
    // Redirect to sign-in if no token is present
    navigate("/signin");
  }
}, [navigate]);


const columns = [
  { field: "_id", headerName: "ID", flex: 1},
  { field: "fullname", headerName: "Full Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "flag_system", headerName: "Status", flex: 1 },
  {
    field: "actions",
    headerName: "",
    flex: 1,
    renderCell: (params) => (
      <Box mx={2} display="flex" alignItems="center" justifyContent="space-between">
        <Button
          variant="contained"
          color={params.row.flag_system === "banned" ? "primary" : "primary"}
          onClick={() => handleBanClick(params.row._id)}
        >
          {params.row.flag_system === "banned" ? "Unban" : "Ban"}
        </Button>
        <Box mx={3} />
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteClick(params.row._id)}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

return (
  <Box m="1.5rem 2.5rem">
    <Header title="COACHES" subtitle="List of Coaches" />
    <Box
      mt="40px"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <DataGrid
        loading={isLoading}
        rows={filteredCoaches}
        columns={columns}
        getRowId={(row) => row._id || Math.random()}
      />
<ConfirmationDialog
  open={confirmationOpen}
  onClose={() => setConfirmationOpen(false)} // Close the dialog when Cancel is clicked
  onConfirm={handleConfirmAction} // Handle the confirmation action
  title={actionType === "ban" ? "Ban Coach" : "Delete Coach"} // Set the title based on actionType
  content={`Are you sure you want to ${actionType === "ban" ? "ban" : "delete"} this coach?`}
/>

    </Box>
  </Box>
);

}

export default Products;