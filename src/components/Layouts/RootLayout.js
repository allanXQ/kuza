import React from "react";
import Navbar from "../Navigation/Navbar";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

const RootLayout = () => {
  return (
    <>
      <Navbar />
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
