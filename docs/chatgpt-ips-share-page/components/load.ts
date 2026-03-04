import fs from "node:fs";
import path from "node:path";

export function loadJsonOrNull<T>(relPath: string): T | null {
  try {
    const p = path.join(process.cwd(), relPath);
    const raw = fs.readFileSync(p, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
