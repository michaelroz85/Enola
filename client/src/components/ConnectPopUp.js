import * as React from "react";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CloseButton } from "./AddVolunteerPopup/styled";
import "./AddVolunteerPopup/AddVolunteerPopup.css";

export default function AboutUsPopup(props) {
  const openCon = props.openCon;
  const setOpen = props.setOpenCon
 
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Dialog open={openCon} onClose={handleClose} direction="rtl" textAlign='right'>
        <DialogTitle  direction="rtl" textAlign='center'>פרטי התקשרות</DialogTitle>
        <DialogContent style={{ marginBottom: "20px", textAlign:'right'}} >
          <CloseButton onClick={handleClose} />
          <DialogContentText >
            טלפון:                       0534290613
            </DialogContentText>
            <DialogContentText>
          michaelrosenfeld11@gmail.com               : מייל 
           </DialogContentText>
           <DialogContentText>
           https://www.linkedin.com/in/michael-rosenfeld-dev/    :לינקדין
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
