import React from "react";
import { Router, Routers, BrowserRouter } from "react-router-dom"
import LoginForm from '../../components/Login/LoginForm.js'
import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useParams } from "react-router-dom";
import DisplayData from "../../components/CreateFamilyForm/DisplayData";


const LoginPage = () => {
    const { id } = useParams();
    const [position, setPosition] = useState('faulse')
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        cell_phone: "",
        mail: ""
    });

    return (
        <div>
            <PageLayout
                pageComponent={
                    <>
                        <LoginForm
                            setStep={setStep}
                            data={data}
                            setData={setData}
                        />
                        {step === 2 && <DisplayData data={data} setStep={setStep} />}

                    </>
                }
            />
        </div>
    )
    // return(

    // )
}

export default LoginPage




