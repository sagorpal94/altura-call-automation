import {Icons} from "@/components/icons"
import AgentCard from "@/components/agents/agent-card";
import CreateAgentCard from "@/components/agents/create-agent-card";

const agents = [
    {
        id: 1,
        name: 'Sarah Support',
        title: 'Customer support',
        description: 'Specializes in empathetic problem solving and customer delight',
        icon: <Icons.dbIcon className="text-black dark:text-black"/>,
    },
    {
        id: 2,
        name: 'Max Market',
        title: 'Sales Executive',
        description: 'Persuasive, high-energy, and expert in product placement',
        icon: <Icons.plusIcon className="text-black dark:text-black"/>,
    },
]
export default function Home() {
    return (
        <div className="flex flex-col h-full text-foreground">
            <div className="flex-1">
                {/* Greeting Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                        Hola, Carlos <span className="text-3xl">👋🏼</span>
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                        Deploy costum-built voices for any case. Connect them to your phone lines in seconds.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Card 1: Sarah Support */}
                    {
                        agents.map(agent => (
                            <AgentCard
                                key={agent.id}
                                title={agent.name}
                                icon={agent.icon}
                                role={agent.title}
                                description={agent.description}
                                yellowIcon
                            />
                        ))
                    }


                    {/* Card 2: Max Market */}
                    {/*<AgentCard*/}
                    {/*    title="Max Market"*/}
                    {/*    icon={<Icons.plusIcon className="text-black dark:text-black"/>}*/}
                    {/*    role="Sales Executive"*/}
                    {/*    description="Persuasive, high-energy, and expert in product features."*/}
                    {/*    yellowIcon*/}
                    {/*/>*/}

                    {/* Card 3: New Agent (Empty State) */}
                    <CreateAgentCard/>


                </div>
            </div>
        </div>
    )
}