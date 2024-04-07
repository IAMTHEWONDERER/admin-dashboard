import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalenderMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from "@mui/material";
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dpm';
import FlexBetween from './FlexBetween';
import profilepic from './assets/profilepic.jpeg';
const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) =>{
    const {pathname} = useLocation();
    const [active, setActive] = useState();
    const navigate = useNavigate();
    const theme = useTheme();
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar