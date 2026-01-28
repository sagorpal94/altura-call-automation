import PrivateApiKeys from "@/components/api-keys/private-api-keys";
import PublicApiKeys from "@/components/api-keys/public-api-keys";

export default function Page() {
    return (
        <div className="flex flex-col gap-5 font-[Space_Grotesk]">

            {/* --- HEADER SECTION --- */}
            <div className="space-y-1">
                <h1 className="text-4xl md:text-[40px] font-bold text-[#161616] dark:text-muted-foreground flex items-center gap-2">
                    Hola, Carlos <span className="animate-bounce">👋</span>
                </h1>
                <p className="text-[#161616] dark:text-muted-foreground text-lg">
                    Manage your credentials for programatic access to the Altura fleet and web integration.
                </p>
            </div>

            <PrivateApiKeys/>

            <PublicApiKeys/>

        </div>
    )
}