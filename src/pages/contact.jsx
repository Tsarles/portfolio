import { useState } from "react";
import DraggableSideNav from "../components/DraggableSideNav";

const FORMSPREE_ID = "YOUR_FORM_ID";

/* ── SVG ICONS ── */
function InstagramIcon() {
  return (
    <svg className="contact-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg className="contact-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: "var(--green)", flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); 
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formspree.io/f/xnnqydqo`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || "Something went wrong. Try again!");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — check your connection.");
      setStatus("error");
    }
  }

  return (
    <>
    <div className="contact-page">
      <div className="contact-wrapper">

        {/* ── HEADER BAND ── */}
        <div className="contact-header-band">
          <h1>Contact Me</h1>
        </div>

        {/* ── SUCCESS ── */}
        {status === "success" ? (
          <div className="contact-success">
            <h2>Message sent!</h2>
            <p>Thanks for reaching out — I'll get back to you as soon as I can!</p>
            <button className="contact-success-back" onClick={() => setStatus("idle")}>
              Send another
            </button>
          </div>
        ) : (

          /* ── TWO-COLUMN BODY ── */
          <div className="contact-body">

            {/* LEFT — Get in Touch */}
            <div className="contact-left">
              <h2 className="contact-left-title">Get in Touch</h2>

              <div className="contact-info-block">
                <span className="contact-info-label">Find my Email</span>
                <span className="contact-info-value" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MailIcon />
                  charles.cabral700@gmail.com
                </span>
              </div>

              <p className="contact-divider-text">— or —</p>

              <div className="contact-info-block">
                <span className="contact-info-label">Contact me through my socials</span>
                <div className="contact-socials">
                  <a
                    className="contact-social-link"
                    href="https://www.instagram.com/sitsarls/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                    Instagram
                  </a>
                  <a
                    className="contact-social-link"
                    href="https://www.linkedin.com/in/charles-andrew-cabral-564282280/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — Formspree form */}
            <div className="contact-right">

              {status === "error" && (
                <div className="contact-error-banner">{errorMsg}</div>
              )}

              <div className="contact-field">
                <label className="contact-label" htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  className="contact-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  className="contact-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  className="contact-textarea"
                  name="message"
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                className="contact-submit-btn"
                onClick={handleSubmit}
                disabled={
                  status === "sending" ||
                  !form.name.trim() ||
                  !form.email.trim() ||
                  !form.message.trim()
                }
                type="button"
              >
                {status === "sending" ? (
                  <>
                    <span className="contact-btn-spinner" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
    <DraggableSideNav />
    </>
  );
}