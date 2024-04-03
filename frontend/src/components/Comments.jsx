import React from "react";

export default function Comments({ comments }) {
  console.log("cobj", comments);
  return (
    <div className="flex flex-col gap-5 m-3">
      {comments.map((comment) => (
           <div>
           <div className="flex w-full justify-between border rounded-md">
             <div className="p-3">
               <div className="flex gap-3 items-center">
                 <img
                   src=""
                   className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                   alt="User avatar"
                 />
                 <h3 className="font-bold">
                   User 1
                   <br />
                 </h3>
               </div>
               <p className="text-gray-600 mt-2">{comment.content}</p>
               <button className="text-right text-blue-500">Reply</button>
             </div>
   
             <div className="flex flex-col items-end gap-3 pr-3 py-3">
               <div>
                 <svg
                   className="w-6 h-6 text-gray-600"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   strokeWidth="5"
                   stroke="currentColor"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M4.5 15.75l7.5-7.5 7.5 7.5"
                   />
                 </svg>
               </div>
               <div>
                 <svg
                   className="w-6 h-6 text-gray-600"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   strokeWidth="5"
                   stroke="currentColor"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                   />
                 </svg>
               </div>
             </div>
           </div>
         </div>
      ))}
    </div>
  );
}
