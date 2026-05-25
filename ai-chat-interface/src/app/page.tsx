"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type PersistedMessage = {
  role: ChatRole;
  content: string;
};

type ChatMessage = PersistedMessage & {
  id: string;
  createdAt: number;
};

type TokenMetrics = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  requestCount: number;
  lastResponseMs: number | null;
  totalResponseMs: number;
  model: string;
};

type GroqCompletionResponse = {
  model?: string;
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  error?: {
    message?: string;
  };
};

const STORAGE_KEY = "clarity-ai-chat-history-v1";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

const INITIAL_METRICS: TokenMetrics = {
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
  requestCount: 0,
  lastResponseMs: null,
  totalResponseMs: 0,
  model: DEFAULT_MODEL,
};

const createMessage = (role: ChatRole, content: string): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  createdAt: Date.now(),
});

const loadStoredMessages = (): ChatMessage[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as PersistedMessage[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string" &&
          item.content.trim().length > 0,
      )
      .map((item) => createMessage(item.role, item.content));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<TokenMetrics>(INITIAL_METRICS);
  const [hasHydrated, setHasHydrated] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GROK_API_KEY;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMessages(loadStoredMessages());
      setHasHydrated(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const payload: PersistedMessage[] = messages.map(({ role, content }) => ({ role, content }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [hasHydrated, messages]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const averageResponseMs = useMemo(() => {
    if (metrics.requestCount === 0) {
      return null;
    }

    return Math.round(metrics.totalResponseMs / metrics.requestCount);
  }, [metrics.totalResponseMs, metrics.requestCount]);

  const handleClearConversation = () => {
    setMessages([]);
    setInput("");
    setError(null);
    setIsLoading(false);
    setMetrics(INITIAL_METRICS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSendMessage = async () => {
    const cleanInput = input.trim();
    if (!cleanInput || isLoading) {
      return;
    }

    if (!apiKey) {
      setError("Missing NEXT_PUBLIC_GROK_API_KEY. Add it to your environment variables.");
      return;
    }

    const userMessage = createMessage("user", cleanInput);
    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setInput("");
    setError(null);
    setIsLoading(true);

    const startedAt = performance.now();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          messages: nextHistory.map(({ role, content }) => ({ role, content })),
          temperature: 0.6,
        }),
      });

      const data = (await response.json()) as GroqCompletionResponse;

      if (!response.ok) {
        const reason = data.error?.message ?? `Request failed with status ${response.status}.`;
        throw new Error(reason);
      }

      const assistantText = data.choices?.[0]?.message?.content?.trim();
      if (!assistantText) {
        throw new Error("The model returned an empty answer. Please try again.");
      }

      setMessages((prev) => [...prev, createMessage("assistant", assistantText)]);

      const promptTokens = data.usage?.prompt_tokens ?? 0;
      const completionTokens = data.usage?.completion_tokens ?? 0;
      const totalTokens = data.usage?.total_tokens ?? promptTokens + completionTokens;
      const elapsedMs = Math.max(1, Math.round(performance.now() - startedAt));

      setMetrics((prev) => ({
        promptTokens: prev.promptTokens + promptTokens,
        completionTokens: prev.completionTokens + completionTokens,
        totalTokens: prev.totalTokens + totalTokens,
        requestCount: prev.requestCount + 1,
        lastResponseMs: elapsedMs,
        totalResponseMs: prev.totalResponseMs + elapsedMs,
        model: data.model || prev.model,
      }));
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Unexpected network error.";
      setError(`Unable to get a response: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#152956_0%,#0b1632_45%,#061029_100%)] text-[#dbe6ff]">
      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_360px] lg:p-6">
        <main className="flex min-h-[80vh] flex-col overflow-hidden rounded-2xl border border-[#314d7d] bg-[#071432]/90">
          <header className="flex flex-wrap items-center gap-3 border-b border-[#2b3e64]/80 px-5 py-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#6cc9ff]">Neural Core</p>
              <h1 className="text-2xl font-semibold tracking-tight text-[#d7e4ff]">CLARITY_AI Chat</h1>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full border border-[#3f5f90] bg-[#102349] px-4 py-1.5 font-mono text-xs text-[#cde0ff]">
              Total Session Tokens: {metrics.totalTokens.toLocaleString()}
            </div>
            <button
              type="button"
              onClick={handleClearConversation}
              className="rounded-md border border-[#4f668f] bg-[#1b2e57] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#d2e2ff] transition hover:bg-[#264071]"
            >
              Clear Conversation
            </button>
          </header>

          <section className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-[#2f4b78] bg-[#0f2047]/80 p-5 text-[#d4e5ff]">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#65d9ff]">System Ready</p>
                <p className="mt-3 text-sm leading-relaxed sm:text-base">
                  Ask anything about token strategy, model behavior, or implementation details. Full conversation history is
                  sent on each request.
                </p>
              </div>
            )}

            <div className="mt-4 space-y-4">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <article key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[90%] rounded-2xl border px-4 py-3 text-sm leading-relaxed sm:max-w-[80%] sm:text-base ${
                        isUser
                          ? "border-[#4b648f] bg-[#2a3658] text-[#dce7ff]"
                          : "border-[#325381] bg-[#101f45] text-[#e4eeff]"
                      }`}
                    >
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#82c6ff]">
                        {isUser ? "You" : "Assistant"}
                      </p>
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                  </article>
                );
              })}

              {isLoading && (
                <article className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl border border-[#325381] bg-[#101f45] px-4 py-3 text-sm text-[#d7e8ff] sm:max-w-[80%] sm:text-base">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#82c6ff]">Assistant</p>
                    <p>Thinking...</p>
                  </div>
                </article>
              )}

              <div ref={endOfMessagesRef} />
            </div>
          </section>

          <footer className="border-t border-[#2b3e64]/80 px-4 py-4 sm:px-6">
            {error && (
              <div className="mb-3 rounded-lg border border-[#9b4b5f] bg-[#3d1926] px-3 py-2 text-sm text-[#ffd8de]">
                {error}
              </div>
            )}

            <div className="rounded-xl border border-[#425c84] bg-[#131f42] p-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void handleSendMessage();
                  }
                }}
                className="h-28 w-full resize-none bg-transparent text-sm text-[#dce8ff] outline-none placeholder:text-[#95abd3] sm:text-base"
                placeholder="Describe your AI request here..."
                disabled={isLoading}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ca8d6]">
                  Enter to send, Shift+Enter for newline
                </p>
                <button
                  type="button"
                  onClick={() => {
                    void handleSendMessage();
                  }}
                  disabled={isLoading || input.trim().length === 0}
                  className="h-11 min-w-[170px] rounded-xl border border-[#48f1ff]/70 bg-[#1adcf8] px-6 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#082847] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Prompt"}
                </button>
              </div>
            </div>
          </footer>
        </main>

        <aside className="rounded-2xl border border-[#314d7d] bg-[#0c1738]/95 p-5">
          <div className="space-y-5">
            <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-[#9ec6ff]">Token Metrics</h2>

            <section className="rounded-xl border border-[#3d5a86] bg-[#101f42] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#bcd1f5]">Prompt Tokens</p>
              <p className="mt-2 text-3xl font-semibold text-[#e0ebff]">{metrics.promptTokens.toLocaleString()}</p>
            </section>

            <section className="rounded-xl border border-[#3d5a86] bg-[#101f42] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#bcd1f5]">Completion Tokens</p>
              <p className="mt-2 text-3xl font-semibold text-[#e0ebff]">{metrics.completionTokens.toLocaleString()}</p>
            </section>

            <section className="rounded-xl border border-[#3d5a86] bg-[#101f42] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#bcd1f5]">Total Tokens</p>
              <p className="mt-2 text-3xl font-semibold text-[#e0ebff]">{metrics.totalTokens.toLocaleString()}</p>
            </section>

            <section className="rounded-xl border border-[#3d5a86] bg-[#101f42] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#bcd1f5]">Additional Metrics</p>
              <div className="mt-3 space-y-2 text-sm text-[#d4e4ff]">
                <p>
                  Model: <span className="text-[#79e8ff]">{metrics.model}</span>
                </p>
                <p>
                  Last Response Time: <span className="text-[#79e8ff]">{metrics.lastResponseMs ?? "-"} ms</span>
                </p>
                <p>
                  Requests Completed: <span className="text-[#79e8ff]">{metrics.requestCount}</span>
                </p>
                <p>
                  Avg ms/request: <span className="text-[#79e8ff]">{averageResponseMs ?? "-"}</span>
                </p>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}
