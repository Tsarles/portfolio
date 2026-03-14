import me from "../assets/me.jpg";
import DraggableSideNav from "../components/DraggableSideNav";

function About() {
  return (
    <section className="about-page">

      {/* LEFT CARD */}
      <div className="about-card left-card">
        <div className="avatar-box">
          <img src={me} alt="My avatar" />
        </div>

        <h2>Hi, I’m Charles!</h2>
        <div className="about-footer">@Tsarles2026</div>

        <p className="intro">
          Welcome to my about page where I share a bit about myself, my interests, and what drives me. This is the part I like the most — expressing my thoughts and experiences. Sorry if this feels too much; you can skip this though :)
        </p>

        <p className="description"> 
          This is the unprofessional side. You can go to my resume/CV page to see the professional side.  
          <br /><br />
          I wanted to make this more personal, like a journal entry, so others can get to know me better.
        </p>
      </div>

      {/* RIGHT CARD */}
      <div className="about-card right-card">
        <div className="journal-meta">
          <span>Date: 2/7/2026</span>
          <span>Time: Time of eternity</span>
        </div>

        <div className="journal-section">
          <h3 className="journal-title">Things I like to do</h3>
          <p className="journal-list">
            I like to read, write, watch drama or sci-fi movies. I also like to code and create things.
          </p>
        </div>

        <div className="journal-section">
          <h3 className="journal-title">Simple joys</h3>
          <p className="journal-list">
            I enjoy being productive, spending time outside, riding my bike, walking in parks, and exploring foods in different cities.
          </p>
        </div>

        <div className="journal-section">
          <h3 className="journal-title">I want to do</h3>
          <p className="journal-list">  
            Travel the world, learn meaningful things, make myself proud, and grow from mistakes along the way.
          </p>
        </div>

        <div className="journal-section">
          <h3 className="journal-title">I like</h3>
          <div className="journal-list">
            <ul>
              <li>Color: Green, White</li>
              <li>Food: Corn, Pizza, Chicken Sandwiches</li>
              <li>Season: Winter</li>
            </ul>
          </div>
        </div>
      </div>

      <DraggableSideNav />
    </section>
  );
}

export default About;
