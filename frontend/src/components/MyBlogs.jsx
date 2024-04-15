import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../app/user/userSlice";
import { Alert, Button, TextInput, Spinner } from "flowbite-react";
import { signoutSuccess, updateSuccess } from "../app/user/userSlice";
import deleteicon from "../images/icons8-delete.svg";
import { Link, useNavigate, useLocation , useParams } from "react-router-dom";

export default function MyBlogs() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userBlogs, setUserBlogs] = useState([]);
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(""); // State for delete success message
    const [deleteConfirmation, setDeleteConfirmation] = useState(false); // State for delete confirmation
    const [blogToDelete, setBlogToDelete] = useState(null); // State to store blog to delete
    useEffect(() => {
        const getDetails = async () => {
          try {
            // console.log("Inside fetch user blogs")
            // console.log(currentUser.data.user._id)
            let userId = currentUser.data.user._id;
            let url = `/api/user/${userId}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log("userdata" , data);
    
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
        console.log("working");
        getDetails();
      }, [currentUser]);
    
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
            
            <div className="my-10">
              <h2 className="text-lg font-semibold mb-3">Your Blogs</h2>
              {userBlogs.length > 0 ? (
                userBlogs.map((blog) => (
                  <div key={blog._id} className="blog-container cursor-pointer" onClick={() => navigate(`/getBlogs/${blog._id}`)}>
                    <img
                      src={deleteicon}
                      alt="delete"
                      onClick={() => confirmDeleteBlog(blog._id)}
                      className="delete-icon w-8 h-8"
                    />
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <p className="text-gray-600">{blog.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">You have no blogs yet.</p>
              )}
            </div>
            {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-75"></div>
          <div className=" p-6 rounded-lg shadow-lg z-50 relative">
            <p className="text-xl mb-4">
              Are you sure you want to delete this blog?
            </p>
            <div className="flex justify-end">
              <Button
                onClick={deleteBlog}
                gradientDuoTone="purpleToBlue"
                className="mr-4"
              >
                Yes
              </Button>
              <Button
                onClick={() => setDeleteConfirmation(false)}
                gradientDuoTone="redToOrange"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
          </div>
  )
}
