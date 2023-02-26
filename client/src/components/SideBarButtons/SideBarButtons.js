import "./SideBarButtons.css";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePage from "../../pages/profile-page/ProfilePage";
import { Button, lebel } from "@mui/material";
import Typography from "@mui/material/Typography";
import family from "../../assets/family.png";
import { familyImg} from "../CreateFamilyForm/styles";
import {
  addTask,
  myTasks,
  myWeek,
  profile,
  todoList,
} from "../../assets/svgIcons/svgIcons.js";
import { height } from "@mui/system";

const SideBarButtons = () => {
  const navigate = useNavigate();
  let { id, family_id } = useParams();
  return (

    <>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          marginRight: "10px"
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={addTask}>
        {family_id &&
          <grid
            onClick={() => { navigate(`/create-task/${family_id}`) }}
          />}
        <Typography className="button-text"
          style={{
            flexGrow: 1,
            fontSize: "13.5px",
          }}
        >
          משימה חדשה
        </Typography>
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          marginRight: "10px"
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={myTasks}
      >
        <Typography className="button-text"
          style={{
            flexGrow: 1,
            fontSize: "13.5px",
          }}
        >
          המשימות שלי
        </Typography>
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          marginRight: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={myWeek}
      >
        <Typography className="button-text"
          style={{
            flexGrow: 1,
            fontSize: "13.5px",
          }}
        >
          השבוע שלי
        </Typography>
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          marginRight: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={todoList}
      >
        <Typography className="button-text"
          style={{
            flexGrow: 1,
            fontSize: "13.5px",
          }}
        >
          רשימה
        </Typography>
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          marginRight: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={profile}
        onClick={() => { navigate('/profile') }}
      >
        <Typography className="button-text"
          style={{
            flexGrow: 1,
            fontSize: "13.5px",
          }}
        >
          פרופיל
        </Typography>

      </Button>
    </>

  );
};
export default SideBarButtons;
