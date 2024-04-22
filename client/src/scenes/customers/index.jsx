import React, { useState, useEffect } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

const Customers = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleBanClick = (customerId) => {
    console.log(`Banning customer with ID ${customerId}`);
  };

  const handleDeleteClick = (customerId) => {
    console.log(`Deleting customer with ID ${customerId}`);
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredUsers = users.filter(
      (user) =>
        user._id.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.fullname.toLowerCase().includes(searchText)
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box mx={2} display="flex" alignItems="center" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBanClick(params.row._id)}
          >
            Ban
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
      <Header title="CUSTOMERS" subtitle="List of Customers" />
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
