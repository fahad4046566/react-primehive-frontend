// import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";


// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// });

import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' 

export default defineConfig({
   plugins: [tailwindcss(), react()],
  // eslint-disable-next-line no-dupe-keys
  plugins: [react()],
  optimizeDeps: {
    disabled: true, // Vite ko automatic optimize karne se rokay ga
    noDiscovery: true // Naye packages ki auto-discovery band karega
  }
})
