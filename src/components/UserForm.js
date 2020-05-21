import React from 'react'

export default function UserForm(props) {
  const {
    values,
    onInputChange,
    onSubmit,
    disabled,
    errors,
    checkboxChange
  } = props

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='forms'>
        <h2>Add a User</h2>
        <button disabled={disabled}>Submit</button>
        <div className='schema-errors'>
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.terms}</div>
        </div>
      </div>

      <div className='form-inputs'>
        <h4>General information</h4>
        <label>Name&nbsp;
          <input
            value={values.name}
            onChange={onInputChange}
            name='name'
            type='text'
          />
        </label>

        <label>Email
          <input
            value={values.email}
            onChange={onInputChange}
            name='email'
            type='email'
          />
        </label>


        <label>Password
            <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="text"        
            />


        </label>
      </div>

      <div className='form-terms '>
        <h4>Terms of Service</h4>
        Agree:
        <input
         id = "terms"
         name = "terms"
         type= "checkbox"
         checked= {values.terms}
         onChange ={checkboxChange}
         />
         
      </div>

     
    </form>
  )
}
