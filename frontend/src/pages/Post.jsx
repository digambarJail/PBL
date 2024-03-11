import React from 'react';

const Post = () => {
  return (
    <div className={`bg-white dark:bg-gray-800 font-[sans-serif] p-4 mt-12 rounded-md `}>
      <div className="max-w-6xl max-md:max-w-lg mx-auto">
        <div>
          <h2 className="text-3xl font-extrabold text-[#333] dark:text-slate-100 inline-block">
            LATEST BLOGS
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-10">
          <div className={`flex max-lg:flex-col bg-white dark:bg-gray-700 cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300`}>
            <img
              src="https://readymadeui.com/Imagination.webp"
              alt="Blog Post 1"
              className="lg:w-2/5 min-h-[250px] h-full object-cover"
            />
            <div className="p-6 lg:w-3/5">
              <h3 className="text-xl font-bold text-[#333] dark:text-gray-300">
                A Guide to Igniting Your Imagination
              </h3>
              <span className="text-sm block text-gray-400 dark:text-gray-400 mt-2">
                10 FEB 2023 | BY JOHN DOE
              </span>
              <p className="text-sm mt-4 text-gray-700 dark:text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                accumsan, nunc et tempus blandit.
              </p>
              <a
                href="javascript:void(0);"
                className="mt-4 inline-block text-blue-600 text-sm hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;









// import React from 'react';

// const Post = () => {
//   return (
// <div class="bg-white font-[sans-serif] p-4 ">
//       <div class="max-w-6xl max-md:max-w-lg mx-auto">
//         <div>
//           <h2 class="text-3xl font-extrabold text-[#333] inline-block">LATEST BLOGS</h2>
//         </div>
//         <div class="grid grid-cols-1 gap-8 mt-10">
//           <div class="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300">
//             <img src="https://readymadeui.com/Imagination.webp" alt="Blog Post 1" class="lg:w-2/5 min-h-[250px] h-full object-cover" />
//             <div class="p-6 lg:w-3/5">
//               <h3 class="text-xl font-bold text-[#333]">A Guide to Igniting Your Imagination</h3>
//               <span class="text-sm block text-gray-400 mt-2">10 FEB 2023 | BY JOHN DOE</span>
//               <p class="text-sm mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.</p>
//               <a href="javascript:void(0);" class="mt-4 inline-block text-blue-600 text-sm hover:underline">Read More</a>
//             </div>
//           </div>
//           <div class="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300">
//             <img src="https://readymadeui.com/hacks-watch.webp" alt="Blog Post 2" class="lg:w-2/5 min-h-[250px] h-full object-cover" />
//             <div class="p-6 lg:w-3/5">
//               <h3 class="text-xl font-bold text-[#333]">Hacks to Supercharge Your Day</h3>
//               <span class="text-sm block text-gray-400 mt-2">7 JUN 2023 | BY MARK ADAIR</span>
//               <p class="text-sm mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.</p>
//               <a href="javascript:void(0);" class="mt-4 inline-block text-blue-600 text-sm hover:underline">Read More</a>
//             </div>
//           </div>
//           <div class="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300">
//             <img src="https://readymadeui.com/prediction.webp" alt="Blog Post 2" class="lg:w-2/5 min-h-[250px] h-full object-cover" />
//             <div class="p-6 lg:w-3/5">
//               <h3 class="text-xl font-bold text-[#333]">Trends and Predictions</h3>
//               <span class="text-sm block text-gray-400 mt-2">5 OCT 2023 | BY SIMON KONECKI</span>
//               <p class="text-sm mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.</p>
//               <a href="javascript:void(0);" class="mt-4 inline-block text-blue-600 text-sm hover:underline">Read More</a>
//             </div>
//           </div>
//           <div class="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300">
//             <img src="https://readymadeui.com/team-image.webp" alt="Blog Post 2" class="lg:w-2/5 min-h-[250px] h-full object-cover" />
//             <div class="p-6 lg:w-3/5">
//               <h3 class="text-xl font-bold text-[#333]">Innovators Changing the Game</h3>
//               <span class="text-sm block text-gray-400 mt-2">10 DEC 2023 | BY SIMON KONECKI</span>
//               <p class="text-sm mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.</p>
//               <a href="javascript:void(0);" class="mt-4 inline-block text-blue-600 text-sm hover:underline">Read More</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;
