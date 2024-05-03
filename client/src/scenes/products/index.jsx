import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../../components/confirmation";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { FaRegTrashAlt } from "react-icons/fa";

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
      const currentCoach = coaches.find((coach) => coach._id === coachId);
      if (!currentCoach) {
        console.error("Coach not found for ID:", coachId);
        return;
      }
      const newFlagSystem = currentCoach.flag_system === "banned" ? "not banned" : "banned";
  
      // Make API request to update user's status
      const response = await axios.patch(`http://localhost:3111/coaches/bancoach/${coachId}`, {
        flag_system: newFlagSystem,
      });
      console.log("Ban/Unban Coach Response:", response.data);
  
      // Update user status in state
      const updatedCoaches = coaches.map((coach) =>
        coach._id === coachId ? { ...coach, flag_system: newFlagSystem } : coach
      );
      setCoaches(updatedCoaches);
      setFilteredCoaches(updatedCoaches); 
  
      // Show appropriate snackbar message based on the action
      const snackbarMessage = newFlagSystem === "banned"
        ? `Coach with ID ${coachId} successfully banned`
        : `Coach with ID ${coachId} successfully unbanned`;
      setSnackbarMessage(snackbarMessage);
      setSnackbarOpen(true);
      reloadPage(); 
    } catch (error) {
      console.error("Error banning/unbanning coach:", error);
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
      console.log(response.data);
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
  { field: "fullname", headerName: "Full Name", flex: 0.75 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "price", headerName: "Price in $", flex: 0.5 },
  { field: "flag_system", headerName: "Status", flex: 1 },
  {
    field: "actions",
    headerName: "",
    flex: 1,
    renderCell: (params) => (
      <Box mx={-1} display="flex" alignItems="center" justifyContent="space-between">
        <Button
          variant="contained"
          color={params.row.flag_system === "banned" ? "primary" : "error"}
          onClick={() => handleBanClick(params.row._id)}
        > 
          {params.row.flag_system === "banned" ? "Unban" : "Ban"}
        </Button>
        <Box mx={3} />
        <Button
          color="error"
          onClick={() => handleDeleteClick(params.row._id)}
        >
          <FaRegTrashAlt  />
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