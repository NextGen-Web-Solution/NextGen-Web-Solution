import { Mail, Phone, Instagram } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Logo } from "@/components/Logo";
import { scrollToId } from "@/lib/scroll";

const QUICK_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Process", id: "process" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.07] bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
            NextGen Web Solutions - Crafting future-ready digital experiences.
          </p>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Transforming Ideas into Scalable Web Solutions.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/next_gen_web.solution"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram-link"
              aria-label="NextGen Web Solutions on Instagram"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition-colors duration-200 hover:border-[#9F5937]/50 hover:text-orange-200"
            >
              <Instagram size={17} className="transition-transform duration-300 group-hover:scale-110" />
            </a>
            <span className="text-sm text-gray-500">Follow us on Instagram</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Quick Links
          </p>
          <ul className="mt-5 space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  data-testid={`footer-link-${l.id}`}
                  onClick={() => scrollToId(l.id)}
                  className="text-sm text-gray-300 transition-colors duration-200 hover:text-orange-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Get in Touch
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="mailto:nextgenwebsolution08@gmail.com"
                data-testid="footer-email-link"
                className="inline-flex items-center gap-2.5 text-sm text-gray-300 transition-colors duration-200 hover:text-orange-200"
              >
                <Mail size={15} className="text-orange-200" />
                nextgenwebsolution08@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:7706903395"
                data-testid="footer-phone-link"
                className="inline-flex items-center gap-2.5 text-sm text-gray-300 transition-colors duration-200 hover:text-orange-200"
              >
                <Phone size={15} className="text-orange-200" />
                +91 7706903395
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/917705982331"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-link"
                className="inline-flex items-center gap-2.5 text-sm text-gray-300 transition-colors duration-200 hover:text-orange-200"
              >
                <WhatsAppIcon size={15} className="text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07] py-6">
        <p className="text-center text-sm text-gray-500">
          © {year} NextGen Web Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
