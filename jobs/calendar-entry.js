// eslint-disable-next-line no-unused-vars
import { Client } from "@notionhq/client";
import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * @param  {Client} notion
 */
export default function(notion) {
  const databaseId = process.env.CALENDAR_DATABASE_ID;

  async function addItem() {
    await fetch(`${process.env.REPO_URL}commits`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async json => {
        const response = await notion.pages.create({
          parent: { database_id: databaseId },
          properties: {
            title: {
              title: [
                {
                  "text": {
                    "content": json[0].commit.message,
                  },
                },
              ],
            },
            Author: {
              multi_select: [
                {
                  name: json[0].committer.login,
                },
              ],
            },
            URL: {
              files: [
                {
                  name: "Commit",
                  type: 'external',
                  external: {
                    url: json[0].html_url,
                  },
                },
              ],
            },
            Branch: {
              files: [
                {
                  name: "Branch",
                  type: 'external',
                  external: {
                    url: `${process.env.REPO_URL}branches?sha=${json[0].sha}`,
                  },
                },
              ],
            },
          },
        });
        console.log(response);
        console.log("Success! Entry added.");
      });

  }

  addItem();
}