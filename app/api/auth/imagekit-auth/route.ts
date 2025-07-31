/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
    try {
        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string
        });

        return Response.json({ 
            authenticationParameters, 
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        });

    } catch (error) {
        return Response.json(
            {
                error: "Authentication for Imagekit failed.",
            },
            { status: 500 },
        );
    }
}