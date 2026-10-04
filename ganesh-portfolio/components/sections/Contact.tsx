"use client";

import React, { useState } from "react";
import {
  Terminal,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  MapPin,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon } from "@/components/ui/Icons";
import { DEVELOPER_INFO } from "@/lib/constants";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate high-reliability transmission
    setFormSubmitted(true);
    setTimeout(() => {
      // In production, would link to mailto or backend endpoint
      window.location.href = `mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent(
        formData.subject || "Project Inquiry"
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-label="Contact & Communications"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // TRANSMIT MESSAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Let&apos;s build something exceptional.
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-1">
            Open to senior full-stack roles, architecture consulting, and high-impact distributed systems engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Connect & Telemetry */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl p-6 sm:p-8 glass-panel border border-cyan-500/20 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 radial-glow-cyan opacity-25 pointer-events-none" />

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  COMMUNICATION CHANNEL
                </span>
                <h3 className="text-xl font-bold text-white font-sans">
                  Direct Inquiries & Collaboration
                </h3>
                <p className="text-sm text-slate-400 font-normal leading-relaxed">
                  Have an ambitious technical roadmap or need an engineer who moves fast without breaking production? Reach out directly.
                </p>
              </div>

              {/* Email Copy Card */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono text-xs text-slate-200 truncate select-all">
                    {DEVELOPER_INFO.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              {DEVELOPER_INFO.phone && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{DEVELOPER_INFO.phone}</span>
                  </div>
                  <a
                    href={`tel:${DEVELOPER_INFO.phone.replace(/\s+/g, "")}`}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 hover:text-white hover:bg-slate-800 text-[11px] transition-colors"
                  >
                    CALL
                  </a>
                </div>
              )}

              {/* Status and Specs */}
              <div className="space-y-3 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    LOCATION:
                  </span>
                  <span className="text-slate-200">{DEVELOPER_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>RESPONSE TIME:</span>
                  <span className="text-cyan-400">&lt; 24 HOURS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>AVAILABILITY:</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    IMMEDIATE
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-500 block mb-3">
                  EXTERNAL TELEMETRY:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={DEVELOPER_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={DEVELOPER_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={DEVELOPER_INFO.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X Twitter Profile"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-slate-800 transition-all"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 glass-panel border border-slate-800/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  SECURE TRANSMISSION FORM
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  ENCRYPTED E2E
                </span>
              </div>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-sans">
                    Transmission Dispatched
                  </h4>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Opening your default mail client with the formatted payload. I will review and reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs text-slate-400 mb-1.5"
                      >
                        SENDER NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs text-slate-400 mb-1.5"
                      >
                        REPLY ADDRESS *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="ada@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-mono text-xs text-slate-400 mb-1.5"
                    >
                      SUBJECT / ARCHITECTURAL OBJECTIVE *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      placeholder="Senior Full Stack Role / Systems Architecture"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs text-slate-400 mb-1.5"
                    >
                      PAYLOAD / PROJECT DETAILS *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Outline system requirements, timeline, stack, or role details..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-semibold hover:bg-cyan-500/30 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all active:scale-[0.99]"
                  >
                    <span>TRANSMIT DISPATCH</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
