import React, { useState, useEffect } from "react";
import { Box, TextField, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

const Customers = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredCoaches = coaches.filter(
      (coach) =>
        coach._id.toLowerCase().includes(searchText) ||
        coach.fullname.toLowerCase().includes(searchText) ||
        coach.email.toLowerCase().includes(searchText) ||
        coach.flag_system.toLowerCase().includes(searchText)
    );
    setFilteredCoaches(filteredCoaches);
  };

  useEffect(() => {
    axios.get("http://localhost:3111/coaches/getallcoaches")
      .then(response => {
        console.log("Raw data from server:", response.data); // Log the raw data from the server
        setCoaches(response.data);
        setFilteredCoaches(response.data);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "fullname", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "flag_system", headerName: "Status", flex: 1 },
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
          rows={filteredCoaches}
          columns={columns}
          getRowId={(row) => row._id}
          
        />
      </Box>
    </Box>
  );
};

export default Customers;