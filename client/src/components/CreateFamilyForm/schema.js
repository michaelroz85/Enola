import * as yup from "yup";
export const FamilySchema = yup.object().shape({
  first_name: yup
    .string("יש להכניס אותיות בעברית בלבד")
    .matches(/^([^0-9]*)$/, "שם לא יכול לכלול מספרים")
    .required("שדה זה הינו שדה חובה"),

  last_name: yup
    .string("יש להכניס אותיות בעברית בלבד")
    .matches(/^([^0-9]*)$/, "שם לא יכול לכלול מספרים")
    .required("שדה זה הינו שדה חובה"),
 
  cell_phone: yup
    .string()
    .matches(/^([^a-z]*)$/, "יש להכניס ספרות בלבד")
    .min(10, "יש להקיש מספר בעל 10 ספרות")
    .max(10, "יש להקיש מספר בעל 10 ספרות בלבד")
    .required("שדה זה הינו שדה חובה"),
  mail: yup
    .string()
    .email("נא להקליד כתובת תקינה")
    .required("שדה זה הינו שדה חובה"),
 
});



export const AddVolunteerSchema = yup.object().shape({
  name: yup.string().required("שדה זה הינו שדה חובה"),
  phone: yup
    .string()
    .matches(/^([^a-z]*)$/, "יש להכניס ספרות בלבד")
    .min(10, "נא להקיש מספר בעל 10 ספרות")
    .max(10, "נא להקיש מספר בעל 10 ספרות")
    .required("שדה זה הינו שדה חובה"),
});
