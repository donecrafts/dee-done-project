interface VideoBackgroundProps {
  src: string;
}

const VideoBackground = ({ src }: VideoBackgroundProps) => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
      />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
};

export default VideoBackground;
