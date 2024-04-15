import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../app/user/userSlice";
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { signoutSuccess, updateSuccess } from "../app/user/userSlice";
import deleteicon from "../images/icons8-delete.svg";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";


export default function MyAnswers() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userAnswers, setUserAnswers] = useState([]);
    useEffect(() => {
      const getDetails = async () => {
        try {
          // console.log("Inside fetch user blogs")
          // console.log(currentUser.data.user._id)
          let userId = currentUser.data.user._id;
          let url = `/api/user/${userId}`;
          const res = await fetch(url);
          const data = await res.json();
          console.log("userdata", data);
  
          if (!res.ok) {
            console.log(data.message);
          }
          // setUser(data.data[0]);
          setUserAnswers(data.data[0].userAnswers);
          // console.log(userBlogs);
          // console.log(userBlogs._id)
        } catch (err) {
          console.log(err);
        }
      };
      console.log("working");
      getDetails();
    }, [currentUser]);
    return (
      <div className="max-w-lg mx-auto p-3 w-full mb-10">
        <div className="my-10">
          <h2 className="text-lg font-semibold mb-3">Your Answers</h2>
          {userAnswers.length > 0 ? (
            userAnswers.map((answer) => (
              <div key={answer._id} className="blog-container cursor-pointer" onClick={() => navigate(`/getQuestion/${answer.questionId}`)}>
                <h3 className="text-xl font-semibold">{answer.answer}</h3>
                <p className="text-gray-600">
                  
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have no Answers Posted yet.</p>
          )}
        </div>
      </div>
    );
  }
  
