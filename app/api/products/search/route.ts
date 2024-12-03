import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || ' ';

  const product = await prisma.product.findMany({
    where: {
        name: {
            contains: query,
            // чувствительность к регистру
            mode : 'insensitive'
        },
    },
    take: 5,
  })
  return NextResponse.json(product);
}
