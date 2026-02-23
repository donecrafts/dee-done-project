import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import avatarImg from "@/assets/avatar.jpg";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src="/hero-video.mp4" />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex justify-center">
          <div className="animate-float rounded-full border-2 border-primary p-1 neon-glow-sm">
            <img src={avatarImg} alt="John Craft" className="h-28 w-28 rounded-full object-cover" />
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
          Full Stack Web App Developer
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
          Building Scalable <br />
          <span className="gradient-neon-text neon-text">Digital Experiences</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          I build scalable, performant, and beautifully designed modern web applications using cutting-edge technologies. Let's turn your vision into reality.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/projects" className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon)/0.4)] hover:scale-105">
            View Projects
          </Link>
          <Link to="/contact" className="rounded-xl border border-primary/40 bg-transparent px-8 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_30px_hsl(var(--neon)/0.2)] hover:scale-105">
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-muted-foreground/30 p-1">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
