"use client"

import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import React from "react";
import CreateToolModal from "@/components/tools/create-tool-modal";

export default function CreateToolButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="w-full flex justify-end">
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-[#FAEF32] hover:bg-[#F2E600] text-black font-bold h-[48px] px-6 rounded-[6px] shadow-none flex items-center gap-2 transition-colors"
            >
                <Icons.addIcon className="w-5 h-5 stroke-[3px]"/>
                Create New Tool
            </Button>
            <CreateToolModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    );
}