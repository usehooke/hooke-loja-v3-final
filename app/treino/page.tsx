// app/treino/page.tsx
"use client";
import { Standard } from "@typebot.io/react";

export default function PersonalHookePage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-hooke-50 w-full h-[100dvh]">
      <Standard
        typebot="NOME-DO-SEU-BOT-AQUI" 
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}