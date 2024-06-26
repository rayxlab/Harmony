import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/utils/currentProfile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Create the server in database
        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        { name: "general", profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN }
                    ]
                }
            }
        });

        return NextResponse.json(server);
        //returns JSON object

    } catch (error) {
        console.log("[SERVERS_POST_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}