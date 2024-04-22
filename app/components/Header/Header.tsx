"use client";

import React from 'react';
import { AppBar, Typography, Box, Button, IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {

    const { data: session, status } = useSession()
    const router = useRouter();

    return (

        <div className="h-[47px]">
            <AppBar className="px-7">
                <Box className="flex flex-row h-[47px] ">
                    <Box className="flex grow items-center">
                        <Typography variant="h6" component="h1" >
                            Garage Web Portal
                        </Typography>
                    </Box>
                    

                    <Box className="flex items-center">
                        {(status === "authenticated") && 
                        <Button 
                            
                            style={{
                            maxHeight: '40px',
                            }} size="medium" variant="contained" 
                            endIcon={<LogoutIcon />} onClick={(e) => {
                                e.preventDefault()
                                signOut()
                                router.push("/");
                            }
                            }>
                        Sign Out
                        </Button>
                        }
                        
                    </Box>

                </Box>
                
            </AppBar>
        </div>
    )
}


export default Header;
