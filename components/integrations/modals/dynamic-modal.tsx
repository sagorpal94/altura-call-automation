"use client"
import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Form} from "@/components/ui/form"
import {ModalWrapper} from "./modal-wrapper"
import * as Partials from "./form-partials"
import {formSchema} from "@/schemas/integrations-schema";


export const DynamicModal = ({open, setOpen, title, type, onConnect}: any) => {
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
    });

    const getTitle = () => {
        const titles: Record<string, string> = {
            "custom-credential": "New Custom Credential",
            "aws-s3": "AWS S3 credentials",
            "make-com": "make.com",
            "supabase": "Supabase credentials",
            "gcp-credentials": "GCP credentials",
        };
        return titles[type] || `Connect ${title}`;
    }

    return (
        <ModalWrapper open={open} setOpen={setOpen} title={getTitle()} formId="integration-form">
            <Form {...form}>
                <form id="integration-form" onSubmit={form.handleSubmit(onConnect)}>
                    <div className="p-5 border border-zinc-200 rounded-xl space-y-5 bg-white">

                        {/* কন্ডিশনাল রেন্ডারিং - একদম ক্লিন স্ট্রাকচার */}
                        {type === "api-key" && <Partials.CommonFields control={form.control} showUrl={false} />}
                        {type === "api-url" && <Partials.CommonFields control={form.control} showUrl={true} />}
                        {type === "azure-speech" && <Partials.AzureFields control={form.control} />}
                        {type === "aws-s3" && <Partials.AwsS3Fields control={form.control} />}
                        {type === "gcp-credentials" && <Partials.GcpFields control={form.control} />}
                        {type === "supabase" && <Partials.SupabaseFields control={form.control} />}
                        {type === "custom-credential" && <Partials.CustomCredentialFields control={form.control} />}
                        {type === "custom-llm" && <Partials.CustomLlmFields control={form.control} />}
                        {type === "make-com" && <Partials.MakeComFields control={form.control} />}
                    </div>
                </form>
            </Form>
        </ModalWrapper>
    );
}