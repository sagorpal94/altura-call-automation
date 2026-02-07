import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {cn} from "@/lib/utils"
import {Ban, CircleSlash, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import Link from "next/link";

const users = Array.from({length: 5}).map((_, i) => ({
    id: i + 1,
    name: "Bob Vance",
    company: "Acme Inc • Account Profile",
    financials: "$1,624.00",
    plan: i % 2 === 0 ? "Entrepise" : "PRO",
    performance: "95.2%",
    calls: "1240 Calls",
    status: i === 3 ? "Suspended" : "Active"
}))

export function UserTable() {
    return (
        <div className=" border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/50">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-zinc-800">
                            <TableHead className="w-16"></TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">User
                                Name</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">Financials
                                MTD</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">Performance</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">Status</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, idx) => (
                            <TableRow key={idx} className={cn(
                                "border-none transition-colors",
                                "odd:bg-[#FFFFFF] even:bg-[#F8F9FA] dark:odd:bg-transparent dark:even:bg-zinc-800/30"
                            )}>
                                <TableCell className="text-center"><MoreHorizontal
                                    className="h-4 w-4 text-zinc-400 mx-auto"/></TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="text-left">
                                            <p className="text-sm font-normal text-zinc-900 dark:text-zinc-100">{user.name}</p>
                                            <p className="text-[8px] text-zinc-400 uppercase font-medium">{user.company}</p>
                                        </div>
                                        <Icons.demoUserIcon className="h-9 w-9 "/>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <p className="text-sm font-semibold text-[#28B765]">{user.financials}</p>
                                    <p className="text-sm text-[#282C2F]">{user.plan}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <p className="text-sm font-bold text-[#0092FF]">{user.performance}</p>
                                    <p className="text-sm text-[#282C2F]">{user.calls}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className={cn(
                                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold",
                                        user.status === "Active" ? "bg-[#E4F3EB] text-[#28B765]" : "bg-[#FFE1E7] text-[#FF453A]"
                                    )}>
                                        {user.status}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <CircleSlash
                                            className="h-4 w-4 text-zinc-400 cursor-pointer rotate-45 stroke-black dark:stroke-white"/>
                                        <Link
                                            href={`/admin/${user.id}`}>
                                            <Button variant="outline" size="sm"
                                                    className="h-7 text-xs font-bold rounded-md p-4 border-[#DFE1E7]">View</Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}