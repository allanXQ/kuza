//account balance
//loans taken
//loans given
//credit score

//active loan requests
import { useTheme } from "@emotion/react";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const stats = [
  {
    name: "Balance",
    value: "100",
    percentageChange: 10,
  },
  {
    name: "Loans Given",
    value: "1000",
    percentageChange: 10,
  },
  {
    name: "Loans Taken",
    value: "1000",
    percentageChange: 10,
  },
  {
    name: "Total Profit",
    value: "750",
    percentageChange: -10,
  },
  // {
  //   name: "Active Loan Requests",
  //   value: "1000000",
  // },
];

const Deposits = [
  {
    MpesaRef: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  {
    MpesaRef: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  {
    MpesaRef: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  {
    MpesaRef: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  // {
  //   MpesaRef: "123456789",
  //   Amount: 1000,
  //   Date: "12/12/2021",
  //   status: "success",
  // },
  // {
  //   MpesaRef: "123456789",
  //   Amount: 1000,
  //   Date: "12/12/2021",
  //   status: "success",
  // },
];

const Withdrawals = [
  {
    Phone: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  {
    Phone: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  {
    Phone: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  {
    Phone: "123456789",
    Amount: 1000,
    Date: "12/12/2021",
    status: "success",
  },
  // {
  //   Phone: "123456789",
  //   Amount: 1000,
  //   Date: "12/12/2021",
  //   status: "success",
  // },
  // {
  //   Phone: "123456789",
  //   Amount: 1000,
  //   Date: "12/12/2021",
  // },
];

const secondaryCardWidth = "250px";
const overviewWidth = `calc(100vw - 200px - ${secondaryCardWidth} - 4rem)`;

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: { sm: "column", lg: "row" },
        justifyContent: "center",
        // gap: 2,
        // alignItems: "center",
        flexGrow: 1,
        flexBasis: 0,
        flexWrap: "wrap",
      }}
    >
      <Grid item>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { sm: "100vw", lg: overviewWidth },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexGrow: 1,
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography variant="h5">Account Overview</Typography>
            <CardActionArea
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                maxWidth: { sm: "250px" },
                gap: 2,
                flexGrow: 1,
              }}
            >
              <Button variant="contained" color="primary">
                Withdraw
              </Button>
              <Button variant="contained" color="primary">
                Deposit
              </Button>
            </CardActionArea>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: { xs: 2, sm: 4 },
              alignItems: "center",
              flexWrap: "wrap",
              flexGrow: 1,
              flexFlow: "row wrap",
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    width: "150px",
                  }}
                >
                  <Typography variant="body2">{stat.name}</Typography>
                  <Box>
                    {stat.percentageChange > 0 ? (
                      <Typography
                        variant="caption"
                        color="green"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.1rem",
                        }}
                      >
                        <KeyboardArrowUpOutlined
                          sx={{
                            fontSize: "1rem",
                          }}
                        />
                        +{stat.percentageChange}%
                      </Typography>
                    ) : (
                      <Typography
                        variant="caption"
                        color="red"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.1rem",
                        }}
                      >
                        <KeyboardArrowDownOutlined
                          sx={{
                            fontSize: "1rem",
                          }}
                        />
                        -{stat.percentageChange}%
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  KSH {stat.value}
                </Typography>
              </Box>
            ))}
          </CardContent>

          <CardContent>Recent Transactions</CardContent>
          <CardContent>
            <Stack
              direction="row"
              // spacing={4}
              rowGap={2}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              divider={
                isSmallScreen ? null : (
                  <Divider orientation="vertical" flexItem />
                )
              }
            >
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Deposits</Typography>
                  <Button variant="contained" color="primary">
                    See All
                  </Button>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mpesa Ref</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Deposits.map((deposit, index) => (
                        <TableRow key={index}>
                          <TableCell>{deposit.MpesaRef}</TableCell>
                          <TableCell>{deposit.Amount}</TableCell>
                          <TableCell>{deposit.Date}</TableCell>
                          <TableCell>{deposit.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Withdrawals</Typography>
                  <Button variant="contained" color="primary">
                    See All
                  </Button>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Phone</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Withdrawals.map((Withdrawals, index) => (
                        <TableRow key={index}>
                          <TableCell>{Withdrawals.Phone}</TableCell>
                          <TableCell>{Withdrawals.Amount}</TableCell>
                          <TableCell>{Withdrawals.Date}</TableCell>
                          <TableCell>{Withdrawals.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card
          sx={{
            width: secondaryCardWidth,
          }}
        >
          <CardContent>Credit Score</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
