
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
import { buttonStyle } from "../../components/CreateFamilyForm/styles"
import family from "../../assets/family.png";
import { familyImg } from "../../components/CreateFamilyForm/styles";
// import zIndex from "@mui/material/styles/zIndex";

const Family = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate();
  const [families, setFamilies] = useState("");
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { family_id } = useParams();

  let user;

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
      <PageLayout style={{ display: 'inline-flex' }}
        pageComponent={
          <div>
            {isLoading ? (
              <div className="spinner-box">
                {<Spinner />}
              </div>
            ) : (
              <div >
                <div style={{ marginRight: "50%" }}>
                  <DisplayData data={families} setStep={setStep} />
                </div>
                <Volunteers>
                  <MainBlueButton
                    // style={{
                    //   height: "50px",
                    //   paddingRight: "18px",
                    //   paddingTop: "17px",
                    //   paddingBottom: "20px",
                    //   zIndex: "1999",
                    //   bottom: "-370px",
                    //   left: "-1010px",
                    //   display: "inline"
                    // }}
                    onClick={() => {
                      navigate(`/tasks/tasks-for-family/${family_id}`);
                    }}
                  >
                    {"משימות למשפחה זו"}
                  </MainBlueButton></Volunteers>
              </div>
            )}
          </div>
        }

        headerText={`משפחת ${families.last_name} `}
      >


      </PageLayout>

      <div item>
        <img
          style={{
            ...familyImg,
            height: "200px",
            zIndex: "1000",
            right: "-10px",
            marginBlock: "40px"
          }}
          // src={family}
          alt="family"
          loading="lazy"
        ></img>
      </div>
    </>
  );
};
export default Family;
