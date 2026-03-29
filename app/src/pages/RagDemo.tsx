import { useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};



export const RagDemoPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        "Hello! this is a live demo of my RAG pipeline. Ask a question and I'll return a grounded response from the API.",
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const canSubmit = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const question = input.trim();
    if (!question || isLoading) return;

    setError(null);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response from RAG API.');
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong while calling the RAG API.';

      setError(message);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'I ran into an error while trying to reach the RAG service. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="mx-auto flex min-h-[75vh] w-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 shadow-2xl backdrop-blur">
        <div className="text-center border-b border-slate-800 bg-linear-to-r from-slate-900 via-slate-900 to-teal-950/70 px-6 py-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Project Showcase
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            RAG API Demo
          </h1>
          <p className="text-center w-full mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            A simple chatbot-style frontend connected to my retrieval-augmented generation pipeline.
            This demo sends user questions to a backend proxy, which securely calls the live RAG API
            and renders the answer in markdown.
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={[
                  'max-w-[90%] rounded-2xl px-4 py-3 shadow-lg sm:max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-teal-500 text-slate-950'
                    : 'border border-slate-800 bg-slate-900 text-slate-100',
                ].join(' ')}
              >
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap text-sm font-medium leading-7 sm:text-base">
                    {message.content}
                  </p>
                ) : (
                  <div className="prose prose-invert max-w-none prose-p:leading-7 prose-pre:overflow-x-auto prose-code:text-cyan-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 shadow-lg">
                Thinking...
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-800 bg-rose-950/40 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 sm:px-6 lg:px-8">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="rag-question" className="sr-only">
              Ask a question
            </label>

            <textarea
              id="rag-question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something about robotics, AI, or software engineering..."
              rows={1}
              className="min-h-14 flex-1 resize-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 sm:text-base"
            />

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};