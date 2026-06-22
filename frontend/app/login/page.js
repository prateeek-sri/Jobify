import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
export const metadata = {
  title: "Login | Jobify",
  description: "Access your Jobify account to start applying.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side */}
    

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex bg-white dark:bg-zinc-900 text-black dark:text-white items-center justify-center p-8 sm:p-12 xl:p-24 relative overflow-y-auto transition-colors duration-300">
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>

        <div className="hidden lg:flex w-1/2 bg-[#f4f4f4] dark:bg-zinc-950 items-center justify-center relative p-12 transition-colors duration-300">
        <div className="absolute top-8 left-8 text-4xl font-black flex items-center gap-2 text-black dark:text-white transition-colors duration-300">
          <Link
            href="/"
            className="flex items-center group transition-opacity hover:opacity-80"
          >
            <Image
              src={logo}
              alt="Jobify Logo"
              width={130}
              height={40}
              className="block object-contain"
            />
          </Link>{" "}
        </div>
        <img
          src="/images/login_cubes.png"
          alt="Cubes"
          className="max-w-[80%] max-h-[80%] object-contain dark:opacity-90"
        />
      </div>
    </div>
  );
}
