import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Question } from "../components/Question";

const ShowQuestions = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetch(`api/showQuestions`);
                const data = await res.json();
                console.log("quesdata" , data);
                setData(data.data.questions);
            } catch (error) {
                console.log("Error in getting questions ", error);
            }
        };

        getQuestions();
    }, []);

    return (
        <Question data = {data}/>
    );
};

export default ShowQuestions;
