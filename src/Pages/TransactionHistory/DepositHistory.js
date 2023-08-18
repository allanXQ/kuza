import MUIDataGrid from "components/common/Datagrid";
import React from "react";

const columns = [
  { field: "Gateway", headerName: "Gateway", width: 70 },
  { field: "ReferenceNumber", headerName: "Reference Number", width: 130 },
  { field: "Amount", headerName: "Amount", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "Date", headerName: "Date", width: 130 },
];

const rows = [
  {
    id: 1,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 2,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
  {
    id: 3,
    Gateway: "Mpesa",
    ReferenceNumber: "123456789",
    Amount: "Ksh 1000",
    Status: "Success",
    Date: "12/10/2021",
  },
];

const DepositHistory = () => {
  return <MUIDataGrid columns={columns} rows={rows} />;
};

export default DepositHistory;
