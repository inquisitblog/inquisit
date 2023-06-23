import { deployedUrl } from "@/lib/config"
import { defineConfig } from "unlighthouse"

export default defineConfig({
  site: deployedUrl,
  scanner: {
    device: "mobile",
  },
})
