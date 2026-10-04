import { MetadataRoute } from "next";
import { DEVELOPER_INFO } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DEVELOPER_INFO.name} — Full Stack Developer Portfolio`,
    short_name: DEVELOPER_INFO.name,
    description: DEVELOPER_INFO.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#020814",
    theme_color: "#020814",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
