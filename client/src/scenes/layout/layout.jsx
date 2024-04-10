import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "state/api";


const layout =() => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state)=>{state.global.userId});
    const {data} = useGetUserQuery(userId);
    console.log(data);

  return (
    <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
        <Sidebar 
        user={ data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
            <Box>
                <Navbar
                user ={data || {}}
                isSidebarOpen = {isSidebarOpen}
                setIsSidebarOpen = {setIsSidebarOpen}
                />
                <Outlet/>
            </Box>
    </Box>
  )
}

export default layout