import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../app/user/userSlice";
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { signoutSuccess, updateSuccess } from "../app/user/userSlice";
import deleteicon from "../images/icons8-delete.svg";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
export default function MyQuestions() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userQuestions, setUserQuestions] = useState([]);
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
        setUserQuestions(data.data[0].userQuestions);
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
        <h2 className="text-lg font-semibold mb-3">Your Questions</h2>
        {userQuestions.length > 0 ? (
          userQuestions.map((question) => (
            <div key={question._id} className="blog-container cursor-pointer" onClick={() => navigate(`/getQuestion/${question._id}`)}>
              <h3 className="text-xl font-semibold">{question.question}</h3>
              <p className="text-gray-600">
                {question.isAnonymous ? "Asked Anonymously" : ""}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no Questions yet.</p>
        )}
      </div>
    </div>
  );
}
