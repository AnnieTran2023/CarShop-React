import React, { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../carapi";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [columnDefs, setColumnDefs] = useState([
    { field: "brand", filter: true },
    { field: "model", filter: true },
    { field: "color", filter: true, width: 150 },
    { field: "fuel", filter: true, width: 150 },
    { headerName: "Year", field: "modelYear", filter: true, width: 120 },
    { field: "price", filter: true, width: 150 },
    {
      cellRenderer: (params) => (
        <EditCar handleFetch={handleFetch} data={params.data} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          color="secondary"
          size="small"
          onClick={() => handleDelete(params.data._links.self.href)}
        >
          Delete
        </Button>
      ),
      width: 150,
    },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCars()
      .then((data) => setCars(data._embedded.cars))
      .catch((error) => console.error("Error: ", error));
  };

  const handleDelete = (url) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      deleteCar(url)
        .then(() => {
          handleFetch();
          setOpen(true);
        })
        .catch((err) => console.error("Error: ", err));
    }
  };

  return (
    <>
      <AddCar handleFetch={handleFetch} />
      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message="Car deleted!"
      />
    </>
  );
}
export default CarList;
