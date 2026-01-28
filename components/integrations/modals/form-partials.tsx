import React from "react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from "lucide-react"

// ১. Common API Key & URL Fields (OpenAI, Vonage, etc.)
export const CommonFields = ({ control, showUrl }: any) => (
    <>
        <FormField control={control} name="apiKey" render={({ field }) => (
            <FormItem className="space-y-2">
                <FormLabel className="text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-muted-foreground">API KEY</FormLabel>
                <FormControl><Input placeholder="api-key" {...field} className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        {showUrl && (
            <FormField control={control} name="apiUrl" render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-muted-foreground">API URL</FormLabel>
                    <FormControl><Input placeholder="Enter API Url" {...field} className="h-11 border-yellow-400 focus-visible:ring-0 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        )}
    </>
)

// ২. Azure Speech Fields
export const AzureFields = ({ control }: any) => (
    <>
        <FormField control={control} name="region" render={({ field }) => (
            <FormItem className="space-y-2">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="h-12 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none text-zinc-600 w-full">
                            <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="australia">australia</SelectItem>
                        <SelectItem value="us-east">us-east</SelectItem>
                    </SelectContent>
                </Select>
            </FormItem>
        )} />
        <CommonFields control={control} showUrl={true} />
    </>
)

// ৩. GCP Credentials Fields
export const GcpFields = ({ control }: any) => (
    <div className="p-5 border border-zinc-200 rounded-md space-y-5">
        <FormField control={control} name="gcpRefName" render={({ field }) => (
            <FormItem className="space-y-2">
                <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">Credential reference name</FormLabel>
                <FormControl><Input placeholder="Enter Credential reference name" {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
            </FormItem>
        )} />
        <FormField control={control} name="gcpJson" render={({ field }) => (
            <FormItem className="space-y-2">
                <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">GCP Service Account Key (JSON)</FormLabel>
                <FormControl>
                    <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-4 bg-[#FDF027]/30 rounded-t-lg border-b border-yellow-400/20" />
                        <Textarea {...field} className="min-h-[120px] border-yellow-400 focus-visible:ring-0 bg-white rounded-md shadow-none pt-6 resize-none" />
                    </div>
                </FormControl>
            </FormItem>
        )} />
        <div className="pt-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-muted-foreground">Bucket (Optional)</h3>
            <p className="text-[12px] text-zinc-500">Configure call recordings storage in GCP bucket.</p>
        </div>
        {["gcpBucketName", "gcpBucketRegion", "gcpPathPrefix", "gcpHmacAccessKey", "gcpHmacSecret"].map((name) => (
            <FormField key={name} control={control} name={name} render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground capitalize">{name.replace('gcp', '')}</FormLabel>
                    <FormControl><Input placeholder={`Enter ${name}`} {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        ))}
        <div className="flex items-center gap-1 text-[11px] font-medium text-yellow-600">Create HMAC Keys <ExternalLink size={12} /></div>
    </div>
)

// ৪. Supabase Fields
export const SupabaseFields = ({ control }: any) => (
    <>
        {[
            { name: "sbBucketName", label: "Bucket Name" },
            { name: "sbBucketRegion", label: "Bucket Region" },
            { name: "sbPathPrefix", label: "Path Prefix" },
            { name: "sbEndpoint", label: "Supabase S3 Connection Endpoint" },
            { name: "sbAccessKey", label: "Supabase S3 Access KeyID" },
            { name: "sbSecretKey", label: "Supabase S3 Secret Access Key" },
            { name: "sbFallbackIndex", label: "Fallback Index" },
        ].map((item) => (
            <FormField key={item.name} control={control} name={item.name} render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{item.label}</FormLabel>
                    <FormControl><Input placeholder={`Enter ${item.label}`} {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        ))}
    </>
)

// ৫. AWS S3 Fields
export const AwsS3Fields = ({ control }: any) => (
    <>
        {[
            { name: "awsAccessKeyId", label: "AWS Access Key ID" },
            { name: "awsSecretAccessKey", label: "AWS Secret Access Key" },
            { name: "s3BucketRegion", label: "S3 Bucket Region" },
            { name: "s3BucketName", label: "S3 Bucket Name" },
            { name: "s3PathPrefix", label: "S3 Path Prefix (Optional)" },
            { name: "fallbackIndex", label: "Fallback Index" },
        ].map((item) => (
            <FormField key={item.name} control={control} name={item.name} render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{item.label}</FormLabel>
                    <FormControl><Input placeholder={`Enter ${item.label}`} {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        ))}
    </>
)

// ৬. Custom Credential (১১ নম্বর মোডাল)
export const CustomCredentialFields = ({ control }: any) => (
    <>
        <div className="flex justify-end items-center gap-3 flex-col items-end">
            <span className="text-sm font-bold text-zinc-900 dark:text-muted-foreground">Authentication Type</span>
            <FormField control={control} name="authType" render={({ field }) => (
                <FormItem className="w-[180px]">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="h-10 border-yellow-400 bg-white shadow-none"><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="OAuth2.0">OAuth 2.0</SelectItem>
                            <SelectItem value="APIKey">API Key</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )} />
        </div>
        {[
            { name: "credName", label: "Credential Name" },
            { name: "tokenUrl", label: "Token URL" },
            { name: "clientId", label: "Client ID" },
            { name: "clientSecret", label: "Client Secret" },
            { name: "scope", label: "Scope" },
        ].map((item) => (
            <FormField key={item.name} control={control} name={item.name} render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">{item.label}</FormLabel>
                    <FormControl><Input placeholder={`Enter ${item.label}`} {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        ))}
        <div className="space-y-2">
            <h4 className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">Fallback Index</h4>
            <FormField control={control} name="fallbackDisabled" render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-zinc-300" /></FormControl>
                    <label className="text-sm font-medium text-zinc-900 cursor-pointer">Disabled</label>
                </FormItem>
            )} />
        </div>
    </>
)

// ৭. Custom LLM Fields
export const CustomLlmFields = ({ control }: any) => (
    <>
        <CommonFields control={control} showUrl={false} />
        <div className="pt-2"><h4 className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground">OAuth2 Credentials (Optional)</h4></div>
        {["oauth2Url", "oauth2ClientId", "oauth2ClientSecret"].map((name) => (
            <FormField key={name} control={control} name={name} render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-muted-foreground">{name.replace('oauth2', 'OAuth2 ')}</FormLabel>
                    <FormControl><Input placeholder={`Enter ${name}`} {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        ))}
    </>
)

// ৮. Make.com Fields
export const MakeComFields = ({ control }: any) => (
    <>
        {["region", "apiKey", "teamId"].map((name) => (
            <FormField key={name} control={control} name={name} render={({ field }) => (
                <FormItem className="space-y-2">
                    <FormLabel className="text-[15px] font-bold text-zinc-900 dark:text-muted-foreground capitalize">{name}</FormLabel>
                    <FormControl><Input placeholder={`Enter ${name}`} {...field} className="h-11 border-yellow-400 bg-zinc-50/30 rounded-md shadow-none" /></FormControl>
                </FormItem>
            )} />
        ))}
    </>
)