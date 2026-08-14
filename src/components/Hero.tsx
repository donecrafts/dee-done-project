import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HERO_BACKGROUND_VIDEO } from "@/config/videos";
import { BRAND_LOGO } from "@/config/brand";

/** Hero is fixed on video — not affected by site theme toggle. */
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked until interaction */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => video.removeEventListener("loadeddata", play);
  }, []);

  return (
    <section className="hero-fixed relative z-10 flex min-h-screen items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        {...({ fetchPriority: "high" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={HERO_BACKGROUND_VIDEO}
        aria-hidden
      />

      <div className="absolute inset-0 z-[1] bg-black/40 backdrop-blur-[2px]" />
      <div
        className="absolute inset-0 z-[1] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="hero-over-video relative z-10 container mx-auto px-6 py-28 text-center text-[hsl(345_80%_30%)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <motion.img
            src={BRAND_LOGO}
            alt="Samuel John logo"
            className="h-24 w-24 object-contain drop-shadow-[0_8px_32px_rgba(59,130,246,0.45)] md:h-28 md:w-28"
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
          Samuel John
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="hero-headline mx-auto mb-10 max-w-3xl text-base font-semibold leading-relaxed text-white drop-shadow-md md:text-lg lg:text-xl"
        >
          Python and AI Developer Building Smart Solutions
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />
                Download CV
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass-strong rounded-2xl border-primary/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">Download CV</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Would you like to download Samuel John&apos;s resume as a PDF?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl border-border">Cancel</AlertDialogCancel>
                <AlertDialogAction className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Download PDF
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
