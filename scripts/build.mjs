import { cp, mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
const root = process.cwd();
const destination = join(root, "dist");
await rm(destination, { recursive: true, force: true });
await mkdir(join(destination, "assets"), { recursive: true });
await cp(join(root, "src", "index.html"), join(destination, "index.html"));
await cp(join(root, "src", "styles.css"), join(destination, "assets", "styles.css"));
await cp(join(root, "src", "main.js"), join(destination, "assets", "main.js"));
await cp(join(root, "public"), destination, { recursive: true });
for (const file of ["index.html","assets/styles.css","assets/main.js","favicon.svg","og-image.svg","robots.txt","sitemap.xml","_headers"]) {
  const item = await stat(join(destination, file));
  if (!item.isFile() || item.size === 0) throw new Error("Missing static output: " + file);
}
console.log("Static production build completed: dist/");
