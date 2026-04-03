export interface Session {
  id: string;
  title: string;
  starred: boolean;
  model: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface CodeVersion {
  id: string;
  sessionId: string;
  code: string;
  title: string;
  language: string;
  createdAt: string;
}

export interface GitHubStatus {
  connected: boolean;
  username?: string;
  avatarUrl?: string;
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  private: boolean;
  defaultBranch: string;
  updatedAt: string;
  description: string | null;
  url: string;
}

export interface AppSettings {
  model: string;
  temperature: number;
  sidebarCollapsed: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  model: "claude-sonnet",
  temperature: 0.7,
  sidebarCollapsed: false,
};

export const MODELS = [
  { value: "claude-sonnet", label: "Claude Sonnet 4.6", description: "Balanced speed and quality" },
  { value: "claude-haiku", label: "Claude Haiku 4.5", description: "Fast and efficient" },
  { value: "claude-opus", label: "Claude Opus 4.6", description: "Most capable" },
  { value: "gpt-5-mini", label: "GPT-5 Mini", description: "Fast, affordable" },
  { value: "gpt-5", label: "GPT-5", description: "Most powerful GPT" },
  { value: "gemini-flash", label: "Gemini 3 Flash", description: "Ultra fast" },
  { value: "gemini-pro", label: "Gemini 3.1 Pro", description: "High quality" },
] as const;

export const PROMPT_TEMPLATES = [
  { label: "Landing Page", prompt: "Build a modern SaaS landing page with hero section, features grid, pricing cards, and footer", icon: "layout" },
  { label: "Dashboard", prompt: "Create an analytics dashboard with stat cards, a line chart, a bar chart, and a recent activity table", icon: "chart" },
  { label: "Login Form", prompt: "Design a sleek login form with email, password, social login buttons, and forgot password link", icon: "lock" },
  { label: "E-Commerce Card", prompt: "Build a product card with image, rating stars, price, add-to-cart button, and wishlist toggle", icon: "shopping" },
  { label: "Chat Interface", prompt: "Create a messaging UI with conversation list sidebar, message bubbles, typing indicator, and input field", icon: "message" },
  { label: "Settings Page", prompt: "Build a settings page with profile section, notification toggles, theme selector, and account management", icon: "settings" },
  { label: "Kanban Board", prompt: "Design a Kanban board with draggable cards across To Do, In Progress, and Done columns", icon: "columns" },
  { label: "Pricing Table", prompt: "Create a pricing comparison table with 3 tiers, feature checkmarks, and highlighted recommended plan", icon: "dollar" },
  { label: "File Manager", prompt: "Build a file manager UI with folder tree, file grid/list toggle, breadcrumbs, and upload area", icon: "folder" },
  { label: "Music Player", prompt: "Design a music player with album art, progress bar, play/pause/skip controls, and playlist queue", icon: "music" },
  { label: "Calendar", prompt: "Create a calendar view with month grid, event indicators, day detail panel, and event creation form", icon: "calendar" },
  { label: "Portfolio", prompt: "Build a portfolio showcase with project cards, filter tabs, lightbox preview, and contact section", icon: "grid" },
] as const;
