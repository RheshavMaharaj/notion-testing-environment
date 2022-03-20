import { Client } from "@notionhq/client";
import 'dotenv/config';

import Example from './examples/database-entry.js';
import Commit from './jobs/github-commits.js';
import Issue from './jobs/github-issues.js';
import Calendar from './jobs/calendar-entry.js';

const notion = new Client({ auth: process.env.NOTION_KEY });

const automationWrapper = {
  example: Example(notion),
  commit: Commit(notion),
  issue: Issue(notion),
  calendar: Calendar(notion),
};

automationWrapper[process.argv0];