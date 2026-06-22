"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { showProfessionalToast } from "@/components/customToast";

export default function GithubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      showProfessionalToast("No GitHub code provided");
      router.push("/login");
      return;
    }

    const verifyGithub = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          showProfessionalToast("Logged in with GitHub!");
          router.push("/dashboard");
        } else {
          showProfessionalToast(data.msg || "GitHub login failed");
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        showProfessionalToast("Network error connecting to server");
        router.push("/login");
      }
    };

    verifyGithub();
  }, [code, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin size-12 text-black dark:text-white mb-4" />
        <h2 className="text-xl font-bold text-black dark:text-white">Verifying GitHub login...</h2>
      </div>
    </div>
  );
}
