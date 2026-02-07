import React from 'react';
import {Plus} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import { Icons } from "../icons";

const CreateAgentCard = () => {

    return (
        <Link href="/create-agent" className="block h-full">
            <Card
                className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-blue-500 transition-colors cursor-pointer h-full min-h-[320px]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center group">
                    {/*<div*/}
                    {/*    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800">*/}
                    {/*    <Plus className="h-6 w-6 text-gray-500 dark:text-gray-400"/>*/}
                    {/*</div>*/}
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all bg-slate-200 text-slate-400 group-hover:bg-blue-600 group-hover:text-white">
                        <Plus className="h-6 w-6  dark:text-gray-400"/>
                    </div>
                    <h3 className="group-hover:text-blue-600 text-lg font-semibold text-gray-900 dark:text-white">New Agent</h3>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CreateAgentCard;