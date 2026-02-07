import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StatsGrid from "@/components/admin/stats-grid";
import ProfileSidebar from "@/components/admin/profile-sidebar";
import {getAccountById} from "@/components/admin/helper";

// Next.js 15: params is a Promise
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    // 1. Unwrap params (Next.js 15 Requirement)
    const { id } = await params;

    // 2. Fetch Data
    const account = await getAccountById(id);

    // 3. Handle 404
    if (!account) {
        return notFound();
    }

    return (
        <>
            {/* Header / Back Button */}
            <div className="mb-8 flex items-center gap-4">
                <Link
                    href="/admin"
                    className="p-2 rounded-xl border transition-all border-slate-200 hover:bg-slate-100 text-slate-500"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </Link>
                <div>
                    <h3 className="text-2xl font-black text-slate-900">{account.name}</h3>
                    <p className="text-sm text-slate-500">{account.company} • Account Profile</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Stats & Logs) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Stats Grid */}
                    <StatsGrid stats={account.stats} />

                    {/* Operational Log (Dynamic Mapping) */}
                    <div className="p-8 border rounded-3xl bg-white border-slate-200 shadow-sm">
                        <h4 className="font-bold mb-6">Operational Log</h4>
                        <div className="space-y-4">
                            {account.logs.map((log) => (
                                <div key={log.id} className="p-4 rounded-xl border flex justify-between items-start border-slate-100 hover:bg-slate-50">
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">{log.title}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">{log.description}</div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{log.time}</span>
                                </div>
                            ))}
                            {account.logs.length === 0 && (
                                <p className="text-sm text-slate-400 italic">No activity logs found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <ProfileSidebar account={account} />
            </div>
        </>
    );
}