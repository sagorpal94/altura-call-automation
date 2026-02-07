import {
    MoreHorizontal,
    Circle
} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn} from "@/lib/utils";
import AddPhoneNumberButton from "@/components/phone-number/add-phone-number-button";
import {ManageNumberModal} from "@/components/phone-number/manage-number-modal";

const phoneNumbers = [
    {
        number: "+1 (415) 555-0123",
        provider: "Twilio",
        type: "local",
        label: "Primary Support Line",
        agent: "Sarah Support",
        agentValue: "sarah",
        agentAvatar: "/avatars/sarah.png",
        status: "Active",
    },
    {
        number: "+1 (415) 555-0123",
        provider: "Vonage",
        type: "toll-free",
        label: "Main Sales Inbound",
        agent: "Max Market",
        agentValue: "max",
        agentAvatar: "/avatars/max.png",
        status: "Active",
    },
    {
        number: "+1 (415) 555-0123",
        provider: "Twilio",
        type: "local",
        label: "Twilio Line",
        agent: "Twilio Line",
        agentValue: "twilio",
        agentAvatar: "/avatars/sarah.png",
        status: "Active",
    },
]

export default function Page() {
    return (
        <div className="flex flex-col gap-5 transition-colors duration-300 ">
            {/* --- HEADER SECTION --- */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏻</span>
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                    Provision local and toll-free numbers from global carriers and link them to your AI agents in
                    one click.
                </p>
            </div>

            <AddPhoneNumberButton/>

            <Card
                className="border-zinc-200 dark:border-zinc-800 shadow-none rounded-md overflow-hidden bg-white dark:bg-zinc-900/50">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-white dark:bg-zinc-950">
                                <TableRow
                                    className="hover:bg-transparent border-b border-t border-zinc-200 dark:border-zinc-800">
                                    {/* প্রতিটি TableHead এ border-r (right border) ব্যবহার করা হয়েছে divider এর জন্য */}
                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800 last:border-r-0">
                                        Number / Provider
                                    </TableHead>

                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800 last:border-r-0">
                                        Label
                                    </TableHead>

                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800 last:border-r-0">
                                        Linked Agent
                                    </TableHead>

                                    <TableHead
                                        className="text-center font-bold text-zinc-900 dark:text-zinc-100 h-14 border-r border-zinc-100 dark:border-zinc-800 last:border-r-0">
                                        Status
                                    </TableHead>

                                    <TableHead className="text-center font-bold text-zinc-900 dark:text-zinc-100 h-14">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {phoneNumbers.map((row, index) => (
                                    <TableRow key={index}
                                              className={cn(
                                                  "group border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors",
                                                  // LIGHT MODE: Specific Hex Colors
                                                  "odd:bg-[#F8F9FA] even:bg-[#FFFFFF]",
                                                  // DARK MODE: Premium Zinc Colors (Optional: can be customized)
                                                  "dark:odd:bg-transparent dark:even:bg-zinc-900/30",
                                                  // Hover state
                                                  "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                                              )}
                                    >

                                        {/* Number / Provider */}
                                        <TableCell className="py-6">
                                            <div className="flex items-center gap-8 pl-4">
                                                <MoreHorizontal className="h-5 w-5 text-zinc-400"/>
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">{row.number}</span>
                                                    <span
                                                        className="text-xs text-zinc-400">{row.provider} • {row.type}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Label */}
                                        <TableCell
                                            className="text-left px-6 py-6 text-[15px] font-medium text-zinc-900 dark:text-zinc-300">
                                            {row.label}
                                        </TableCell>

                                        {/* Linked Agent */}
                                        <TableCell className="py-6 flex justify-center w-full ">
                                            <div className="flex items-center  gap-2 w-48">
                                                <div
                                                    className="relative h-7 w-7 rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-700">
                                                    {/* Placeholder for Avatar */}
                                                    <div
                                                        className="bg-zinc-200 dark:bg-zinc-800 h-full w-full flex items-center justify-center text-[10px]">👤
                                                    </div>
                                                </div>
                                                <span
                                                    className="text-[15px] font-bold text-[#c0b000] dark:text-yellow-500">
                                                  {row.agent}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Status Pill */}
                                        <TableCell className="py-6">
                                            <div className="flex justify-center">
                                                <div
                                                    className="flex items-center gap-1.5 bg-[#ABDFC8] dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-2 border-[#7DD1AF] px-3 py-1 rounded-full text-[13px] font-bold">
                                                    <Circle className="h-2 w-2 stroke-[#7DD1AF] fill-[#7DD1AF] "/>
                                                    {row.status}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="py-6">
                                            <div className="flex justify-center">
                                                <ManageNumberModal phoneNumber={row}/>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}