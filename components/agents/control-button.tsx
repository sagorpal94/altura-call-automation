import React from "react";

interface ControlButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void; // Added onClick prop
    isActive?: boolean;   // Optional: to style active states (like recording)
}

export default function ControlButton({icon, label, onClick, isActive}: ControlButtonProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={onClick}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all group
                    ${isActive
                    ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" // Active style
                    : "bg-gray-50 dark:bg-zinc-900 border-transparent hover:border-gray-200 dark:hover:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800" // Default style
                }
                `}
            >
                {icon}
            </button>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
    )
}