import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Applications from "components/Applications"; // Import your Applications component here

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const [showApplications, setShowApplications] = useState(false); // State to control visibility of Applications component

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          {/* Button to toggle Applications component visibility */}
          <IconButton onClick={() => setShowApplications(!showApplications)}>
            {showApplications ? "Hide Applications" : "Show Applications"}
          </IconButton>
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
      {/* Conditionally render Applications component */}
      {showApplications && <Applications />}
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
