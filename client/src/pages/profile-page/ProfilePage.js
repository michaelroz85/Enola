import { useState } from 'react';
import "./ProfilePage.css";
import { Typography, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import MainBlueButton from "../../components/styled/MainBlueButton"
import { buttonStyle } from "../../components/CreateFamilyForm/styles.js";
import DetailsItem from "../../components/DetailsItem/DetailsItem.jsx";
import Async from "react-async"
import PageLayout from '../../components/PageLayout/PageLayout';

const ProfilePage = () => {
    const Profile = () => {
        const [editProfile, setEditProfile] = useState(false)

        let data;
        let displayDataFields
        //const handleUpdateFamily = () => {
        console.log("ערוך משפחה", data);
        const getUserData = async () => {
            let fullName;
            try {
                const response = await fetch(
                    `http://localhost:5000/auth/get-user-data/`, {
                    headers: {
                        // "Access-Control-Allow-Origin": "*",
                        // "Content-Type": "application/json",
                        "Authorization": localStorage.token
                    },
                }
                );
                if (response.ok) {
                    data = await response.json();
                    console.log(data.foundUser)
                    displayDataFields = [
                        { fieldname: "שם פרטי", fieldvalue: data.foundUser.first_name },
                        { fieldname: "שם משפחה", fieldvalue: data.foundUser?.last_name },
                        { fieldname: "טלפון נייד", fieldvalue: data.foundUser.cell_phone },
                        { fieldname: "דוא''ל", fieldvalue: data.foundUser.mail },
                    ];
                    console.log("33333333333333333333333333333333333333333333", displayDataFields)

                    return displayDataFields
                }
            } catch (error) {
                console.log(error);
            }

        }


        const handleEditProfile = () => {

        }

        const navigate = useNavigate();
        return (
            <div
                container
                overflow="auto"
                style={{
                    dir: "rtl",
                    height: "70vh",
                    textAlign: "center",
                    flexFlow: "column nowrap",
                    alignItems: "center",
                    paddingBottom: "30px",
                }}
            >

                <Typography variant="h5" marginBottom="20px">
                    {"פרטים אישיים"}
                </Typography>
                <Async promiseFn={getUserData}>
                    <Async.Pending>Loading...</Async.Pending>
                    <Async.Rejected>{error => { console.log(error) }}</Async.Rejected>
                    <Async.Fulfilled>{data => displayDataFields.map(({ fieldname, fieldvalue }) => (
                        { fieldvalue },
                        <DetailsItem
                            key={fieldname}
                            fieldValue={fieldvalue}
                            fieldName={fieldname}
                        />
                    ))}</Async.Fulfilled>
                </Async>

                <div className="display-btn-container">
                    <MainBlueButton
                        style={buttonStyle}
                        onClick={() => {
                            setEditProfile(true)
                            // editProfile && {}
                        }}
                    >
                        ערוך
                    </MainBlueButton>
                </div>
            </div>
        );
    };
    return (
        <PageLayout
            pageComponent={<Profile />}
            headerText={"הפרופיל שלי"}
        />
    );
}


export default ProfilePage;

