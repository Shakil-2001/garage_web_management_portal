"use client"

import React, { useState } from "react";
import { useSession } from "next-auth/react"; 
import {CssBaseline} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material'
import { AuthProvider } from "./Providers";
import "./styles/main.css";
import Sidebar from "./components/Sidebar";
import PageWrapper from "./components/Wrappers/PageWrapper";
import MarginWidthWrapper from "./components/Wrappers/MarginWidthWrapper";
import Header from "./components/Header";



const theme = createTheme({
  typography:{
    h2: {
      fontSize: 24,
      fontWeight: "bold"
    },
    h3: {
      fontSize: 20,
      fontWeight: "bold"
    },
    h4: {
      fontSize: 16,
      fontWeight: "bold"
    },
    body1: {

    }
  },
  palette: {
    primary: {
      main: '#192E4B',
      light: '#244D87',
      dark: '#0E1928'
    }, 
    secondary: {
      main: '#F0355A',
      light: 'rgb(243, 93, 123)',
      dark: 'rgb(168, 37, 62)'
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c'
    }
  }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (

    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <body>
            <div className="flex">
              <Sidebar />
                <main className="flex-1 bg-gray-600">
                  <MarginWidthWrapper>
                    <Header />
                    <PageWrapper>{children}</PageWrapper>
                  </MarginWidthWrapper>
                </main>  
            </div>          
          </body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  )
}
