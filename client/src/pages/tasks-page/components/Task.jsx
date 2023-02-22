
import moment from "moment";
import { useState, useMemo } from "react";
import SimpleDialog from "./TaskPopup";

const volunteerId = 1;

const Task = ({
  task_name,
  date,
  helper_id,
  allTasks,
  setAllTasks,
  tasks,
  createdAt,
  task_id,
  family_id,
  fetchAllTasks,
  details,
}) => {
  const [taskColor, setTaskColor] = useState("");
  const [takenByUser, setTakenByUser] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [takenByCurrentUser, setTakenByCurrentUser] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const updateTask = async (volunteerId) => {
    const updateResponse = await fetch(
      `http://localhost:5000/tasks/${task_id}`,
      {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
        body: JSON.stringify({
          task_name,
          date,
          helper_id: volunteerId,
          createdAt,
          task_id,
          family_id,
          comments: details,
        }),
      }
    );
    if (updateResponse.ok) {
      fetchAllTasks();
    }
  };

  const taskColorPicker = () => {
    if (createdAt) {
      setTaskColor("#e0e0e0");
    } else if (helper_id === null) {
      setTaskColor("#9ecf83");
    } else if (helper_id === volunteerId || takenByCurrentUser) {
      setTaskColor("#8ca8e0");
    } else if (helper_id) {
      setTaskColor("#fdf797");
    }
  };

  const isTakenPicker = () => {
    if (createdAt) {
      setTakenByUser(true);
    }
  };

  const helperTextPicker = async () => {
    if (helper_id === null) {
      setHelperText("פנוי");
    } else if (helper_id === volunteerId) {
      setHelperText("אתה");
    } else if (helper_id) {
      try {
        const response = await fetch(
          `http://localhost:5000/volunteers/${helper_id}/`,{
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
            setHelperText(data.first_name);
        }
      } catch (error) {
        console.log(error);
      }
    }; 
    
  };

  useMemo(() => {
    isTakenPicker();
    taskColorPicker();
    helperTextPicker();
  }, [createdAt, takenByUser, tasks, takenByCurrentUser]);

  const handleHelperUpdate = () => {
    if (helper_id === null) {
      const updatedTasks = [...allTasks];
      const taskIndex = updatedTasks.findIndex(
        ({ task_name }) => task_name === task_name
      );
      updatedTasks[taskIndex].helper_id = volunteerId;
      setAllTasks(updatedTasks);
      updateTask(volunteerId);
    } else if (helper_id === volunteerId) {
      updateTask(null);
    }
  };

  return (
    <>
      <SimpleDialog
        open={detailsOpen}
        toggleDetails={toggleDetails}
        task_name={task_name}
        date={date}
        details={details}
      />
      <div className="task-body">
        <div
          className="task"
          onClick={toggleDetails}
          style={{
            textDecoration: takenByUser ? "line-through" : null,
            backgroundColor: `${taskColor}`,
            opacity: "0.8",
          }}
        >
          <div className="done-until">
            {moment(parseInt(date)).format("HH:mm")}
          </div>
          <div className="task-description">{task_name}</div>
        </div>
        <div
          className="task-button"
          onClick={handleHelperUpdate}
          style={{ backgroundColor: `${taskColor}` }}
        >
          <div className="helper-name">{helperText}</div>
          <div className="will-do-it">
            {helper_id ? "יעשה ע''י" : "תוכל לסייע?"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
