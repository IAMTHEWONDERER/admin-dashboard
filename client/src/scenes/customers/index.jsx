import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Customers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);


  const handleBanClick = async (customerId) => {
    console.log(`Banning customer with ID ${customerId}`);
    try {
      const response = await axios.patch(`http://localhost:3111/users/banuser/${customerId}`, {
        flag_system: "banned",
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Response:", response.data);
      const updatedUser = response.data;
  
      // Update the user's status in the local state
      setUsers(users.map(user =>
        user._id === updatedUser._id ? updatedUser : user
      ));
      setFilteredUsers(filteredUsers.map(user =>
        user._id === updatedUser._id ? updatedUser : user
      ));
    } catch (error) {
      console.error("Error banning user:", error);
      console.log("Error response:", error.response);
    }
  };
  
  

  const handleDeleteClick = async (customerId) => {
    console.log(`Deleting customer with ID ${customerId}`);
    try {
      // Send DELETE request to your backend API
      await axios.delete(`http://localhost:3111/users/delete/${customerId}`);
      // Remove the deleted user from the users state
      const updatedUsers = users.filter(user => user._id !== customerId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // Update filteredUsers as well
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
      </Box>
    </Box>
  );
};

export default Customers;