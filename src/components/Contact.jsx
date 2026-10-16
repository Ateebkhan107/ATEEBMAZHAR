import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { personalInfo } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import EarthCanvas from "./canvas/Earth";
import { 
  TerminalIcon, 
  GithubIcon, 
  LinkedInIcon, 
  ArrowRightIcon 
} from "./Icons";
import { playKeySound, playSuccessSound } from "../utils/sound";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const validate = () => {
    const errs = {};
    if (!formData.user_name.trim()) {
      errs.user_name = "Name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.user_email.trim()) {
      errs.user_email = "Email is required.";
    } else if (!emailRegex.test(formData.user_email)) {
      errs.user_email = "Please provide a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    playKeySound();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    // Use verified EmailJS configuration from codebase
    emailjs
      .sendForm(
        "service_9rfn0zp",
        "template_xzz4nro",
        formRef.current,
        "4X17WhZKegAhH5bic"
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: "success",
            message: "TRANSMISSION SUCCESSFUL: Your message has been received. I will reply shortly.",
          });
          playSuccessSound();
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setStatus({
            type: "error",
            message: `TRANSMISSION INTERRUPTED: Gateway error (${error.text || "network"}). You can reach me directly at ${personalInfo.email}`,
          });
        }
      );
  };

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm text-[#00ff66] tracking-[0.2em] uppercase font-semibold">
          <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
          <span>// 05. CONTACT &amp; TELEMETRY</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Establish Connection
        </h2>
        <p className="mt-2 text-slate-400 font-mono text-xs sm:text-sm">
          // Available for ambitious engineering roles, startup opportunities, and technical partnerships
        </p>
      </motion.div>

      {/* Main Grid: Left Form / Right Globe */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Form & Direct Reach */}
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 0.8)}
          className="lg:col-span-7 space-y-8"
        >
          {/* Contact Form Card */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#090b10] border-2 border-[#00ff66]/30 shadow-[0_0_40px_rgba(0,255,102,0.12)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
              <span className="text-[#00ff66] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                TRANSMISSION_GATEWAY // DIRECT_ENCRYPTED
              </span>
              <span className="text-slate-400 text-[10px]">STATUS: LISTENING</span>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name Field */}
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  &gt; YOUR_NAME <span className="text-[#00ff66]">*</span>
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className={`w-full p-3 rounded-sm bg-[#10131d] border font-mono text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.user_name
                      ? "border-red-500 focus:border-red-400"
                      : "border-white/10 focus:border-[#00ff66]"
                  }`}
                />
                {errors.user_name && (
                  <span className="font-mono text-xs text-red-400 mt-1 block">
                    {errors.user_name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  &gt; YOUR_EMAIL <span className="text-[#00ff66]">*</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  className={`w-full p-3 rounded-sm bg-[#10131d] border font-mono text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.user_email
                      ? "border-red-500 focus:border-red-400"
                      : "border-white/10 focus:border-[#00ff66]"
                  }`}
                />
                {errors.user_email && (
                  <span className="font-mono text-xs text-red-400 mt-1 block">
                    {errors.user_email}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  &gt; YOUR_MESSAGE <span className="text-[#00ff66]">*</span>
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, team, or opportunity..."
                  className={`w-full p-3 rounded-sm bg-[#10131d] border font-mono text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-400"
                      : "border-white/10 focus:border-[#00ff66]"
                  }`}
                />
                {errors.message && (
                  <span className="font-mono text-xs text-red-400 mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 bg-[#00ff66] hover:bg-[#33ff85] disabled:opacity-60 disabled:cursor-not-allowed text-black font-mono font-bold text-sm tracking-wider rounded-sm transition-all shadow-[3px_3px_0px_#fff] hover:shadow-[1px_1px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-2"
                >
                  <span>{loading ? "[ TRANSMITTING... ]" : "[ TRANSMIT_MESSAGE ]"}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-mono text-xs text-slate-400 hover:text-[#00ff66] transition-colors"
                >
                  Direct Mail: {personalInfo.email}
                </a>
              </div>

              {/* Status Banner */}
              {status.message && (
                <div
                  className={`p-3 rounded-sm font-mono text-xs ${
                    status.type === "success"
                      ? "bg-[#00ff66]/15 border border-[#00ff66]/40 text-[#00ff66]"
                      : "bg-red-500/15 border border-red-500/40 text-red-400"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>

          {/* Direct Social & Connection Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-sm bg-[#0d1017] border border-white/10 hover:border-[#00ff66]/40 flex items-center gap-2.5 text-slate-300 hover:text-[#00ff66] transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#00ff66]" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">GITHUB</span>
                <span>@ateebmazhar</span>
              </div>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-sm bg-[#0d1017] border border-white/10 hover:border-[#00ff66]/40 flex items-center gap-2.5 text-slate-300 hover:text-[#00ff66] transition-colors"
            >
              <LinkedInIcon className="w-4 h-4 text-[#00ff66]" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">LINKEDIN</span>
                <span>/in/ateebmazhar</span>
              </div>
            </a>

            <div className="p-3.5 rounded-sm bg-[#0d1017] border border-white/10 flex items-center gap-2.5 text-slate-300">
              <span className="text-[#00ff66] text-base">📍</span>
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">BASE LOCATION</span>
                <span>Kolkata, IN (UTC+5:30)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Digital Globe */}
        <motion.div
          variants={fadeIn("left", "tween", 0.3, 0.8)}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Coordinates Header */}
          <div className="w-full max-w-sm mb-4 p-3 rounded-sm bg-black/40 border border-[#00ff66]/20 backdrop-blur-md font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
              <span className="text-[#00ff66] font-semibold">GLOBAL_TELEMETRY</span>
            </div>
            <span className="text-slate-400">22.5726° N, 88.3639° E</span>
          </div>

          <EarthCanvas />

          <div className="mt-4 font-mono text-[11px] text-slate-500 text-center">
            [ Interactive Holographic Coordinates • Drag to Rotate ]
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const WrappedContact = SectionWrapper(Contact, "contact");
export default WrappedContact;
