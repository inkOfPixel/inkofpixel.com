import { STRAPI_JWT } from "react-tinacms-strapi";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const previewData = {
    strapi_jwt: req.cookies[STRAPI_JWT],
  };

  res.setPreviewData(previewData);
  res.status(200).end();
};

export default handler;
