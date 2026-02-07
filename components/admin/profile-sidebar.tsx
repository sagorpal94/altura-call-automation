import React from 'react';

export const ProfileSidebar = ({ account }: { account: any }) => {
    return (
        <div className="space-y-8">
            <div className="p-8 border rounded-3xl text-center bg-white border-slate-200 shadow-sm">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-black bg-slate-100 text-blue-600">
                    {account.initials}
                </div>
                <h4 className="font-bold text-lg">{account.name}</h4>
                <p className="text-sm text-slate-500 mb-6">{account.email}</p>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className={`w-2 h-2 rounded-full ${account.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <span className={`text-[10px] font-black uppercase ${account.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {account.status}
                    </span>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-700/50">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Plan</span>
                        <span className="font-bold text-slate-900">{account.plan}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Customer Since</span>
                        <span className="font-bold text-slate-900">{account.joinedDate}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 border rounded-3xl bg-white border-slate-200 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Action Center</h4>
                <div className="space-y-3">
                    <button className="cursor-pointer w-full py-3 rounded-xl text-sm font-bold transition-all bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white">Suspend Account</button>
                    <button className="cursor-pointer w-full py-3 rounded-xl text-sm font-bold border transition-all border-slate-200 hover:bg-slate-100 text-slate-500">Upgrade Plan</button>
                    <button className="cursor-pointer w-full py-3 rounded-xl text-sm font-bold border transition-all border-slate-200 hover:bg-slate-100 text-slate-500">Email Owner</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;