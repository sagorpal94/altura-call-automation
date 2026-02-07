import {AccountProfile, AccountStatus} from "@/types/admin";

export const getStatusStyles = (status: AccountStatus) => {
    switch (status) {
        case 'Active':
            return {dot: 'bg-emerald-500 animate-pulse', text: 'text-emerald-500'};
        case 'Suspended':
            return {dot: 'bg-red-500', text: 'text-red-500'};
        case 'Pending':
            return {dot: 'bg-amber-500', text: 'text-amber-500'};
        default:
            return {dot: 'bg-slate-400', text: 'text-slate-400'};
    }
};

// Simulated Database Fetch
export async function getAccountById(id: string): Promise<AccountProfile | null> {
    // In a real app, this would be: await db.query('SELECT * FROM accounts WHERE id = ?', id)

    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Mock Data (matches your previous table IDs)
    const accounts: Record<string, AccountProfile> = {
        "1": {
            id: "2",
            name: "Alice Cooper",
            company: "Globex Corp",
            email: "alice@globex.com",
            initials: "BV",
            plan: "Pro",
            status: "Active",
            joinedDate: "2024-02-10",
            stats: {
                mtdRevenue: "$1,624.00",
                successRate: "95%",
                totalUsage: "1,240m"
            },
            logs: [
                { id: 1, title: "Plan Renewed", description: "Successfully charged for Pro subscription.", time: "2 days ago" },
                { id: 2, title: "API Key Rotated", description: "Main production key was refreshed by owner.", time: "5 days ago" },
                { id: 3, title: "Agent Deployed", description: "New voice agent 'Support Pro' went live.", time: "1 week ago" }
            ]
        },
        "2": {
            id: "2",
            name: "Bob Vance",
            company: "Acme Inc",
            email: "bob@acme.io",
            initials: "BV",
            plan: "Pro",
            status: "Active",
            joinedDate: "2024-02-10",
            stats: {
                mtdRevenue: "$329.99",
                successRate: "91.1%",
                totalUsage: "1,200m"
            },
            logs: [
                { id: 1, title: "Plan Renewed", description: "Successfully charged for Pro subscription.", time: "2 days ago" },
                { id: 2, title: "API Key Rotated", description: "Main production key was refreshed by owner.", time: "5 days ago" },
                { id: 3, title: "Agent Deployed", description: "New voice agent 'Support Pro' went live.", time: "1 week ago" }
            ]
        },
        "3": {
            id: "3",
            name: "Sarah Connor",
            company: "Cyberdyne",
            email: "s.connor@cyberdyne.tech",
            initials: "BV",
            plan: "Pro",
            status: "Active",
            joinedDate: "2024-02-10",
            stats: {
                mtdRevenue: "$551.50",
                successRate: "90%",
                totalUsage: "1,200m"
            },
            logs: [
                { id: 1, title: "Plan Renewed", description: "Successfully charged for Pro subscription.", time: "2 days ago" },
                { id: 2, title: "API Key Rotated", description: "Main production key was refreshed by owner.", time: "5 days ago" },
                { id: 3, title: "Agent Deployed", description: "New voice agent 'Support Pro' went live.", time: "1 week ago" }
            ]
        },
        "4": {
            id: "4",
            name: "Gavin Belson",
            company: "Hooli",
            email: "gavin@hooli.xyz",
            initials: "BV",
            plan: "Pro",
            status: "Active",
            joinedDate: "2024-02-10",
            stats: {
                mtdRevenue: "$329.99",
                successRate: "91.1%",
                totalUsage: "1,200m"
            },
            logs: [
                { id: 1, title: "Plan Renewed", description: "Successfully charged for Pro subscription.", time: "2 days ago" },
                { id: 2, title: "API Key Rotated", description: "Main production key was refreshed by owner.", time: "5 days ago" },
                { id: 3, title: "Agent Deployed", description: "New voice agent 'Support Pro' went live.", time: "1 week ago" }
            ]
        },
        "5": {
            id: "5",
            name: "Jared Dunn",
            company: "Pied Piper",
            email: "jared@piedpiper.com",
            initials: "BV",
            plan: "Pro",
            status: "Active",
            joinedDate: "2024-02-10",
            stats: {
                mtdRevenue: "$29.99",
                successRate: "91.1%",
                totalUsage: "1,200m"
            },
            logs: [
                { id: 1, title: "Plan Renewed", description: "Successfully charged for Pro subscription.", time: "2 days ago" },
                { id: 2, title: "API Key Rotated", description: "Main production key was refreshed by owner.", time: "5 days ago" },
                { id: 3, title: "Agent Deployed", description: "New voice agent 'Support Pro' went live.", time: "1 week ago" }
            ]
        },
        // You can add data for Alice (id: 1) here...
    };

    return accounts[id] || null;
}