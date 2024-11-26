import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { vectorStore } from "./embeddings.js";
import { ollamaLlm } from "./llms.js";

const prompt = PromptTemplate.fromTemplate(
  "You are an AI assistant of a school. Your task is to answer and explain in detail all user questions regarding the website given.: {context}"
);

const chain = await createStuffDocumentsChain({
  llm: ollamaLlm,
  outputParser: new StringOutputParser(),
  prompt,
});

const question = "Who is the president?";
const docs = await vectorStore.similaritySearch(question);
const answer = await chain.invoke({
  context: docs,
});

console.log(
    "Question:", question,"\n",
    "Answer:", answer
);