// eslint-disable-next-line no-unused-vars
import { Client } from "@notionhq/client";
import 'dotenv/config';

/**
 * @param  {Client} notion
 */
export default function(notion) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  async function addItem(text) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: {
            title: [
              {
                "text": {
                  "content": text,
                },
              },
            ],
          },
        },
      });
      console.log(response);
      console.log("Success! Entry added.");
    }
    catch (error) {
      console.error(error.body);
    }
  }

  addItem("Yurts in Big Sur, California");
}