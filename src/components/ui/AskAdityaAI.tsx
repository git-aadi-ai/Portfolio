import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, AlertCircle, RefreshCw, ChevronRight, Calendar, Mail, ArrowUpRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp?: string;
  isAppointmentIntent?: boolean;
}

const APPOINTMENT_RECIPIENT = '2k24.csai1a.2412094@gmail.com';
const APPOINTMENT_SUBJECT = 'Appointment Request — Aditya Kumar Jha';
const APPOINTMENT_BODY = `Hello Aditya,

I would like to schedule a meeting with you.

Preferred date:
Preferred time:
Purpose / discussion:

Regards,`;

const APPOINTMENT_MAILTO = `mailto:${APPOINTMENT_RECIPIENT}?subject=${encodeURIComponent(
  APPOINTMENT_SUBJECT
)}&body=${encodeURIComponent(APPOINTMENT_BODY)}`;

const SUGGESTED_QUESTIONS = [
  'Tell me about Aditya',
  'Book an appointment with Aditya',
  'What is IntervuIQ?',
  "What are Aditya's strongest skills?",
  'Tell me about his patent',
  'What projects has Aditya built?',
  'Is Aditya open to opportunities?',
];

function checkClientAppointmentIntent(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  const keywords = [
    'appointment',
    'schedule',
    'meeting',
    'meet with',
    'book',
    'call with',
    'arrange a call',
    'hire',
    'hiring',
    'collaborat',
    'work with',
    'discuss a project',
    'connect with',
    'interview',
  ];
  return keywords.some((kw) => lower.includes(kw));
}

export const AskAdityaAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const query = (questionText || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setErrorMessage(null);
    setIsLoading(true);

    const clientIntentDetected = checkClientAppointmentIntent(query);

    try {
      // Build history payload for contextual follow-up questions
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to reach AI service.');
      }

      const isAppt = Boolean(
        data.isAppointmentIntent ||
          clientIntentDetected ||
          checkClientAppointmentIntent(data.answer || '')
      );

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text:
          data.answer ||
          (isAppt
            ? "Absolutely! You can send Aditya an appointment request directly by email. Include your preferred date, time, and what you'd like to discuss."
            : "I don't have verified information about that yet. You can contact Aditya directly to know more."),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAppointmentIntent: isAppt,
      };

      setMessages([...newMessages, modelMessage]);
    } catch (err: any) {
      console.error('Ask Aditya AI Error:', err);
      if (clientIntentDetected) {
        // Fallback for appointment request if server is busy
        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text:
            "Absolutely! You can send Aditya an appointment request directly by email. Include your preferred date, time, and what you'd like to discuss.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAppointmentIntent: true,
        };
        setMessages([...newMessages, modelMessage]);
      } else {
        setErrorMessage('The AI assistant is temporarily busy. Please try again or reach out directly to Aditya via email.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setErrorMessage(null);
    setInput('');
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden flex flex-col h-[560px] max-h-[85vh]">
      {/* Header HUD */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-body text-xs font-bold text-cyan-400 uppercase tracking-widest">
                ASK ABOUT ADITYA
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-code text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                GEMINI AI
              </span>
            </div>
            <p className="text-slate-400 text-xs font-body">
              Curious about my work, projects, skills or experience?
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleResetChat}
            data-cursor="pointer"
            title="Reset Chat"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-code text-[11px]">Clear</span>
          </button>
        )}
      </div>

      {/* Message History Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 min-h-0 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center py-2">
            <div className="text-center mb-5">
              <div className="w-10 h-10 mx-auto mb-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <p className="text-sm font-body text-slate-300 font-medium">
                Ask anything about Aditya’s engineering journey
              </p>
              <p className="text-xs font-body text-slate-500 mt-0.5">
                Pick a suggested query below or type your own question
              </p>
            </div>

            {/* Suggested Prompt Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto w-full">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  data-cursor="pointer"
                  className="p-2.5 px-3.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-left transition-all text-xs font-body text-slate-300 hover:text-cyan-200 flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm font-body leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-400/30 text-slate-100 rounded-tr-sm'
                      : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {/* Inline Request Appointment Card */}
                  {m.role === 'model' && m.isAppointmentIntent && (
                    <div className="mt-3.5 pt-3.5 border-t border-cyan-500/20">
                      <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/30 space-y-2.5">
                        <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Direct Meeting Request</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug font-body">
                          Send an email request to Aditya's inbox with your preferred date, time, and topic:
                        </p>
                        <a
                          href={APPOINTMENT_MAILTO}
                          data-cursor="pointer"
                          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-body font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>REQUEST APPOINTMENT</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <div className="text-[10px] font-code text-slate-400 text-center flex items-center justify-center gap-1">
                          <span>Recipient:</span>
                          <span className="text-cyan-300">{APPOINTMENT_RECIPIENT}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {m.timestamp && (
                    <span className="block text-[10px] font-code text-slate-500 mt-1.5 text-right">
                      {m.timestamp}
                    </span>
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Thinking indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm p-3.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs font-code text-slate-400 ml-1">Analyzing verified portfolio data...</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Error state */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-body flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p>{errorMessage}</p>
              <button
                onClick={() => handleSend(messages[messages.length - 1]?.text)}
                className="mt-1 text-[11px] font-semibold text-rose-200 underline hover:text-white"
              >
                Retry last prompt
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips row during ongoing conversation */}
      {messages.length > 0 && !isLoading && (
        <div className="py-2 flex gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
          {SUGGESTED_QUESTIONS.filter((q) => !messages.some((m) => m.text === q))
            .slice(0, 3)
            .map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                data-cursor="pointer"
                className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-[11px] font-body text-slate-400 hover:text-cyan-200 whitespace-nowrap transition-all"
              >
                {q}
              </button>
            ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="mt-3 pt-3 border-t border-white/10 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask about skills, projects, patent, DSA, or meeting..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-body text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            data-cursor="pointer"
            className="px-4 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-body font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-30 disabled:hover:bg-cyan-400 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
