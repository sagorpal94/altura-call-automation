import React from "react";

export interface Agent {
    id: number;
    name: string;
    role: string;
    description: string;
    icon: React.ReactNode;
}

interface AgentCardProps {
    agent: Agent;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onCall: (id: number) => void;
    onChat: (id: number) => void;
}

export interface AddAgentCardProps {
    onClick: () => void;
}