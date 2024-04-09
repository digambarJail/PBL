import React from 'react';
import './About.css'; // Importing CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1 className="title">Welcome to PICT Connect!</h1>
      <h3 className="subtitle">The Heartbeat of PICT's Student Community!</h3>
      <p className="description">
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
      </p>
    </div>
  );
}

export default About;
