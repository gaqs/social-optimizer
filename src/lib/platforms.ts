// Fuente única de las redes soportadas; debe coincidir con el enum SocialPlatforms de Prisma.
export const PLATFORMS = [
  { id: "Instagram", label: "Instagram", icon: "/img/rrss/instagram.png" },
  { id: "Facebook", label: "Facebook", icon: "/img/rrss/facebook.png" },
  { id: "Tiktok", label: "Tiktok", icon: "/img/rrss/tiktok.png" },
  { id: "X", label: "X", icon: "/img/rrss/x.png" },
] as const;
