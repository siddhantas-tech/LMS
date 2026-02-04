import { useState } from "react";
import { Search, Download, Shield, ShieldAlert, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock User Data
const MOCK_USERS = [
    { id: "1", name: "Alex Chen", email: "alex.chen@riidl.org", role: "student", joined: "2024-01-15" },
    { id: "2", name: "Sarah Smith", email: "sarah.smith@riidl.org", role: "admin", joined: "2023-11-20" },
    { id: "3", name: "Mike Johnson", email: "mike.j@riidl.org", role: "student", joined: "2024-02-01" },
    { id: "4", name: "Emily Davis", email: "emily.d@riidl.org", role: "instructor", joined: "2023-12-10" },
    { id: "5", name: "David Wilson", email: "david.w@riidl.org", role: "student", joined: "2024-01-25" },
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = MOCK_USERS.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest gap-1"><ShieldAlert className="w-3 h-3" /> Admin</Badge>;
            case "instructor":
                return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest gap-1"><Shield className="w-3 h-3" /> Instructor</Badge>;
            default:
                return <Badge variant="outline" className="text-muted-foreground border-foreground/10 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest gap-1"><UserIcon className="w-3 h-3" /> Student</Badge>;
        }
    };

    return (
        <main className="w-full max-w-7xl mx-auto px-8 py-8">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Users</h1>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-70">Personnel Registry</p>
            </div>

            {/* Toolbar: Search & Export */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-4 w-full">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search personnel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-10 pl-9 border-2 border-foreground/10 rounded-xl font-bold bg-card text-sm focus-visible:ring-primary/20"
                        />
                    </div>
                    <Button className="h-10 px-4 rounded-xl font-bold text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-foreground bg-primary text-primary-foreground hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                        <Download className="mr-2 h-3.5 w-3.5" /> EXPORT CSV
                    </Button>
                </div>
            </div>

            {/* Users Table */}
            <Card className="border-2 border-foreground rounded-3xl bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/5 border-b-2 border-foreground/10">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">User</TableHead>
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</TableHead>
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Role</TableHead>
                                <TableHead className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-muted/5 border-b border-foreground/5 last:border-0">
                                        <TableCell className="px-6 py-2.5 font-bold">
                                            <div className="flex items-center gap-3">
                                                <div className="h-7 w-7 rounded-md bg-foreground/5 flex items-center justify-center font-black text-[10px] border border-foreground/10">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="text-sm">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-2.5 text-xs font-medium text-muted-foreground">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-6 py-2.5">
                                            {getRoleBadge(user.role)}
                                        </TableCell>
                                        <TableCell className="px-6 py-2.5 text-right text-[10px] font-bold text-muted-foreground font-mono">
                                            {user.joined}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                        No personnel found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
