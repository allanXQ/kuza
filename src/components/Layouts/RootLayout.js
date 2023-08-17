import React from "react";
import { Sidenav, Topbar } from "../Navigation/Navbar";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

const drawerWidth = "200px";
const topBarHeight = "50px";
const drawerHeight = "100vh";

const RootLayout = () => {
  return (
    <>
      <Topbar topBarHeight={topBarHeight} drawerWidth={drawerWidth} />
      <Sidenav drawerHeight={drawerHeight} drawerWidth={drawerWidth} />
      <Grid
        container
        sx={{
          position: "relative",
          // left: 235,
          top: 30,
          gap: 2,
        }}
      >
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
