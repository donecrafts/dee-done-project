export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  /** Omit or leave empty to show initials fallback only. */
  image?: string;
  /** Optional Tailwind classes for the initials fallback (e.g. brand-colored circle). */
  avatarFallbackClassName?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "owen_aroberts",
    role: "Australia · $600–$800 · 2 weeks",
    quote:
      "John is fantastic, he's passionate patient and very knowledgeable he has helped me on a recent project and I couldn't recommend him more!",
    initials: "O",
    image:
      "https://images.unsplash.com/photo-1544727635-3fb6469f5a39?w=128&h=128&fit=crop&crop=faces&q=80",
    avatarFallbackClassName: "bg-pink-100 text-lg font-semibold text-pink-700",
  },
  {
    name: "freshhorizons",
    role: "United States · $50–$100 · 1 day",
    quote: "It was a great experience working with John.",
    initials: "FH",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=faces&q=80",
  },
  {
    name: "uzayaltiner",
    role: "Turkey · $50–$100 · 1 day",
    quote:
      "John resolved my problem very quickly and explained everything I needed to know in detail.",
    initials: "u",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=128&h=128&fit=crop&crop=faces&q=80",
    avatarFallbackClassName: "bg-zinc-200 text-lg font-semibold text-zinc-950 dark:bg-zinc-600 dark:text-zinc-50",
  },
  {
    name: "danou20",
    role: "Israel · Repeat client · $100–$200 · 1 day",
    quote:
      "John is an incredibly professional person I recommend him without hesitation. Clear communication and delivery exactly as promised.",
    initials: "D",
    image:
      "https://images.unsplash.com/photo-1545167622-3a6f238d33d7?w=128&h=128&fit=crop&crop=faces&q=80",
  },
  {
    name: "kedlohou",
    role: "Senegal · Repeat client · Up to $50 · 4 days",
    quote:
      "Thank you, John we've been working together for two years now, and your work is always professional. Reliable every time.",
    initials: "K",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=faces&q=80",
  },
  {
    name: "fisher889",
    role: "United Arab Emirates · Repeat client · Up to $50 · 1 day",
    quote:
      "Excellent experience working with John. Communication was clear and timely throughout the project, and the work was delivered bug-free with great attention to detail. John demonstrated a deep understanding of the requirements and even went above and beyond by suggesting improvements that enhanced the final result. Very professional and reliable. Highly recommended, and I would definitely work with John again.",
    initials: "FI",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=faces&q=80",
  },
];
