import { Router, Routers, BrowserRouter } from "react-router-dom"
import FormStepOne from './../../components/CreateFamilyForm/StepOne'
import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useParams } from "react-router-dom";
import DisplayData from "../../components/CreateFamilyForm/DisplayData";


const CreateFamilyPage = () => {
    const [step, setStep] = useState(1)
    const { id } = useParams();
    const [position, setPosition] = useState('faulse')
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        cell_phone: "",
        mail: ""
    });
    
    return (
        <div>
            <PageLayout
                headerText={id ? "עריכת משפחה" : "יצירת משפחה"}
                pageComponent={
                    <>
                        {step === 1 &&
                            <FormStepOne
                                setStep={setStep}
                                data={data}
                                setData={setData}
                                setImage={setImage}
                                image={image}
                            />}
                        {step === 2 && <DisplayData data={data} setStep={setStep} />}
                    </>
                }
            />
        </div>
    )
}

export default CreateFamilyPage