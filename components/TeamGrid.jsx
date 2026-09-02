"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TeamGrid({ team }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {team.map((member, index) => {
        const isOpen = openIndex === index;
        const hasContact = Boolean(member.email || member.phone);

        return (
          <article key={member.name} className="panel-muted p-5">
            <div className="h-24 rounded-xl bg-gradient-to-br from-[#d8ebd8] to-[#c8e2cb]" />

            <button
              type="button"
              onClick={() => hasContact && setOpenIndex(isOpen ? null : index)}
              className={`mt-4 flex w-full items-center justify-between gap-2 text-left ${hasContact ? "cursor-pointer" : "cursor-default"}`}
            >
              <span className="font-semibold text-text-primary">{member.name}</span>
              {hasContact && (
                <ChevronDown className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
              )}
            </button>
            <p className="text-sm text-text-secondary">{member.role}</p>

            {hasContact && isOpen && (
              <div className="mt-3 space-y-1 border-t border-border/70 pt-3">
                {member.email && (
                  <p className="text-sm text-text-secondary">
                    <a href={`mailto:${member.email}`} className="hover:text-accent">
                      {member.email}
                    </a>
                  </p>
                )}
                {member.phone && (
                  <p className="text-sm text-text-secondary">
                    <a href={`tel:${member.phone}`} className="hover:text-accent">
                      {member.phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
