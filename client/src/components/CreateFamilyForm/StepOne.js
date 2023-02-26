import {
  formContainer,
  familyImg,
  leftLayout,
  avatar,
  buttonsContainer,
  buttonStyle,
} from "./styles";
import { TextField, Grid, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import family from "../../assets/family.png";
import MainGreenButton from "../styled/MainGreenButton";
import MainRedButton from "../styled/MainRedButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FamilySchema } from "./schema";
import FormLabel from "../FormLabel/FormLabel.jsx";
import DisplayData from "./DisplayData";

const FormStepOne = ({ setStep, data, setData, image, setImage }) => {
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

  useEffect(() => {
    if (id) {
      const fetchCurrentFamily = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/families/${id}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            }
          }
          );
          if (response.ok) {
            const {
              mainPerson: {
                first_name,
                last_name,
                cell_phone,
                mail,
              },
            } = await response.json();
            setData({
              first_name,
              last_name,
              cell_phone,
              mail
            });
          }
        } catch (error) { }
      };
      fetchCurrentFamily();
    }
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <>
      <Grid container flexDirection="row" height="100%">
        <Grid item xs={6.5} height="100%">
          <Grid container style={formContainer}>
            <FormLabel text={"שם פרטי"}
              style={{
                marginRight: "122vw",
                flexGrow: 1,
                fontSize: "13.5px",
              }} />
            <TextField
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors?.first_name?.message}
              value={data.first_name}
              onChange={(e) => {
                setData({ ...data, first_name: e.target.value });
              }}
            />
            <FormLabel text={"שם משפחה"} 
             style={{
              // marginRight: "122vw",
              textAlign: "center",
              flexGrow: 1,
              fontSize: "13.5px",
            }}/>
            <TextField
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors?.last_name?.message}
              value={data.last_name}
              textAlign= "center"
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
            <Grid item width="100%">
              <Grid container style={buttonsContainer}>
                <Grid item>
                  {id ?
                    <MainGreenButton
                      style={{...buttonStyle, left:"-30%"}}
                      onClick={handleSubmit(() => {
                        setStep(2)
                      })}
                    >
                      {"ערוך"}
                    </MainGreenButton>
                    : <MainGreenButton
                      style={{...buttonStyle, left:"30%"}}
                      onClick={handleSubmit(() => {
                        setStep(2)
                      })}
                    >
                      {"המשך"}
                    </MainGreenButton>
                  }

                </Grid>
                <Grid item>
                  {id && (
                    <MainRedButton
                      style={{...buttonStyle, right:"-30%"}}
                      onClick={() => {
                        fetch(`http://5000/families/${id}`, {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.token
                          },
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
        <Grid item xs={5.5} height="100%">
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
                  <input
                    className="add-photo-input"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                      }
                    }}
                  ></input>
                  <Grid item>
                    <img
                      style={familyImg}
                      src={family}
                      alt="family"
                      loading="lazy"
                    ></img>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FormStepOne;
