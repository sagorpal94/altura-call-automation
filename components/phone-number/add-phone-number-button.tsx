"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import PhoneWizard from "@/components/phone-number/phone-wizard";

const AddPhoneNumberButton = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="flex justify-end">
            <Button
                onClick={() => {setIsOpen(true);}}
                className="bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold rounded-md h-12 px-6 gap-3 shadow-none transition-all w-auto text-right md:w-auto mt-4 md:mt-0">
                <Icons.addIcon/>
                Add a New Number
            </Button>

            <PhoneWizard isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default AddPhoneNumberButton;