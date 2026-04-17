"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Paddle: any;
  }
}

const PADDLE_SCRIPT_SRC = "https://cdn.paddle.com/paddle/v2/paddle.js";
let paddleInitialized = false;
let paddleScriptInjected = false;

function injectPaddleScript() {
  if (paddleScriptInjected || typeof document === "undefined") return;
  if (document.querySelector(`script[src="${PADDLE_SCRIPT_SRC}"]`)) {
    paddleScriptInjected = true;
    return;
  }
  const s = document.createElement("script");
  s.src = PADDLE_SCRIPT_SRC;
  s.async = true;
  document.head.appendChild(s);
  paddleScriptInjected = true;
}

function initPaddle() {
  if (paddleInitialized || typeof window === "undefined" || !window.Paddle)
    return;

  const env = process.env.NEXT_PUBLIC_PADDLE_ENV;
  if (env === "sandbox") {
    window.Paddle.Environment.set("sandbox");
  }

  window.Paddle.Initialize({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
  });

  paddleInitialized = true;
}

export function usePaddleInit() {
  useEffect(() => {
    injectPaddleScript();
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.Paddle) {
        initPaddle();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
}

interface OpenCheckoutOptions {
  priceId: string;
  email?: string;
}

export function openPaddleCheckout({ priceId, email }: OpenCheckoutOptions) {
  injectPaddleScript();
  if (typeof window === "undefined" || !window.Paddle) {
    console.warn("Paddle.js henüz yüklenmedi.");
    return;
  }

  initPaddle();

  const checkoutOptions: Record<string, unknown> = {
    items: [{ priceId, quantity: 1 }],
    settings: {
      displayMode: "overlay",
      theme: "dark",
      locale: "tr",
      successUrl: "https://thekai.co/basarili",
    },
  };

  if (email) {
    checkoutOptions.customer = { email };
  }

  window.Paddle.Checkout.open(checkoutOptions);
}

interface PaddleCheckoutButtonProps {
  priceId: string;
  email?: string;
  children: React.ReactNode;
  className?: string;
}

export default function PaddleCheckoutButton({
  priceId,
  email,
  children,
  className,
}: PaddleCheckoutButtonProps) {
  usePaddleInit();

  const handleClick = () => {
    openPaddleCheckout({ priceId, email });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
