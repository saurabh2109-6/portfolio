"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Activity, Focus } from "lucide-react";
import { PortfolioData } from "@/lib/portfolio";

const Contact = ({ data }: { data: PortfolioData['contact'] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const contactInfo = [
    { icon: Mail, label: "Transmission Channel", value: data.email, href: `mailto:${data.email}` },
    { icon: Phone, label: "Audio Frequency", value: data.phone, href: `tel:${data.phone.replace(/\D/g, '')}` },
    { icon: MapPin, label: "Physical Coordinates", value: data.location, href: "#" },
  ];

  return (
    <section id="contact" ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Focus className="w-8 h-8 text-pink-500 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(244,114,182,0.3)]">
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Contact</span>
            </h2>
          </div>
          <p className="text-pink-400/80 uppercase tracking-widest text-sm md:text-base font-semibold">
            Establish a secure connection
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Activity className="w-6 h-6 text-pink-400" />
              <h3 className="text-2xl font-black uppercase tracking-wide text-white">Neural Uplink</h3>
            </div>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              My communication subroutines are always active. Whether for professional inquiries or collaborative data exchange, ping my mainframe coordinates below.
            </p>

            <div className="space-y-6 pt-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a key={info.label} href={info.href} className="flex items-center gap-6 group relative p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    <div className="p-4 glass rounded-xl border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-pink-500/30 group-hover:shadow-[0_0_20px_rgba(244,114,182,0.4)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-gray-500 group-hover:text-pink-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 group-hover:text-pink-400/70 transition-colors mb-1">{info.label}</p>
                      <p className="font-bold text-gray-300 group-hover:text-white transition-colors tracking-wide truncate max-w-[200px] sm:max-w-xs">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6 glass-neon p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2 pl-1">Identifier</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#030014]/80 text-white rounded-xl border border-white/10 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 focus:outline-none transition-all placeholder-gray-600 font-medium"
                    placeholder="Enter designation"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2 pl-1">Network Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#030014]/80 text-white rounded-xl border border-white/10 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 focus:outline-none transition-all placeholder-gray-600 font-medium"
                    placeholder="entity@network.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2 pl-1">Subject Protocol</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-[#030014]/80 text-white rounded-xl border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 focus:outline-none transition-all placeholder-gray-600 font-medium"
                  placeholder="State your directive"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2 pl-1">Data Payload</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-[#030014]/80 text-white rounded-xl border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all resize-none placeholder-gray-600 font-medium"
                  placeholder="Transmit message contents here..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full relative group overflow-hidden px-8 py-5 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 disabled:opacity-50 border border-pink-500/30 hover:border-pink-400 rounded-xl font-bold uppercase tracking-widest text-pink-300 hover:text-white transition-all hover:shadow-[0_0_30px_rgba(244,114,182,0.3)] mt-4"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
                <span className="flex items-center justify-center gap-3 relative z-10">
                  {status === "sending" ? (
                    <>Transmitting Data...</>
                  ) : status === "success" ? (
                    <>Transmission Successful ✓</>
                  ) : (
                    <>
                      <span>Execute Transmission</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
              
              {status === "error" && (
                <p className="text-red-400 text-xs font-mono text-center mt-4">Error: Transmission Failed. Core breach detected.</p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

