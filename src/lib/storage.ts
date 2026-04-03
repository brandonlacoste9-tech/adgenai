// In-memory storage for Vercel serverless
// NOTE: Data resets on cold starts — this is a demo/prototype pattern.
// For production, swap with a database (Vercel Postgres, Supabase, etc.)

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

export interface GitHubToken {
  id: string;
  accessToken: string;
  username: string;
  avatarUrl: string;
  createdAt: string;
}

class MemoryStorage {
  private sessions: Map<string, Session> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private versions: Map<string, CodeVersion[]> = new Map();
  private githubToken: GitHubToken | null = null;

  // Sessions
  getSessions(): Session[] {
    return Array.from(this.sessions.values()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  getSession(id: string): Session | undefined {
    return this.sessions.get(id);
  }

  createSession(data: { id: string; title?: string; model?: string }): Session {
    const now = new Date().toISOString();
    const session: Session = {
      id: data.id,
      title: data.title || "New chat",
      starred: false,
      model: data.model || "claude-sonnet",
      createdAt: now,
      updatedAt: now,
    };
    this.sessions.set(data.id, session);
    this.messages.set(data.id, []);
    this.versions.set(data.id, []);
    return session;
  }

  updateSession(id: string, data: Partial<Session>): Session | null {
    const session = this.sessions.get(id);
    if (!session) return null;
    const updated = { ...session, ...data, updatedAt: new Date().toISOString() };
    this.sessions.set(id, updated);
    return updated;
  }

  deleteSession(id: string): void {
    this.sessions.delete(id);
    this.messages.delete(id);
    this.versions.delete(id);
  }

  // Messages
  getMessages(sessionId: string): Message[] {
    return this.messages.get(sessionId) || [];
  }

  createMessage(data: { id: string; sessionId: string; role: "user" | "assistant"; content: string }): Message {
    const message: Message = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    const msgs = this.messages.get(data.sessionId) || [];
    msgs.push(message);
    this.messages.set(data.sessionId, msgs);
    return message;
  }

  // Code versions
  getVersions(sessionId: string): CodeVersion[] {
    return this.versions.get(sessionId) || [];
  }

  createVersion(data: { id: string; sessionId: string; code: string; title: string; language?: string }): CodeVersion {
    const version: CodeVersion = {
      ...data,
      language: data.language || "tsx",
      createdAt: new Date().toISOString(),
    };
    const vers = this.versions.get(data.sessionId) || [];
    vers.push(version);
    this.versions.set(data.sessionId, vers);
    return version;
  }

  updateVersion(sessionId: string, versionId: string, data: { code: string }): CodeVersion | null {
    const vers = this.versions.get(sessionId);
    if (!vers) return null;
    const idx = vers.findIndex((v) => v.id === versionId);
    if (idx === -1) return null;
    vers[idx] = { ...vers[idx], ...data };
    this.versions.set(sessionId, vers);
    return vers[idx];
  }

  // GitHub
  getGitHubToken(): GitHubToken | null {
    return this.githubToken;
  }

  setGitHubToken(token: GitHubToken): void {
    this.githubToken = token;
  }

  clearGitHubToken(): void {
    this.githubToken = null;
  }
}

// Global singleton (persists across hot reloads in dev, resets on cold start in prod)
const globalForStorage = globalThis as unknown as { storage: MemoryStorage };
export const storage = globalForStorage.storage || new MemoryStorage();
if (process.env.NODE_ENV !== "production") globalForStorage.storage = storage;
