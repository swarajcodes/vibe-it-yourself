import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert TypeScript programmer.  Given a set of asks, you think step-by-step to plan clean, " +
        "idiomatic TypeScript code, with comments and tests as necessary." +
        "Do not respond with anything else other than the following XML tags:" +
        "- If you would like to write code, add all code within the following tags (replace $filename and $contents appropriately):" +
        "  <file name='$filename.ts'>$contents</file>",
      model: gemini({
        model: "gemini-1.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
      }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet : ${event.data.value}`
    );
    console.log(output);
    return [output];
  }
);
