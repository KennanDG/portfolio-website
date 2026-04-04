import { useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';
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
      content: `Hi! This is a live demo of my custom **Retrieval-Augmented Generation (RAG)** pipeline.

## Here is how the architecture works under the hood:
1. **Ingestion**: Documents (like text or PDFs) are embedded into deterministic chunks using a Jina AI embedding model.
2. **Storage**: Embeddings are stored in a **Qdrant** vector database, while AWS S3 buckets acts as the source of truth for metadata and ensures idempotency by using a DynamoDB lock table.
3. **Retrieval**: When you ask a question, the pipeline searches Qdrant for the most relevant context.
4. **Generation**: An agent powered by LangGraph uses *only* that retrieved context to generate a grounded, accurate answer.

Ask me anything about robotics, AI, or software engineering!`
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

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

      console.log('AI response: ', data.answer);
      console.log('meta:', data.meta);

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

      console.log(err);

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



  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default new line behavior
      if (canSubmit && formRef.current) {
        // Trigger native form submission
        formRef.current.requestSubmit();
      }
    }
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
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
                  // <div className="prose prose-invert max-w-none prose-p:leading-7 prose-pre:overflow-x-auto prose-code:text-cyan-300">
                  //   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  //     {message.content}
                  //   </ReactMarkdown>
                  // </div>
                  <div className="w-full">
                    <Markdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Headings
                        h1: ({node, ...props}) => <h1 className="mt-6 mb-4 text-2xl font-bold text-cyan-300" {...props} />,
                        h2: ({node, ...props}) => <h2 className="mt-5 mb-3 text-xl font-bold text-cyan-300" {...props} />,
                        h3: ({node, ...props}) => <h3 className="mt-4 mb-2 text-lg font-bold text-cyan-300" {...props} />,
                        // Paragraphs
                        p: ({node, ...props}) => <p className="mb-4 leading-7 last:mb-0" {...props} />,
                        // Lists
                        ul: ({node, ...props}) => <ul className="mb-4 list-disc space-y-2 pl-6 marker:text-teal-500" {...props} />,
                        ol: ({node, ...props}) => <ol className="mb-4 list-decimal space-y-2 pl-6 marker:text-teal-500" {...props} />,
                        li: ({node, ...props}) => <li className="leading-7" {...props} />,
                        // Emphasis
                        strong: ({node, ...props}) => <strong className="font-semibold text-teal-400" {...props} />,
                        // Code blocks & inline code
                        code: ({node, className, children, ...props}: any) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !match && !className?.includes('language-');
                          return !isInline ? (
                            <pre className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          ) : (
                            <code className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-cyan-300" {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {message.content}
                    </Markdown>
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
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about robotics, AI, or software engineering..."
              rows={1}
              className="min-h-14 flex-1 resize-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 sm:text-base [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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