// eslint-disable-next-line no-unused-vars
import { Client } from "@notionhq/client";
import 'dotenv/config';

/**
 * @param  {Client} notion
 */
export default function(notion) {
  const pageId = process.env.NOTION_PAGE_ID;

  async function addItem() {
    try {
      const response = await notion.blocks.children.append({
        block_id: pageId,
        children: [
          {
            type: 'embed',
            embed: {
              url: 'www.google.com',
            },
          },
        ],
      });
      console.log(response);
      console.log("Success! Entry added.");
    }
    catch (error) {
      console.error(error.body);
    }
  }

  addItem();
}