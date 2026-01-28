"use client"

import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {ExternalLink, X} from "lucide-react"

import {Dialog, DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Icons} from "@/components/icons";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";

const formSchema = z.object({
    apiKey: z.string().optional(),
    apiUrl: z.string().optional(),
    region: z.string().optional(),
    teamId: z.string().optional(),
    // Custom Credential Fields
    authType: z.string().default("OAuth2.0"),
    credName: z.string().default(""),
    tokenUrl: z.string().default(""),
    clientId: z.string().default(""),
    clientSecret: z.string().default(""),
    scope: z.string().default(""),
    fallbackDisabled: z.boolean().default(false),
    // Supabase Fields
    sbBucketName: z.string().default(""),
    sbBucketRegion: z.string().default(""),
    sbPathPrefix: z.string().default(""),
    sbEndpoint: z.string().default(""),
    sbAccessKey: z.string().default(""),
    sbSecretKey: z.string().default(""),
    sbFallbackIndex: z.string().default(""),
    // GCP Fields
    gcpRefName: z.string().default(""),
    gcpJson: z.string().default(""),
    gcpBucketName: z.string().default(""),
    gcpBucketRegion: z.string().default(""),
    gcpPathPrefix: z.string().default(""),
    gcpHmacAccessKey: z.string().default(""),
    gcpHmacSecret: z.string().default(""),
    gcpFallbackIndex: z.string().default(""),
    // AWS S3 Fields
    awsAccessKeyId: z.string().default(""),
    awsSecretAccessKey: z.string().default(""),
    s3BucketRegion: z.string().default(""),
    s3BucketName: z.string().default(""),
    s3PathPrefix: z.string().default(""),
    fallbackIndex: z.string().default(""),
    // OAuth Fields
    oauth2Url: z.string().default(""),
    oauth2ClientId: z.string().default(""),
    oauth2ClientSecret: z.string().default(""),
})

type FormValues = z.infer<typeof formSchema>;

interface ConnectServiceModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    type: "api-key" | "api-url" | "azure-speech" | "custom-llm" | "make-com" | "aws-s3" | "gcp-credentials" | "supabase" | "custom-credential"
    onConnect: (data: FormValues) => void
}

const ConnectServiceModal = ({open, setOpen, title, type, onConnect}: ConnectServiceModalProps) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            apiKey: "",
            apiUrl: "",
            region: "australia",
            teamId: "",
            sbBucketName: "",
            sbBucketRegion: "",
            sbPathPrefix: "",
            sbEndpoint: "",
            sbAccessKey: "",
            sbSecretKey: "",
            sbFallbackIndex: "",
            gcpRefName: "",
            gcpJson: "",
            awsAccessKeyId: "",
            awsSecretAccessKey: "",
            authType: "OAuth2.0",
            credName: "",
            tokenUrl: "",
            clientId: "",
            clientSecret: "",
            scope: "",
            fallbackDisabled: false,
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onConnect(values)
        setOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="max-w-[95vw] md:max-w-[850px] p-0 gap-0 border-none rounded-md overflow-hidden  shadow-2xl [&>button]:hidden flex flex-col h-auto max-h-[90vh]"
            >

                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <DialogTitle className="text-xl font-bold text-zinc-900 dark:text-muted-foreground">
                        {type === "custom-credential" ? "New Custom Credential" :
                            type === "supabase" ? "Supabase credentials" :
                                type === "gcp-credentials" ? "GCP credentials" :
                                    type === "aws-s3" ? "AWS S3 credentials" :
                                        type === "make-com" ? "make.com" :
                                            `Connect ${title}`}
                    </DialogTitle>
                    <button onClick={() => setOpen(false)}
                            className="cursor-pointer w-8 h-8 flex items-center justify-center border border-yellow-400 rounded-md text-yellow-500 hover:bg-yellow-50">
                        <Icons.modalClose size={20} strokeWidth={2.5}/>
                    </button>
                </div>

                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    {/*<div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">*/}
                    <p className="text-zinc-900 dark:text-muted-foreground font-medium -mt-2">Provide your
                        authentication credentials.</p>
                    <Form {...form}>
                        <form id="dynamic-service-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="p-5 border border-zinc-200 rounded-md space-y-5">

                                {type === "custom-credential" && (
                                    <>
                                        <div className="flex justify-end items-center gap-3 flex-col items-end">
                                            <span
                                                className="text-sm font-bold text-zinc-900 dark:text-muted-foreground">Authentication Type</span>
                                            <FormField
                                                control={form.control}
                                                name="authType"
                                                render={({field}) => (
                                                    <FormItem className="w-[180px]">
                                                        <Select onValueChange={field.onChange}
                                                                defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger
                                                                    className="h-10 border-yellow-400 focus:ring-0 bg-white rounded-md text-zinc-600 shadow-none w-full">
                                                                    <SelectValue/>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="OAuth2.0">OAuth 2.0</SelectItem>
                                                                <SelectItem value="APIKey">API Key</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {[
                                            {
                                                name: "credName",
                                                label: "Credential Name",
                                                placeholder: "Enter Credential Name"
                                            },
                                            {name: "tokenUrl", label: "Token URL", placeholder: "Enter Token URL"},
                                            {name: "clientId", label: "Client ID", placeholder: "Enter Client ID"},
                                            {
                                                name: "clientSecret",
                                                label: "Client Secret",
                                                placeholder: "Enter Client Secret"
                                            },
                                            {name: "scope", label: "Scope", placeholder: "Enter Scope"},
                                        ].map((item) => (
                                            <FormField
                                                key={item.name}
                                                control={form.control}
                                                name={item.name as any}
                                                render={({field}) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel
                                                            className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{item.label}</FormLabel>
                                                        <FormControl><Input placeholder={item.placeholder} {...field}
                                                                            className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none"/></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}

                                        <div className="space-y-2">
                                            <h4 className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">Fallback
                                                Index</h4>
                                            <FormField
                                                control={form.control}
                                                name="fallbackDisabled"
                                                render={({field}) => (
                                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                                className="border-zinc-300"
                                                            />
                                                        </FormControl>
                                                        <label
                                                            className="text-sm font-medium text-zinc-900 dark:text-muted-foreground leading-none cursor-pointer">Disabled</label>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}

                                {type === "supabase" && (
                                    <>
                                        {[
                                            {
                                                name: "sbBucketName",
                                                label: "Bucket Name",
                                                placeholder: "Enter Bucket Name"
                                            },
                                            {
                                                name: "sbBucketRegion",
                                                label: "Bucket Region",
                                                placeholder: "Enter Bucket Region"
                                            },
                                            {
                                                name: "sbPathPrefix",
                                                label: "Path Prefix",
                                                placeholder: "Enter Path Prefix"
                                            },
                                            {
                                                name: "sbEndpoint",
                                                label: "Supabase S3 Connection Endpoint",
                                                placeholder: "Enter Supabase S3 Connection Endpoint"
                                            },
                                            {
                                                name: "sbAccessKey",
                                                label: "Supabase S3 Access KeyID",
                                                placeholder: "Enter Supabase S3 Access KeyID"
                                            },
                                            {
                                                name: "sbSecretKey",
                                                label: "Supabase S3 Secret Access Key",
                                                placeholder: "Enter Supabase S3 Secret Access Key"
                                            },
                                            {
                                                name: "sbFallbackIndex",
                                                label: "Fallback Index",
                                                placeholder: "Enter Fallback Index"
                                            },
                                        ].map((item) => (
                                            <FormField
                                                key={item.name}
                                                control={form.control}
                                                name={item.name as any}
                                                render={({field}) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel
                                                            className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{item.label}</FormLabel>
                                                        <FormControl><Input placeholder={item.placeholder} {...field}
                                                                            className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none placeholder:text-zinc-400"/></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </>
                                )}

                                {/* --- GCP Credentials (9 Number Modal) --- */}
                                {type === "gcp-credentials" && (
                                    <div className="p-5 border border-zinc-200 rounded-md space-y-5">
                                        <FormField
                                            control={form.control}
                                            name="gcpRefName"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">Credential
                                                        reference name</FormLabel>
                                                    <FormControl><Input
                                                        placeholder="Enter Credential reference name" {...field}
                                                        className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none placeholder:text-zinc-400"/></FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="gcpJson"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">GCP
                                                        Service Account Key (JSON)</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <div
                                                                className="absolute top-0 left-0 right-0 h-4 bg-[#FDF027]/30 rounded-t-lg border-b border-yellow-400/20"/>
                                                            <Textarea
                                                                placeholder=""
                                                                {...field}
                                                                className="min-h-[120px] border-yellow-400 focus-visible:ring-0 bg-white rounded-md shadow-none pt-6 resize-none"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="pt-2">
                                            <h3 className="text-base font-bold text-zinc-900 dark:text-muted-foreground">Bucket
                                                (Optional)</h3>
                                            <p className="text-[12px] text-zinc-500">Configure this section if you want
                                                call recordings to be stored in your Google Cloud Storage bucket.</p>
                                        </div>

                                        {[
                                            {name: "gcpBucketName", label: "Name", placeholder: "Enter Name"},
                                            {
                                                name: "gcpBucketRegion",
                                                label: "Bucket Region",
                                                placeholder: "Enter Bucket Region"
                                            },
                                            {
                                                name: "gcpPathPrefix",
                                                label: "Path Prefix",
                                                placeholder: "Enter Path Prefix"
                                            },
                                            {
                                                name: "gcpHmacAccessKey",
                                                label: "HMAC Access Key",
                                                placeholder: "Enter HMAC Access Key"
                                            },
                                            {
                                                name: "gcpHmacSecret",
                                                label: "HMAC Secret",
                                                placeholder: "Enter HMAC Secret"
                                            },
                                        ].map((item) => (
                                            <FormField
                                                key={item.name}
                                                control={form.control}
                                                name={item.name as any}
                                                render={({field}) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel
                                                            className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{item.label}</FormLabel>
                                                        <FormControl><Input placeholder={item.placeholder} {...field}
                                                                            className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none placeholder:text-zinc-400"/></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}

                                        <div
                                            className="flex items-center gap-1 text-[11px] font-medium text-yellow-600">
                                            Here is the guide on how to create HMAC Keys <ExternalLink size={12}/>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="gcpFallbackIndex"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">Fallback
                                                        Index</FormLabel>
                                                    <FormControl><Input placeholder="Enter Fallback Index" {...field}
                                                                        className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none placeholder:text-zinc-400"/></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* --- AWS S3 (8 Number Modal) --- */}
                                {type === "aws-s3" && (
                                    <>
                                        {[
                                            {
                                                name: "awsAccessKeyId",
                                                label: "AWS Access Key ID",
                                                placeholder: "Enter AWS Access Key ID"
                                            },
                                            {
                                                name: "awsSecretAccessKey",
                                                label: "AWS Secret Access Key",
                                                placeholder: "Enter AWS Secret Access Key"
                                            },
                                            {
                                                name: "s3BucketRegion",
                                                label: "S3 Bucket Region (eg.us-east-1)",
                                                placeholder: "Enter S3 Bucket Region (eg.us-east-1)"
                                            },
                                            {
                                                name: "s3BucketName",
                                                label: "S3 Bucket Region Name",
                                                placeholder: "Enter S3 Bucket Name"
                                            },
                                            {
                                                name: "s3PathPrefix",
                                                label: "S3 Path Prefix (Optional)",
                                                placeholder: "Enter S3 Bucket Name"
                                            },
                                            {
                                                name: "fallbackIndex",
                                                label: "Fallback Index",
                                                placeholder: "Enter Fallback Index"
                                            },
                                        ].map((field) => (
                                            <FormField
                                                key={field.name}
                                                control={form.control}
                                                name={field.name as any}
                                                render={({field: f}) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel
                                                            className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{field.label}</FormLabel>
                                                        <FormControl><Input placeholder={field.placeholder} {...f}
                                                                            className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none placeholder:text-zinc-400"/></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </>
                                )}

                                {/* --- 3 Number Modal: Azure Speech (Select + Input) --- */}
                                {type === "azure-speech" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="region"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger
                                                                className="h-12 border-yellow-400 focus:ring-0 bg-zinc-50/30 rounded-md text-zinc-600 shadow-none w-full">
                                                                <SelectValue placeholder="Select Region"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="australia">australia</SelectItem>
                                                            <SelectItem value="us-east">us-east</SelectItem>
                                                            <SelectItem value="europe-west">europe-west</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="apiUrl"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">API
                                                        URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter API Url" {...field}
                                                               className="h-12 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                {/* --- 4 Number Modal: Custom LLM (API Key + 3 OAuth Fields) --- */}
                                {type === "custom-llm" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="apiKey"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">API
                                                        KEY</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="api-key" {...field}
                                                               className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="pt-2"><h4
                                            className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">OAuth2
                                            Credentials (Optional)</h4></div>
                                        <FormField
                                            control={form.control}
                                            name="oauth2Url"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">Oauth2
                                                        URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter Oaut2 URI" {...field}
                                                               className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="oauth2ClientId"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">OAuth2
                                                        Client ID</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter Oaut2 Client ID" {...field}
                                                               className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="oauth2ClientSecret"
                                            render={({field}) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel
                                                        className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">OAuth2
                                                        Client Secret</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter Oaut2 Client Secret" {...field}
                                                               className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                {/* --- 6 Number: Make.com --- */}
                                {type === "make-com" && (
                                    <>
                                        <FormField control={form.control} name="region" render={({field}) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel
                                                    className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground dark:text-muted-foreground">Region
                                                    (eu1,us1,eu2,us2)</FormLabel>
                                                <FormControl><Input
                                                    placeholder="Enter Region (eu1,us1,eu2,us2)" {...field}
                                                    className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/></FormControl>
                                            </FormItem>
                                        )}/>
                                        <FormField control={form.control} name="apiKey" render={({field}) => (
                                            <FormItem className="space-y-2"><FormLabel
                                                className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">API
                                                Key</FormLabel>
                                                <FormControl><Input placeholder="Enter API Key" {...field}
                                                                    className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/></FormControl>
                                            </FormItem>
                                        )}/>
                                        <FormField control={form.control} name="teamId" render={({field}) => (
                                            <FormItem className="space-y-2"><FormLabel
                                                className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">Team
                                                ID</FormLabel>
                                                <FormControl><Input placeholder="Enter Team ID" {...field}
                                                                    className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/></FormControl>
                                            </FormItem>
                                        )}/>
                                    </>
                                )}

                                {/* --- Common (1, 2, 5): API Key & API URL --- */}
                                {(type === "api-key" || type === "api-url") && (
                                    <FormField control={form.control} name="apiKey" render={({field}) => (
                                        <FormItem className="space-y-2"><FormLabel
                                            className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">API
                                            KEY</FormLabel>
                                            <FormControl><Input placeholder="api-key" {...field}
                                                                className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/></FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                )}
                                {type === "api-url" && (
                                    <FormField control={form.control} name="apiUrl" render={({field}) => (
                                        <FormItem className="space-y-2"><FormLabel
                                            className="text-xs font-bold tracking-widest text-zinc-900 dark:text-muted-foreground uppercase">API
                                            URL</FormLabel>
                                            <FormControl><Input placeholder="Enter API Url" {...field}
                                                                className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md"/></FormControl>
                                        </FormItem>
                                    )}/>
                                )}
                            </div>

                            <div className="border border-yellow-400/60 text-center rounded-md px-4 py-2 ">
                                <p className="text-[#BBAE00] text-base font-medium leading-relaxed">
                                    Credentials are encrypted and stored locally. Altura does not relay sensitive keys
                                    to third-party tracking services.
                                </p>
                            </div>

                        </form>
                    </Form>
                </div>

                <DialogFooter
                    className="flex flex-row justify-end gap-3 sm:gap-3 px-6 py-4 border-t border-zinc-100  z-20">
                    <Button
                        type="submit"
                        form="dynamic-service-form"
                        className="h-11 px-8 bg-[#FDF027] hover:bg-[#e6d920] text-zinc-900 dark:text-muted-foreground font-bold text-sm rounded-md shadow-none"
                    >
                        Establish Connection
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="h-11 px-10 border-[#FF453A]/40 text-[#FF453A] font-medium text-sm rounded-md hover:bg-red-50 hover:text-red-600 shadow-none transition-all"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectServiceModal