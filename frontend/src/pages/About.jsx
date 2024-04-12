import React from 'react';
import './About.css'; // Importing CSS file for styling

const About = () => {
  return (
    <>
    <section class="">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Welcome to  <span class="font-extrabold">PICT Connect!</span> The Heartbeat of PICT's Student Community!</h2>

          <p class="mb-4 font-medium"> <p className="description">
        At PICT Connect, we believe every student at Pune Institute of Computer Technology (PICT) carries a universe of knowledge, experiences, and insights waiting to be shared. Our platform stands as a vibrant community hub, designed exclusively for PICT students to connect, learn, and grow together.
      </p>
      <p className="description">
        Empowering Connections: Dive into a world where questions find answers, curiosity meets knowledge, and challenges transform into opportunities. Whether you're tackling a tough academic problem, seeking advice on projects, or navigating the vast ocean of career possibilities, our community is here to support you every step of the way.
      </p>
      <p className="description">
        A Tapestry of Stories: Beyond questions and answers, PICT Connect celebrates the rich tapestry of student life at PICT. Our blog section serves as a canvas for your narratives. From unforgettable campus experiences to rigorous interview preparations, and innovative study strategies - your stories become the guideposts for fellow students and the generations to come.
      </p>
      <p className="description">
        Celebrating Top Voices: Recognition fuels passion, and at PICT Connect, we celebrate the voices that resonate the most within our community. Our "Top Voices" feature highlights members whose contributions—be it a thought-provoking blog or a solution-driven answer—garner significant attention and likes from the community. Becoming a "Top Voice" not only showcases your impact but also inspires others to share, engage, and grow.
      </p>
      <p className="description">
      Events: Stay updated on tech and non-tech events happening in and around the college. Our events feature keeps you informed about both technical and non-technical events taking place in and near our college.
      </p>
      <div className="features">
        <h2>Features:</h2>
        <ul className="feature-list">
          <li>Q&A Section: A dynamic space to ask questions and share insights across a spectrum of topics including academics, coding, research, internships, and much more.</li>
          <li>Blogs: Unleash your creativity and share your journey, tips, and experiences through engaging blog posts.</li>
          <li>Community Support: At the heart of our platform is a supportive and respectful community. Whether providing feedback on blog posts or answering questions, collaboration and kindness are our core principles.</li>
          <li>Events: Stay updated on tech and non-tech events happening in and around the college.</li>
          <li>Top Voices: A recognition feature that spotlights members making significant contributions through engaging content and helpful answers.</li>
        </ul>
      </div>
      <p className="join-us">
        Join Us: Whether you're a first-year student just starting your journey at PICT, a seasoned senior with a wealth of knowledge, or an alumnus looking to give back, PICT Connect is your go-to destination. Here, every student's voice is heard, and every story matters. Together, let's build a thriving community that inspires, educates, and empowers. Welcome to PICT Connect – where every PICT student's journey is celebrated.
      </p></p>
          <a href="/contact" class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-blue-700 text-blue-400 ">
              Learn more
              <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>
      </div>
  </div>
</section>
    </>
  );
}

export default About;
