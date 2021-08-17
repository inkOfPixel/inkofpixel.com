import { NextApiRequest } from "next";
import { IncomingWebhook } from "@slack/webhook";

const url = process.env.SLACK_WEBHOOK_URL!;

const webhook = new IncomingWebhook(url);

console.log("url", url);

export default async function handler(req: NextApiRequest) {
  const parsedBody = JSON.parse(req.body);
  await webhook.send({
    channel: "general",
    text: "Someone has left a message!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: parsedBody.data.email,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${parsedBody.data.name}*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: parsedBody.data.message,
        },
      },
    ],
  });
}
