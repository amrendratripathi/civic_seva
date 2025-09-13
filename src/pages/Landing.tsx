import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Stubbed login flow; navigate to dashboard for now
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Orange left shape */}
      <div
        aria-hidden
        className="absolute -left-40 -top-40 w-[420px] h-[420px] rotate-45 bg-[hsl(32_100%_50%)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Login</h1>
          <div className="mx-auto mt-2 h-2 w-24 bg-[hsl(32_100%_50%)] rounded-sm" />
        </div>

        {/* Card */}
        <div className="mx-auto w-full max-w-xl rounded-[28px] bg-[hsl(30_95%_90%)] shadow-sm p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-2xl font-semibold text-neutral-800">
                Username
              </label>
              <div className="mt-2 relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-400 focus:border-[hsl(32_100%_50%)] outline-none text-lg py-3 pr-12"
                  placeholder=""
                  aria-label="Username"
                />
                {/* User icon */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-md bg-white border">
                  {/* Simple user SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-neutral-700"
                  >
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0 1 10 0h2c0-3.866-3.134-7-7-7z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-2xl font-semibold text-neutral-800">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-400 focus:border-[hsl(32_100%_50%)] outline-none text-lg py-3 pr-12"
                  placeholder=""
                  aria-label="Password"
                />
                {/* Lock icon */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-neutral-800"
                  >
                    <path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-7-2a2 2 0 1 1 4 0v2H10V6zm7 14H7V10h10v10z" />
                  </svg>
                </span>
              </div>
              <div className="mt-2">
                <Link to="#" className="inline-block bg-white/70 px-2 py-1 text-[13px] font-semibold text-[hsl(32_100%_50%)] rounded">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="w-56 sm:w-64 rounded-full text-white text-2xl font-extrabold py-3 shadow-md"
                style={{ background: "linear-gradient(135deg, hsl(32 100% 50%), hsl(25 95% 55%))" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;


