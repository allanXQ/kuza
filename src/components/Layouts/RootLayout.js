import React from "react";
import { Sidenav, Topbar } from "../Navigation/Navbar";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

const drawerWidth = "200px";
const topBarHeight = "50px";
const drawerHeight = "100vh";

const RootLayout = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
        }}
      >
        <Grid item>
          <Sidenav
            drawerHeight={drawerHeight}
            drawerWidth={drawerWidth}
            topBarHeight={topBarHeight}
            isOpen={open}
          />
        </Grid>
        <Grid item>
          <Topbar
            topBarHeight={topBarHeight}
            drawerWidth={drawerWidth}
            isOpen={open}
            setOpen={setOpen}
          />
          <Grid
            container
            sx={{
              mt: `calc(${topBarHeight} + 1rem)`,
              width: { md: `calc(100vw - ${drawerWidth})` },
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
