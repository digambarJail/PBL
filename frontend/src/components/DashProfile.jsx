import React, { useState,useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from '../app/user/userSlice';
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { signoutSuccess, updateSuccess } from "../app/user/userSlice";
import deleteicon from "../images/icons8-delete.svg";
import { Link, useNavigate } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState(null);
  const [deleteAccountError, setDeleteAccountError] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(""); // State for delete success message
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // State for delete confirmation
  const [blogToDelete, setBlogToDelete] = useState(null); // State to store blog to delete
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
  
  const userId = currentUser.data.user._id;

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (confirmDelete) {
      deleteAccount();
    }
  };
  const deleteAccount = async () => {
    try {
      const res = await fetch(`/api/deleteAccount/${userId}` , {
        method: "POST",

      });
      const data = await res.json();
      if(!res.ok){
        setDeleteAccountError(data.message);
        console.log('err',data.message);
        alert(data.message);
      }
      if(res.ok){
        setDeleteAccountSuccess(data.message);
        console.log('succ',data.message);
        alert(data.message);
        dispatch(reset());
        
      }
    } catch (error) {
      setDeleteAccountError(error);
    }
  }

  useEffect(() => {
    const getDetails = async () => {
        try {
            // console.log("Inside fetch user blogs")
            // console.log(currentUser.data.user._id)
            let userId = currentUser.data.user._id
            let url = `/api/user/${userId}`;
            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            }
            // setUser(data.data[0]);
            setUserBlogs(data.data[0].userBlogs);
            // console.log(userBlogs);
            // console.log(userBlogs._id)
        } catch (err) {
            console.log(err);
        }
    };

    getDetails();
}, []);

  const confirmDeleteBlog = (blogId) => {
    setBlogToDelete(blogId);
    setDeleteConfirmation(true);
  };

  const deleteBlog = async () => {
    try {
      const res = await fetch(`/api/deleteBlog/${blogToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      const data = await res.json();
      setDeleteSuccessMessage("Blog deleted successfully");
      // Update UI or perform any additional actions
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }

    // Reset states
    setDeleteConfirmation(false);
    setBlogToDelete(null);
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
          readOnly
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.data.user.email}
          readOnly
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
      <div className="my-10">
        <h2 className="text-lg font-semibold mb-3">Your Blogs</h2>
        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <div key={blog._id} className="blog-container">
              <img src={deleteicon} alt="delete" onClick={() => confirmDeleteBlog(blog._id)} className="delete-icon ml-96 w-8 h-8" />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600">{blog.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no blogs yet.</p>
        )}
        {deleteSuccessMessage && <Alert color="success">{deleteSuccessMessage}</Alert>}
      </div>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {deleteAccountError && (
        <>
          <Alert color="failure">{deleteAccountError}</Alert>
          </>
        )}
        {deleteAccountSuccess && (
          <>
          <Alert color="success">{deleteAccountSuccess}</Alert>
          </>
        )}
  
      {/* Confirmation dialog */}
      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-75"></div>
          <div className=" p-6 rounded-lg shadow-lg z-50 relative">
            <p className="text-xl mb-4">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end">
              <Button onClick={deleteBlog} gradientDuoTone="purpleToBlue" className="mr-4">
                Yes
              </Button>
              <Button onClick={() => setDeleteConfirmation(false)} gradientDuoTone="redToOrange">
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}