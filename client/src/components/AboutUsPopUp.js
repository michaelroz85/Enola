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
  const openAbout = props.openAbout;
  const setOpen = props.setOpen

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <div>
      <Dialog open={openAbout} onClose={handleClose} direction="rtl" margin-left="0px" textAlign='right'>
        <DialogTitle textAlign='center'>עלינו</DialogTitle>
        <DialogContent style={{ marginBottom: "20px", textAlign:'right' }}>
          <CloseButton onClick={handleClose} />
          <DialogContentText >
            זהו מיזם שעוזר לנו לעזור להורים,
            לסבים ולסבתות להשאר עצמאים עם קצת עזרה שלנו.
            ישנן משימות רבות בחייהם שעלולות להוות קושי עבורם,
            אבל עבורינו הן קלות ואולי אף מהנות.
            אז, בואו נתחלק במשימות החיים שלהם,
            נהיה שותפים פעילים בחייהם, נהיה בקשר סביב סדר היום שלהם,
            .נכיר טוב יותר, ונעזור באמת היכן שצריך
          </DialogContentText >
          <DialogContentText>
            מיכאל רוזנפלד
            מתכנת, אבא, בעל, בן וסתם אדם נחמד.
            אכפתי למצב החברתי מסביבו, ורוצה להביא ברכה לעולם בעזרת הכלים הטכנולוגיים.

          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
