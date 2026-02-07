"use client"
import {Icons} from "@/components/icons";
import AgentForm from "@/components/create-agent-form/agent-form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {agentFormSchema} from "@/schemas/agent-schema";
import {Form} from "@/components/ui/form";
import AgentConfiguration from "@/components/create-agent-form/agent-configuration";
import {useState} from "react";
import {cn} from "@/lib/utils";
import VoiceTabForm from "@/components/create-agent-form/voice-tab-form";
import ToolsConfiguration from "@/components/create-agent-form/tools-configuration";
import AnalysisTabForm from "@/components/create-agent-form/analysis-tab-form";
import AdvancedTabForm from "@/components/create-agent-form/advanced-tab-form";
import { ChevronDown, Check } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const agents = [
    { id: "1", name: "My Agents", initial: "P" },
    { id: "2", name: "Sales Bot", initial: "S" },
    { id: "3", name: "Support AI", initial: "A" },
]

export default function Page() {
    const [activeTab, setActiveTab] = useState("model")
    const [selected, setSelected] = useState(agents[0])

    const form = useForm({
        resolver: zodResolver(agentFormSchema),
        defaultValues: {
            // --- Agent Information (Model Tab) ---
            name: "",
            description: "",
            internalRole: "",
            latency: "~470ms", // Read-only but kept in state
            costPerMin: "$0.05",

            // --- Model Configuration ---
            llmProvider: "",
            modelSelection: "",
            systemInstruction: "",
            firstMessage: "Hello, how can I help you today?",
            maxTokens: 250,
            temperature: [0.5], // Slider uses array

            // --- Voice Tab ---
            voiceProvider: "",
            voiceSelection: "",
            manualVoiceId: false,
            voiceId:"",
            model: "zephyr-01",
            backgroundSound: "None",
            backgroundSoundUrl: "",
            mainCharacters: "30",
            punctionBoundaries: "",
            stability: [0.5],
            clarity: [0.5],
            speed: [0.5],
            styleExaggeration: [0.5],
            optimizeLatency: [0.5],

            // --- Tools Tab ---
            // ইমেজে নলেজ কোয়েরি এবং হ্যাং আপ সিলেক্টেড ছিল
            enabledTools: ["knowledge_query", "hang_up"],

            // --- Analysis Tab ---
            // ইমেজে কল সামারি সাধারণত ডিফল্ট থাকে
            enabledAnalyses: ["call_summary"],

            // --- Advanced Tab ---
            hipaaCompliance: false,
            audioRecording: false,
            logging: false,
            transcript: false,
            audioRecordingFormat: "mp3",
            videoRecording: false,
        },
    })

    function onSubmit(values: any) {
        console.log(values)
    }

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-muted-foreground flex items-center gap-2">
                    Hola, Carlos <span className="text-2xl">👋🏼</span>
                </h1>
                <p className="text-gray-500 dark:text-muted-foreground">Let&#39;s Create New Agent</p>
            </div>

            <div className="flex items-baseline gap-5">
                <div className="w-64">
                    <div className="space-y-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {/* মেইন কন্টেইনার ডিজাইন */}
                                <div className="flex items-center gap-4 p-2 pl-3 pr-4 rounded-[20px] bg-white dark:bg-muted border border-zinc-100 shadow-sm cursor-pointer hover:bg-zinc-50 transition-all w-fit min-w-[240px]">

                                    {/* বাম পাশের আইকন বক্স (P) */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-50 dark:bg-muted text-lg font-semibold text-zinc-900 dark:text-muted-foreground border border-zinc-100">
                                        {selected.initial}
                                    </div>

                                    {/* টেক্সট */}
                                    <span className="flex-1 text-md font-bold text-zinc-900 dark:text-muted-foreground">
                                        {selected.name}
                                      </span>

                                    {/* ডাউন অ্যারো */}
                                    <ChevronDown className="h-5 w-5 text-zinc-900 dark:text-muted-foreground stroke-[2.5px]" />
                                </div>
                            </DropdownMenuTrigger>

                            {/* ড্রপডাউন লিস্ট */}
                            <DropdownMenuContent align="start" className="w-[240px] rounded-xl p-2">
                                {agents.map((agent) => (
                                    <DropdownMenuItem
                                        key={agent.id}
                                        onClick={() => setSelected(agent)}
                                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 dark:bg-muted text-sm font-bold">
                                            {agent.initial}
                                        </div>
                                        <span className="flex-1 font-medium">{agent.name}</span>
                                        {selected.id === agent.id && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-gray-100 dark:bg-muted px-3 py-2 text-sm font-bold text-gray-900 dark:text-muted-foreground">
                            <Icons.createAgentIcon className="h-4 w-4"/>
                            Create New Agent
                        </button>
                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <Icons.clockIcon className="h-4 w-4"/>
                            All my agents
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <AgentForm/>

                            <div
                                className="flex gap-6 justify-center border rounded-md border-[#D4D4D4] overflow-x-auto no-scrollbar">
                                {["model", "voice", "tools", "analysis", "advanced"].map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "cursor-pointer py-4 text-sm font-bold capitalize transition-all relative",
                                            activeTab === tab
                                                ? "text-blue-600 "
                                                : "text-slate-400 hover:text-slate-600"
                                        )}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <div
                                                className="absolute bottom-[12px] left-0 right-0 h-0.5 bg-blue-500"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="">
                                {activeTab === "model" && (
                                    <AgentConfiguration/>
                                )}

                                {/* Placeholder for other tabs */}
                                {activeTab === "voice" && (
                                    <VoiceTabForm/>
                                )}
                                {activeTab === "tools" && (
                                    <ToolsConfiguration/>
                                )}
                                {activeTab === "analysis" && (
                                    <AnalysisTabForm/>
                                )}
                                {activeTab === "advanced" && (
                                    <AdvancedTabForm/>
                                )}
                            </div>


                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}