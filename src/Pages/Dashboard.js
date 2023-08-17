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
    name: "Loans Taken",
    value: "₹ 1,00,000",
  },
  {
    name: "Loans Given",
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

const Dashboard = () => {
  return stats.map((stat, index) => (
    <Grid item key={index}>
      {/* <Card
        sx={{
          width: 267,
          height: 120,
        }}
      >
        <Typography variant="h5">{stat.name}</Typography>
        <Typography variant="h6">{stat.value}</Typography>
      </Card> */}
    </Grid>
  ));
};

export default Dashboard;
