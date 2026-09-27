import { ArrowUpRight, BookOpen, Construction } from "lucide-react";
import PageShell from "../components/PageShell";

const notes = [
  { title: "What building Recallify taught me", topic: "Projects", status: "Draft" },
  { title: "Learning Bahasa, one conversation at a time", topic: "Learning", status: "Planned" },
];

export default function Notes() {
  return (
    <PageShell pageClass="notes-v2" label="Field Notes">
      <header className="page-heading" data-reveal>
        <h1>Field Notes</h1>
        <p>Notes I’m writing about projects and things I’m learning.</p>
      </header>

      <section className="notes-board paper-panel" data-reveal>
        <div className="notes-intro">
          <BookOpen aria-hidden="true" />
          <div>
            <h2>Nothing published yet.</h2>
            <p>I’m drafting the first post about rebuilding Recallify from local-only storage into something that works across devices.</p>
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
