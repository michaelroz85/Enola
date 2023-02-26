import { Typography, Grid } from "@mui/material";
import MainGreenButton from "../styled/MainGreenButton";
import { useParams, useNavigate } from "react-router-dom";
import MainBlueButton from "../styled/MainBlueButton";
import { buttonStyle, textStyle } from "./styles.js";
import DetailsItem from "../DetailsItem/DetailsItem.jsx";
import Volunteers from "../../pages/volunteers-page/VolunteersPage";
import MainRedButton from "../styled/MainRedButton";
import { maxWidth } from "@mui/system";


const DisplayData = ({ data, setStep }) => {
  const displayDataFields = [
    { fieldname: "שם פרטי", fieldvalue: data.first_name },
    { fieldname: "שם משפחה", fieldvalue: data.last_name },
    { fieldname: "טלפון נייד", fieldvalue: data.cell_phone },
    { fieldname: "דוא''ל", fieldvalue: data.mail },
  ];
  console.log("data : ", data)
  const handleUpdateFamily = () => {
    console.log("ערוך משפחה", data);
    if (id) {
      fetch(`http://localhost:5000/families/${id}`, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
        body: JSON.stringify(data),
      }).then((response) => {
        navigate("/families");
      });
    }
  };

  const handleCreateFamily = () => {
    const formData = new FormData();
    try {
      formData.append("data", data);
      fetch("http://localhost:5000/families", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
        body: JSON.stringify(data),
      });
      navigate("/families");
    }
    catch (err) {
      console.log(err);
    }
  };
  const deleteFamily = async () => {
    console.log("deletedjhjgvghcj")
    const deleteResponse = await fetch(
      `http://localhost:5000/families/${family_id}`, 
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
      }
    );
    if (deleteResponse.ok) {
      console.log("deleted", deleteResponse)
      // try {
      //   const volunteersResponse = await fetch(
      //     `http://localhost:5000/volunteers/volunteers-for-family/${family_id}`, {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Content-Type": "application/json",
      //       "Authorization": localStorage.token
      //     }
      //   }
      //   );
      //   if (volunteersResponse.ok) {
      //     const data = await volunteersResponse.json();
      //     setVolunteers(data);
      //   } else {
      //     console.log("error");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    navigate("/families");

  };

  const handleEditFamily = () => {
    id = family_id;
    setStep(1);
  }

  const navigate = useNavigate();
  let { id, family_id } = useParams();
  console.log(id, family_id)
  return (
    <div
      // container
      // overflow="auto"
      style={{
        direction:"rtl",
        height: "50vh",
        // textAlign: "center",
        flexFlow: "column nowrap",
        alignItems: "center",
        paddingBottom: "30px",
        marginRight: "-500px"
      }}
    >
      
        <div className="detailsHeader">
          <Typography variant="h4" color="#8ca8e0">
          {(id || family_id) ? "": 
          ("נא לוודא את הפרטים לפני יצירת המשפחה" )}
          </Typography>
        </div>
     
      <Typography variant="h5" marginBottom="20px" marginTop="20px" style={{textAlign: "center"}}>
        {"פרטים אישיים"}
      </Typography>
      {displayDataFields.map(({ fieldname, fieldvalue }) => (
        <DetailsItem
          style={textStyle}     
          key={fieldname}
          fieldValue={fieldvalue}
          fieldName={fieldname}
        />
      ))}
      <div className="display-btn-container">
        <MainBlueButton
          style={{...buttonStyle,   right: "0%" }}
          onClick={() => {
            setStep(1);
            family_id && navigate(`/create-family/${family_id}`)
          }}
        >
          {family_id ?("ערוך"):("חזור") }
        </MainBlueButton>
        {id && !family_id && (
          <MainGreenButton style={buttonStyle} onClick={handleUpdateFamily}>
            עדכן משפחה
          </MainGreenButton>
        
        )}
        {
          !id && !family_id && (
            <MainGreenButton style={buttonStyle} onClick={handleCreateFamily}>
              צור משפחה
            </MainGreenButton>)
        } 
        <MainRedButton
           style={{...buttonStyle,  left: "0px", maxWidth: "40%"}}
           family_id={family_id}
           onClick={deleteFamily}
         >
           {"מחק משפחה"}
         </MainRedButton>
        {id && <Volunteers/>}
      </div>
    </div>
  );
};

export default DisplayData;
