import "./Volunteer.css";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function Volunteer({ props, name, id, setVolunteers, family_id, task_id, onSelectF }) {
  //const [taskHelper, setTaskHelper] = useState('');
  console.log("props", props)
  const deleteVolunteer = async () => {
    const deleteResponse = await fetch(
      `http://localhost:5000/volunteers/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
      }
    );
    if (deleteResponse.ok) {
      try {
        const volunteersResponse = await fetch(
          `http://localhost:5000/volunteers/volunteers-for-family/${family_id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          }
        }
        );
        if (volunteersResponse.ok) {
          const data = await volunteersResponse.json();
          setVolunteers(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onSelect = (e, val) => {
    e.preventDefault();
    console.log("value : ", val);
    onSelectF(e, val)
  }

  return (
    <div className="element-container">
      <AccountCircleTwoToneIcon className="icon" />
      {onSelectF?(
        <button type="button"
        className="name-button"
        value={id}
        onClick={(e) => onSelect(e, id)}>
        <Typography variant="subtitle1">
          {name}
        </Typography>
      </button>):(
        <div style={{height:"37px"}}>
          <Typography variant="subtitle1">
          {name}
        </Typography>
        </div>
      )
      }

      <ClearIcon
        onClick={() => {
          deleteVolunteer();
        }}
        fontSize="22px"
        className="delete-icon"
      />
    </div>
  );
}

export default Volunteer;
