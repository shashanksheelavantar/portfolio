// No skill "percentages" are used, per instructions — categories and short
// context notes only.

export const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    icon: "code",
    skills: [
      { name: "Java", note: "DSA, OOP, core language work" },
      { name: "JavaScript", note: "Frontend & backend (Node.js)" },
      { name: "Python", note: "Scripting & backend (FastAPI)" },
      { name: "C", note: "Fundamentals & DSA" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", note: "Component-driven UIs" },
      { name: "HTML", note: "Semantic markup" },
      { name: "CSS", note: "Layout & responsive design" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", note: "Server-side JavaScript" },
      { name: "Express.js", note: "REST API development" },
      { name: "REST APIs", note: "Designing & consuming APIs" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "database",
    skills: [
      { name: "PostgreSQL", note: "Relational schema design" },
      { name: "MongoDB", note: "Document-based storage" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    skills: [
      { name: "Git", note: "Version control" },
      { name: "GitHub", note: "Collaboration & CI" },
      { name: "Docker", note: "Containerization" },
      { name: "Linux", note: "Command-line environments" },
      { name: "Postman", note: "API testing" },
    ],
  },
];

// Subset shown in the 3D technology cloud — kept small for performance.
export const techCloud = [
  { name: "Java", usage: "DSA practice, core language projects", concepts: ["OOP", "Collections", "Multithreading basics"] },
  { name: "React", usage: "Building interactive frontends for all three main projects", concepts: ["Hooks", "Component composition", "State management"] },
  { name: "Node.js", usage: "REST API backends (InternHub, ProjectHub)", concepts: ["Event loop", "Async/await", "npm ecosystem"] },
  { name: "PostgreSQL", usage: "Primary relational database for InternHub & ProjectHub", concepts: ["Normalization", "Joins & indexes", "Constraints"] },
  { name: "MongoDB", usage: "Document storage where schema flexibility helps", concepts: ["Collections & documents", "Aggregation basics"] },
  { name: "Python", usage: "Backend for Study Buddy (FastAPI) and scripting", concepts: ["FastAPI", "Data processing"] },
  { name: "Git", usage: "Version control across all projects", concepts: ["Branching", "Merging", "Pull requests"] },
  { name: "GitHub", usage: "Hosting repos and collaborating", concepts: ["Issues", "Actions basics", "Pull requests"] },
  { name: "Docker", usage: "Learning containerized local dev setups", concepts: ["Images vs containers", "Dockerfile basics"] },
];
