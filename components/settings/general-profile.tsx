import React from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Mail} from "lucide-react"
import Image from "next/image"
import {useFormContext} from "react-hook-form";
import {Icons} from "@/components/icons";

const GeneralProfile = () => {
    const form = useFormContext()
    return (
        <Card className="lg:col-span-2 border-[#DFE1E7] rounded-md shadow-none mt-8">
            <CardContent className="p-6 py-3 space-y-3">

                {/* --- PROFILE HEADER --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div
                            className="relative h-20 w-20 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <Image
                                src="/images/avatar.png" // Add your image path
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-[6px]">
                            <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
                                Alexa Rawles
                            </h2>
                            <p className="text-sm text-zinc-400 font-medium">
                                alexarawles@gmail.com
                            </p>
                        </div>
                    </div>
                    <Button
                        className="bg-[#FCEC1A] hover:bg-yellow-400 text-zinc-900 text-base px-4 rounded-md h-11">
                        Edit
                    </Button>
                </div>

                {/* --- FORM SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                    {/* Full Name */}
                    <FormField control={form.control} name="fullName" render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-bold text-zinc-700 dark:text-zinc-300">Full
                                Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your First Name" {...field}
                                       className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 "/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    {/* Nick Name */}
                    <FormField control={form.control} name="nickName" render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-bold text-zinc-700 dark:text-zinc-300">Nick
                                Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your First Name" {...field}
                                       className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    {/* Gender Select */}
                    <FormField control={form.control} name="gender" render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className="font-bold text-zinc-700 dark:text-zinc-300">Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 w-full shadow-none">
                                        <SelectValue placeholder="Your First Name"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent><SelectItem
                                    value="male">Male</SelectItem><SelectItem
                                    value="female">Female</SelectItem></SelectContent>
                            </Select>
                        </FormItem>
                    )}/>

                    {/* Country Select */}
                    <FormField control={form.control} name="country" render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className="font-bold text-zinc-700 dark:text-zinc-300">Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 w-full shadow-none">
                                        <SelectValue placeholder="Your First Name"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent><SelectItem value="us">United States</SelectItem></SelectContent>
                            </Select>
                        </FormItem>
                    )}/>

                    {/* Language Select */}
                    <FormField control={form.control} name="language" render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className="font-bold text-zinc-700 dark:text-zinc-300">Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 w-full shadow-none">
                                        <SelectValue placeholder="Your First Name"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent><SelectItem
                                    value="en">English</SelectItem></SelectContent>
                            </Select>
                        </FormItem>
                    )}/>

                    {/* Time Zone Select */}
                    <FormField control={form.control} name="timeZone" render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-bold text-zinc-700 dark:text-zinc-300">Time
                                Zone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="h-11 bg-zinc-50/50 dark:bg-zinc-900/50 w-full shadow-none">
                                        <SelectValue placeholder="Your First Name"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent><SelectItem value="utc">UTC
                                    +00:00</SelectItem></SelectContent>
                            </Select>
                        </FormItem>
                    )}/>
                </div>

                {/* --- EMAIL SECTION --- */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">My
                        email Address</h3>
                    <div className="flex items-center gap-4 group">
                        <div
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-[#FFFEE9] ">
                            {/*<Mail className="h-5 w-5 fill-current"/>*/}
                            <Icons.envalap className="h-5 w-5 fill-current"/>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">alexarawles@gmail.com</p>
                            <p className="text-xs text-zinc-400">1 month ago</p>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};

export default GeneralProfile;