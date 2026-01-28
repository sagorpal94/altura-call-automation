import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";

interface IntegrationsCardProps {
    item: any;
    onConnect: () => void; // নতুন প্রপস
}
const IntegrationsCard = ({item, onConnect}:IntegrationsCardProps) => {
    return (
        <Card
              className="max-w-[420px] py-0 rounded-[8px] border border-zinc-200 shadow-none overflow-hidden">
            <CardContent className="p-6 flex flex-col h-[230px] justify-between">

                {/* Top Section: Pencil and Connect Button */}
                <div className="flex justify-end items-center gap-5">
                    <button className="text-zinc-500 hover:text-zinc-800 transition-colors">
                        <Icons.editIcon className="w-4 h-4 cursor-pointer"/>
                    </button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            onConnect(); // ক্লিক করলে মোডাল ওপেন করার ফাংশন কল হবে
                        }}
                        className="bg-[#FCEC1A] hover:bg-[#FCEC1A] text-[#BBAE00] font-bold px-6 py-1 h-7 rounded-md shadow-none border-none text-sm"
                    >
                        Connect
                    </Button>
                </div>

                {/* Middle Section: Icon Box */}
                <div className="">
                    {/*<div*/}
                    {/*    className="w-12 h-12 rounded-[12px] border border-zinc-900 flex items-center justify-center">*/}
                    {/* ইমেজের আইকনের মত Audio Lines */}
                    {item.icon}
                    {/*</div>*/}
                </div>

                {/* Bottom Section: Text Content */}
                <div className="space-y-1">
                    <h3 className="text-base font-semibold text-[#282C2F] dark:text-muted-foreground tracking-tight">
                        {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-black dark:text-muted-foreground  leading-tight">
                        {item.desc}
                    </p>
                </div>

            </CardContent>
        </Card>
    );
};

export default IntegrationsCard;