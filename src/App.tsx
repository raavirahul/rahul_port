import React, { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

/** Types */
type Project = {
  title: string;
  blurb: string;
  details: string;
  links: { label: string; href: string }[];
  tags: string[];
};

type Experience = {
  role: string;
  company: string;
  time: string;
  points: string[];
};

type Education = {
  degree: string;
  school: string;
  time: string;
};

type OpenRole = {
  title: string;
  location: string;
  description: string;
};

export default function App() {
  const [activeTag, setActiveTag] = useState("All");
  const [copied, setCopied] = useState(false);

  const email = "rahulraavi888@gmail.com";
  const phone = "+33 7 45 304 551";
  const location = "Lille, France";

  // WhatsApp deep link (uses your number)
  const waNumber = "33745304551"; // international format, no + or spaces
  const waMessage = encodeURIComponent("Hi Rahul, I saw your portfolio and would like to connect.");
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const tags = ["All", "AWS", "Data Eng", "Cloud", "ETL", "Streaming", "ML", "Infra as Code"];

  const projects: Project[] = [
    {
      title: "Serverless Data Lake on AWS",
      blurb: "S3 + Glue + Athena + Lake Formation.",
      details: "Glue Jobs, dbt, Athena, Lake Formation.",
      links: [{ label: "GitHub", href: "#" }],
      tags: ["AWS", "Data Eng", "ETL"]
    },
    {
      title: "Real-time Events on Kinesis to Redshift",
      blurb: "Kinesis, Lambda, Redshift.",
      details: "Provisioned with CDK, Lambda, Redshift.",
      links: [{ label: "GitHub", href: "#" }],
      tags: ["AWS", "Streaming", "Cloud"]
    }
  ];

  const experiences: Experience[] = [
    {
      role: "Market Intelligence Analyst",
      company: "Technip Energies",
      time: "Aug 2024 - Mar 2025",
      points: [
        "Built ingestion and transformations with AWS services.",
        "Delivered dashboards and improved freshness SLAs."
      ]
    },
    {
      role: "Data Engineer Intern",
      company: "Enfocus",
      time: "Jan 2024 - May 2024",
      points: [
        "Created market-intelligence tool AUTOMACI.",
        "Automated data pipelines and Power BI dashboards."
      ]
    },
    {
      role: "System Data Engineer",
      company: "Quanted Technologies",
      time: "Aug 2021- July 2023",
      points: [
        "Improved pallet tracking by 35%.",
        "Optimized budgeting with forecasting."
      ]
    }
  ];

  const education: Education[] = [
    { degree: "MSc Big Data Analytics for Business", school: "IESEG School of Management", time: "2023-2025" },
    { degree: "Mechanical Engineering", school: "Visveraya Technological University", time: "2016-2020" }
  ];

  const openRoles: OpenRole[] = [
    { title: "Data Engineer", location: "Europe (Remote/Flexible)", description: "Open to roles focused on AWS cloud data pipelines, streaming, and ETL." },
    { title: "Cloud Engineer", location: "Europe/India", description: "Looking for cloud engineering roles with AWS, Terraform, and infrastructure as code." }
  ];

  const filtered = useMemo(
    () => (activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))),
    [activeTag]
  );

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  }

  /** Reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased relative overflow-x-hidden">
      {/* ===== NAVBAR: solid brand blue ===== */}
      <header className="sticky top-0 z-50 bg-brandBlue text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight">Rahul Raavi</span>

          <nav className="hidden items-center gap-2 text-sm font-medium sm:flex">
            {[
              { id: "projects", label: "Projects" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
              { id: "openroles", label: "Open Roles" },
              { id: "resume", label: "Resume" }
            ].map((i) => (
              <a
                key={i.id}
                href={`#${i.id}`}
                className="rounded-xl px-3 py-1.5 transition hover:bg-white hover:text-brandBlue"
              >
                {i.label}
              </a>
            ))}
            <a
              href="#contact"
              className="relative rounded-xl bg-white px-3 py-1.5 font-semibold text-brandBlue hover:bg-slate-100"
            >
              Contact
              <span className="absolute -right-1 -top-1 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500"></span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-500 px-3 py-1.5 font-semibold text-white hover:bg-emerald-600"
            >
              WhatsApp
            </a>
          </nav>

          <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/40">
            <img
              src="/src/assets/placeholder-headshot.jpg"
              alt="Your headshot"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ===== HOME (white) ===== */}
      <section id="home" className="bg-white">
        <div className="reveal mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
          <div className="grid gap-4">
            <h1 className="text-3xl font-extrabold text-brandBlue sm:text-5xl">Rahul Raavi</h1>
            <p className="text-sm sm:text-base text-slate-600">
              Data & Cloud Engineer · AWS · Terraform · Python · dbt
            </p>
            <p className="mt-2 max-w-prose text-base text-slate-700 sm:text-lg">
              I design and build reliable, cost-efficient data platforms in the cloud. My stack centers on AWS (Glue,
              Redshift, EMR, Lambda, S3, Kinesis), dbt, Terraform, and Python.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="will-change-transform rounded-xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brandBlueDeep"
              >
                See Projects
              </a>
              <a
                href="/rahul_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-brandBlue px-4 py-2 text-sm font-semibold text-brandBlue transition hover:bg-brandBlue hover:text-white"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS (light gray) ===== */}
      <section id="projects" className="bg-slate-50">
        <div className="reveal mx-auto max-w-6xl px-4 pt-16 pb-16">
          <h2 className="text-xl font-bold text-brandBlue sm:text-2xl">Projects</h2>
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={
                  "rounded-full border px-3 py-1 text-xs transition " +
                  (activeTag === t
                    ? "border-brandBlue bg-brandBlue text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100")
                }
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((p, idx) => (
              <article
                key={idx}
                className="reveal rounded-3xl border bg-white p-5 shadow-md transition-transform will-change-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-brandBlue">{p.title}</h3>
                <p className="text-slate-700">{p.blurb}</p>
                <p className="text-xs text-slate-600">{p.details}</p>
                <div className="mt-3">
                  {p.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      className="mr-3 text-sm font-semibold text-brandBlue underline hover:text-brandBlueDeep"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE (white) ===== */}
      <section id="experience" className="bg-white">
        <div className="reveal mx-auto max-w-6xl px-4 pt-16 pb-16">
          <h2 className="text-xl font-bold text-brandBlue sm:text-2xl">Experience</h2>
          <div className="mt-6 grid gap-5">
            {experiences.map((e, i) => (
              <div
                key={i}
                className="reveal rounded-3xl border bg-white p-5 shadow-md transition-transform will-change-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-brandBlue">
                    {e.role} · {e.company}
                  </h3>
                  <span className="text-xs text-slate-600">{e.time}</span>
                </div>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                  {e.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDUCATION (light gray) ===== */}
      <section id="education" className="bg-slate-50">
        <div className="reveal mx-auto max-w-6xl px-4 pt-16 pb-16">
          <h2 className="text-xl font-bold text-brandBlue sm:text-2xl">Education</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
            {education.map((ed, i) => (
              <div
                key={i}
                className="reveal rounded-3xl border bg-white p-5 shadow-md transition-transform will-change-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-brandBlue">{ed.degree}</h3>
                <p className="text-sm text-slate-700">{ed.school}</p>
                <p className="text-xs text-slate-600">{ed.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPEN ROLES (white) ===== */}
      <section id="openroles" className="bg-white">
        <div className="reveal mx-auto max-w-6xl px-4 pt-16 pb-16">
          <h2 className="text-xl font-bold text-brandBlue sm:text-2xl">Open Roles</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {openRoles.map((r, i) => (
              <div
                key={i}
                className="reveal rounded-3xl border bg-white p-5 shadow-md transition-transform will-change-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-brandBlue">{r.title}</h3>
                <p className="text-sm text-slate-700">{r.location}</p>
                <p className="mt-2 text-xs text-slate-600">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESUME (light gray, static PDF) ===== */}
      <section id="resume" className="bg-slate-50">
        <div className="reveal mx-auto max-w-6xl px-4 pt-16 pb-16">
          <h2 className="text-xl font-bold text-brandBlue sm:text-2xl">Resume</h2>

          <div className="mb-4 flex items-center gap-3">
            <a
              href="/rahul_resume.pdf"
              download
              className="rounded-xl border border-brandBlue px-4 py-2 text-sm font-semibold text-brandBlue transition hover:bg-brandBlue hover:text-white"
            >
              Download Resume
            </a>
            <a
              href="/rahul_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brandBlueDeep"
            >
              Open in New Tab
            </a>
          </div>

          <iframe
            src="/rahul_resume.pdf"
            title="Resume"
            className="h-[70vh] w-full rounded-xl"
          ></iframe>
        </div>
      </section>

      {/* ===== CONTACT (white) ===== */}
      <section id="contact" className="bg-white">
        <div className="reveal mx-auto max-w-6xl px-4 pt-16 pb-24">
          <h2 className="mb-4 text-xl font-bold text-brandBlue sm:text-2xl">Contact</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border bg-white p-5 shadow-md">
              <p>
                <span className="font-semibold">Email:</span> {email}{" "}
                <button
                  onClick={copyEmail}
                  className="ml-2 rounded-xl bg-brandBlue px-2 py-1 text-xs text-white"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </p>
              <p className="mt-2"><span className="font-semibold">Phone:</span> {phone}</p>
              <p className="mt-2"><span className="font-semibold">Location:</span> {location}</p>

              {/* WhatsApp QR */}
              <div className="mt-6 flex items-center gap-4">
                <div className="rounded-2xl border p-3 bg-white">
                  <QRCodeCanvas value={waLink} size={128} includeMargin />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800">Scan to chat on WhatsApp</p>
                  <p className="text-slate-600">Or click the button:</p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block rounded-xl bg-emerald-500 px-3 py-1.5 font-semibold text-white hover:bg-emerald-600"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! This demo does not send yet. Hook up a form endpoint.");
              }}
              className="grid gap-3 rounded-3xl border bg-white p-5 shadow-md"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="Your name" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm" />
                <input required type="email" placeholder="Your email" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm" />
              </div>
              <input placeholder="Subject" className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm" />
              <textarea required placeholder="Message" rows={5} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm" />
              <div className="flex justify-end">
                <button className="rounded-xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER: solid dark navy ===== */}
      <footer className="bg-[#002060] py-10 text-center text-xs text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p>© {new Date().getFullYear()} Rahul Raavi · Data & Cloud Engineering</p>
        </div>
      </footer>
    </div>
  );
}
