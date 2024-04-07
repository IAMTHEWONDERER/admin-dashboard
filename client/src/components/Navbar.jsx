import React, {useState} from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'

import FlexBetween from './FlexBetween'
import { UseDispatch } from 'react-redux';
import {setMode} from "state";
import profilepic from "assets/profilepic.jpeg"
import { AppBar,useTheme } from '@mui/material';
const Navbar =() => {
    const dispatch = UseDispatch();
    const theme = useTheme();
     return (
    <AppBar
    sx={{
        position :"static",
        background : "none",
        boxShadow : "none",
    }}>
        <Toolbar sx={{justifyContent : "space-between"}}>
            {/*left side */}
            <FlexBetween>
                <IconButton onClick={()=>{console.log("open")}}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                    backgroundColor ={theme.palette.background.alt}
                    borderRadius= "9px"
                    gap="3rem"
                    p="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search for Something"/>
                    <IconButton>
                        <Search />
                    </IconButton>
                    {/* <img src={profilepic} alt="profilepic" style={{width : "3rem", height : "3rem", borderRadius : "50%"}}/>
                    <FlexBetween gap="1rem">
                        <Typography variant="h6" sx={{color : theme.palette.text.primary}}>
                            <NAME>
                        </Typography>
                        <Typography variant="h6" sx={{color : theme.palette.text.primary}}>
                            <EMAIL>
                        </Typography>
     */}
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap="1.5rem">
                <IconButton On onClick={()=> dispatch(setMode())}>

                </IconButton>
            </FlexBetween>
            <FlexBetween gap="1.5rem">
                <IconButton On onClick={()=> dispatch(setMode())}>
                    {theme.palette.mode ==="dark" ? (
                        <DarkModeOutlined sx={{fontSize : "25px"}} />
                    ) : (
                        <LightModeOutlined sx={{fontSize : "25px"}} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{fontSize : "25px"}} />
                </IconButton>
            </FlexBetween>
        </Toolbar>

    </AppBar>
  )
}

export default Navbar