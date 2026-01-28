import React from 'react'
import {Icons} from "@/components/icons";
import IntegrationsClientSection from "@/components/integrations/integrations-client-section";

// integration data structure
const integrations = [
    {
        title: "Voice & Speech",
        items: [
            {
                name: "Voice & Speech",
                desc: "Ultra-realistic AI text-to-speech.",
                icon: <Icons.voice className="w-10 h-10"/>
            },
            {
                name: "Cartesia",
                desc: "Sonic-speed high-fidelity voice.",
                icon: <Icons.cartesiaIcon className="w-10 h-10"/>
            },
            {
                name: "Azure Speech",
                desc: "Microsoft Cognitive speech services.",
                icon: <Icons.azureIcon className="w-10 h-10"/>
            },
            {
                name: "Deepgram",
                desc: "Real-time STT and audio intelligence.",
                icon: <Icons.deepgramIcon className="w-10 h-10"/>
            },
        ]
    },
    {
        title: "AI Model Providers",
        items: [
            {name: "OpenAI", desc: "GPT-4o and advanced LLM logic.", icon: <Icons.openaiIcon className="w-10 h-10"/>},
            {
                name: "Anthropic",
                desc: "Claude 3.5 Sonnet & Haiku models.",
                icon: <Icons.openaiIcon className="w-10 h-10"/>
            },
            {
                name: "Gemini",
                desc: "Google Multimodal & Flash inference.",
                icon: <Icons.openaiIcon className="w-10 h-10"/>
            },
            {
                name: "Perplexity",
                desc: "Search-grounded answer engine.",
                icon: <Icons.openaiIcon className="w-10 h-10"/>
            },
            {
                name: "Custom LLM",
                desc: "OpenAI-compatible local/private endpoint.",
                icon: <Icons.openaiIcon className="w-10 h-10"/>
            },
        ]
    },
    {
        title: "Carrier & Telephony",
        items: [
            {name: "Twilio", desc: "Global carrier connectivity.", icon: <Icons.twilioIcon className="w-10 h-10"/>},
            {
                name: "Vonage",
                desc: "High-quality carrier infrastructure.",
                icon: <Icons.vonageIcon className="w-10 h-10"/>
            },
            {
                name: "Telnyx",
                desc: "Modern telephony API for real-time apps.",
                icon: <Icons.telnyxIcon className="w-10 h-10"/>
            },
            {
                name: "SIP Trunk",
                desc: "Direct connection to private PBX systems.",
                icon: <Icons.siptrunkIcon className="w-10 h-10"/>
            },
        ]
    },
    {
        title: "Platforms & CRMs",
        items: [
            {name: "Make", desc: "Visual workflow automation.", icon: <Icons.makeIcon className="w-10 h-10"/>},
            {
                name: "GoHighLevel",
                desc: "CRM and marketing automation suite.",
                icon: <Icons.goHighLevelIcon className="w-10 h-10"/>
            },
            {
                name: "Google Sheets",
                desc: "Log call data to spreadsheets.",
                icon: <Icons.googleSheetsIcon className="w-10 h-10"/>
            },
            {
                name: "G-Calendar",
                desc: "Real-time booking and scheduling.",
                icon: <Icons.googleCalendarIcon className="w-10 h-10"/>
            },
            {
                name: "Slack",
                desc: "Send call notifications to channels.",
                icon: <Icons.slackIcon className="w-10 h-10"/>
            },
        ]
    },
    {
        title: "Cloud & Infrastructure",
        items: [
            {name: "AWS S3", desc: "Scalable cloud object storage.", icon: <Icons.awsIcon className="w-10 h-10"/>},
            {
                name: "Go Cloud Storage",
                desc: "Enterprise blob storage.",
                icon: <Icons.googleCloudStorageIcon className="w-10 h-10"/>
            },
            {
                name: "Supabase",
                desc: "Real-time backend and Postgres DB.",
                icon: <Icons.supabaseIcon className="w-10 h-10"/>
            },
            {
                name: "Server Config",
                desc: "Manage custom environment variables.",
                icon: <Icons.serverConfigIcon className="w-10 h-10"/>
            },
        ]
    }
]

export default function Page() {
    return (
        <div className="min-h-screen font-[Inter,sans-serif]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
                    Hola, Carlos <span className="animate-bounce">👋</span>
                </h1>
                <p className="text-zinc-500 max-w-2xl leading-relaxed">
                    Provision local and toll-free numbers from global carriers and link them to your AI agents in one
                    click.
                </p>
            </div>

            <IntegrationsClientSection initialData={integrations}/>
        </div>
    )
}