import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate , useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ResetPassword = () => {
    const [formData, setFormData] = useState({});
    const {tokenId} = useParams();
    const [loading , setLoading] = useState(null);
    const [reseterror , setResetError] = useState(null);
    const [resetsuccess , setResetSuccess] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password) {
            setResetError("Enter All the Fields!");
          }
          const requestBody = {
            newPassword: formData.password,
          };
        try{
            setLoading(true);
            console.log('token',tokenId);
            console.log('formdata',formData);
            const res = await fetch(`/api/resetPassword/${tokenId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
              });
              console.log('formdata',formData);
              const data = await res.json();
              if (data.status != 200 ) {
                    console.log("error" , data);
                    setResetError(data.error);
              }
              if(res.ok) {
                setResetSuccess(data.message);
                
              }

        }catch(error){
            setResetError("There was an Error sending Email!");
        }
        setLoading(false);
        setResetError(null);
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
              <Label value='New password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
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
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Resend Email ?</span>
            <Link to="forgot-password" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {reseterror && (
            <Alert className="mt-5" color="failure">
              {reseterror}
            </Alert>
          )}
          {resetsuccess && (
            <Alert className="mt-5" color="success">
              {resetsuccess}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};