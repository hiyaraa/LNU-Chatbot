import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const loader = new CheerioWebBaseLoader(
    "https://www.dropbox.com/scl/fi/38sjzofrgtbhjesxa5yje/handbook.txt?rlkey=nkg6g5ts6mnw8lam39dq8sbqw&st=vbyva1fq&raw=1"
  );
  const docs = await loader.load();
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  export const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);
  
