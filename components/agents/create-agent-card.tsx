import React from 'react';
import {Plus} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";

const CreateAgentCard = () => {

    return (
        <Link href="/create-agent" className="block h-full">
            <Card
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer h-full min-h-[320px]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800">
                        <Plus className="h-6 w-6 text-gray-500 dark:text-gray-400"/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Agent</h3>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CreateAgentCard;