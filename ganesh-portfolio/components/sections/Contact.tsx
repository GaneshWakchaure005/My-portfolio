"use client";

import React, { useState } from "react";
import { Mail, Clock, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { DEVELOPER_INFO } from "@/lib/constants";

const WhatsappIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent(
        formData.subject || "Project Inquiry"
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
    }, 600);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Ganesh Wakchaure"
      className="relative w-full py-24 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Let's work together & Contact Info */}
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-sans tracking-tight leading-[1.1] mb-5">
              Let&apos;s work <br />
              <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                together
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg mb-10 font-normal">
              Have a project in mind or want to discuss MERN development, backend APIs, or deployment support? I would like to hear from you.
            </p>

            {/* Contact Items */}
            <div className="flex flex-col gap-5 mb-10">
              {/* Email */}
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 group-hover:bg-slate-800/80 transition-all shrink-0">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-normal">Email</span>
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {DEVELOPER_INFO.email}
                  </span>
                </div>
              </a>

              {/* Whatsapp */}
              <a
                href="https://wa.me/918010072112"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 group-hover:bg-slate-800/80 transition-all shrink-0">
                  <WhatsappIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-normal">Whatsapp</span>
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {DEVELOPER_INFO.phone}
                  </span>
                </div>
              </a>

              {/* Working Hours */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-normal">Working Hours</span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    6 AM – 10 PM IST
                  </span>
                </div>
              </div>
            </div>

            {/* Find me on */}
            <div>
              <span className="text-xs text-slate-400 block mb-3 font-normal">
                Find me on
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={DEVELOPER_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400/50 hover:bg-slate-800 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={DEVELOPER_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400/50 hover:bg-slate-800 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={DEVELOPER_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400/50 hover:bg-slate-800 transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${DEVELOPER_INFO.email}`}
                  aria-label="Send Email"
                  className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-amber-400/50 hover:bg-slate-800 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full">
            {formSubmitted ? (
              <div className="py-16 px-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white font-sans">
                  Message Prepared!
                </h4>
                <p className="text-sm text-slate-400 max-w-sm">
                  Opening your default mail client with your formatted message. I will review and reply within 24 hours!
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/40 text-xs font-mono text-amber-300 hover:bg-amber-400 hover:text-slate-950 font-semibold transition-all"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-slate-200">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090e1a] border border-slate-800/90 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/40 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090e1a] border border-slate-800/90 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/40 transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-slate-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can I help you?"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090e1a] border border-slate-800/90 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/40 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-slate-200">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090e1a] border border-slate-800/90 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/40 transition-all resize-y min-h-[140px]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base transition-all duration-200 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] cursor-pointer mt-1"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
