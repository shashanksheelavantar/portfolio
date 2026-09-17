import { profile } from "../data/profile";
import GithubIcon from "./GithubIcon";
import LinkedinIcon from "./LinkedinIcon";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-content mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">© {new Date().getFullYear()} {profile.name}. Built with React, Three.js & Tailwind CSS.</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="link" className="text-muted hover:text-ink transition-colors"><GithubIcon size={17} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="link" className="text-muted hover:text-ink transition-colors"><LinkedinIcon size={17} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" data-cursor="link" className="text-muted hover:text-ink transition-colors"><Mail size={17} /></a>
        </div>
      </div>
    </footer>
  );
}
