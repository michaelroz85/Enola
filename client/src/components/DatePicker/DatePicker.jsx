import * as React from "react";
import TextField from "@mui/material/TextField";
//import AdapterMoment from "@mui/lab/AdapterMoment";
//import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import he from "moment/locale/he";
//import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import moment from "moment";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function DatePicker({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he">
      <MobileDateTimePicker
        style={{ direction: "ltr" }}
        renderInput={(props) => <TextField {...props} />}
        value={value}
        onChange={(newValue) => {
          setValue(moment(newValue).valueOf());
        }}
      />
    </LocalizationProvider>
  );
}
