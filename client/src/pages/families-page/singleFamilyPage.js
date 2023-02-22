
// 
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import FamilyElement from "../../components/FamilyElement/FamilyElement";
import { TextField, Typography } from "@mui/material";
import MainBlueButton from "../../components/styled/MainBlueButton";
import Spinner from "../../components/Spinner/Spinner";
import "./FamiliesPage.css";
import Volunteers from "../../components/Volunteer/Volunteers";
import DisplayData from "../../components/CreateFamilyForm/DisplayData";
import AuthContext from './../../components/Auth/auth-context';
import Volunteer from "../../components/Volunteer/Volunteer";
import Task from "./../tasks-page/components/Task"
import "./../../components/Volunteer/Volunteers.css"

const Family = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate();
  const [families, setFamilies] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredFamilies, setFilteredFamilies] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { family_id } = useParams();
  const authCtx = useContext(AuthContext);

  let user;
  var values;
  let volunteers = '';
  useEffect(() => {
    fetch(`http://localhost:5000/families/${family_id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        try {
          user = data.mainPerson
          console.log(user)
          setFamilies(user)
        } catch (err) {
          console.log(err)
        }

      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.statusText !== "OK") {
          setError(err);
        }
      });
  }, [isLoading]);


  return (
    <>
      <PageLayout style={{display:'inline-block'}}
        pageComponent={
          <div>
            {isLoading ? (
              <div className="spinner-box">
                {<Spinner />}
              </div>
            ) : (
              <div >
                <DisplayData data={families} setStep={setStep} />
                <Volunteers />
              </div>
            )}
          </div>
        }

        headerText={`${families.last_name} family`}
      />
      <MainBlueButton
        style={{
          height:"50px",
          paddingRight: "18px",
          paddingTop: "17px",
          paddingBottom: "20px",
          
          bottom: "150px",
          left:"-50px",
          display: "flex"
        }}
        onClick={() => {
          navigate(`/tasks/tasks-for-family/${family_id}`);
        }}
      >
        {"משימות למשפחה זו"}
      </MainBlueButton>
    </>
  );
};
export default Family;
