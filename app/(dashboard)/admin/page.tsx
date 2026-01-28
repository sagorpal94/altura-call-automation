import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {UserTable} from "@/components/admin/user-table";
import {StatCard} from "@/components/admin/stat-card";
import {Icons} from "@/components/icons";
import {Card, CardContent} from "@/components/ui/card";
import {CreateUserModal} from "@/components/admin/create-user-modal";

export default function Page() {
    return (
        <div className="flex flex-col gap-5 transition-colors duration-300 ">
            {/*<div className="flex flex-col md:flex-row justify-between items-start gap-6">*/}
            <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    Hola, Carlos <span className="animate-bounce">👋</span>
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-3xl leading-tight">
                    Provision local and toll-free numbers from global carriers and link them to your AI agents in
                    one click.
                </p>
            </div>

            <div className="w-full flex justify-end items-center gap-6">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline"
                            className="border-[#BBAE00] text-[#BBAE00] hover:bg-yellow-50 dark:hover:bg-yellow-500/10 shadow-none font-bold rounded-md h-11 px-4 py-[10px]">
                        Export Financials
                    </Button>
                    <Button
                        className="bg-[#FCEC1A] hover:bg-[#e6d920] text-zinc-900 font-bold rounded-md h-11 px-4 py-[10px] gap-2 shadow-none">
                        System Health
                    </Button>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-[#0D0D12] dark:text-zinc-100">Revenue Stream</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard label="COMBINED MONTHLY" value="$9,284.48" subLabel="Total Revenue"
                              icon={<Icons.dolar className="w-5 h-5"/>}/>
                    <StatCard label="FIXED MRR" value="$1,556.98" subLabel="Plan Revenue"
                              icon={<Icons.chartIcon className="w-5 h-5"/>}/>
                    <StatCard label="FROM 30,910 MINS" value="$7,727.50" subLabel="Usage Revenue"
                              icon={<Icons.revenue className="w-5 h-5"/>}/>
                </div>
            </section>


            {/* --- OPERATIONAL HEALTH --- */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-[#0D0D12] dark:text-zinc-100">Operational Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard label="SUCCESSFUL CALLS" value="10,270" subLabel="96%"
                              icon={<Icons.dolar className="w-5 h-5"/>}
                              trendColor="text-emerald-500"/>
                    <StatCard label="WORKFLOW ERRORS" value="69" subLabel="69 Errors"
                              icon={<Icons.chartIcon className="w-5 h-5"/>}/>
                    <StatCard label="ENGAGEMENT" value="10,679" subLabel="3 Active"
                              icon={<Icons.revenue className="w-5 h-5"/>}
                              footerText="GLOBAL CONNECTIONS ATTEMPTED"/>
                </div>
            </section>

            {/* --- USER MANAGEMENT --- */}
            <section className="space-y-6">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-[#0D0D12] dark:text-zinc-100">User Management</h2>
                    </div>
                    <CreateUserModal
                        trigger={
                            <Button
                                className="bg-[#BBAE00] hover:bg-[#9e9800] text-white text-base rounded-md h-11 px-6 gap-3 shadow-none">
                                <Icons.createUser className="h-5 w-5 stroke-[3px]"/>
                                Create User
                            </Button>
                        }
                    />
                </div>

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#828286]"/>
                    <Input
                        placeholder="Search users by name, email, role or company..."
                        className="pl-10 h-12 bg-[#EAEAEB] dark:bg-zinc-900 border-none rounded-lg text-zinc-600 dark:text-zinc-400 placeholder:text-zinc-400"
                    />
                </div>
                <p className="text-[#797A7D] text-sm">Create, edit, and manage system users and their permissions.</p>

                <Card className="py-0 shadow-none rounded-md">
                    <CardContent className="p-6">
                        <UserTable/>
                    </CardContent>
                </Card>

            </section>
        </div>
    )
}