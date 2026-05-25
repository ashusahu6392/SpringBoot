import Header from "../components/Header";
import {
    BarChart3,
    Code,
    Database,
    FileCode,
    GraduationCap,
    Laptop,
    Monitor,
    Network,
    Pill,
    Search,
    Settings,
} from "lucide-react";

const popularSearches = ["DBMS", "Operating Systems", "Java", "Python", "KCS-301"];

const subjectsData = [
    {
        name: "DBMS",
        semester: "CSE - 3rd Sem",
        notes: "4,560 notes",
        icon: Database,
        color: "#dbeafe",
    },
    {
        name: "Operating System",
        semester: "CSE - 3rd Sem",
        notes: "3,890 notes",
        icon: Monitor,
        color: "#dcfce7",
    },
    {
        name: "OOPs",
        semester: "CSE - 2nd Sem",
        notes: "4,120 notes",
        icon: Code,
        color: "#ede9fe",
    },
    {
        name: "Computer Networks",
        semester: "CSE - 4th Sem",
        notes: "2,950 notes",
        icon: Network,
        color: "#ffedd5",
    },
    {
        name: "Data Structure",
        semester: "CSE - 2nd Sem",
        notes: "3,210 notes",
        icon: FileCode,
        color: "#fce7f3",
    },
];

const coursesData = [
    {
        name: "B.Tech",
        icon: GraduationCap,
        link: "#",
    },
    {
        name: "MCA",
        icon: Laptop,
        link: "#",
    },
    {
        name: "MBA",
        icon: BarChart3,
        link: "#",
    },
    {
        name: "B.Pharm",
        icon: Pill,
        link: "#",
    },
    {
        name: "Diploma",
        icon: Settings,
        link: "#",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white text-slate-900">
            <Header />

            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
                <div className="pointer-events-none absolute top-28 left-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

                <section className="relative mx-auto w-full max-w-6xl px-6 pb-6 pt-12 text-center font-['Space_Grotesk']">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                        AKTU Study Zone
                    </p>
                    <h1 className="mt-4 text-4xl font-normal tracking-tight text-slate-900 md:text-6xl font-['DM_Serif_Display']">
                        Find. <span className="text-blue-600">Learn</span>. Succeed.
                    </h1>
                    <p className="mt-4 text-lg text-slate-500 md:text-xl">
                        Your one-stop solution for AKTU notes, PYQs, and syllabus.
                    </p>

                    <form
                        className="mx-auto mt-10 flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 p-2 shadow-lg backdrop-blur"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Search className="ml-3 h-6 w-6 text-slate-400" />
                        <input
                            type="search"
                            name="query"
                            placeholder="Search subject, code, branch..."
                            className="flex-1 bg-transparent px-2 py-3 text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                        >
                            <Search className="h-5 w-5" />
                            Search
                        </button>
                    </form>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
                        <span className="text-base font-semibold text-slate-700">
                            Popular Searches
                        </span>
                        <ul className="flex flex-wrap items-center justify-center gap-3">
                            {popularSearches.map((item) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>

            <section className="mx-auto w-full max-w-6xl px-6 pb-20 font-['Space_Grotesk']">
                <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                        Popular Subjects
                    </h2>
                    <a
                        href="#"
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        View all &rarr;
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {subjectsData.map((subject, index) => {
                        const Icon = subject.icon;
                        return (
                            <div
                                key={subject.name}
                                className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                <div
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: subject.color }}
                                >
                                    <Icon className="h-7 w-7 text-slate-800" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {subject.name}
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    {subject.semester}
                                </p>
                                <p className="text-sm text-slate-500">{subject.notes}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                        Browse by Course
                    </h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {coursesData.map((course, index) => {
                        const Icon = course.icon;
                        return (
                            <div
                                key={course.name}
                                className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                style={{ animationDelay: `${index * 90 + 140}ms` }}
                            >
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                                    <Icon className="h-7 w-7 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {course.name}
                                </h3>
                                <a
                                    href={course.link}
                                    className="mt-3 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                    View Branches
                                </a>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
