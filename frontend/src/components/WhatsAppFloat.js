import { motion } from "framer-motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/917705982331"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-button"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.45, type: "spring", bounce: 0.45 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3"
    >
      <span className="glass pointer-events-none hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsAppIcon size={26} className="relative" />
      </span>
    </motion.a>
  );
}
