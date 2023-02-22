import {
    formContainer,
    familyImg,
    leftLayout,
    buttonsContainer,
    buttonStyle,
  } from "./styles";
  import { TextField, Grid, Typography } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import family from "../../assets/family.png";
  import MainGreenButton from "../styled/MainGreenButton";
  import MainRedButton from "../styled/MainRedButton";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { FamilySchema } from "../CreatFanilyForm/schema"; 
  import FormLabel from "../FormLabel/FormLabel.jsx";
  
  
  const FormStepOne = ({ setStep, data, setData }) => {
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      mode: "onChange",
      resolver: yupResolver(FamilySchema),
      //mode: "onBlur",
    });
  
    const [preview, setPreview] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   if (id) {
    //     const fetchCurrentFamily = async () => {
    //       try {
    //         const response = await fetch(
    //           `localhost:5000/api/families/${id}`
    //         );
    //         if (response.ok) {
    //           const {
    //             mainPerson: {
    //               first_name,
    //               last_name,
    //               cell_phone,
    //               mail,
    //             },
    //           } = await response.json();
    //           setData({
    //             first_name,
    //             last_name,
    //             cell_phone,
    //             mail
    //           });
    //         }
    //       } catch (error) {}
    //     };
    //     fetchCurrentFamily();
    //   }
    // }, []);
  
    
  
    return (
      <>
        <Grid container flexDirection="row" height="100%">
          <Grid item xs={6.5} height="100%">
            <Grid container style={formContainer}>
              <FormLabel text={"שם פרטי"} />
              <TextField
                {...register("first_name")}
                error={!!errors.first_name}
                helperText={errors?.first_name?.message}
                value={data.first_name}
                onChange={(e) => {
                  setData({ ...data, first_name: e.target.value });
                }}
              />
              <FormLabel text={"שם משפחה"} />
              <TextField
                {...register("last_name")}
                error={!!errors.last_name}
                helperText={errors?.last_name?.message}
                value={data.last_name}
                onChange={(e) => {
                  setData({ ...data, last_name: e.target.value });
                }}
              />
             
              <FormLabel text={"טלפון נייד"} />
              <TextField
                {...register("cell_phone")}
                error={!!errors.cell_phone}
                helperText={errors?.cell_phone?.message}
                value={data.cell_phone}
                onChange={(e) => {
                  setData({ ...data, cell_phone: e.target.value });
                }}
              />
              <FormLabel text={"דואר אלקטרוני"} />
              <TextField
                {...register("mail")}
                error={!!errors.mail}
                helperText={errors?.mail?.message}
                value={data.mail}
                onChange={(e) => {
                  setData({ ...data, mail: e.target.value });
                }}
              />
              
            </Grid>
          </Grid>
          <Grid item xs={5.5} height="100%">
            <Grid item>
              <img
                style={familyImg}
                src={family}
                alt="family"
                loading="lazy"
              ></img>
            </Grid>
            <Grid container style={leftLayout}>
              <Grid item>
                <Grid container style={avatar}>
                  <Grid item alignSelf="flex-end">
                    <Avatar
                      sx={{ width: 90, height: 90 }}
                      src={preview ? preview : null}
                    />
                  </Grid>
                  <Grid item alignSelf="center">
                    <Typography variant="h4" fontSize={25} paddingRight="10px">
                      {preview ? "נוסף בהצלחה" : "הוסף תמונה"}
                    </Typography>
                    
                  </Grid>
                </Grid>
              </Grid>
              <Grid item width="100%">
                <Grid container style={buttonsContainer}>
                  <Grid item>
                   

                  </Grid>
                <Grid item>
                  {id && (
                    <MainRedButton
                      style={buttonStyle}
                      onClick={() => {
                        fetch(`http://18.197.147.245/api/families/${id}`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                        }).then((response) => {
                          if (response.ok) {
                            navigate("/families");
                          }
                        });
                      }}
                    >
                      {"מחק משפחה"}
                    </MainRedButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
    )
   
}

export default LoginForm

