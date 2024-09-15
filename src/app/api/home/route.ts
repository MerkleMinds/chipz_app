import { NextRequest, NextResponse } from "next/server";
import homepage from "@/utils/data/homepage.json" with { type: "json" };

export function GET(_request: NextRequest) {
    return NextResponse.json(homepage);
}
