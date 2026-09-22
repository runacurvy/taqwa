"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowUpRight, Plus, X, ArrowLeft } from "lucide-react";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "./portfolio-data";

const CARD_TONES = [
  "bg-[#f0f4ff] text-[#1c1e21] border-[#d8e2ff]", // soft blue
  "bg-[#f5f6f2] text-[#1c1e21] border-[#e2e5dc]", // soft architectural stone
  "bg-[#fcfaf4] text-[#1c1e21] border-[#e8e4d8]", // warm paper
  "bg-[#f7fbdf] text-[#1c1e21] border-[#dce889]", // citron lime
  "bg-[#f1f3f5] text-[#1c1e21] border-[#dadde1]", // cool slate
  "bg-[#f0f7f7] text-[#1c1e21] border-[#d2e5e5]", // soft mint/teal
];

const FILTER_CATEGORIES = [
  "All",
  "Healthcare",
  "Manufacturing",
  "Real Estate",
  "Fintech",
  "Food & Beverage",
  "Retail & Lifestyle",
  "Luxury Jewelry",
];

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const cardMotionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 14 },
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

export function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.categoryDisplay === activeCategory);
  }, [activeCategory]);

  return (
    <section
      className="portfolio-showcase-section"
      id="selected-projects"
      style={{
        padding: "60px 4.5% 90px",
        width: "100%",
        maxWidth: "1350px",
        margin: "0 auto",
      }}
    >
      {/* Intro Header */}
      <div className="section-intro" style={{ marginBottom: "40px" }}>
        <div className="eyebrow" style={{ margin: 0, color: "#819808", fontWeight: 700 }}>
          SELECTED PROJECTS
        </div>
        <h2 style={{ maxWidth: "980px", fontSize: "clamp(2rem, 3.6vw, 3.5rem)", lineHeight: 1.12, margin: "16px 0 0" }}>
          Work across business architecture, brand communication, digital systems, sourcing, product development, and launch.
        </h2>
      </div>

      {/* Category Filter Bar */}
      <div
        className="filters"
        role="tablist"
        aria-label="Filter selected projects"
        style={{
          marginBottom: "40px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {FILTER_CATEGORIES.map((cat) => {
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
                transition: "all 0.2s ease",
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
                  opacity: isSelected ? 0.95 : 0.65,
                  fontFamily: "monospace",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Portfolio Cards */}
      <motion.div
        layout
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

      {/* Case Study Full Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <FullProjectModal
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
      className={`relative rounded-[8px] border overflow-hidden cursor-pointer transition-shadow ${toneClass}`}
      style={{ minHeight: "380px" }}
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
      aria-label={`View project details for ${project.client}`}
    >
      {/* BEFORE HOVER STATE */}
      <div className="p-7 md:p-8 flex flex-col justify-between h-full">
        <div>
          <div className="card-meta flex justify-between items-center text-xs font-mono">
            <span style={{ fontFamily: "monospace", letterSpacing: "0.08em" }}>
              0{index + 1}
            </span>
            <span
              className="uppercase tracking-wider font-semibold"
              style={{ fontSize: "11px", letterSpacing: "0.08em", color: "#819808" }}
            >
              {project.category}
            </span>
          </div>

          <h3
            style={{
              fontSize: "clamp(1.5rem, 2.1vw, 2.2rem)",
              margin: "24px 0 14px",
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              fontWeight: 600,
              color: "#1c1e21",
            }}
          >
            {project.client}
          </h3>

          <p
            className="text-sm line-clamp-4"
            style={{ color: "#4c4f56", lineHeight: 1.6 }}
          >
            {project.summary}
          </p>
        </div>

        <div
          className="card-reveal"
          style={{
            marginTop: "28px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(28, 30, 33, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="font-mono text-xs tracking-wider uppercase font-bold" style={{ color: "#1c1e21" }}>
            EXPLORE PROJECT
          </span>
          <span
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#1c1e21",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={16} />
          </span>
        </div>
      </div>

      {/* AFTER HOVER STATE (Dark Architectural Overlay) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.97,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`absolute inset-0 bg-[#16181b] text-white p-7 md:p-8 flex flex-col justify-between z-10 ${
          isHovered ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center font-mono text-[11px] text-[#a0a4ab] tracking-wider uppercase">
          <span>0{index + 1}</span>
          <span style={{ color: "#f0f7c2", fontWeight: 700 }}>{project.category}</span>
        </div>

        <div className="my-auto space-y-4 py-2">
          <div>
            <span className="font-mono text-[10.5px] tracking-widest text-[#a0a4ab] uppercase block mb-1 font-bold">
              THE PROBLEM
            </span>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3">
              {project.problem}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10.5px] tracking-widest text-[#f0f7c2] uppercase block mb-1 font-bold">
              OUR SOLUTION
            </span>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3">
              {project.solution}
            </p>
          </div>
        </div>

        <div
          className="flex items-center justify-between pt-3 text-xs font-semibold tracking-wide"
          style={{
            borderTop: "1px solid #2d3137",
            color: "#f0f7c2",
          }}
        >
          <span className="font-mono text-[11px] tracking-wider uppercase">
            VIEW FULL PROJECT
          </span>
          <span
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#f0f7c2",
              color: "#1c1e21",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FullProjectModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
      aria-labelledby="full-project-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#fcfcf9] text-[#1c1e21] rounded-lg shadow-2xl overflow-y-auto border border-[#dcded6] p-6 sm:p-12 z-10"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full project view"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f0f2eb] hover:bg-[#e2e5dc] text-[#1c1e21] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-8 pr-12">
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase block mb-2"
            style={{ color: "#819808" }}
          >
            {project.category}
          </span>
          <h1
            id="full-project-title"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.045em",
              fontWeight: 600,
              color: "#1c1e21",
              marginBottom: "16px",
            }}
          >
            {project.client}
          </h1>
          <p style={{ fontSize: "19px", color: "#4c5058", lineHeight: 1.5, fontWeight: 500, maxWidth: "780px" }}>
            {project.headline}
          </p>
        </div>

        {/* Challenge Section */}
        <div className="mb-8 p-6 bg-[#f4f5ee] rounded-md border border-[#e1e4da]">
          <h3
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#819808",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            The Challenge
          </h3>
          <div className="space-y-3">
            {project.challenge.split("\n\n").map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: "16px", lineHeight: 1.7, color: "#2c2f35" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-8 p-6 bg-[#f7fbd8] rounded-md border border-[#dce889]">
          <h3
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#2b380a",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            The Solution
          </h3>
          <div className="space-y-3">
            {project.fullSolution.split("\n\n").map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: "16px", lineHeight: 1.7, color: "#1c210d" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Outcome Section */}
        <div className="mb-8 p-6 bg-[#f3f5fa] rounded-md border border-[#d7deec]">
          <h3
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#2448ed",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            The Outcome
          </h3>
          <div className="space-y-3">
            {project.outcome.split("\n\n").map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: "16px", lineHeight: 1.7, color: "#1c212d" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Disciplines */}
        <div className="mb-10">
          <h3
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#606269",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            Disciplines
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.disciplines.map((discipline, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-4 py-2 rounded-full font-medium"
                style={{
                  background: "#f0f2ea",
                  color: "#1c1e21",
                  border: "1px solid #d8dbc8",
                }}
              >
                {discipline}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div
          className="pt-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: "1px solid #e1e3dc" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="button"
            style={{ background: "#1c1e21", color: "#ffffff", border: "1px solid #1c1e21" }}
          >
            <ArrowLeft size={16} /> BACK TO SELECTED PROJECTS
          </button>
          
          <Link
            href="/contact"
            className="text-link"
            onClick={onClose}
            style={{ fontSize: "14.5px", fontWeight: 600 }}
          >
            Discuss a similar project <ArrowUpRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
