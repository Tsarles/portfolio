import { Check, Clipboard, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import PageShell from "../components/PageShell";

const email = "charles.cabral700@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <PageShell pageClass="contact-v2" label="Contact Charles Cabral">
      <section className="contact-board" data-reveal>
        <div className="contact-card paper-panel">
          <span className="availability-stamp">Open to opportunities</span>
          <span className="eyebrow marker-blue">Let’s connect</span>
          <h1>Let’s build something useful.</h1>
          <p>For internships, IT support, web projects, or a good conversation—send me a note.</p>
          <div className="contact-links">
            <a href={`mailto:${email}`}><Mail /> <span>{email}</span></a>
            <a href="https://www.linkedin.com/in/charles-andrew-cabral-564282280/" target="_blank" rel="noreferrer"><Linkedin /> <span>LinkedIn</span></a>
            <a href="https://github.com/Tsarles" target="_blank" rel="noreferrer"><Github /> <span>github.com/Tsarles</span></a>
            <span><MapPin /> Quezon City, Philippines</span>
          </div>
          <button className="copy-key" type="button" onClick={copyEmail}>{copied ? <Check /> : <Clipboard />} {copied ? "Copied" : "Copy email"}</button>
        </div>

        <div className="envelope-form">
          <form className="message-paper" onSubmit={submit}>
            <label>Your name<input name="name" required autoComplete="name" /></label>
            <label>Your email<input name="email" type="email" required autoComplete="email" /></label>
            <label>Your message<textarea name="message" rows="5" required /></label>
            <button className="big-key big-key-green send-key" type="submit">Send note <Send /></button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
