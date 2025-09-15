import { generateText } from "ai";
import { google } from "@ai-sdk/google";   // Import the google module from the ai-sdk package

// Specify the model to use for generating text and a prompt
const { text } = await generateText({
  model: google("models/gemini-2.5-flash"),   
  prompt: "What is an AI agent?", 
});

console.log(text);