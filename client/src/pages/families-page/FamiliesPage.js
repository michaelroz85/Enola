import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import FamilyElement from "../../components/FamilyElement/FamilyElement";
import { TextField, Typography } from "@mui/material";
import MainBlueButton from "../../components/styled/MainBlueButton";
import Spinner from "../../components/Spinner/Spinner";
import "./FamiliesPage.css";

const Families = () => {
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [searchName, setFilter] = useState("");
  const [filteredFamilies, setFilteredFamilies] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/families", {
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
        //throw response;
      })
      .then((data) => {
        try {
          setFamilies(
            data.filter((family) => {
              return family.last_name !== null;
            })
          )
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

  useEffect(() => {
    setFilteredFamilies(
      families.filter((family) => {
        console.log(family)
        return family.last_name
          .toLowerCase()
          .includes(searchName.toLowerCase());
      })
    );
  }, [searchName]);

  const familiesToShow = searchName ? filteredFamilies : families;

  return (
    <>
      <PageLayout
        pageComponent={
          <div>
            <div className="choose-or-create-main">
              <div className="choose-or-create-div" >
                <div className="choose-text-div">
                  <Typography
                    color="white"
                    variant="h4"
                    className="chose-family"
                  >
                    {"בחר משפחה קיימת או"}
                  </Typography>
                </div>
                <div className="create-btn-div">
                  <MainBlueButton
                    style={{
                      top: "-7px",
                      // paddingBottom: "17px",
                      // marginTop: "0px",
                      padding: "14px",
                    }}
                    onClick={() => {
                      navigate("/create-family");
                    }}
                  > <Typography
                  color="white"
                  variant="h4"
                  className="chose-family"
                >
                    {"צור משפחה"}
                </Typography>
                  </MainBlueButton>
                </div>

              </div>
            </div>
            <div className="search-bar-div">
              <TextField
                InputProps={{
                  inputProps: {
                    style: { textAlign: "right" },
                  }
                }}
                value={searchName}
                size="small"
                fullWidth
                placeholder="חפש משפחה"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
            </div>
            {isLoading ? (
              <div className="spinner-box">
                {<Spinner />}
              </div>
            ) : (
              <div className="families-card-div">
                {familiesToShow.map((family, index) => {
                  return (
                    <FamilyElement
                      key={family.family_id}
                      family_id={family.family_id}
                      name={family.last_name}
                      volunteers_count={family.volunteersCount}
                    />
                  );
                })}
              </div>
            )}
          </div>
        }
        headerText={"משפחות"}
      />
    </>
  );
};
export default Families;
