import React, { useState, useEffect } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

const Products = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  const handleDeleteClick = async (customerId) => {
    console.log(`Deleting customer with ID ${customerId}`);
    try {
      await axios.delete(`http://localhost:3111/coaches/deletecoach/${customerId}`);
  
      // Re-fetch data after successful deletion
      const response = await axios.get("http://localhost:3111/coaches/getallcoaches");
      setCoaches(response.data);
      setFilteredCoaches(response.data);
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
      console.log(response.data); // Check the structure of received data
      setCoaches(response.data);
      setFilteredCoaches(response.data);
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
}, []);


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

    </Box>
  </Box>
);

}

export default Products;