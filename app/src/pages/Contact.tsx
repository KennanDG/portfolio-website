import { ContactForm } from '../components/contact/ContactForm';

export const ContactPage = () => {
    return (
        <section className="page contact-page">
            <h1 className="page-title">Contact Me</h1>

            <div className="contact-container">
                <div className="hello-message">
                    <h2>Hi There!</h2>
                    <p>
                        Looking to hire? Need some help on your next project? Please fill out the form
                        or connect with me on LinkedIn and I’ll get back to you as soon as I can.
                    </p>

                    <div className="social-icons">
                        
                        <a href="https://github.com/KennanDG/portfolio-website" target="_blank" rel="noreferrer">
                            GitHub
                        </a>

                        <a href="https://www.linkedin.com/in/kennan-gauthier-021643186" target="_blank" rel="noreferrer">
                            LinkedIn
                        </a>
                    
                    </div>
                </div>

                <ContactForm />
            </div>
        </section>
    );
}