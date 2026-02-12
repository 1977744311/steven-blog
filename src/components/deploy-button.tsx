"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";

export function DeployButton() {
  const [state, setState] = useState<"idle" | "auth" | "loading" | "success" | "error">("idle");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");

  async function handleDeploy() {
    if (state === "idle") {
      setState("auth");
      return;
    }

    if (!secret.trim()) return;

    setState("loading");
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      const data = await res.json();

      if (res.ok) {
        setState("success");
        setMessage("Deploy triggered!");
        setTimeout(() => {
          setState("idle");
          setSecret("");
          setMessage("");
        }, 3000);
      } else {
        setState("error");
        setMessage(data.error || "Deploy failed");
        setTimeout(() => {
          setState("auth");
          setMessage("");
        }, 3000);
      }
    } catch {
      setState("error");
      setMessage("Network error");
      setTimeout(() => {
        setState("auth");
        setMessage("");
      }, 3000);
    }
  }

  function handleCancel() {
    setState("idle");
    setSecret("");
    setMessage("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {message && (
        <div
          className={`rounded-lg px-3 py-1.5 text-sm font-medium shadow-lg ${
            state === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {state === "auth" && (
        <div className="flex items-center gap-2 rounded-lg bg-background border shadow-lg p-2">
          <input
            type="password"
            placeholder="Deploy secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDeploy()}
            className="w-40 rounded-md border bg-transparent px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            onClick={handleDeploy}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go
          </button>
          <button
            onClick={handleCancel}
            className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}

      {(state === "idle" || state === "auth") && (
        <button
          onClick={() => state === "idle" && setState("auth")}
          className={`rounded-full p-3 shadow-lg transition-all hover:scale-110 ${
            state === "auth"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
          title="Trigger deploy"
        >
          <Rocket className="h-5 w-5" />
        </button>
      )}

      {state === "loading" && (
        <button
          disabled
          className="rounded-full bg-primary p-3 shadow-lg text-primary-foreground animate-pulse"
        >
          <Rocket className="h-5 w-5" />
        </button>
      )}

      {state === "success" && (
        <button
          disabled
          className="rounded-full bg-green-500 p-3 shadow-lg text-white"
        >
          <Rocket className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
