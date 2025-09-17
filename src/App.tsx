import React, { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

/** Subtle full-page background watermark */
function Watermark() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 select-none">
      {/* Soft radial glows */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px 350px at 110% -10%, rgba(29,78,216,0.06), transparent 60%), radial-gradient(800px 300px at -10% 110%, rgba(16,185,129,0.06), transparent 60%)"
        }}
      />
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[1.00]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#0f172a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
      {/* Diagonal wordmark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] text-[9rem] sm:text-[12rem] font-black tracking-tight leading-none text-slate-900 opacity-[0.06] whitespace-nowrap"
        style={{ letterSpacing: "-0.04em" }}
      >
        DATA&nbsp;ENGINEER
      </div>
    </div>
  );
}

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
  location: string;
  points: string[];
};

type Education = {
  degree: string;
  school: string;
  time: string;
  location: string;
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
  const mylocation = "Lille, France";

  // WhatsApp deep link (uses your number)
  const waNumber = "33745304551"; // international format, no + or spaces
  const waMessage = encodeURIComponent("Hi Rahul, I saw your portfolio and would like to connect.");
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const tags = ["All", "AWS", "Data Eng", "Cloud", "ETL", "Streaming", "ML", "Infra as Code"];

  const projects: Project[] = [
    {
      title: "Customer 360° Analytics",
      blurb: "S3 · Glue · Athena · Lake Formation",
      details: "Built a Customer 360 analytics platform on AWS.",
      links: [{ label: "GitHub", href: "https://github.com/raavirahul/AWS-Customer-360-Analytics" }],
      tags: ["AWS", "Data Eng", "ETL"]
    },
    {
      title: "Supply Chain Visibility",
      blurb: "SAP · AWS Glue · S3",
      details:
        "Developed a supply chain analytics platform to enhance inventory visibility, optimize logistics, and improve demand forecasting.",
      links: [{ label: "GitHub", href: "#" }],
      tags: ["AWS", "Streaming", "Cloud"]
    },
    {
      title: "Real-time AB InBev Dashboards",
      blurb: "Power BI · Python · S3",
      details: "Developed dashboards to track customer complaint resolution times.",
      links: [{ label: "GitHub", href: "https://github.com/raavirahul/AbIbBEVdata" }],
      tags: ["AWS", "Streaming", "Cloud"]
    }
  ];

  const experiences: Experience[] = [
    {
      role: "Market Intelligence Analyst",
      company: "Technip Energies",
      time: "Aug 2024 - Mar 2025",
      location: "Paris, France",
      points: [
        "Collaborated with the Strategic Marketing team and Market Intelligence Manager on global market studies.",
        "Designed and delivered dashboards for Hydrogen, Ethylene, and CCUS using Snowflake and Salesforce data.",
        "Integrated insights from the company’s internal portal and Azure cloud network to enhance accessibility.",
        "Enabled strategy teams with reliable, data-driven intelligence to support long-term business planning."
      ]
    },
    {
      role: "Data Engineer Intern",
      company: "Enfocus (IESEG Integration Program)",
      time: "Jan 2024 - May 2024",
      location: "Ghent, Belgium",
      points: [
        "Processed and analyzed 15M+ records from the global software printing industry dataset.",
        "Built and trained machine learning models with feature engineering and the chunking method for data segmentation.",
        "Achieved 85% classification accuracy in predicting which accounts belong to which industry segment.",
        "Translated business requirements into actionable ML pipelines, delivering insights to guide strategic decisions."
      ]
    },
    {
      role: "System Data Engineer",
      company: "Quanted Technologies",
      time: "Aug 2021 - July 2023",
      location: "Bengaluru, India",
      points: [
        "Assisted senior data engineers in preparing, cleaning, and transforming data for analytical use.",
        "Contributed to feature engineering tasks and the development of dashboards to improve business visibility.",
        "Supported the design and maintenance of ETL pipelines, gaining hands-on exposure to workflow orchestration with Airflow.",
        "Upskilled in Snowflake for scalable data processing and collaborated on early-stage pipeline optimization projects."
      ]
    }
  ];

  const education: Education[] = [
    {
      degree: "MSc Big Data Analytics for Business",
      school: "IESEG School of Management",
      time: "2023-2025",
      location: "Lille, France"
    },
    {
      degree: "Mechanical Engineering",
      school: "Visvesvaraya Technological University (VTU)",
      time: "2016-2020",
      location: "Belagavi, India"
    }
  ];

  const openRoles: OpenRole[] = [
    {
      title: "Data Engineer",
      location: "Europe (Remote/Flexible)",
      description: "Open to roles focused on AWS cloud data pipelines, streaming, and ETL."
    },
    {
      title: "Cloud Engineer",
      location: "Europe/India",
      description: "Looking for cloud engineering roles with AWS, Terraform, and infrastructure as code."
    }
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
      <Watermark /> {/* background watermark */}

      {/* ===== NAVBAR: solid brand blue ===== */}
      <header className="sticky top-0 z-50 bg-brandBlue text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight">Rahul RAAVI</span>

          <nav className="hidden items-center gap-2 text-sm font-medium sm:flex">
            {[
              { id: "projects", label: "PROJECTS" },
              { id: "experience", label: "EXPERIENCE" },
              { id: "education", label: "EDUCATION" },
              { id: "openroles", label: "OPEN ROLES" },
              { id: "resume", label: "RESUME" }
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

          <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/40">
            <img src="/headshot.jpg" alt="Rahul RAAVI" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* ===== HOME (white) ===== */}
      <section id="home" className="bg-white">
        <div className="reveal mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
          <div className="grid gap-4">
            <h1 className="text-3xl font-extrabold text-brandBlue sm:text-5xl">Rahul RAAVI</h1>
            <p className="text-sm sm:text-base text-slate-600">
              Data & Cloud Engineer · AWS · Terraform · Python · dbt · Snowflake · Airflow
            </p>
            <p className="mt-2 max-w-prose text-base text-slate-700 sm:text-lg">
              Looking for Opportunities in Data Engineering, Cloud Data Platforms, and Big Data Solutions. Skilled in AWS
              services, Infrastructure-as-Code, and end-to-end ETL/ELT pipeline design.
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
                  <span className="text-xs text-slate-600">
                    {e.time}
                    {e.location ? ` · ${e.location}` : ""}
                  </span>
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
                <p className="text-xs text-slate-600">
                  {ed.time}
                  {ed.location ? ` · ${ed.location}` : ""}
                </p>
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

          <iframe src="/rahul_resume.pdf" title="Resume" className="h-[70vh] w-full rounded-xl"></iframe>
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
                <button onClick={copyEmail} className="ml-2 rounded-xl bg-brandBlue px-2 py-1 text-xs text-white">
                  {copied ? "Copied!" : "Copy"}
                </button>
              </p>
              <p className="mt-2">
                <span className="font-semibold">Phone:</span> {phone}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Location:</span> {mylocation}
              </p>

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
                <input
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm"
                />
              </div>
              <input
                placeholder="Subject"
                className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm"
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm"
              />
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
