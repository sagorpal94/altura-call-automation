import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Icons} from "@/components/icons";

interface Tool {
    id: string;
    title: string;
    category: string;
    description: string;
}

export default function ToolCard({tool}: { tool: Tool }) {
    return (
        <Card
            className="p-6 border-zinc-200 shadow-none rounded-[4px] relative  transition-all hover:border-zinc-300">

            {/* Top Right Actions */}
            <div className="absolute top-5 right-6 flex items-center gap-4">
                <button className="cursor-pointer text-zinc-400 hover:text-zinc-600">
                    <Icons.editIcon className="w-[15px] h-[15px]"/>
                </button>
                <button className="cursor-pointer text-zinc-400 hover:text-red-500">
                    <Icons.deleteIcon className="w-[15px] h-[15px]"/>
                </button>
            </div>

            <div className="flex flex-col gap-5">
                {/* Icon Placeholder (Gray Box) */}
                <div className="w-[37px] h-[37px] bg-[#E8E8E8] rounded-[2px] flex items-center justify-center">
                    <Image src="/images/tool-card-image.png" alt="tool-card" width={37} height={37}
                           className="w-[37px] h-[37px] object-cover"/>
                </div>


                <div className="space-y-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-muted-foreground tracking-tight">
                        {tool.title}
                    </h3>
                    <p className="text-[#BBAE00] text-sm font-medium uppercase tracking-wide">
                        {tool.category}
                    </p>
                </div>

                <p className="text-sm font-semibold text-black dark:text-muted-foreground leading-[1.4] max-w-[95%]">
                    {tool.description}
                </p>
            </div>
        </Card>
    );
}