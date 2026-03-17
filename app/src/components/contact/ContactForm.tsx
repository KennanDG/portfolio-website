import { useMemo, useState } from 'react';

type ContactFormState = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

const initialState: ContactFormState = {
    name: '',
    phone: '',
    email: '',
    message: '',
};

export const ContactForm = () => {
    const [form, setForm] = useState<ContactFormState>(initialState);
    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxLength = 1000;
    const charCount = form.message.length;

    const phoneError = useMemo(() => {
        const pattern = /^\+?[0-9]{1,4}?[-.\s()]*[0-9]+$/;

        if (!form.phone) return '';

        return pattern.test(form.phone) ? '' : 'Invalid phone number format';

    }, [form.phone]);


    const inputClasses ='w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20';


    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (phoneError) {
            setIsError(true);
            setResponseMessage('Please fix the phone number format.');
            return;
        }

        setIsSubmitting(true);
        setResponseMessage('');
        setIsError(false);

        try {
            const response = await fetch('/api/contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong.');
            }

            setIsError(false);
            setResponseMessage(result.message || 'Message sent.');
            setForm(initialState);
        } catch (error) {
            setIsError(true);
            setResponseMessage(error instanceof Error ? error.message : 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-200">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className={inputClasses}
                    placeholder="Your name"
                    required
                />
                </div>

                <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-200">
                    Phone
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className={inputClasses}
                    required
                />
                {phoneError && (
                    <p className="text-sm text-rose-400">{phoneError}</p>
                )}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
                Email
                </label>
                <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className={inputClasses}
                placeholder="you@example.com"
                required
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-200">
                    Message
                </label>

                <span
                    className={`text-xs ${
                    charCount >= maxLength * 0.9 ? 'text-amber-400' : 'text-slate-400'
                    }`}
                >
                    {charCount} / {maxLength}
                </span>
                </div>

                <textarea
                id="message"
                name="message"
                rows={7}
                maxLength={maxLength}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className={`${inputClasses} min-h-45 resize-y`}
                placeholder="Tell me about your project..."
                required
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            </form>

            {responseMessage && (
            <div
                className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                isError
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                    : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                }`}
            >
                {responseMessage}
            </div>
            )}
        </div>
  );
};