import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { signoutSuccess, updateSuccess } from "../app/user/userSlice";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadSuccess, setImageFileUploadSuccess] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const selectedfile = e.target.files[0];
    if (selectedfile) {
      setImageFile(selectedfile);
      setImageFileUrl(URL.createObjectURL(selectedfile));
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", imageFile);

    try {
      setLoading(true);
      const res = await fetch("/api/changeProfilePicture", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if(res.ok){
        setImageFileUploadSuccess("Image Changed SuccessFully!");
      }
      dispatch(updateSuccess(data.data));
    } catch (error) {
      console.log(error.message);
      setImageFileUploadError("Failed to upload image. Please try again.");
    }
    setLoading(false);
    setImageFile(null);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const requestBody = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };

      try {
        const response = await fetch("/api/changePassword", requestOptions);
        if (!response.ok) {
          // Handle error response
          const errorMessage = await response.text();
          console.log(passwordChangeError);
          throw new Error(errorMessage);
        }

        // Handle success response
        const responseData = await response.json();
        if(response.ok){
          console.log("Password change successful:", responseData);
          setPasswordChangeSuccess("Password Changed Successfully!");
        }
        setoldPassword("");
       setNewPassword("");
        
      } catch (error) {
        console.log("Inside inner catch block");
        console.error("Password change failed:", error.message);
        setPasswordChangeError("Failed to change password. Please try again");
        console.log(passwordChangeError);
      }


    } catch (error) {
      console.log("Inside outer catch block");
      console.error("Password change failed:", error.message);
      setPasswordChangeError("Failed to change password. Please try again");
      console.log(passwordChangeError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        console.log(data);
        // Redirect or navigate to login page after sign out
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-10">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form
        className="flex flex-col gap-4 my-10"
        encType="multipart/form-data"
        onSubmit={handleImageSubmit}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.data.user.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity duration-300 opacity-0 hover:opacity-100 hover:bg-opacity-50">
            <span className="text-white text-sm font-semibold">Change</span>
          </div>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {imageFileUploadSuccess && (
          <Alert color="success">{imageFileUploadSuccess}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.data.user.name}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.data.user.email}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outlined={loading}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Updating Profile...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className="flex flex-col gap-4">
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          value={oldPassword}
          onChange={(e) => setoldPassword(e.target.value)}
        />
        <TextInput
          type="password"
          id="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {passwordChangeError && (
          <Alert color="failure">{passwordChangeError}</Alert>
        )}
        {passwordChangeSuccess && (
          <Alert color="success">{passwordChangeSuccess}</Alert>
        )}
        <Button
          onClick={handleChangePassword}
          gradientDuoTone="purpleToBlue"
          outlined={!loading}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Changing Password...</span>
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </div>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
    </div>
  );
}