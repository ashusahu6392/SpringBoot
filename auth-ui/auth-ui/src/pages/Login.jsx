import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

export default function Login() {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";
    const [tab, setTab] = useState(initialTab);
    const navigate = useNavigate();

    // --- Login state ---
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // --- Signup state ---
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");
        setLoading(true);
        try {
            const response = await api.post("/api/auth/login", { username, password });
            localStorage.setItem("token", response.data);
            navigate("/dashboard");
        } catch (err) {
            if (err.response?.status === 403) setError("Please verify your email before logging in.");
            else if (err.response?.status === 401) setError("Invalid username or password.");
            else setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");
        setLoading(true);
        try {
            await api.post("/api/auth/register", {
                full_name,
                email,
                username: regUsername,
                password: regPassword,
            });
            setSuccess("Account created! Check your email to verify.");
        } catch (err) {
            if (err.response?.status === 409) setError("Username or email already exists.");
            else setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const switchTab = (newTab) => {
        setTab(newTab);
        setError(""); setSuccess("");
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-white">

            {/* LEFT PANEL */}
            <div
                className="hidden md:flex w-1/2 relative flex-col justify-between p-10"
                style={{
                    background: "linear-gradient(135deg, #0f1b2d 0%, #1a2a4a 40%, #2d4a7a 70%, #1e3a6e 100%)",
                }}
            >
                <div className="absolute top-5 right-5 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-1.5 animate-float">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60d394" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-white text-[10px] font-medium">New Material Uploaded</span>
                </div>
                <img
                    src="/LOGO-SECONDARY.png"
                    alt="AKTU Study Zone"
                    className="w-60 h-auto object-contain"
                />
                <div>
                    <p className="text-blue-200 text-xs tracking-widest uppercase mb-2">Faculty Portal</p>
                    <h2 className="text-white text-4xl font-black leading-tight">
                        Teach.<br />Upload.<br />Inspire.
                    </h2>
                </div>
            </div>

            {/* RIGHT PANEL — h-screen + overflow-hidden locks height */}
            <div className="w-full md:w-1/2 flex flex-col bg-white px-12 py-10 h-screen overflow-hidden">

                {/* Mobile-only logo header */}
                <div className="md:hidden shrink-0 mb-6 rounded-xl p-4 bg-gradient-to-br from-[#0f1b2d] via-[#1a2a4a] to-[#1e3a6e]">
                    <img
                        src="/LOGO-SECONDARY.png"
                        alt="AKTU Study Zone"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Tabs — always visible, never scrolls away */}
                <div className="flex gap-6 border-b border-gray-100 mb-6 shrink-0">
                    <button
                        onClick={() => switchTab("login")}
                        className={`pb-3 text-sm font-semibold transition-all ${
                            tab === "login"
                                ? "text-gray-900 border-b-2 border-black"
                                : "text-gray-400 border-b-2 border-transparent"
                        }`}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => switchTab("signup")}
                        className={`pb-3 text-sm font-semibold transition-all ${
                            tab === "signup"
                                ? "text-gray-900 border-b-2 border-black"
                                : "text-gray-400 border-b-2 border-transparent"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* SCROLLABLE FORM AREA — only this scrolls */}
                <div className="flex-1 overflow-y-auto max-w-sm mx-auto w-full py-4 no-scrollbar">

                    {tab === "login" ? (
                        <>
                            <div className="mb-8">
                                <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                                    Faculty<span className="text-blue-600 inline-block animate-pulse">.</span>
                                </h1>
                                <p className="text-gray-400 text-sm mt-2">
                                    Welcome back — upload notes, PDFs, assignments, and learning resources.
                                </p>
                            </div>

                            {error && <ErrorBox message={error} />}

                            <form onSubmit={handleLogin} className="space-y-5">
                                <Field label="Username" type="text" value={username}
                                    onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                                <Field label="Password" type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                                <div className="pt-2">
                                    <SubmitButton loading={loading} label="Log In" loadingLabel="Logging in..." />
                                    <p className="text-center text-xs text-gray-400 mt-4 cursor-pointer hover:text-gray-600">
                                        Forgot password?
                                    </p>
                                </div>
                            </form>

                            <p className="text-center mt-6 text-sm text-gray-400">
                                Don't have an account?{" "}
                                <button onClick={() => switchTab("signup")}
                                    className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Register here
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                                    Join<span className="text-blue-600 inline-block animate-pulse">.</span>
                                </h1>
                                <p className="text-gray-400 text-sm mt-2">
                                    Create your faculty account to start uploading resources.
                                </p>
                            </div>

                            {error && <ErrorBox message={error} />}
                            {success && <SuccessBox message={success} />}

                            <form onSubmit={handleSignup} className="space-y-5">
                                <Field label="Full Name" type="text" value={full_name}
                                    onChange={(e) => setFullName(e.target.value)} placeholder="Dr. Ramesh Kumar" />
                                <Field label="Email" type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} placeholder="you@aktu.ac.in" />
                                <Field label="Username" type="text" value={regUsername}
                                    onChange={(e) => setRegUsername(e.target.value)} placeholder="Choose a username" />
                                <Field label="Password" type="password" value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" />
                                <div className="pt-2">
                                    <SubmitButton loading={loading} label="Create Account" loadingLabel="Creating..." />
                                </div>
                            </form>

                            <p className="text-center mt-6 text-sm text-gray-400">
                                Already have an account?{" "}
                                <button onClick={() => switchTab("login")}
                                    className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Log in here
                                </button>
                            </p>
                        </>
                    )}

                    {/* Footer — inside scroll area so it stays at bottom of content */}
                    <div className="flex justify-between text-xs text-gray-300 mt-10 pb-2">
                        <span>© AKTU Study Zone 2026</span>
                        <div className="flex gap-4">
                            <Link to="/terms" className="hover:text-gray-500">Terms of use</Link>
                            <Link to="/privacy" className="hover:text-gray-500">Privacy Policy</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ── Small reusable pieces ───────────────────────────────────────────────────

function Field({ label, type, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 tracking-widest uppercase">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                required
            />
        </div>
    );
}

function SubmitButton({ loading, label, loadingLabel }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg text-sm tracking-wide transition-all"
        >
            {loading ? loadingLabel : label}
        </button>
    );
}

function ErrorBox({ message }) {
    return (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-red-600 text-sm">{message}</p>
        </div>
    );
}

function SuccessBox({ message }) {
    return (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
            </svg>
            <p className="text-green-700 text-sm">{message}</p>
        </div>
    );
}