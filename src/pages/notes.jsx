import { ArrowUpRight, BookOpen, Construction } from "lucide-react";
import PageShell from "../components/PageShell";

const notes = [
  { title: "What building Recallify taught me", topic: "Projects", status: "Draft" },
  { title: "Learning Bahasa, one conversation at a time", topic: "Learning", status: "Planned" },
  { title: "Small projects still count", topic: "Growth", status: "Planned" },
];

export default function Notes() {
  return (
    <PageShell pageClass="notes-v2" label="Field Notes">
      <header className="page-heading" data-reveal>
        <span className="eyebrow marker-red">Thoughts in progress</span>
        <h1>Field Notes</h1>
        <p>Lessons from building, learning, fixing, and figuring things out.</p>
      </header>

      <section className="notes-board paper-panel" data-reveal>
        <div className="notes-intro">
          <BookOpen aria-hidden="true" />
          <div>
            <h2>A simple journal first.</h2>
            <p>I’m keeping this lightweight until I have something worth publishing consistently. No login system or empty admin dashboard—just honest notes when they are ready.</p>
          </div>
        </div>
        <div className="note-list">
          {notes.map((note, index) => (
            <article className={`field-note field-note-${index + 1}`} key={note.title}>
              <span>{note.topic}</span>
              <h3>{note.title}</h3>
              <small><Construction /> {note.status}</small>
              <button type="button" disabled aria-label={`${note.title} is not published yet`}>Read later <ArrowUpRight /></button>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
