"use client";

import { SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import type { FormErrorKey } from "@/lib/i18n/messages";

type Field = "name" | "email" | "message";
/** Errors are stored as message keys so they re-render in the new language when it changes. */
type Errors = Partial<Record<Field, FormErrorKey>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!data.name) errors.name = "nameRequired";
  if (!data.email) errors.email = "emailRequired";
  else if (!EMAIL_RE.test(data.email)) errors.email = "emailInvalid";
  if (data.message.length < 10) errors.message = "messageShort";
  return errors;
}

/**
 * Contact form with client-side validation. There is no backend yet, so on
 * submit it opens the visitor's email app with the message pre-filled.
 * To send server-side instead, replace `handleSubmit` with a Server Action
 * that calls an email provider (e.g. Resend).
 */
export function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const subject = f.subject(data.name);
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success(f.opening, { description: f.openingHint(site.email) });
    form.reset();
  }

  const field = (name: Field) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });

  const errorText = (name: Field) => {
    const key = errors[name];
    return key ? (
      <p id={`contact-${name}-error`} className="text-sm text-destructive">
        {f.errors[key]}
      </p>
    ) : null;
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5" aria-label={f.label}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">{f.name}</Label>
          <Input {...field("name")} autoComplete="name" placeholder={f.namePlaceholder} className="h-10" />
          {errorText("name")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{f.email}</Label>
          <Input
            {...field("email")}
            type="email"
            autoComplete="email"
            placeholder={f.emailPlaceholder}
            className="h-10"
          />
          {errorText("email")}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{f.message}</Label>
        <Textarea
          {...field("message")}
          rows={6}
          placeholder={f.messagePlaceholder}
          className="min-h-36 resize-y"
        />
        {errorText("message")}
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="h-10 px-5">
          {f.send}
          <SendIcon data-icon="inline-end" />
        </Button>
      </div>
    </form>
  );
}
