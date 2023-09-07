import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const MUIDataGrid = ({ columns, rows }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      sx={{
        maxWidth: `calc(100vw-200px)`,
      }}
    />
  );
};

export default MUIDataGrid;
