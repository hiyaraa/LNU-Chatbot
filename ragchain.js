import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { vectorStore } from "./embeddings.js";
import { ollamaLlm } from "./llms.js";

const prompt = PromptTemplate.fromTemplate(
  "You are an AI assistant who is knowledgeable about the Student Handbook. Answer the questions in detail.: {question}\nContext: {context}\nAnswer:"
);
const chain = await createStuffDocumentsChain({
  llm: ollamaLlm,
  outputParser: new StringOutputParser(),
  prompt,
});

export const question = "Tell me a brief history";

const docs = await vectorStore.similaritySearch(question);
const answer = await chain.invoke({
  question : question,
  context: docs,
});

console.log(
  " Question:", question, "\n",
  "Answer:", answer,
);

