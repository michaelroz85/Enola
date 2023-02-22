import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar } from "@mui/material";
import family from "../../assets/family.png";
import MainGreenButton from "../../components/styled/MainGreenButton";
import MainBlueButton from "../../components/styled/MainBlueButton";
import PageLayout from "../../components/PageLayout/PageLayout";
import "./Volunteers.css";
import Volunteer from "../../components/Volunteer/Volunteer";
import AddVolunteerPopup from "../../components/AddVolunteerPopup/AddVolunteerPopup";

function Volunteers(fam_id) {
  const navigate = useNavigate();
  const VolunteersPageLayout = () => {
    const [open, setOpen] = useState(false);
    const { family_id, name, id, task_id } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    let fami_id;
    family_id ? fami_id = family_id : fami_id = fam_id.fam_id;
    console.log(fami_id)
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
        <AddVolunteerPopup
          open={open}
          setOpen={setOpen}
          family_id={parseInt(family_id)}
        />
        <div  >
        <Grid container flexDirection="row" height="100%" className="down-page-container" >
              <div className="create-or-add" >
                <Typography variant="h4" fontSize="20px" marginBottom="20px" textAlign="center">
                  {"מתנדבים"}
                </Typography>
                {volunteers.map((volunteer) => {
                  return (
                    <Volunteer
                      setVolunteers={setVolunteers}
                      name={volunteer?.first_name}
                      id={volunteer?.user_id}
                      family_id={family_id}
                      key={volunteer?.user_id}
                    />
                  );
                })}
              </div>
              <div className="create-or-add">
                <Typography fontSize="20px" variant="h4">
                  {"הוסף מתנדבים"}
                  <br /> {"או"} <br /> {"צור משימה"}
                </Typography>
                <MainBlueButton
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="btn"
                >
                  {"הוסף מתנדבים"}
                </MainBlueButton>
                <MainGreenButton
                  onClick={() => {
                    navigate(`/create-task/${family_id}`);
                  }}
                  className="btn"
                >
                  {"צור משימה"}
                </MainGreenButton>
              </div>
        </Grid>
        </div>
      </>
    );
  };
  return (<VolunteersPageLayout />
    // <PageLayout
    //   pageComponent={<VolunteersPageLayout />}
    //   headerText={"מתנדבים"}
    // />
  );
}

export default Volunteers;
