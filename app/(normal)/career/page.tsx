"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import HeroSection from "@/component/hero section/hero";
import CareerBg from "../../../public/career.png";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  IconBriefcase,
  IconMapPin,
  IconClock,
  IconSend,
  IconPaperclip,
  IconCheck,
  IconCircleCheckFilled,
  IconBolt,
  IconLeaf,
  IconUsers,
  IconTrendingUp,
  IconX,
  IconChevronRight,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ── Open positions data ──────────────────────────────────────────────────────
const openings = [
  {
    title: "Solar EPC Project Engineer",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    dept: "Engineering",
    color: "bg-[#1E88E5]",
  },
  {
    title: "Solar Sales Executive",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    dept: "Sales",
    color: "bg-[#22C55E]",
  },
  {
    title: "Site Supervisor – Installation",
    location: "Rajasthan (Field)",
    type: "Full-time",
    dept: "Operations",
    color: "bg-[#F59E0B]",
  },
  {
    title: "AutoCAD / Design Engineer",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    dept: "Design",
    color: "bg-[#A855F7]",
  },
  {
    title: "O&M Technician",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    dept: "Maintenance",
    color: "bg-[#06B6D4]",
  },
  {
    title: "Business Development Manager",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    dept: "Business Dev",
    color: "bg-[#EC4899]",
  },
];

// ── Why join us ──────────────────────────────────────────────────────────────
const perks = [
  {
    icon: <IconBolt size={26} />,
    title: "Impactful Work",
    desc: "Be part of India's clean energy mission — every project you touch reduces carbon footprint at scale.",
    color: "bg-linear-to-r from-[#1E88E5] to-[#6EC6FF]",
  },
  {
    icon: <IconTrendingUp size={26} />,
    title: "Fast-Track Growth",
    desc: "A young, growing company means real ownership and accelerated career progression for high performers.",
    color: "bg-linear-to-r from-[#22C55E] to-[#10B981]",
  },
  {
    icon: <IconUsers size={26} />,
    title: "Collaborative Team",
    desc: "Work alongside MNRE-certified engineers and solar experts who love what they do.",
    color: "bg-linear-to-r from-[#F59E0B] to-[#F97316]",
  },
  {
    icon: <IconLeaf size={26} />,
    title: "Sustainable Future",
    desc: "Every day you contribute toward a greener Rajasthan and a cleaner India for future generations.",
    color: "bg-linear-to-r from-[#A855F7] to-[#EC4899]",
  },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function CareerPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeIn" },
  };

  // Scroll to form and pre-fill position
  const handleApplyNow = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormData((prev) => ({ ...prev, position: roleTitle }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowed = ["application/pdf", "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowed.includes(file.type)) {
        setError("Please upload a PDF or Word document.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be under 5 MB.");
        return;
      }
    }
    setResumeFile(file);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!formData.position) {
      setError("Please select the position you are applying for.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Build multipart FormData for resume upload
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      if (resumeFile) payload.append("resume", resumeFile);

      const res = await fetch("/api/career", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", position: "", experience: "", message: "" });
        setResumeFile(null);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection
        image={CareerBg}
        badgeText="Join the Solar Revolution"
        heading={
          <>
            Build a Career That{" "}
            <span className="text-[#1E88E5]">Powers</span> <br />
            <span className="text-[#FDEA00]">India&apos;s Future</span>
          </>
        }
        subtitle="Join R-One Power's growing team and work on real solar EPC projects that impact homes, businesses, and industries across India."
        overlay="blue"
        badgeVariant="yellow"
      />

      {/* ── Why Join Us ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F9FAFB] font-inter">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <motion.span
              {...fadeInUp}
              className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4"
            >
              Why R-One Power
            </motion.span>
            <motion.h2
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
            >
              More Than a Job —{" "}
              <span className="text-[#1E88E5]">A Mission</span>
            </motion.h2>
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-medium max-w-2xl mx-auto mt-4"
            >
              At R-One Power, you are not just an employee — you are a key part
              of India&apos;s clean energy transformation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-start"
              >
                <div
                  className={`${perk.color} h-14 w-14 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg`}
                >
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-poppins mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <motion.span
              {...fadeInUp}
              className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4"
            >
              Current Openings
            </motion.span>
            <motion.h2
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
            >
              Open <span className="text-[#1E88E5]">Positions</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openings.map((job, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.08 }}
                className="group bg-white border border-slate-100 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Dept badge */}
                  <span
                    className={`${job.color} inline-block text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4`}
                  >
                    {job.dept}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 font-poppins mb-4 group-hover:text-[#1E88E5] transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <IconMapPin size={15} className="text-[#1E88E5] shrink-0" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <IconClock size={15} className="text-[#1E88E5] shrink-0" />
                      {job.type}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyNow(job.title)}
                  className="mt-6 flex items-center gap-2 text-[#1E88E5] text-sm font-bold hover:gap-3 transition-all"
                >
                  Apply Now <IconChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form ──────────────────────────────────────────────── */}
      <section
        ref={formRef}
        className="py-24 bg-[#F9FAFB] font-inter scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Info panel */}
            <motion.div {...fadeInUp} className="space-y-10">
              <div>
                <span className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4">
                  Apply Now
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-poppins leading-tight">
                  Start Your{" "}
                  <span className="text-[#1E88E5]">Solar Career</span>{" "}
                  Today
                </h2>
                <p className="text-slate-500 font-medium mt-4 leading-relaxed max-w-md">
                  Fill in your details and upload your resume. Our HR team
                  reviews every application personally and will reach out
                  within 5 working days.
                </p>
              </div>

              {/* What to expect */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  What Happens Next
                </h4>
                {[
                  "Our HR team reviews your application",
                  "Shortlisted candidates get a call within 5 days",
                  "Technical / HR interview round",
                  "Offer letter & onboarding",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#1E88E5] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-black">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600">{step}</p>
                  </div>
                ))}
              </div>

              {/* Guarantee strip */}
              <div className="bg-[#E3F2FD] rounded-2xl p-6 space-y-3">
                {[
                  "All applications are kept confidential",
                  "Equal opportunity employer",
                  "We respond to every application",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <IconCircleCheckFilled
                      size={18}
                      className="text-[#1E88E5] shrink-0"
                    />
                    <p className="text-sm font-bold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 md:p-10"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-8 font-poppins">
                Application Form
              </h3>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12 space-y-4"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                    <IconCheck size={40} className="text-emerald-600" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 font-poppins">
                    Application Submitted!
                  </h4>
                  <p className="text-slate-500 font-medium max-w-sm">
                    Thank you for applying to R-One Power. Our HR team will
                    review your profile and get in touch within 5 working days.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    className="mt-4 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-bold rounded-xl h-12 px-8"
                  >
                    Submit Another Application
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700 ml-1">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Rahul Sharma"
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-slate-700 ml-1">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="98XXXXXXXX"
                        type="tel"
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="rahul@example.com"
                      className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">
                      Position Applying For *
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    >
                      <option value="">Select a position</option>
                      {openings.map((job, i) => (
                        <option key={i} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                      <option value="Other / Open Application">
                        Other / Open Application
                      </option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    >
                      <option value="">Select experience</option>
                      <option value="Fresher (0 years)">Fresher (0 years)</option>
                      <option value="1–2 Years">1–2 Years</option>
                      <option value="3–5 Years">3–5 Years</option>
                      <option value="5–10 Years">5–10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  {/* Cover Note */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">
                      Cover Note
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us a bit about yourself, your skills, and why you want to join R-One Power..."
                      className="min-h-[110px] bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5] resize-none"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">
                      Upload Resume *{" "}
                      <span className="text-slate-400 font-normal">
                        (PDF or Word, max 5 MB)
                      </span>
                    </label>

                    <label
                      htmlFor="resume-upload"
                      className={`flex items-center gap-4 w-full h-14 px-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                        resumeFile
                          ? "border-[#1E88E5] bg-[#E3F2FD]"
                          : "border-slate-200 bg-slate-50 hover:border-[#1E88E5] hover:bg-blue-50"
                      }`}
                    >
                      <IconPaperclip
                        size={20}
                        className={resumeFile ? "text-[#1E88E5]" : "text-slate-400"}
                      />
                      <span
                        className={`text-sm font-medium flex-1 truncate ${
                          resumeFile ? "text-[#1E88E5]" : "text-slate-400"
                        }`}
                      >
                        {resumeFile ? resumeFile.name : "Click to attach resume..."}
                      </span>
                      {resumeFile && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setResumeFile(null);
                          }}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <IconX size={16} />
                        </button>
                      )}
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 font-medium">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-bold rounded-xl text-base flex items-center gap-2 shadow-lg shadow-blue-100 mt-2 transition-all disabled:opacity-60"
                  >
                    <IconSend size={18} />
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>

                  <p className="text-center text-[11px] text-slate-400 font-medium">
                    We&apos;ll respond within 5 working days · All info is confidential
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}