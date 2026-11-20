
import { useState } from "react";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import GlowButton from "../components/GlassButton";
import GlowIconLink from "../components/GlowIconLink";
import GlowContactLink from "../components/GlowContactLink";
import Reveal from "../animations/Reveal";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitStatus(null);
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      newErrors.message =
        "Your message must contain at least 10 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSending) return;

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus(null);
      return;
    }

    setIsSending(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/delaramfarzad9@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
            _subject: "New Portfolio Contact Message",
            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        (data.success !== true && data.success !== "true")
      ) {
        throw new Error(data.message || "Submission failed");
      }

      setSubmitStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSending(false);
    }
  }

  const inputStyles = `
    w-full rounded-xl border border-theme-border
    bg-white/80 px-4 py-3
    font-sora text-sm text-primary
    placeholder:text-subtle
    outline-none transition-all duration-300
    hover:border-accent/40
    focus:border-accent focus:ring-2 focus:ring-accent/15
    aria-invalid:border-rose-500
    dark:bg-white/5
  `;

  return (
    <section
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-6xl pt-2 pb-5 lg:py-10"
    >
      {/* 1. Page label */}
      <Reveal trigger="mount" delay={0} duration={0.7}>
        <p className="mb-4 font-sora text-sm tracking-widest text-accent">
          GET IN TOUCH
        </p>
      </Reveal>

      {/* 2. Heading */}
      <Reveal trigger="mount" delay={0.15} duration={0.8}>
        <h1
          id="contact-heading"
          className="font-alan text-4xl font-bold
                     text-primary sm:text-5xl"
        >
          Let's <span className="text-accent">Connect.</span>
        </h1>
      </Reveal>

      {/* 3. Introduction */}
      <Reveal trigger="mount" delay={0.3} duration={0.8}>
        <p className="mt-5 max-w-2xl font-sora leading-8 text-secondary">
          Have a project in mind or an opportunity to discuss?
          I'd love to hear from you.
        </p>
      </Reveal>

      {/* Contact layout */}
      <div className="mt-12 grid items-start gap-10 xl:grid-cols-2 xl:gap-12">
        {/* 4. Contact information */}
        <Reveal
          trigger="mount"
          delay={0.45}
          duration={0.85}
          distance={16}
          className="min-w-0"
        >
          <div className="flex min-w-0 flex-col gap-6">
            <div>
              <h2 className="font-alan text-2xl text-primary">
                Let's work together
              </h2>

              <p className="mt-4 max-w-md font-sora leading-8 text-secondary">
                I'm open to frontend development opportunities,
                collaborations, and creative projects.
              </p>
            </div>

            {/* Email and location */}
            <div className="max-w-[480px] space-y-4">
              <GlowContactLink
                href="mailto:delaramfarzad9@gmail.com"
                icon={<FiMail size={20} aria-hidden="true" />}
              >
                delaramfarzad9@gmail.com
              </GlowContactLink>

              {/* Location card */}
              <div
                className="flex items-center gap-4 rounded-2xl
                           border border-theme-border
                           bg-white/80 p-4
                           shadow-sm shadow-slate-900/5
                           backdrop-blur-md
                           transition-colors duration-300
                           dark:bg-white/5 dark:shadow-none"
              >
                <span
                  className="flex h-11 w-11 shrink-0
                             items-center justify-center
                             rounded-xl bg-violet-100
                             text-accent
                             dark:bg-violet-500/10"
                >
                  <FiMapPin size={20} aria-hidden="true" />
                </span>

                <span className="font-sora text-sm text-secondary">
                  Leamington Spa, UK
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-2">
              <GlowIconLink
                href="https://github.com/delaramfarzad9"
                label="Visit my GitHub profile"
              >
                <FaGithub size={23} aria-hidden="true" />
              </GlowIconLink>

              <GlowIconLink
                href="https://www.linkedin.com/in/delaram-farzad"
                label="Visit my LinkedIn profile"
              >
                <FaLinkedin size={23} aria-hidden="true" />
              </GlowIconLink>
            </div>
          </div>
        </Reveal>

        {/* 5. Contact form */}
        <Reveal
          trigger="mount"
          delay={0.6}
          duration={0.9}
          distance={18}
          className="w-full min-w-0 max-w-[480px] xl:justify-self-end"
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-busy={isSending}
            className="w-full min-w-0 space-y-5
                       rounded-3xl border border-theme-border
                       bg-white/85 p-6
                       shadow-xl shadow-slate-900/5
                       backdrop-blur-md
                       transition-colors duration-300
                       sm:p-8
                       dark:bg-white/5
                       dark:shadow-black/20"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block font-sora text-sm text-primary"
              >
                Name *
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "name-error" : undefined
                }
                className={inputStyles}
              />

              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-2 font-sora text-sm text-rose-600
                             dark:text-rose-400"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block font-sora text-sm text-primary"
              >
                Email *
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
                className={inputStyles}
              />

              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-2 font-sora text-sm text-rose-600
                             dark:text-rose-400"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block font-sora text-sm text-primary"
              >
                Message *
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                maxLength={1000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "message-error" : undefined
                }
                className={`${inputStyles} resize-y`}
              />

              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-2 font-sora text-sm text-rose-600
                             dark:text-rose-400"
                >
                  {errors.message}
                </p>
              )}

              <p className="mt-2 text-right font-sora text-xs text-subtle">
                {form.message.length}/1000
              </p>
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-2">
              <div className="w-full max-w-[300px]">
                <GlowButton
                  text={isSending ? "Sending..." : "Send Message"}
                  submit
                  wide
                />
              </div>
            </div>

            {/* Submission feedback */}
            {submitStatus === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-emerald-500/25
                           bg-emerald-50 px-4 py-4
                           text-center font-sora text-sm
                           text-emerald-800
                           dark:bg-emerald-500/10
                           dark:text-emerald-300"
              >
                Your message was sent successfully!
                I'll get back to you as soon as possible.
              </div>
            )}

            {submitStatus === "error" && (
              <div
                role="alert"
                className="rounded-xl border border-rose-500/25
                           bg-rose-50 px-4 py-4
                           text-center font-sora text-sm
                           text-rose-700
                           dark:bg-rose-500/10
                           dark:text-rose-300"
              >
                Sorry, your message couldn't be sent.
                Please try again or contact me by email.
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
