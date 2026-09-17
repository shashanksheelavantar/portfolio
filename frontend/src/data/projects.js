// Links marked isPlaceholder: true should be replaced with real URLs —
// they render as disabled/labeled rather than fake working links.

export const projects = [
  {
    id: "internhub",
    name: "InternHub",
    tagline: "Team & internship management platform",
    description:
      "A centralized platform for a small internship team to manage tasks, attendance, GitHub/LeetCode activity, and team analytics.",
    tech: ["React", "Node.js", "Express.js", "PostgreSQL"],
    features: [
      "Team management & org structure",
      "Task tracking with Kanban board",
      "Attendance calendar & tracking",
      "GitHub integration",
      "LeetCode integration",
      "Team leaderboard",
      "Announcements",
      "Calendar & events",
    ],
    links: { demo: null, github: null, isPlaceholder: true },
    caseStudy: {
      problem:
        "Small internship teams often juggle task tracking, attendance, and progress updates across disconnected tools (spreadsheets, chat threads, sticky notes), making it hard for a team lead to see a clear picture of where things stand.",
      solution:
        "InternHub brings tasks, attendance, standups, blockers, and developer activity (GitHub/LeetCode) into one dashboard, with role-based views for team leads and members.",
      architecture:
        "A React + Vite frontend talks to an Express REST API, which is backed by a normalized PostgreSQL schema (users, teams, tasks, attendance, blockers, and more) and secured with JWT-based authentication.",
      featuresDetail:
        "Kanban board with drag-and-drop, a GitHub-style attendance heatmap, multi-category leaderboards (tasks, attendance, GitHub activity, LeetCode, streaks), and a service-layer design so GitHub/LeetCode integrations can be swapped from mock to live data.",
      technology:
        "React, React Router, Tailwind CSS, Recharts for analytics, Node.js/Express for the API, PostgreSQL for storage, JWT for auth.",
      challenges:
        "Designing a database schema that cleanly separates tasks, attendance, and blockers while keeping foreign keys and constraints (e.g., one attendance record per user per day) consistent; structuring the frontend so a mock data layer could later be swapped for a real API with minimal changes.",
      learned:
        "How to structure a full-stack app so the frontend, API, and database layers stay decoupled and independently testable, and how to design a schema that scales cleanly as more features are added.",
    },
  },
  {
    id: "studybuddy",
    name: "Study Buddy",
    tagline: "AI-powered learning platform",
    description:
      "Upload study material as a PDF and get AI-assisted summaries, flashcards, and quizzes generated from it.",
    tech: ["React", "FastAPI", "Python", "AI/NLP"],
    features: [
      "PDF upload",
      "Text extraction",
      "AI summarization",
      "Flashcard generation",
      "MCQ generation",
      "Quiz evaluation",
    ],
    links: { demo: null, github: null, isPlaceholder: true },
    caseStudy: {
      problem:
        "Turning long study material (PDFs, lecture notes) into something actively studyable — summaries, flashcards, quizzes — is time-consuming to do by hand.",
      solution:
        "Study Buddy extracts text from an uploaded PDF and uses AI/NLP to generate a summary, flashcards, and multiple-choice questions, then evaluates quiz answers.",
      architecture:
        "A React frontend uploads a PDF to a FastAPI (Python) backend, which extracts text, runs it through an NLP/AI summarization and question-generation pipeline, and returns structured study material to the client.",
      featuresDetail:
        "PDF text extraction, AI-generated summaries, auto-generated flashcards for spaced review, MCQ generation with answer evaluation and scoring.",
      technology: "React for the frontend, FastAPI (Python) for the backend, NLP/AI models for summarization and question generation.",
      challenges:
        "Reliably extracting clean text from varied PDF formats, and structuring AI-generated output (summaries, flashcards, MCQs) into a consistent, parseable format for the frontend.",
      learned:
        "How to design a pipeline that takes unstructured input (a PDF) and produces structured, usable output, and how to connect a Python AI backend to a React frontend.",
    },
  },
  {
    id: "projecthub",
    name: "ProjectHub",
    tagline: "GitHub-inspired project sharing platform",
    description:
      "A platform for developers to create profiles, upload projects, and share/download them — with Git integration and authentication.",
    tech: ["React", "Node.js", "PostgreSQL"],
    features: [
      "User profiles",
      "Project uploads",
      "Search",
      "Downloads",
      "Git integration",
      "Authentication",
    ],
    links: { demo: null, github: null, isPlaceholder: true },
    caseStudy: {
      problem:
        "Sharing small-to-medium projects often means scattering them across personal drives, random links, or a GitHub repo with no discovery layer for other developers to browse and find related work.",
      solution:
        "ProjectHub gives developers a profile, a place to upload and describe their projects, and search/download functionality — inspired by GitHub's project-first model.",
      architecture:
        "A React frontend and a Node.js/Express REST API backed by PostgreSQL, with authentication controlling who can upload/edit projects and Git-based integration for linking repositories.",
      featuresDetail:
        "Searchable project listings, per-user profiles, file/project downloads, and authentication to protect uploads and edits.",
      technology: "React, Node.js, Express.js, PostgreSQL, JWT-based authentication.",
      challenges:
        "Designing search that stays fast as the number of projects grows, and handling file uploads/downloads safely and efficiently.",
      learned:
        "How to design a search-friendly data model and how authentication and authorization decisions shape the rest of an API's design.",
    },
  },
];
