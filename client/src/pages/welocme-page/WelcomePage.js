import AppBar from "../../components/AppBar/AppBar";
import neighboor from "../../assets/babushka.png"//"../../assets/neighboor2.svg";
import { Typography, Grid } from "@mui/material";
import MainBlueButton from "../../components/styled/MainBlueButton";
import MainGreenButton from "../../components/styled/MainGreenButton";
import { useNavigate } from "react-router-dom";
import SvgWave from "../../assets/svgIcons/SvgWave";
import AuthForm from "../../components/Auth/AuthForm"
import { AuthContextProvider } from "../../components/Auth/auth-context"

import "./WelcomePage.css";
function Welcome() {
  const navigate = useNavigate();
 

  return (
    <>
      <AppBar />

      <img
        className="neigboor-img"
        src={neighboor}
        alt="neighboor"
        loading="lazy"
      ></img>
      {
        !localStorage.getItem('token') 
       ? <AuthContextProvider>
          <AuthForm />
        </AuthContextProvider>
          
      :<div className="home-buble">
        <Grid container className="main-container">
          <Typography fontSize="40px" variant="h1" marginTop="10px" marginY={-1} marginX={10}>
            {"ברוך הבא ל- Enola"}
          </Typography>
          <Typography variant="subtitle" marginTop="10px">
            {
              "  על מנת להתחיל התקשרות יש ליצור משפחה חדשה או להצטרף למשפחה קיימת"
            }
          </Typography>
          <Grid
            item
            marginTop="6px"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "95%",
              height: "30%"
            }}
          >
            <MainBlueButton
              onClick={() => {
                navigate("/create-family");
              }}
            >
              {"צור משפחה"}
            </MainBlueButton>
            <MainGreenButton
              onClick={() => {
                navigate("/families")
              }}
            >
              {"בחר משפחה"}
            </MainGreenButton>
          </Grid>
        </Grid>
      </div> }
      <SvgWave />
      {/* <div className="grass"></div> */}
    </>
  );
}

export default Welcome;
