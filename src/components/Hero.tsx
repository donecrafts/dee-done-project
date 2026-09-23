import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BRAND_LOGO, BRAND_NAME } from "@/config/brand";
import ProjectPhonesBackground from "@/components/ProjectPhonesBackground";
import { HERO_TAGLINE } from "@/config/brand-copy";

/** Home hero — scrolling project phones background (same style as welcome screen). */
const Hero = () => {
  return (
    <section className="hero-fixed relative z-10 flex min-h-screen items-center justify-center overflow-hidden">
      <ProjectPhonesBackground />

      <div className="hero-over-video relative z-10 container mx-auto px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <motion.img
            src={BRAND_LOGO}
            alt={`${BRAND_NAME} logo`}
            className="h-24 w-24 object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)] md:h-28 md:w-28"
            animate={{ y: [0, -16, 0] }}
            transition={{ y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="hero-headline mb-4 text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-5xl lg:text-6xl"
        >
          {BRAND_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="hero-headline mx-auto mb-10 max-w-3xl text-base font-semibold leading-relaxed text-white drop-shadow-md md:text-lg lg:text-xl"
        >
          {HERO_TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/contact"
            className="rounded-xl bg-white px-8 py-3 font-semibold text-[hsl(345_80%_30%)] shadow-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:scale-[1.02]"
          >
            Hire me
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
          >
            View My Portfolio
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
          <Link
            to="/#projects"
            className="text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Explore featured projects →
          </Link>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/75">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-white/35 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-white"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
