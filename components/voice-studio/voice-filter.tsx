import React from 'react';
import {Input} from "@/components/ui/input";
import {Copy, Plus, RefreshCw, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Image from "next/image";

const VoiceFilter = () => {
    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative w-full md:w-[240px]">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500"/>
                    <Input
                        placeholder="Search"
                        className="pl-9 pr-12 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-none focus-visible:ring-1 focus-visible:ring-zinc-300 dark:focus-visible:ring-zinc-700"
                    />
                    <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono border border-zinc-200 dark:border-zinc-800 px-1 rounded bg-zinc-50 dark:bg-zinc-800">
                        <span>⌘</span><span>K</span>
                    </div>
                </div>

                <FilterSelect placeholder="11 Labs"/>
                <FilterSelect placeholder="Gender"/>
                <FilterSelect placeholder="Accent"/>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 ">
                    <Button
                        variant="ghost"
                        className="text-zinc-400 border border-[#999999] px-4 py-2 dark:text-zinc-500 gap-2 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                        Clone
                        <Image src="/images/clone.png" alt="clone" width={16} height={16}/>
                    </Button>
                    {/*<Button variant="outline"*/}
                    {/*        className="text-[#999999] border border-[#999999] px-4 py-2 dark:text-zinc-500 gap-2 h-10 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"*/}
                    {/*>*/}
                    {/*    Add*/}
                    {/*    <Image src="/images/add.png" alt="clone" width={16} height={16}/>*/}
                    {/*</Button>*/}
                    {/*<Button variant="ghost"*/}
                    {/*        className="text-zinc-400 border border-[#999999] px-4 py-2 dark:text-zinc-500 gap-2 h-10 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"*/}
                    {/*>*/}
                    {/*    Sync*/}
                    {/*    <Image src="/images/sync.png" alt="clone" width={16} height={16}/>*/}
                    {/*</Button>*/}
                </div>

            </div>

        </div>
    );
};

export default VoiceFilter;

function FilterSelect({placeholder}: { placeholder: string }) {
    return (
        <Select>
            <SelectTrigger
                className="w-full md:w-[140px] h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium shadow-none focus:ring-0">
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                <SelectItem value="opt1">Option 1</SelectItem>
                <SelectItem value="opt2">Option 2</SelectItem>
            </SelectContent>
        </Select>
    )
}