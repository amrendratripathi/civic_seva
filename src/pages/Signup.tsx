import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-center">Sign Up</h1>
        <div className="mx-auto mt-2 h-1.5 w-16 bg-[hsl(32_100%_50%)] rounded" />

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(32_100%_50%)]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(32_100%_50%)]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-[hsl(32_100%_50%)]"
                required
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-[hsl(32_100%_50%)]">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-[hsl(32_100%_50%)]"
                required
              />
              <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-[hsl(32_100%_50%)]">
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-pop w-full rounded-full text-white py-2.5 font-bold"
            style={{ background: "linear-gradient(135deg, hsl(32 100% 50%), hsl(25 95% 55%))" }}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-700">
          Already have an account? <Link to="/login" className="font-semibold text-[hsl(32_100%_50%)] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


