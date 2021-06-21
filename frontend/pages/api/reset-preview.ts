import { NextApiHandler } from "next";

const handler: NextApiHandler = (_req, res) => {
  res.clearPreviewData();
  res.status(200).end();
};

export default handler;
