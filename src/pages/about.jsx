import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Heart, Star, BookOpen, Utensils, Globe, ChevronRight } from "lucide-react";
import me from "../assets/me.jpg";
import DraggableSideNav from "../components/DraggableSideNav";

const JOURNAL_SECTIONS = [
  {
    id: "likes",
    title: "Things I enjoy",
    icon: Heart,
    content: "Reading, writing, watching drama or sci-fi movies. Coding and building things. Also love eating, watching movies and all kinds of stuff.",
    color: "#fce7f3",
    rot: -3,
  },
  {
    id: "joys",
    title: "Simple joys",
    icon: Star,
    content: "Being productive, riding my bike, walking in parks, exploring foods in different cities. Oh and banana bread — love banana bread.",
    color: "#fef9c3",
    rot: 2,
  },
  {
    id: "learning",
    title: "Currently learning",
    icon: Globe,
    content: "Im learning Bahasa Indonesian right now! Languages are so cool. Also always learning new things in web dev.",
    color: "#d1fae5",
    rot: -2,
  },
  {
    id: "wants",
    title: "I want to do",
    icon: BookOpen,
    content: "Travel the world, learn meaningful things, make myself proud, and grow from mistakes along the way.",
    color: "#e0f2fe",
    rot: 3,
  },
  {
    id: "faves",
    title: "My favourites",
    icon: Utensils,
    list: [
      "Colors — Green & White",
      "Foods — Corn, Pizza, Chicken Sandwiches, Banana Bread",
      "Season — Winter",
      "Vibes — quiet mornings, good music",
    ],
    color: "#fef3c7",
    rot: -2.5,
  },
];

function JournalCard({ section, flipped, onFlip }) {
  const Icon = section.icon;
  return (
    <div
      className="about-journal-card"
      style={{ "--rot": `${section.rot}deg`, "--bg": section.color }}
      onClick={() => onFlip(section.id)}
    >
      <div className={`about-journal-inner ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="about-journal-front" style={{ background: section.color }}>
          <div className="about-journal-icon">
            <Icon size={22} strokeWidth={1.8} />
          </div>
          <h3 className="journal-title">{section.title}</h3>
          <span className="journal-hint">tap to read ↩</span>
        </div>
        {/* Back */}
        <div className="about-journal-back" style={{ background: section.color }}>
          <h3 className="journal-title-back">{section.title}</h3>
          {section.list ? (
            <ul className="journal-list">
              {section.list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          ) : (
            <p className="journal-text">{section.content}</p>
          )}
          <span className="journal-hint">tap to close ↩</span>
        </div>
      </div>
    </div>
  );
}

function About() {
  const [flipped, setFlipped] = useState({});
  const navigate = useNavigate();

  const handleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="about-page">

      {/* ── LEFT CARD ── */}
      <div className="about-card left-card">
        <div className="avatar-wrap">
          <div className="avatar-box">
            <img src={me} alt="My avatar" />
          </div>
          {/* Small decoration sticker */}
          <div className="avatar-sticker">developer<br/>+ human</div>
        </div>

        <h2 className="about-name">Hi, I'm Charles!</h2>
        <div className="about-handle">@Tsarles2026</div>

        <p className="intro">
          Welcome to my about page. This is the personal side — a little journal about who I am, what I like, and what I'm up to.
        </p>
        <p className="description">
          Sorry if it feels like too much — you can skip around. But if you're curious about the professional stuff, hit the button below.
        </p>

        <p className="about-hint-text">tap the cards to learn more</p>

        {/* Professional Mode Button */}
        <button
          className="about-pro-btn"
          onClick={() => navigate("/resume")}
        >
          <BriefcaseBusiness size={16} />
          Professional mode
          <ChevronRight size={15} />
        </button>
      </div>

      {/* ── RIGHT CARD ── */}
      <div className="about-card right-card">
        <div className="journal-meta">
          <span>Date: 2/7/2026</span>
          <span>Time: Time of eternity</span>
        </div>

        <div className="about-cards-grid">
          {JOURNAL_SECTIONS.map((section) => (
            <JournalCard
              key={section.id}
              section={section}
              flipped={!!flipped[section.id]}
              onFlip={handleFlip}
            />
          ))}
        </div>

        {/* Fun mini note at bottom */}
        <div className="about-bottom-note">
          "still figuring it all out — and that's okay"
        </div>
      </div>

      <DraggableSideNav />
    </section>
  );
}

export default About;
