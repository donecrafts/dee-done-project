import { useScrollProgress } from "@/hooks/use-scroll-progress";

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
};

export default ScrollProgress;
