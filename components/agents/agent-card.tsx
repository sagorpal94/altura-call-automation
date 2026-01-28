"use client"
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import CallAgentModal from "@/components/agents/call-agent-modal";
import {useState} from "react";
import {Icons} from "@/components/icons";

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
    return (
        <Card className="flex flex-col bg-white dark:bg-zinc-950 shadow-sm border border-gray-100 dark:border-zinc-800 p-6 transition-colors">
            <div className="mb-4">
                {/* Yellow Icon Background keeps same color, Gray adapts */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${yellowIcon ? 'bg-yellow-400' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                    {icon}
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
                <Button onClick={() => setShowCallModal(true)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-none border-0">
                    Call Agent
                </Button>
                <Button variant="outline" className="w-full border-yellow-400 text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 font-medium bg-transparent">
                    Chat Agent
                </Button>
            </div>

            <CallAgentModal
                open={showCallModal}
                onOpenChange={setShowCallModal}
                agentName={title}
                agentTitle={role}
                agentIcon={<Icons.agent />}
            />
        </Card>
    )
}