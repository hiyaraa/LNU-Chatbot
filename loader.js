import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const loader = new CheerioWebBaseLoader(
    "https://en.wikipedia.org/wiki/Leyte_Normal_University"
  );
  const docs = await loader.load();
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  export const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);

  