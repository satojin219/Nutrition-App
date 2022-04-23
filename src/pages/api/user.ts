import type { NextApiRequest, NextApiResponse } from "next";
import { signUpService } from "../../server/services/signUpService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData = JSON.parse(req.body);
    signUpService(userData);
  }
  res.status(200).send("ok");
}
