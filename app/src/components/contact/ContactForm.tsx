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
        <div className="form-container">
            <form id="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                />

                {phoneError && <div className="form-error">{phoneError}</div>}

                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />

                <label htmlFor="message">Message:</label>

                <div className={charCount >= maxLength * 0.9 ? 'char-counter warning' : 'char-counter'}>
                    {charCount} / {maxLength} characters
                </div>

                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={maxLength}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    required
                />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send'}
                </button>
            </form>

            {responseMessage && (
                <div className={isError ? 'response-message error' : 'response-message success'}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
}