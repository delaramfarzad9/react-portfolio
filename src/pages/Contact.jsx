
import { useState } from "react";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import GlowButton from "../components/GlassButton";
import GlowIconLink from "../components/GlowIconLink";
import GlowContactLink from "../components/GlowContactLink";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

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

  function handleSubmit(e) {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    }
  }

  const inputStyles =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-sora text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20";

  return (
    <section
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-6xl py-8 lg:py-10"
    >
      {/* Heading */}
      <p className="mb-4 font-sora text-sm tracking-widest text-violet-300">
        GET IN TOUCH
      </p>

      <h1
        id="contact-heading"
        className="font-alan text-4xl font-bold text-slate-100 sm:text-5xl"
      >
        Let's <span className="text-violet-400">Connect.</span>
      </h1>

      <p className="mt-5 max-w-2xl font-sora leading-8 text-slate-300">
        Have a project in mind or an opportunity to discuss?
        I'd love to hear from you.
      </p>

      {/* Contact layout */}
      <div className="mt-12 grid items-start gap-10 xl:grid-cols-2 xl:gap-12">
        {/* Contact information */}
        <div className="flex min-w-0 flex-col gap-6">
          <div>
            <h2 className="font-alan text-2xl text-white">
              Let's work together
            </h2>

            <p className="mt-4 max-w-md font-sora leading-8 text-slate-300">
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

            <div
              className="flex items-center gap-4 rounded-2xl
                         border border-white/10 bg-white/5 p-4"
            >
              <span
                className="flex h-11 w-11 shrink-0
                           items-center justify-center
                           rounded-xl bg-violet-500/10
                           text-violet-400"
              >
                <FiMapPin size={20} aria-hidden="true" />
              </span>

              <span className="font-sora text-sm text-slate-300">
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

        {/* Contact form */}
        <form
          action="https://formsubmit.co/delaramfarzad9@gmail.com"
          method="POST"
          noValidate
          onSubmit={handleSubmit}
          className="w-full min-w-0 max-w-[480px]
                     justify-self-end space-y-5
                     rounded-3xl border border-white/15
                     bg-white/5 p-6 shadow-xl shadow-black/20
                     backdrop-blur-md sm:p-8"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block font-sora text-sm text-slate-200"
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
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputStyles}
            />

            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-rose-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block font-sora text-sm text-slate-200"
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
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputStyles}
            />

            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-rose-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block font-sora text-sm text-slate-200"
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
              <p id="message-error" className="mt-2 text-sm text-rose-400">
                {errors.message}
              </p>
            )}

            <p className="mt-2 text-right font-sora text-xs text-slate-400">
              {form.message.length}/1000
            </p>
          </div>

          {/* FormSubmit */}
          <input type="hidden" name="_captcha" value="false" />

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <div className="w-full max-w-[300px] [&>div]:w-full [&>div>button]:w-full">
              <GlowButton text="Send Message" submit />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
