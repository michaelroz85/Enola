import { ReactChild, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../../assets/Enola-logo.png";
import "./AppBar.css";
import { useNavigate } from "react-router-dom";
import AboutUsPopup from "../AboutUsPopUp";
import ConnectPopUp from "../ConnectPopUp";

export default function NavBar() {
  const [openAbout, setOpen] = useState(false);
  const [openCon, setOpenCon] = useState(false);
  
  const navigate = useNavigate();
  const backHomePageHandler = () => {
    navigate("/");
  }
  const popUpAboutHandler = () => {
    setOpen(true)
  }
  const popUpConHandler = () => {
    setOpenCon(true)
  }
  return (
    <>
      {openAbout && <AboutUsPopup
        openAbout={openAbout}
        setOpen={setOpen}
      />}
       {openCon && <ConnectPopUp
        openCon={openCon}
        setOpenCon={setOpenCon}
      />}
      <AppBar elevation={0} className="app-header">

        <Grid item className="logo-container">
          <Grid item>
            <img className="logo" alt={"logo"} src={logo} loading="lazy"></img>
          </Grid>
          <Grid container className="text-container" sx={{ margin: '10px' }}>
            <Typography variant="h4" lineHeight="1" fontSize="1.5rem" sx={{ color: "#4983b2"}}>
              {"Enola"}
            </Typography>
            <Typography style={{ opacity: "0.5" }} variant="subtitle" sx={{ color: 'rgb(98, 39, 108)' }}>
              {"ההורים שלך לא לבד"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button className="nav-button" onClick={backHomePageHandler}>{"בית"}</Button>
          <Button className="nav-button" onClick={popUpAboutHandler}>{"עלינו"}</Button>
          <Button className="nav-button" onClick={popUpConHandler}>{"צור קשר"}</Button>
        </Grid>
      </AppBar>
    </>

  );
}
