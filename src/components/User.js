import React from "react"

function User({details}) {
    if(!details) {
        return <p> We are loading your User</p>
    }

    return (
    <div className="User-container">
        <h2>Name: {details.name}</h2>
        <p>Email: {details.email}</p> 
        <p>Password: {details.password}</p>
    </div>
    )

}


export default User