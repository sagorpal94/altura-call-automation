import PrivateApiKeys from "@/components/api-keys/private-api-keys";
import PublicApiKeys from "@/components/api-keys/public-api-keys";

export default function Page() {
    return (
        <div className="flex flex-col gap-5 font-[Space_Grotesk]">

            {/* --- HEADER SECTION --- */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏼</span>
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                    Manage your credentials for programatic access to the Altura fleet and web integration.
                </p>
            </div>

            <PrivateApiKeys/>

            <PublicApiKeys/>

        </div>
    )
}