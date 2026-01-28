"use client"

import React, {useState} from 'react'
import SipTrunkModal from "@/components/integrations/sip-trunk-modal";
import {DynamicModal} from "@/components/integrations/modals/dynamic-modal";
import IntegrationsCard from "@/components/integrations/integrations-card";

export default function IntegrationsClientSection({initialData}: { initialData: any[] }) {
    const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false);
    const [isSipModalOpen, setIsSipModalOpen] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

    // সার্ভিস অনুযায়ী সঠিক টাইপ রিটার্ন করার লজিক
    const getModalType = (name: string) => {
        const mapping: Record<string, string> = {
            "Server Config": "custom-credential",
            "Supabase": "supabase",
            "Go Cloud Storage": "gcp-credentials",
            "AWS S3": "aws-s3",
            "Make": "make-com",
            "Vonage": "api-url",
            "Deepgram": "api-url",
            "Custom LLM": "custom-llm",
            "Azure Speech": "azure-speech",
        };

        // যদি mapping[name] খুঁজে না পায়, তবে "api-key" রিটার্ন করবে
        return mapping[name] || "api-key";
    }

    const handleConnectClick = (item: any) => {
        setSelectedIntegration(item);

        // SIP Trunk সম্পূর্ণ আলাদা ডিজাইন হওয়ায় আলাদা চেক
        if (item.name === "SIP Trunk") {
            setIsSipModalOpen(true);
        } else {
            setIsDynamicModalOpen(true);
        }
    };

    const handleFinalConnect = (data: any) => {
        console.log(`Connecting to ${selectedIntegration?.name}:`, data);
        // এখানে আপনার API Call বা ব্যাকেন্ড লজিক থাকবে
    };

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            {initialData.map((section, sIdx) => (
                <div key={sIdx} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-[#0D0D12] dark:text-muted-foreground font-bold whitespace-nowrap tracking-tight text-[22px]">
                            {section.title}
                        </h2>
                        <div className="h-[1px] bg-[#DFE1E7] w-full"/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {section.items.map((item: any, iIdx: number) => (
                            <IntegrationsCard
                                key={iIdx}
                                item={item}
                                onConnect={() => handleConnectClick(item)}
                            />
                        ))}
                    </div>
                </div>
            ))}

            <DynamicModal
                open={isDynamicModalOpen}
                setOpen={setIsDynamicModalOpen}
                title={selectedIntegration?.name || ""}
                type={getModalType(selectedIntegration?.name || "")}
                onConnect={handleFinalConnect}
            />

            {/* ৭ নম্বর মোডাল (SIP Trunk) */}
            <SipTrunkModal
                open={isSipModalOpen}
                setOpen={setIsSipModalOpen}
                onConnect={(data) => {
                    console.log("SIP Trunk Data Submitted:", data);
                }}
            />
        </div>
    );
}