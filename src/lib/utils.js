import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";  //intelligently merges Tailwind CSS classes and resolves conflicts

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
