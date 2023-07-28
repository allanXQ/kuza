import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import {
  AccountBalance,
  BackHand,
  Calculate,
  Chat,
  Dashboard,
  ExpandLess,
  ExpandMore,
  History,
  Logout,
  Payment,
  Payments,
  Person,
  PointOfSale,
  Receipt,
  Redeem,
  RequestPage,
  RequestQuote,
  Savings,
} from "@mui/icons-material";
import { useState } from "react";
import { Collapse } from "@mui/material";

const navlinks = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    name: "Profile",
    icon: <Person />,
    path: "/profile",
  },
  {
    name: "Transact",
    icon: <PointOfSale />,
    submenu: [
      {
        name: "Deposit",
        icon: <AccountBalance />,
        path: "/transact/deposit",
      },
      {
        name: "Withdraw",
        icon: <Redeem />,
        path: "/transact/withdraw",
      },
      {
        name: "Bid",
        icon: <BackHand />,
        path: "/transact/bid",
      },
      {
        name: "Request Loan",
        icon: <RequestQuote />,
        path: "/transact/request-loan",
      },
      {
        name: "Pay Loan",
        icon: <Payment />,
        path: "/transact/pay-loan",
      },
    ],
  },
  {
    name: "Loan Calculator",
    icon: <Calculate />,
    path: "/loan-calculator",
  },
  {
    name: "Conversations",
    icon: <Chat />,
    path: "/Conversations",
  },
  {
    name: "Transaction History",
    icon: <History />,
    submenu: [
      {
        name: "Deposit History",
        icon: <Receipt />,
        path: "/transactions/deposit-history",
      },
      {
        name: "Withdrawal History",
        icon: <Receipt />,
        path: "/transactions/withdrawal-history",
      },
      {
        name: "Loan Requests",
        icon: <RequestPage />,
        path: "/transactions/loan-requests",
      },
      {
        name: "Loan Payments",
        icon: <Receipt />,
        path: "/transactions/loan-payments",
      },
      {
        name: "Loan History",
        icon: <Receipt />,
        path: "/transactions/loan-history",
      },
    ],
  },

  {
    name: "Logout",
    icon: <Logout />,
    path: "/logout",
  },
];

const drawerWidth = 220;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleSubmenuClick = (submenuName) => {
    setOpenSubmenus({
      ...openSubmenus,
      [submenuName]: !openSubmenus[submenuName],
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List disablePadding>
        {navlinks.map((link, index) =>
          !link.submenu ? (
            <ListItem
              key={index}
              component={Link}
              to={link.path}
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              })}
              className="navlink"
            >
              {link.icon && link.icon}
              <ListItemText
                component={Typography}
                variant="navlink"
                primary={link.name}
              />
            </ListItem>
          ) : (
            <List disablePadding>
              <ListItem
                key={link.name}
                onClick={() => handleSubmenuClick(link.name)}
                sx={(theme) => ({
                  display: "flex",
                  gap: theme.spacing(2),
                })}
              >
                {link.icon && link.icon}
                <ListItemText
                  component={Typography}
                  variant="navlink"
                  primary={link.name}
                />
                {openSubmenus[link.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {link.submenu.map((submenu) => (
                <Collapse
                  in={openSubmenus[link.name]}
                  timeout="auto"
                  unmountOnExit
                  sx={(theme) => ({
                    pl: theme.spacing(2),
                  })}
                >
                  <List component="div" disablePadding>
                    <ListItem
                      component={Link}
                      to={submenu.path}
                      key={submenu.name}
                      sx={(theme) => ({
                        display: "flex",
                        gap: theme.spacing(2),
                      })}
                      className="navlink"
                    >
                      {submenu.icon && submenu.icon}
                      <Typography variant="navlink" to={submenu.path}>
                        {submenu.name}
                      </Typography>
                    </ListItem>
                  </List>
                </Collapse>
              ))}
            </List>
          )
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="absolute"
        sx={{
          bgcolor: "white",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      ></Box>
    </Box>
  );
}

export default Navbar;
