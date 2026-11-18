"use client";

import { useState, useEffect } from "react";
import { PortfolioConfig, DEFAULT_PORTFOLIO_CONFIG } from "./config";

const CACHE_KEY = "portfolio_backend_config";

/**
 * Hook to consume backend-driven portfolio configuration.
 * Adheres strictly to the Backend-as-Source-of-Truth architecture.
 */
export function usePortfolioConfig() {
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    // Attempt fast session restore if available
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          return {
            ...DEFAULT_PORTFOLIO_CONFIG,
            ...JSON.parse(cached),
          };
        }
      } catch {
        // ignore cache read failure
      }
    }
    return DEFAULT_PORTFOLIO_CONFIG;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchConfig() {
      try {
        const res = await fetch("/api/config", {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to fetch configuration`);
        }

        const data = await res.json();
        if (active && data) {
          const merged: PortfolioConfig = {
            ...DEFAULT_PORTFOLIO_CONFIG,
            hero: {
              ...DEFAULT_PORTFOLIO_CONFIG.hero,
              ...(data.hero || {}),
              animation: {
                ...DEFAULT_PORTFOLIO_CONFIG.hero.animation,
                ...(data.hero?.animation || {}),
              },
              actions: {
                ...DEFAULT_PORTFOLIO_CONFIG.hero.actions,
                ...(data.hero?.actions || {}),
              },
            },
            resumes: {
              ...DEFAULT_PORTFOLIO_CONFIG.resumes,
              ...(data.resumes || {}),
            },
            projects: data.projects || DEFAULT_PORTFOLIO_CONFIG.projects,
            skills: data.skills || DEFAULT_PORTFOLIO_CONFIG.skills,
            experience: data.experience || DEFAULT_PORTFOLIO_CONFIG.experience,
            services: data.services || DEFAULT_PORTFOLIO_CONFIG.services,
            enquirySettings: {
              ...DEFAULT_PORTFOLIO_CONFIG.enquirySettings,
              ...(data.enquirySettings || {}),
            },
            features: {
              ...DEFAULT_PORTFOLIO_CONFIG.features,
              ...(data.features || {}),
            },
          };

          setConfig(merged);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(merged));
          } catch {
            // ignore cache write error
          }
        }
      } catch (err) {
        console.warn("Backend config fetch fallback:", err);
        if (active) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchConfig();

    return () => {
      active = false;
    };
  }, []);

  return { config, loading, error };
}

