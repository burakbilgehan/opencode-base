export const EnvProtectionPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // Prevent reading sensitive files
    "tool.execute.before": async (input, output) => {
      const sensitivePatterns = [".env", ".env.local", ".env.production", "credentials", "secret"];
      
      if (input.tool === "read") {
        const filePath = output.args.filePath || "";
        for (const pattern of sensitivePatterns) {
          if (filePath.includes(pattern)) {
            throw new Error(
              `Blocked: Cannot read sensitive file "${filePath}". ` +
              `Files matching patterns [${sensitivePatterns.join(", ")}] are protected.`
            );
          }
        }
      }
    },
  };
};
