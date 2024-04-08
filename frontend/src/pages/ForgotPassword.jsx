import React from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ForgotPassword = () => {
    const [loading , setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [emailerror , setEmailError] = useState(null);
    const [emailsuccess , setEmailSuccess] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            setEmailError("Enter All the Fields!");
          }
        try{
            setLoading(true);
            const res = await fetch('/api/forgetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
              if (data.status != 200 ) {
                    console.log("error" , data.error);
              }
              if(res.ok) {
                setEmailSuccess(data.message);
                
              }

        }catch(error){
            setEmailError("There was an Error sending Email!");
        }
        setLoading(false);
        setEmailError(null);
    }
  return (
    <div className="min-h-screen mt-40">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-40">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 rounded-lg text-white">
              PICT
            </span>{" "}
            CONNECT
          </Link>
          <p className="text-sm mt-5">
            {/* This is a demo project. You can sign up with your email and password
          or with Google. */}
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="redToYellow"
              type="submit"
              disabled={loading}
              outline
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Sending Email!</span>
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have an account?</span>
            <Link to="/reg" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {emailerror && (
            <Alert className="mt-5" color="failure">
              {emailerror}
            </Alert>
          )}
          {emailsuccess && (
            <Alert className="mt-5" color="success">
              {emailsuccess}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
