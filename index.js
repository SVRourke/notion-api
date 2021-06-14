import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID


const formatResult = (res) => {
  return {
    name: res.properties['Name'].title[0].plain_text, 
    tags: res.properties['Tags'].multi_select.map(o => o.name),
    repo: res.properties.github_repo.url
  }
}

async function addItem() {
  try {
    const items = await notion.databases.query({
      database_id: databaseId,
    })
    const data = items.results.map(r => formatResult(r))
    console.log(data)
  } catch (error) {
    console.error(error.body)
  }
}

addItem()

