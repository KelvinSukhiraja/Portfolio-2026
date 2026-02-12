interface ContactSectionProps {
  email: string;
}

export function ContactSection({ email }: ContactSectionProps) {
  return (
    <section id="contact" className="section pb-24">
      <div className="container-page">
        <h2 className="section-title">Contact</h2>
        <p className="section-intro max-w-2xl">
          Want to collaborate or discuss an opportunity? Reach out and I will
          get back to you soon.
        </p>

        <a href={`mailto:${email}`} className="btn btn-primary mt-8">
          {email}
        </a>
      </div>
    </section>
  );
}
