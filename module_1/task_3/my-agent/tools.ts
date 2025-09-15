import { z } from "zod";
import { tool } from "ai";
import { simpleGit } from "simple-git";

const excludeFiles = ["dist", "bun.lock"];

const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
});

type FileChange = z.infer<typeof fileChange>;

//const excludeFiles = ["dist", "bun.lock"];

async function getFileChangesInDirectory({ rootDir }: FileChange) {
  const git = simpleGit(rootDir);
  // Check for the most recent commit
  const summary = await git.diffSummary(['HEAD~1']);
  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue;
    const diff = await git.diff(['HEAD~1', '--', file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs;
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes made in given directory",
  inputSchema: fileChange,
  execute: getFileChangesInDirectory,
});