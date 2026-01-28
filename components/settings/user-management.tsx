import React from 'react';
import {CreateUserModal} from "@/components/admin/create-user-modal";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import UsersTable from "@/components/settings/users-table";

const UserManagement = () => {
    return (
        <>
            <section className="space-y-6 mt-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-[#0D0D12] dark:text-zinc-100">User Management</h2>
                    </div>
                    <CreateUserModal
                        trigger={
                            <Button
                                className="bg-[#BBAE00] hover:bg-[#9e9800] text-white text-base rounded-md h-11 px-6 gap-3 shadow-none">
                                <Icons.createUser className="h-5 w-5 stroke-[3px]"/>
                                Create User
                            </Button>
                        }
                    />
                </div>

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#828286]"/>
                    <Input
                        placeholder="Search users by name, email, role or company..."
                        className="pl-10 h-12 bg-[#EAEAEB] dark:bg-zinc-900 border-none rounded-lg text-zinc-600 dark:text-zinc-400 placeholder:text-zinc-400"
                    />
                </div>
                <p className="text-[#797A7D] text-sm">Create, edit, and manage system users and their permissions.</p>

                <Card className="py-0 shadow-none rounded-md">
                    <CardContent className="p-6">
                        <UsersTable/>
                    </CardContent>
                </Card>

            </section>
        </>
    );
};

export default UserManagement;