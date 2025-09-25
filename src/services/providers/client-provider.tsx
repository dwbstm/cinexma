"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { ProgressProvider } from "@bprogress/next/app";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <InnerProviders> {children}</InnerProviders>
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

function InnerProviders({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "12px",
            background: "#333",
            color: "#FFF",
            borderRadius: "9999px", // valid substitute for infinite border radius
          },
        }}
      />
      <ProgressProvider color="#0072F5" options={{ showSpinner: false }} shallowRouting>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ProgressProvider>
    </>
  );
}
