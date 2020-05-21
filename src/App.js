import React from 'react';
import {useState, useEffect} from "react"
import './App.css';
import * as yup from "yup"
import axios from "axios"

import UserForm from "./components/UserForm"
import formSchema from "./components/validation/formSchema"
import User from "./components/User"



const initialFormValues= {
  name: "",
  email: "",
  password: "",
  //Checkbox
  terms: false,

}

const initialFormErrors = {
  name: "",
  email: "", 
  password: "",
  terms: false,
}


const initialUsers = []
const initalDisabledStatus = true


function App() {
  //Setting States
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)

  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initalDisabledStatus)

  const [post, setPost] = useState([]);


//terms Checkbox change
  const checkboxChange = evt => {
    const {name} = evt.target
    const newStatus = {
      ...formValues, [name] : evt.target.type === "checkbox" ? evt.target.checked : evt.target.value
    }
    setFormValues(newStatus)
  }

  //yup validation// setting form values
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup
      .reach(formSchema, name)
      .validate(value)  
      .then( valid => {
          setFormErrors({
              ...formErrors,
              [name]: ""
            });
      })    
      .catch( err => { 
          console.log(err.error)
          setFormErrors({
              ...formErrors,
              [name]: err.errors[0]
            });
         
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  
  
  //Setting Status of Diabled button
  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);


  //Function when submitting a new User // post request
  const onSubmit = evt => {
    evt.preventDefault()
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }

    axios.post("https://reqres.in/api/users", newUser)
    .then((response) => {
      setPost([response.data]);
      setUsers([...users, response.data]);
      setFormValues(initialFormValues);
    })
    .catch((err) => console.log(err.response), "An error happened");
  }

 


return (
  <div className="App">
  <h1>User-Onboarding</h1>
  <UserForm 
  values={formValues} 
  onInputChange={onInputChange} 
  onSubmit={onSubmit} 
  disabled={disabled}
  errors={formErrors} 
  checkboxChange={checkboxChange}/>


  {
    users.map(users => {
    return (
    <User key={users.id} details={users} />
    
)
})  
  }



  </div>
);
}

export default App;
