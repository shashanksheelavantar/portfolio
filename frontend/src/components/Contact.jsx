import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { profile } from "../data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Button from "./Button";
import GithubIcon from "./GithubIcon";
import LinkedinIcon from "./LinkedinIcon";

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.message.trim() || form.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    // TODO: wire this up to a real backend endpoint, e.g.:
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
  };

  return (
    <section id="contact" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Let's talk" description="Have a role, project, or question in mind? I'd love to hear from you." />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center text-center py-10">
                <CheckCircle2 size={32} className="text-emerald mb-3" />
                <h3 className="font-semibold text-ink mb-1">Message ready to send</h3>
                <p className="text-sm text-muted max-w-sm">
                  This form validates client-side and is wired for a backend endpoint — connect it to your mail service
                  (or a simple API route) to actually deliver messages.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">Name</label>
                  <input
                    id="name" value={form.name} onChange={handleChange("name")}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
                    className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-ink focus-ring"
                  />
                  {errors.name && <p id="name-error" className="text-xs text-coral mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">Email</label>
                  <input
                    id="email" type="email" value={form.email} onChange={handleChange("email")}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-ink focus-ring"
                  />
                  {errors.email && <p id="email-error" className="text-xs text-coral mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">Message</label>
                  <textarea
                    id="message" rows={5} value={form.message} onChange={handleChange("message")}
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-ink resize-none focus-ring"
                  />
                  {errors.message && <p id="message-error" className="text-xs text-coral mt-1">{errors.message}</p>}
                </div>
                <Button as="button" type="submit" disabled={status === "sending"} data-cursor="button">
                  <Send size={15} /> {status === "sending" ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2 flex flex-col gap-3">
            <a href={`mailto:${profile.email}`} data-cursor="link" className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 hover:border-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0"><Mail size={17} /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink">Email</div>
                <div className="text-sm text-muted truncate">{profile.email}</div>
              </div>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="link" className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 hover:border-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0"><GithubIcon size={17} /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink">GitHub</div>
                <div className="text-sm text-muted truncate">{profile.github.replace("https://", "")}</div>
              </div>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="link" className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 hover:border-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0"><LinkedinIcon size={17} /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink">LinkedIn</div>
                <div className="text-sm text-muted truncate">{profile.linkedin.replace("https://www.", "")}</div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
