import ToolCard from "@/components/tools/tool-card";
import CreateToolButton from "@/components/tools/create-tool-button";

const toolsData = [
    {
        id: "1",
        title: "Knowledge Query",
        category: "Query",
        description: "Search the knowledge base for specific information during a call.",
    },
    {
        id: "2",
        title: "Hang Up",
        category: "End call",
        description: "Gracefully terminate the call after finishing the objective.",
    },
    {
        id: "3",
        title: "G-Calendar",
        category: "Google calendar",
        description: "Sync events and check availability in Google Calendar.",
    },
    {
        id: "4",
        title: "Slack Alert",
        category: "Slack",
        description: "Send a notification to a Slack channel when a call ends.",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col gap-5 transition-colors duration-300 ">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏻</span>
                </h1>
                <p className="mt-2 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                    Extend your agent&#39;s capabilities with custom webhooks, knowledge queries, and third-party
                    integrations.
                </p>
            </div>

            {/* Client Component for Interactivity */}
            <CreateToolButton/>


            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {toolsData.map((tool) => (
                    <ToolCard key={tool.id} tool={tool}/>
                ))}
            </div>

        </div>
    )
}