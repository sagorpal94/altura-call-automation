import React from 'react';
import {Icons} from "@/components/icons";

export const StatsGrid = ({stats}: { stats: any }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Revenue */}
            <div className="p-6 border rounded-2xl flex flex-col transition-all bg-white border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-slate-900/50 text-emerald-500">
                        <Icons.revenueIcon/>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">MTD Revenue</span>
                </div>
                <div className="text-2xl lg:text-3xl font-black text-slate-900">{stats.mtdRevenue}</div>
            </div>

            {/* Success Rate */}
            <div className="p-6 border rounded-2xl flex flex-col transition-all bg-white border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-slate-900/50 text-blue-500">
                        <Icons.successRateIcon/>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Success Rate</span>
                </div>
                <div className="text-2xl lg:text-3xl font-black text-slate-900">{stats.successRate}</div>
            </div>

            {/* Total Usage */}
            <div className="p-6 border rounded-2xl flex flex-col transition-all bg-white border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-slate-900/50 text-purple-500">
                        <Icons.usageIcon/>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Usage</span>
                </div>
                <div className="text-2xl lg:text-3xl font-black text-slate-900">{stats.totalUsage}</div>
            </div>
        </div>
    );
};

export default StatsGrid;