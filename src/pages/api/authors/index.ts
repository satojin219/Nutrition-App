import { Author } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author[] | Author>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const authors = await prisma.author.findMany();
      console.log(authors);
      res.status(200).json(authors);
      break;

    case "POST":
      const author = await prisma.author.create({
        data: {
          name: "King nob",
        },
      });
      console.log("POST");
      res.status(200).json(author); // idを含む保存したデータを返す

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
