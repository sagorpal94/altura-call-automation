"use client"

import React, {useState} from "react"
import {
    Globe,
    Plus,
    Eye,
    Trash2,
    FileText
} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Icons} from "@/components/icons";
import {CreateKeyModal} from "@/components/api-keys/create-key-modal";

const publicKeys = [
    {
        name: "Main Production Key",
        key: "sk_live_51M39sd...",
        created: "Oct 12, 2024",
        lastUsed: "2m ago",
    },
]

export default function PublicApiKeys() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (value: any) => {
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Delete/Revoke Handler (Simulated)
    const handleRevoke = (item: any) => {
        // এখানে Server Action কল করা যেতে পারে
        console.log("Revoking key:", item.id);
        alert(`Revoking ${item.name}`);
    };
    return (
        <Card className="border-[#DFE1E7] py-0 shadow-none rounded-md overflow-hidden">
            <CardContent className="px-[21px] py-[21px] space-y-5">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-[10px]">
                        <Icons.publicIcon className="h-10 w-10 "/>
                        <h2 className="text-lg  font-semibold text-[#1C1917] dark:text-muted-foreground">Public API
                            Keys</h2>
                    </div>

                    {/* Create Button - Matching Yellow Design */}
                    <CreateKeyModal
                        type="public"
                        onSubmit={(data) => console.log("Creating Public Key:", data)}
                        trigger={
                            <Button
                                variant="outline"
                                className="border-[#BBAE00] text-sm text-[#BBAE00] font-bold rounded-md h-11 px-5 gap-3"
                            >
                                <div
                                    className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#BBAE00]">
                                    <Plus className="h-4 w-4"/>
                                </div>
                                Create Public Key
                            </Button>
                        }
                    />

                </div>

                <p className="text-[#70645C] text-sm">
                    Safe for client-side widgets.
                </p>

                {/* --- TABLE SECTION --- */}
                <div className="rounded-md border border-[#DFE1E7] overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="">
                                <TableRow className="hover:bg-muted border-b border-[#DFE1E7]">
                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-muted-foreground h-14 border-r border-[#DFE1E7] last:border-r-0">
                                        Name
                                    </TableHead>
                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-muted-foreground h-14 border-r border-[#DFE1E7] last:border-r-0">
                                        KEY
                                    </TableHead>
                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-muted-foreground h-14 border-r border-[#DFE1E7] last:border-r-0">
                                        Created
                                    </TableHead>
                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-muted-foreground h-14 border-r border-[#DFE1E7] last:border-r-0">
                                        Last Used
                                    </TableHead>
                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-muted-foreground h-14 border-r border-[#DFE1E7] last:border-r-0">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {publicKeys.map((item, index) => (
                                    <TableRow key={index} className="hover:bg-muted border-none">
                                        {/* Name Column */}
                                        <TableCell
                                            className="text-center text-zinc-900 dark:text-muted-foreground font-medium py-3 px-3 min-w-[180px]">
                                            {item.name}
                                        </TableCell>

                                        {/* KEY Column - Input-style masking */}
                                        <TableCell className="py-3 px-3 min-w-[300px]">
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="flex items-center gap-2 rounded-md border border-zinc-200 ">
                                                    <code
                                                        className="font-mono  px-2 py-1 rounded text-xs text-slate-600">
                                                        {isVisible ? item.key : "••••••••••••••••••••"}
                                                    </code>
                                                    <button
                                                        onClick={() => setIsVisible(!isVisible)}
                                                        className="text-slate-500  p-1 transition-colors"
                                                    >
                                                        {isVisible ? (
                                                            // Eye Off Icon
                                                            <svg className="w-4 h-4 cursor-pointer" fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                                            </svg>
                                                        ) : (
                                                            // Eye Icon
                                                            <Icons.eyeIcon className="w-4 h-4 cursor-pointer"/>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Created Column */}
                                        <TableCell
                                            className="text-center text-zinc-900 dark:text-muted-foreground font-medium py-3 px-3 min-w-[120px]">
                                            {item.created}
                                        </TableCell>

                                        {/* Last Used Column */}
                                        <TableCell
                                            className="text-center text-zinc-900 dark:text-muted-foreground font-medium py-3 px-3 min-w-[120px]">
                                            {item.lastUsed}
                                        </TableCell>

                                        {/* Actions Column */}
                                        <TableCell className="py-3 px-3 min-w-[120px]">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    onClick={handleCopy}
                                                    className="text-zinc-500 hover:text-zinc-900 dark:text-muted-foreground cursor-pointer transition-colors"
                                                    title="Copy Key"
                                                >
                                                    {isCopied ? (
                                                        <svg className="w-4 h-4 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2" d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    ) : (
                                                        <Icons.copyIcon className="h-5 w-5"/>
                                                    )}

                                                </button>
                                                <button
                                                    className="text-zinc-500 hover:text-red-600 transition-colors"
                                                    onClick={() => handleRevoke(item)}
                                                    title="Revoke Key"
                                                >
                                                    <Icons.deleteIcon className="h-5 w-5 cursor-pointer"/>
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}