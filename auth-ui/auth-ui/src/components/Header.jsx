import { useState } from "react";
import { Link } from "react-router-dom";

const marqueeText =
    "Latest AKTU Updates: Notes | PYQs | Syllabus | New materials uploaded daily | aktuonline.in";

const navItems = [
    {
        label: "MBA",
        children: [
            {
                label: "1st Year Materials",
                children: [
                    { label: "Semester 1 PYQs", href: "#" },
                    { label: "Semester 1 Notes", href: "#" },
                ],
            },
            {
                label: "2nd Year Materials",
                children: [
                    { label: "Semester 3 Notes", href: "#" },
                    { label: "Semester 4 Notes", href: "#" },
                ],
            },
        ],
    },
    {
        label: "MCA",
        children: [
            {
                label: "1st Year Materials",
                children: [
                    { label: "1st Year Notes", href: "#" },
                    { label: "1st Year Quantum", href: "#" },
                ],
            },
        ],
    },
    {
        label: "B.Tech",
        children: [
            { label: "1st Year Materials", href: "#" },
            { label: "2nd Year Materials", href: "#" },
            { label: "3rd Year Materials", href: "#" },
            { label: "4th Year Materials", href: "#" },
        ],
    },
    {
        label: "Notes",
        children: [
            {
                label: "B.Tech Notes",
                children: [
                    { label: "CSE Notes", href: "#" },
                    { label: "ECE Notes", href: "#" },
                    { label: "ME Notes", href: "#" },
                ],
            },
            {
                label: "B.Pharm Notes",
                children: [
                    { label: "Semester 1 Notes", href: "#" },
                    { label: "Semester 2 Notes", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Syllabus",
        children: [
            { label: "B.Tech Syllabus", href: "#" },
            { label: "MBA Syllabus", href: "#" },
            { label: "MCA Syllabus", href: "#" },
        ],
    },
    { label: "Updates", href: "#" },
];

function ChevronDown() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function ChevronRight() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="9 6 15 12 9 18" />
        </svg>
    );
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (label) => {
        setOpenItem((current) => (current === label ? null : label));
    };

    return (
        <header className="w-full">
            <div className="overflow-hidden bg-gradient-to-r from-[#0f1b2d] via-[#1a2a4a] to-[#1e3a6e] text-blue-100">
                <div className="animate-marquee flex min-w-[200%] items-center gap-10 py-2 text-[11px] tracking-[0.3em] uppercase whitespace-nowrap">
                    <span>{marqueeText}</span>
                    <span aria-hidden="true">{marqueeText}</span>
                </div>
            </div>

            <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <Link to="/home" className="flex items-center gap-3">
                        <img
                            src="/LOGO-PRIMARY.png"
                            alt="AKTU Study Zone"
                            className="h-11 w-auto object-contain"
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative group">
                                {item.children ? (
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 hover:text-slate-900"
                                    >
                                        {item.label}
                                        <ChevronDown />
                                    </button>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="hover:text-slate-900"
                                    >
                                        {item.label}
                                    </a>
                                )}

                                {item.children ? (
                                    <div className="absolute left-0 top-full mt-3 w-64 rounded-xl border border-slate-100 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                                        <ul className="p-3 space-y-1 text-sm text-slate-600">
                                            {item.children.map((child) => (
                                                <li key={child.label} className="relative group/child">
                                                    {child.children ? (
                                                        <button
                                                            type="button"
                                                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900"
                                                        >
                                                            {child.label}
                                                            <ChevronRight />
                                                        </button>
                                                    ) : (
                                                        <a
                                                            href={child.href}
                                                            className="block rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900"
                                                        >
                                                            {child.label}
                                                        </a>
                                                    )}

                                                    {child.children ? (
                                                        <div className="absolute left-full top-0 ml-2 w-60 rounded-xl border border-slate-100 bg-white shadow-xl opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible transition">
                                                            <ul className="p-3 space-y-1">
                                                                {child.children.map((grand) => (
                                                                    <li key={grand.label}>
                                                                        <a
                                                                            href={grand.href}
                                                                            className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                                        >
                                                                            {grand.label}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/login?tab=signup"
                            className="rounded-full bg-[#0f1b2d] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#152846]"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle menu"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
                    <div className="border-t border-slate-200 px-4 pb-6">
                        <div className="pt-4 space-y-4">
                            {navItems.map((item) => (
                                <div key={item.label} className="border-b border-slate-100 pb-4">
                                    {item.children ? (
                                        <button
                                            type="button"
                                            onClick={() => toggleItem(item.label)}
                                            className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-800"
                                        >
                                            {item.label}
                                            <span className="text-slate-400">
                                                {openItem === item.label ? "-" : "+"}
                                            </span>
                                        </button>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="text-sm font-semibold text-slate-800"
                                        >
                                            {item.label}
                                        </a>
                                    )}

                                    {item.children && openItem === item.label ? (
                                        <div className="mt-3 space-y-3">
                                            {item.children.map((child) => (
                                                <div key={child.label}>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                        {child.label}
                                                    </p>
                                                    <ul className="mt-2 space-y-2">
                                                        {(child.children || []).map((grand) => (
                                                            <li key={grand.label}>
                                                                <a
                                                                    href={grand.href}
                                                                    className="text-sm text-slate-600 hover:text-slate-900"
                                                                >
                                                                    {grand.label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                to="/login"
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/login"
                                className="rounded-full bg-[#0f1b2d] px-4 py-2 text-sm font-semibold text-white"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
