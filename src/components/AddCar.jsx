import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { saveCar } from "../carapi";

const AddCar = (props) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    saveCar(car)
      .then(() => {
        props.handleFetch();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            label="Brand"
            fullWidth
            variant="standard"
            value={car.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="model"
            label="Model"
            fullWidth
            variant="standard"
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="color"
            label="Color"
            fullWidth
            variant="standard"
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fuel"
            label="Fuel"
            fullWidth
            variant="standard"
            value={car.fuel}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="modelYear"
            label="Model Year"
            fullWidth
            variant="standard"
            value={car.modelYear}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            variant="standard"
            value={car.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCar;
