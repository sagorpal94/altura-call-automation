"use client"
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import CallAgentModal from "@/components/agents/call-agent-modal";
import {useState} from "react";
import {Icons} from "@/components/icons";
import ChatModal from "@/components/tools/chat-modal";

export default function AgentCard({
                                      title,
                                      icon,
                                      role,
                                      description,
                                      yellowIcon = false
                                  }: {
    title: string,
    icon: React.ReactNode,
    role: string,
    description: string,
    yellowIcon?: boolean
}) {
    const [showCallModal, setShowCallModal] = useState(false)
    const [showChatModal, setShowChatModal] = useState(false)
    return (
        <Card
            className="flex flex-col bg-white dark:bg-zinc-950 group shadow-sm border border-gray-100 dark:border-zinc-800 p-6 transition-colors hover:border-blue-400 hover:shadow-lg">
            <div className="mb-4">
                {/* Yellow Icon Background keeps same color, Gray adapts */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${yellowIcon ? 'bg-yellow-400' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                        {icon}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            // onClick={() => onEdit(agent.id)}
                            className="cursor-pointer p-1 rounded-md transition-colors text-slate-400 hover:text-blue-500 "
                            title="Edit Agent"
                        >
                            <Icons.editIcon className="w-5 h-5"/>
                        </button>
                        <button
                            // onClick={() => onDelete(agent.id)}
                            className="cursor-pointer p-1 rounded-md transition-colors text-slate-400 hover:text-red-500 "
                            title="Delete Agent"
                        >
                            <Icons.deleteIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="space-y-3 mt-auto">
                <Button onClick={() => setShowCallModal(true)}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-none border-0">
                    Call Agent
                </Button>
                <Button onClick={() => setShowChatModal(true)} variant="outline"
                        className="w-full border-yellow-400 text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 font-medium bg-transparent">
                    Chat Agent
                </Button>
            </div>

            <CallAgentModal
                open={showCallModal}
                onOpenChange={setShowCallModal}
                agentName={title}
                agentTitle={role}
                agentIcon={<Icons.agent/>}
            />
            <ChatModal agentName={title} open={showChatModal} onOpenChange={setShowChatModal}/>
        </Card>
    )
}