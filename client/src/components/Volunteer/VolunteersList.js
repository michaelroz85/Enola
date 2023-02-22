import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar } from "@mui/material";
// import family from "../../assets/family.png";
// import MainGreenButton from "../styled/MainGreenButton";
// import MainBlueButton from "../styled/MainBlueButton";
// import PageLayout from "../PageLayout/PageLayout";
import "./Volunteers.css";
import Volunteer from "./Volunteer";

function VolunteersLIst( props) {
  const navigate = useNavigate();
  const VolunteersPageLayout = () => {
    const [open, setOpen] = useState(false);
    const [taskHelper, setTaskHelper] = useState('');
    const { family_id, name, id, task_id } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    let fami_id;
    family_id ? fami_id = family_id : fami_id = props.fam_id;
    console.log("my props:", props)
    let onSelect = (r, idVolunteer) => {
      console.log("my props::::::",  idVolunteer)
      props.onAdd(r, idVolunteer)
    }

    useEffect(() => {
      const fetchVolunteers = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/volunteers/volunteers-for-family/${fami_id}/`,{
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": localStorage.token
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.length > volunteers.length) {
              setVolunteers(data);
              console.log(data)
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchVolunteers();
    }, [open, volunteers, family_id]);
    
    return (
      <>
        
        <Grid container flexDirection="row" height="100%">
          <Grid item xs={5.5} height="100%" style={{ marginTop:"-30%"}}> 
              <div className="volunteers-list">
                {volunteers.map((volunteer) => {
                  return (
                    <Volunteer
                      setVolunteers={setVolunteers}
                      name={volunteer?.first_name}
                      id={volunteer?.user_id}
                      family_id={props.fam_id}
                      key={volunteer?.user_id}
                      task_id={task_id}
                      onSelectF={(e, v) => {onSelect(e, v)}}
                    />
                  );
                })}
              </div>
            
          </Grid>
          
        </Grid>
      </>
    );
  };
  return (<VolunteersPageLayout />
    
  );
}

export default VolunteersLIst;
