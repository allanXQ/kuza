import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
  PersonOutlined as Person,
  PointOfSaleOutlined as PointOfSale,
  ReceiptOutlined as Receipt,
  RedeemOutlined as Redeem,
  RequestPageOutlined as RequestPage,
  RequestQuoteOutlined as RequestQuote,
} from "@mui/icons-material";
import { Avatar, Badge, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

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
        path: "/deposit-history",
      },
      {
        name: "Withdrawal History",
        icon: <Receipt />,
        path: "/withdrawal-history",
      },
      {
        name: "Loan Requests",
        icon: <RequestPage />,
        path: "/loan-requests",
      },
      {
        name: "Loan Payments",
        icon: <Receipt />,
        path: "/loan-payments",
      },
      {
        name: "Loan History",
        icon: <Receipt />,
        path: "/loan-history",
      },
    ],
  },

  {
    name: "Logout",
    icon: <Logout />,
    path: "/logout",
  },
];

export const Sidenav = ({
  drawerWidth,
  drawerHeight,
  topBarHeight,
  isOpen,
}) => {
  const theme = useTheme();
  const MenuItemStyle = {
    paddingLeft: "5px",
    margin: "0",
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor="rgb(249, 249, 249, 0.7)"
      gap={2}
      width={{ md: drawerWidth }}
    >
      <Sidebar
        toggled={theme.breakpoints.down("md") ? isOpen : true}
        width={drawerWidth}
        breakPoint="900px"
        style={{
          display: "flex",
          height: drawerHeight,

          // backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            paddingTop: `calc(${topBarHeight} + 1rem)`,
          }}
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
            }}
          />
          <Typography variant="h6">Welcome Back</Typography>
          <Typography variant="h6">Allan Juma</Typography>
        </Box>
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
    </Box>
  );
};

export const Topbar = ({ drawerWidth, topBarHeight, isOpen, setOpen }) => {
  return (
    <AppBar
      // position="relative"
      sx={{
        width: { md: `calc(100% - ${drawerWidth})` },
        ml: { md: `${drawerWidth}` },
        height: topBarHeight,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { md: "none" } }}
          onClick={() => setOpen(!isOpen)}
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
