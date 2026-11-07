"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function CopyEmailButton({ email }: { email: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success(t.contact.copied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t.contact.copyFailed);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={copy}
      aria-label={t.contact.copyEmail}
      title={t.contact.copyEmail}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
