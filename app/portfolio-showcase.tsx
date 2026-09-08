"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowUpRight, Plus, X, Check } from "lucide-react";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "./portfolio-data";

const CARD_TONES = [
  "bg-[#e7edff] text-[#1c1e21]", // soft blue
  "bg-[#e8e9e3] text-[#1c1e21]", // soft stone gray
  "bg-[#f2ede4] text-[#1c1e21]", // warm architectural paper
  "bg-[#e7f3a8] text-[#1c1e21]", // citron lime
  "bg-[#edeef0] text-[#1c1e21]", // cool slate
  "bg-[#e4ebf5] text-[#1c1e21]", // sky tint
];

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

const cardMotionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.18,
      ease: "easeInOut",
    },
  },
};

interface PortfolioShowcaseProps {
  initialCategory?: string;
  limit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export function PortfolioShowcase({
  initialCategory = "All",
  limit,
  showFilters = true,
  title = "Selected Client Work",
  subtitle = "Case studies in business architecture, brand communication, and digital systems.",
}: PortfolioShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.categoryDisplay)));
    return ["All", ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    let list = PORTFOLIO_PROJECTS;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.categoryDisplay === activeCategory);
    }
    if (limit) {
      list = list.slice(0, limit);
    }
    return list;
  }, [activeCategory, limit]);

  return (
    <section
      className="portfolio-showcase-section"
      id="case-studies"
      style={{
        paddingTop: "40px",
        paddingBottom: "80px",
        width: "100%",
      }}
    >
      <div className="section-intro" style={{ marginBottom: "35px" }}>
        <div className="eyebrow" style={{ margin: 0 }}>
          {PORTFOLIO_PROJECTS.length} VERIFIED CASE STUDIES
        </div>
        <h2 style={{ maxWidth: "850px", fontSize: "clamp(2rem, 3.5vw, 3.4rem)", lineHeight: 1.1 }}>
          {subtitle}
        </h2>
      </div>

      {/* Category Filter Bar */}
      {showFilters && (
        <div
          className="filters"
          role="tablist"
          aria-label="Filter case studies by category"
          style={{
            marginBottom: "35px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count =
              cat === "All"
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter((p) => p.categoryDisplay === cat).length;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat)}
                className={isSelected ? "selected" : ""}
                style={{
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    fontSize: "11px",
                    opacity: isSelected ? 0.95 : 0.6,
                    fontFamily: "monospace",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Portfolio Cards */}
      <motion.div
        layout
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              toneClass={CARD_TONES[index % CARD_TONES.length]}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface CardProps {
  project: PortfolioProject;
  index: number;
  toneClass: string;
  onSelect: () => void;
}

function PortfolioCard({ project, index, toneClass, onSelect }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      variants={cardMotionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        layout: { type: "spring", stiffness: 350, damping: 30 },
      }}
      className={`relative rounded-[5px] overflow-hidden cursor-pointer ${toneClass}`}
      style={{ minHeight: "390px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`View case study for ${project.client}`}
    >
      {/* Resting State: Bright, clean architectural card */}
      <div className="p-7 md:p-8 flex flex-col justify-between h-full">
        <div>
          <div className="card-meta flex justify-between items-center text-xs font-mono">
            <span style={{ fontFamily: "monospace", letterSpacing: "0.08em" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="uppercase tracking-wider"
              style={{ fontSize: "11px", letterSpacing: "0.08em" }}
            >
              {project.category}
            </span>
          </div>

          <h3
            style={{
              fontSize: "clamp(1.5rem, 2.1vw, 2.2rem)",
              margin: "28px 0 14px",
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            {project.client}
          </h3>

          <p
            className="text-sm line-clamp-3"
            style={{ color: "rgba(28, 30, 33, 0.78)", lineHeight: 1.6 }}
          >
            {project.challenge}
          </p>
        </div>

        <div
          className="card-reveal"
          style={{
            marginTop: "28px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(28, 30, 33, 0.12)",
          }}
        >
          <span className="font-mono text-xs tracking-wider uppercase font-medium">
            Explore Case Study
          </span>
          <span
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid currentColor",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={15} />
          </span>
        </div>
      </div>

      {/* Hover State: Sleek dark mode overlay (bg-black) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.96,
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`absolute inset-0 bg-black text-white p-7 md:p-8 flex flex-col justify-between z-10 ${
          isHovered ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center font-mono text-[11px] text-[#9ca3af] tracking-wider uppercase">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ color: "#e7f3a8" }}>{project.category}</span>
        </div>

        <div className="my-auto space-y-4 py-2">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-[#9ca3af] uppercase block mb-1 font-semibold">
              THE PROBLEM
            </span>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3">
              {project.challenge}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest text-[#e7f3a8] uppercase block mb-1 font-semibold">
              OUR SOLUTION
            </span>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3">
              {project.solution}
            </p>
          </div>
        </div>

        <div
          className="flex items-center justify-between pt-3 text-xs font-medium tracking-wide"
          style={{
            borderTop: "1px solid #272a2e",
            color: "#e7f3a8",
          }}
        >
          <span className="font-mono text-[11px] tracking-wider uppercase">
            Click For Full Details
          </span>
          <span
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid #e7f3a8",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={15} />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-3xl max-h-[88vh] bg-[#f8f8f4] text-[#1c1e21] rounded-md shadow-2xl overflow-y-auto border border-[#d9dad5] p-6 sm:p-10 z-10"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#eeeee8] hover:bg-[#d9dad5] text-[#1c1e21] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: "12px" }}>
            {project.category} · CASE STUDY
          </div>
          <h2
            id="case-study-title"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.045em",
              fontWeight: 500,
            }}
          >
            {project.client}
          </h2>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            style={{
              background: "#eeeee8",
              padding: "22px",
              borderRadius: "5px",
            }}
          >
            <span
              className="font-mono text-[11px] tracking-wider text-[#606269] uppercase block mb-2 font-semibold"
            >
              THE CHALLENGE
            </span>
            <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#1c1e21" }}>
              {project.challenge}
            </p>
          </div>

          <div
            style={{
              background: "#e7edff",
              padding: "22px",
              borderRadius: "5px",
            }}
          >
            <span
              className="font-mono text-[11px] tracking-wider text-[#2448ed] uppercase block mb-2 font-semibold"
            >
              THE SOLUTION
            </span>
            <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#1c1e21" }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Full Case Study Narrative */}
        <div className="mb-8">
          <span
            className="font-mono text-[11px] tracking-wider text-[#606269] uppercase block mb-3 font-semibold"
          >
            FULL CASE STUDY
          </span>
          <div className="space-y-4">
            {project.fullCaseStudy.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "#383a3f",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Key Results */}
        <div
          className="mb-8 p-6 bg-white rounded-[5px]"
          style={{ border: "1px solid #d9dad5" }}
        >
          <span
            className="font-mono text-[11px] tracking-wider text-[#2448ed] uppercase block mb-4 font-semibold"
          >
            KEY RESULTS
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyResults.map((result, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-[#1c1e21]"
              >
                <span
                  style={{
                    color: "var(--blue)",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                >
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Disciplines */}
        <div className="mb-9">
          <span
            className="font-mono text-[11px] tracking-wider text-[#606269] uppercase block mb-3 font-semibold"
          >
            TOOLS & DISCIPLINES
          </span>
          <div className="flex flex-wrap gap-2">
            {project.toolsUsed.map((tool, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-3.5 py-1.5 rounded-full"
                style={{
                  background: "#eeeee8",
                  color: "#1c1e21",
                  border: "1px solid #d9dad5",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div
          className="pt-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: "1px solid #d9dad5" }}
        >
          <Link
            href="/contact"
            className="button"
            onClick={onClose}
          >
            Discuss a Similar Project <ArrowUpRight size={18} />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-sm hover:underline cursor-pointer"
            style={{ color: "#606269" }}
          >
            Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
