//account balance
//loans taken
//loans given
//credit score

//active loan requests
import { Card, Grid, Typography } from "@mui/material";
import React from "react";

const stats = [
  {
    name: "Account Balance",
    value: "₹ 1,00,000",
  },
  {
    name: "Loans Given",
    value: "₹ 1,00,000",
  },
  {
    name: "Loans Taken",
    value: "₹ 1,00,000",
  },
  {
    name: "Credit Score",
    value: "750",
  },
  // {
  //   name: "Active Loan Requests",
  //   value: "₹ 1,00,000",
  // },
];

const Dashboard = () => (
  <Grid
    container
    spacing={2}
    sx={{
      display: "flex",
      justifyContent: "center",
      // gap: 2,
      alignItems: "center",
      flexGrow: 1,
      flexBasis: 0,
      flexWrap: "wrap",
    }}
  >
    {stats.map((stat, index) => (
      <Grid item>
        <Card
          key={index}
          sx={{
            width: 270,
            height: 150,
          }}
        >
          <Typography variant="h5">{stat.name}</Typography>
          <Typography variant="h6">{stat.value}</Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Dashboard;
