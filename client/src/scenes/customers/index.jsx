import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Snackbar, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import ConfirmationDialog from '../../components/confirmdialogue';

const Customers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleBanClick = (userId) => {
    setSelectedUserId(userId);
    setConfirmAction("ban");
    setConfirmDialogOpen(true);
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setConfirmAction("delete");
    setConfirmDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    // Handle confirmation action based on confirmAction state
    if (confirmAction === "ban") {
      await banUser(selectedUserId);
    } else if (confirmAction === "delete") {
      await deleteUser(selectedUserId);
    }
    setConfirmDialogOpen(false); // Close the confirmation dialog
  };

  const banUser = async (userId) => {
    try {
      // Get the current status of the user
      const currentUser = users.find((user) => user._id === userId);
      if (!currentUser) {
        console.error("User not found for ID:", userId);
        return;
      }
      
      // Determine the new flag_system value based on the current status
      const newFlagSystem = currentUser.flag_system === "banned" ? "not banned" : "banned";
  
      // Make API request to update user's status
      const response = await axios.patch(`http://localhost:3111/users/banuser/${userId}`, {
        flag_system: newFlagSystem,
      });
      
      console.log("Ban/Unban User Response:", response.data);
  
      // Update user status in state
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, flag_system: newFlagSystem } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
  
      // Show appropriate snackbar message based on the action
      const snackbarMessage = newFlagSystem === "banned"
        ? `User with ID ${userId} successfully banned`
        : `User with ID ${userId} successfully unbanned`;
      setSnackbarMessage(snackbarMessage);
      setSnackbarOpen(true);
  
      reloadPage(); // Reload the page after updating the user's status
    } catch (error) {
      console.error("Error banning/unbanning user:", error);
    }
  };
  

  const deleteUser = async (userId) => {
    try {
      // Make API request to delete user
      await axios.delete(`http://localhost:3111/users/delete/${userId}`);
      console.log(`User with ID ${userId} deleted`);
      // Update users state after deletion
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setSnackbarMessage(`User with ID ${userId} successfully deleted`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const reloadPage = () => {
    window.location.reload(); // Reload the page
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };


  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredUsers = users.filter(
      (user) =>
        user._id.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.fullname.toLowerCase().includes(searchText) ||
        user.flag_system.toLowerCase().includes(searchText)
    );
    setFilteredUsers(filteredUsers);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:3111/users/getall")
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
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
      <Header title="USERS" subtitle="List of Users" />
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
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row._id} // Specify the unique ID for rows
        />
        <ConfirmationDialog
          open={confirmDialogOpen}
          onClose={handleConfirmDialogClose}
          onConfirm={handleConfirmAction}
          title={confirmAction === "ban" ? "Ban User" : "Delete User"}
          content={
            `Are you sure you want to ${
              confirmAction === "ban" ? "ban" : "delete"
            } this user?`
          }
        />
      </Box>
    </Box>
  );
};

export default Customers;