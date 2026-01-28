"use client"

import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Eye, EyeOff, ChevronRight, Apple} from "lucide-react"
import Link from "next/link"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Icons} from "@/components/icons"
import {loginSchema, type LoginValues} from "@/schemas/auth-schema"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    function onSubmit(values: LoginValues) {
        console.log("Login Data:", values)
    }

    return (
        <div
            className="font-[Space_Grotesk] flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-white dark:bg-zinc-950 transition-colors duration-300">
            <div className="w-full max-w-sm md:max-w-3xl">
                {/* --- LOGO & HEADER --- */}
                <div className="flex flex-col items-center mb-10 text-center">
                    {/* Placeholder for the green triangle logo */}
                    <div className="mb-2">
                        <Icons.loginLogo className="w-10 h-6"/>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-950 dark:text-zinc-50 tracking-tight mb-1">
                        Welcome back to Altura Platform
                    </h1>
                    <p className="text-[#64748B] dark:text-zinc-500 text-base">
                        Enter your password and username to continue
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[1000px] space-y-6">

                        {/* --- INPUTS GRID --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-base text-slate-900 dark:text-zinc-100">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                {...field}
                                                className="h-12 rounded-sm border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-lg focus-visible:ring-zinc-300"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-base text-slate-900 dark:text-zinc-100">Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    {...field}
                                                    className="h-12 rounded-sm border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-lg focus-visible:ring-zinc-300 pr-12"
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5"/> :
                                                    <Eye className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* --- CHECKBOX & FORGOT PASS --- */}
                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="rememberMe"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange}
                                                      className="border-slate-300 rounded"/>
                                        </FormControl>
                                        <FormLabel className="text-slate-500 dark:text-zinc-500 text-base font-medium">Remember
                                            me</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <Link href="#"
                                  className="text-slate-950 dark:text-zinc-100 text-base hover:underline">
                                Forgot Password
                            </Link>
                        </div>

                        {/* --- SIGN IN BUTTON --- */}
                        <Button
                            type="submit"
                            className="w-full h-[44px] bg-[#FCEC1A] hover:bg-[#FCEC1A] text-[#004B2D] font-medium text-sm rounded-md shadow-none transition-all flex items-center justify-center gap-2"
                        >
                            Sign in <ChevronRight className="h-5 w-5"/>
                        </Button>

                        {/* --- DIVIDER --- */}
                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                            <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-500 font-medium">or login with</span>
                            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                        </div>

                        {/* --- SOCIAL LOGINS --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <SocialButton icon={<Icons.google className="h-5 w-5"/>} text="Sign in with Google"/>
                            <SocialButton icon={<Icons.facebook className="h-5 w-5 text-blue-600"/>}
                                          text="Sign in with Facebook"/>
                            <SocialButton icon={<Icons.microsoft className="h-5 w-5"/>} text="Sign in with Microsoft"/>
                        </div>

                        {/* --- FOOTER --- */}
                        <p className="text-center text-slate-500 dark:text-zinc-500 text-base">
                            Don&apos;t have an account?{" "}
                            <Link href="#"
                                  className="text-slate-950 dark:text-zinc-100 font-bold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>

        </div>
    )
}

function SocialButton({icon, text}: { icon: React.ReactNode, text: string }) {
    return (
        <Button
            variant="outline"
            className="h-12 text-sm rounded-md w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold gap-3 transition-all px-4 justify-start md:justify-center"
        >
            {icon}
            <span className="truncate">{text}</span>
        </Button>
    )
}