import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {cn} from "@/lib/utils"
import {MoreHorizontal} from "lucide-react";
import {Icons} from "@/components/icons";
import {Checkbox} from "@/components/ui/checkbox";

const users = Array.from({length: 5}).map((_, i) => ({
    name: "Neal Matthews",
    company: "Acme Inc",
    role: "SuperAdmin",
    lastLogin: "#485625",
    status: i === 3 ? "Suspended" : "Active"
}))

export default function UsersTable() {
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
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">
                                Role</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">Company</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">Status</TableHead>
                            <TableHead
                                className="text-center font-semibold text-sm text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800">Last
                                Login</TableHead>
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
                                        </div>
                                        <Icons.demoUserIcon className="h-9 w-9 "/>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center flex justify-center">
                                    <p className="text-sm font-semibold text-[#BBAE00] bg-[#FCEC1A] p-2 rounded-full w-fit">{user.role}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <p className="text-sm font-bold text-[#0092FF]">{user.company}</p>
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
                                    <p className="text-sm font-bold ">{user.lastLogin}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <Checkbox/>
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