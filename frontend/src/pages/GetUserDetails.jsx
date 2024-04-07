import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GetUserDetails = () =>{

    const { userId } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
          try {
            console.log("Inside get user details")
            let url = `/api/user/${userId}`;
            const res = await fetch(url);
            const { data } = await res.json();
            console.log("Data", data)
            if (!res.ok) {
              console.log(data.message);
            }
            setUser(data);
            console.log("User: ",user)
          } catch (err) {
            console.log(err);
          }
        };
    
        getDetails();
      }, []);

      return <h1>Get user details</h1>
}

export default GetUserDetails;