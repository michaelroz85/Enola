import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import "./CreateTaskPage.css";
import heart from "../../assets/heart.png";
import PageLayout from "../../components/PageLayout/PageLayout";
import { Typography } from "@mui/material";
import moment from "moment";
import DatePicker from "../../components/DatePicker/DatePicker";
import MainGreenButton from "../../components/styled/MainGreenButton";
import MainBlueButton from "../../components/styled/MainBlueButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VolunteersList from '../../components/Volunteer/VolunteersList'

function CreateTask() {
  const CreateTaskLayout = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(moment().valueOf());
    const [taskName, setTaskName] = useState("");
    const [taskHelper, setTaskHelper] = useState();
    const [helpersList, setHelpersList] = useState(false);
    const [taskDescription, setTaskDescription] = useState("");
    const { id } = useParams();

    const onAddF =(volinteer) => {
      console.log("E",volinteer)
      setTaskHelper(volinteer)
    }
    const showVolonteersListHandler = () => {
      setHelpersList(true)
      console.log(id)
    }

    const handleCancelTask = () => {
      navigate(-1)
    }
    
    const handleAddTask = () => {
      taskName &&
        fetch("http://localhost:5000/tasks/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({
            family_id: id,
            helper_id: taskHelper,
            task_name: taskName,
            comments: taskDescription,
            date: value,
          }),
        });
      navigate(-1);
    };
    return (
      <div className="container">
        <div className="task-container">
          <div className="tasks-layout">
            <Typography className="task-name" variant="subtitle1">
              {"            שם המשימה"}
            </Typography>
            <input
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              value={taskName}
              className="task-name-input"
              placeholder="הקלד כאן"
            ></input>
            <Typography variant="h4" fontSize="25px">
              {"לביצוע עד..."}
            </Typography>
            <DatePicker value={value} setValue={setValue} />
            <Typography className="task-details" variant="subtitle1">
              {"פרטים"}
            </Typography>
            <textarea
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
              rows="2"
              className="task-details-input"
              placeholder="הקלד כאן"
            />
            <>
              <div className="buttons-container">
                <MainBlueButton onClick={showVolonteersListHandler}>
                  <Typography variant="h4" fontSize="25px">
                    {"בחר המתנדב"}
                  </Typography>
                </MainBlueButton>
              </div>
              <div className="volunteers-container">
                {helpersList === true && <VolunteersList 
                  fam_id={id} 
                  family_id={id}
                  className="add-volunteer-button"
                  onAdd ={(e, i) => {onAddF(i)}}
                   />}
              </div>

            </>
            <div className="buttons-container" >
              <MainGreenButton onClick={handleAddTask} className="green-btn">
                {"סיים"}
              </MainGreenButton>
              <div className="trash-icon-div">
                <DeleteForeverOutlinedIcon onClick={handleCancelTask} className="trash-icon" />
                <p className="delete-text">מחק משימה</p>
              </div>
            </div>
          </div>
        </div>
        <div className="img-container">
          <img
            src={heart}
            className="heart-img"
            alt={"hear"}
            loading="lazy"
          ></img>
        </div>
      </div>
    );
  };
  return (
    <PageLayout pageComponent={<CreateTaskLayout />} headerText="יצירת משימה" />
  );
}

export default CreateTask;
