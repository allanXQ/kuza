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
  AccountBalanceOutlined as AccountBalance,
  BackHandOutlined as BackHand,
  CalculateOutlined as Calculate,
  ChatOutlined as Chat,
  DashboardOutlined as Dashboard,
  HistoryOutlined as History,
  LogoutOutlined as Logout,
  PaymentOutlined as Payment,
  Payments,
  PersonOutlined as Person,
  PointOfSaleOutlined as PointOfSale,
  ReceiptOutlined as Receipt,
  RedeemOutlined as Redeem,
  RequestPageOutlined as RequestPage,
  RequestQuoteOutlined as RequestQuote,
  Savings,
} from "@mui/icons-material";
import { useState } from "react";
import { Avatar, Badge, Collapse } from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";

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
    badge: 4,
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

export const Sidenav = ({ drawerWidth, drawerHeight }) => {
  const MenuItemStyle = {
    paddingLeft: "5px",
    margin: "0",
  };
  return (
    <Sidebar
      toggled={true}
      width={drawerWidth}
      style={{
        height: drawerHeight,
        backgroundColor: "#fff",
      }}
    >
      <Avatar />
      <Menu>
        {navlinks.map((item, index) =>
          !item.submenu ? (
            <MenuItem
              key={index}
              component={<Link to={item.path} />}
              icon={item.icon}
              style={{ ...MenuItemStyle }}
            >
              {item.badge ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    height: "25px",
                  }}
                >
                  {item.name}
                  <Badge badgeContent={item.badge} color="secondary" />
                </span>
              ) : (
                item.name
              )}
            </MenuItem>
          ) : (
            <SubMenu
              key={index}
              label={item.name}
              style={{
                ...MenuItemStyle,
              }}
              icon={item.icon}
            >
              {item.submenu.map((subitem, index) => {
                return (
                  <MenuItem
                    key={index}
                    component={<Link to={subitem.path} />}
                    icon={subitem.icon}
                    style={{ ...MenuItemStyle }}
                  >
                    {subitem.name}
                  </MenuItem>
                );
              })}
            </SubMenu>
          )
        )}
      </Menu>
    </Sidebar>
  );
};

export const Topbar = ({ drawerWidth, topBarHeight }) => {
  return (
    <AppBar
      // position="relative"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth})` },
        ml: { sm: `${drawerWidth}` },
        height: topBarHeight,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* {props.title} */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
