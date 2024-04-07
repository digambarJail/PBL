import React from "react";
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { signoutSuccess } from "../app/user/userSlice";
import { useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import { updateSuccess, updateFailure } from "../app/user/userSlice";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
    console.log("pf link bf", currentUser.data.user.profilePicture);
    try {
      setLoading(true);
      const res = await fetch("/api/changeProfilePicture", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("userdata", data);
      // if (!data.ok) {
      //   dispatch(updateFailure(data.message));
      //   setImageFileUploadError(data.message);
      // } 
      dispatch(updateSuccess(data.data));
    } catch (error) {
      console.log(error.message);
      setImageFileUploadError(error);
    }
    setLoading(false);
    setImageFile(null);
    console.log("pf link", currentUser.data.user.profilePicture);
  };
  
  useEffect(() => {
  console.log("pf link updated", currentUser.data.user.profilePicture);
}, [currentUser.data.user.profilePicture]);

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
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form
        className="flex flex-col gap-4"
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
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.data.user.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
          {console.log("imgurl", imageFileUrl)}
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.data.user.name}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.user.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outlinedisabled={loading}
          outline
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
    </div>
  );
}

