import * as yup from "yup"


const formSchema = yup.object().shape({
    name: yup.string()
    .trim()
    .min(4, "Username must be at least four characters")
    .required("You must enter a username"),
    email: yup.string()
    .email("The email must be valid")
    .required("You must enter an email"),
    password: yup.string()
    .min(6, "The password must be 6 characters long")
    .required("You must enter a password"),
    terms: yup.boolean()
    .oneOf([true], "Please agree to the terms of use")

})



export default formSchema