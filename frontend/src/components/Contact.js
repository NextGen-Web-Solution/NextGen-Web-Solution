import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const EASE = [0.22, 1, 0.36, 1];
const API = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/api`;

const SERVICE_OPTIONS = [
  "Full-Stack Web App",
  "Corporate Website",
  "E-Commerce",
  "Maintenance/Redesign",
  "Other",
];

const EMPTY = { name: "", email: "", phone: "", service: "", message: "" };

const FIELD =
  "h-11 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus-visible:ring-[#9F5937] focus-visible:border-[#9F5937]";

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.detail || "Request failed");
      const notificationSent = result.email_sent || result.whatsapp_sent;
      const description = result.email_sent && result.whatsapp_sent
        ? "Our team received the inquiry by email and WhatsApp."
        : result.whatsapp_sent
          ? "Our team received the inquiry on WhatsApp."
          : result.email_sent
            ? "Our team received the inquiry by email."
            : "The inquiry was saved, but email and WhatsApp notifications are not configured.";
      if (notificationSent) toast.success("Inquiry sent! We'll get back to you within 24 hours.", { description });
      else toast.error("Inquiry saved, but the team was not notified.", { description });
      setForm(EMPTY);
    } catch (err) {
      toast.error(err.message === "Request failed" ? "Could not send your inquiry. Please try again or WhatsApp us." : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#9F5937]/15 blur-[140px]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#D2A078]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              index="06"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build your <span className="text-gradient">next big thing.</span>
                </>
              }
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-400"
            >
              Tell us where your business is headed — we&apos;ll map the fastest, most reliable
              route to get there. Free consultation, no obligation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              data-testid="contact-info-card"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                Phone / WhatsApp
              </p>
              <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                +91 7706903395
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="tel:7706903395"
                  data-testid="contact-call-button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-orange-300/50 hover:text-orange-100"
                >
                  <Phone size={15} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/917705982331"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-button"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold text-[#4ade80] transition-colors duration-200 hover:bg-[#25D366]/20"
                >
                  <WhatsAppIcon size={15} />
                  WhatsApp
                </a>
              </div>

              <div className="my-7 h-px bg-white/[0.07]" />

              <a
                href="mailto:nextgenwebsolution08@gmail.com"
                data-testid="contact-email-link"
                className="group flex items-center gap-4"
              >
                <span className="rounded-lg border border-[#9F5937]/40 bg-[#9F5937]/10 p-2.5 text-orange-200">
                  <Mail size={17} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                    Official Email
                  </span>
                  <span className="mt-0.5 block font-medium text-white transition-colors duration-200 group-hover:text-orange-200">
                    nextgenwebsolution08@gmail.com
                  </span>
                </span>
              </a>

              <div className="mt-7 flex items-center gap-4">
                <span className="rounded-lg border border-[#9F5937]/40 bg-[#9F5937]/10 p-2.5 text-orange-200">
                  <Clock size={17} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                    Availability
                  </span>
                  <span className="mt-0.5 block font-medium text-white">
                    Mon - Sat | Quick response within 24 hours
                  </span>
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="rounded-2xl border border-white/10 bg-[#1B1A18]/60 p-8 backdrop-blur-xl lg:p-10"
            >
              <h3 className="font-display text-xl font-bold tracking-tight text-white">
                Project Inquiry
              </h3>
              <p className="mt-1.5 text-sm text-gray-400">
                Fill this in and we&apos;ll reply within 24 hours.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cf-name" className="text-[13px] text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="cf-name"
                    data-testid="contact-form-name-input"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Aarav Sharma"
                    required
                    minLength={2}
                    className={FIELD}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cf-email" className="text-[13px] text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="cf-email"
                    data-testid="contact-form-email-input"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    required
                    className={FIELD}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cf-phone" className="text-[13px] text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="cf-phone"
                    data-testid="contact-form-phone-input"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91 98765 43210"
                    required
                    className={FIELD}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] text-gray-300">Service Required</Label>
                  <Select value={form.service} onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}>
                    <SelectTrigger
                      data-testid="contact-form-service-select"
                      className={`${FIELD} w-full`}
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#1B1A18] text-white">
                      {SERVICE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o} data-testid={`contact-form-service-option-${o.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cf-message" className="text-[13px] text-gray-300">
                    Project Brief / Message
                  </Label>
                  <Textarea
                    id="cf-message"
                    data-testid="contact-form-message-input"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us about your goals, timeline and budget range…"
                    required
                    minLength={10}
                    rows={5}
                    className="rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus-visible:ring-[#9F5937]"
                  />
                </div>
              </div>

              <button
                type="submit"
                data-testid="contact-form-submit-button"
                disabled={submitting}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9F5937] to-[#D2A078] px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Project Inquiry
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
