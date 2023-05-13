import { createApolloClientSSR } from "@/lib/apolloClient";
import { QUERY_SITE_MAP } from "@/utils/queries";

function generateSiteMap(games: [string]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>www.https://beforeyouplay.info</loc>
     </url>
     ${games
       .map((title: string) => {
         return `
       <url>
           <loc>${`https://www.beforeyouplay.info/games/${title}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any}) {
  const apolloClient = createApolloClientSSR();
  const { data } = await apolloClient.query({
    query: QUERY_SITE_MAP
  });
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data.siteMap);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;