export const EnvProtectionPlugin = async ({ project, client, $, directory, worktree }) => {
  // Patterns that match sensitive file NAMES (not arbitrary substrings)
  // Uses regex to avoid false positives like "my-environment-setup.md"
  const sensitiveFilePatterns = [
    /(?:^|[/\\])\.env$/,                    // .env
    /(?:^|[/\\])\.env\.[a-zA-Z0-9._-]+$/,  // .env.local, .env.production, etc.
    /(?:^|[/\\])credentials\.json$/,
    /(?:^|[/\\])\.credentials$/,
    /(?:^|[/\\])secrets?\.(json|ya?ml|toml|txt)$/,
    /(?:^|[/\\])\.secret$/,
    /(?:^|[/\\]).*\.pem$/,
    /(?:^|[/\\]).*\.key$/,
  ];

  // Allowlist: files that look sensitive but are safe
  const allowedPatterns = [
    /\.env\.example$/,
    /\.env\.template$/,
    /\.env\.sample$/,
  ];

  function isSensitivePath(filePath) {
    if (!filePath) return false;
    // Normalize path separators
    const normalized = filePath.replace(/\\/g, "/");
    // Check allowlist first
    if (allowedPatterns.some((pattern) => pattern.test(normalized))) {
      return false;
    }
    return sensitiveFilePatterns.some((pattern) => pattern.test(normalized));
  }

  // Patterns for bash commands that could read sensitive files
  // Matches: cat .env, head .env.local, tail -n 5 .env, grep pattern .env, etc.
  const bashReadCommands = [
    "cat", "head", "tail", "less", "more", "type",           // read file content
    "grep", "rg", "ag", "findstr",                            // search in files
    "cp", "copy", "mv", "move",                               // copy/move sensitive files
    "curl", "wget",                                            // upload via curl -d @.env
    "base64", "xxd", "od",                                     // encode file content
    "source", "\\.",                                            // source .env (shell)
  ];

  function bashCommandTargetsSensitiveFile(command) {
    if (!command) return false;
    // Check if any sensitive file pattern appears as an argument in the command
    // We look for .env-like tokens in the command string
    const tokens = command.split(/\s+/);
    for (const token of tokens) {
      // Skip the command itself and flags
      if (token.startsWith("-")) continue;
      if (isSensitivePath(token)) return true;
    }
    // Also check for redirection targets and inline patterns
    // e.g., "cat < .env" or "echo > .env"
    const redirectionPattern = /[<>]\s*(\S+)/g;
    let match;
    while ((match = redirectionPattern.exec(command)) !== null) {
      if (isSensitivePath(match[1])) return true;
    }
    return false;
  }

  return {
    "tool.execute.before": async (input, output) => {
      // Guard 1: Block read tool from accessing sensitive files
      if (input.tool === "read") {
        const filePath = output.args.filePath || "";
        if (isSensitivePath(filePath)) {
          throw new Error(
            `Blocked: Cannot read sensitive file "${filePath}". ` +
            `Sensitive files (.env, credentials, secrets, keys) are protected. ` +
            `Use .env.example for templates.`
          );
        }
      }

      // Guard 2: Block glob tool from targeting sensitive patterns
      if (input.tool === "glob") {
        const pattern = output.args.pattern || "";
        if (/\.env/i.test(pattern) || /credential/i.test(pattern) || /secret/i.test(pattern)) {
          throw new Error(
            `Blocked: Cannot glob for sensitive file patterns "${pattern}". ` +
            `Sensitive files are protected.`
          );
        }
      }

      // Guard 3: Block grep tool from searching in sensitive files
      if (input.tool === "grep") {
        const include = output.args.include || "";
        if (/\.env/i.test(include) || /credential/i.test(include) || /secret/i.test(include)) {
          throw new Error(
            `Blocked: Cannot search in sensitive file patterns "${include}". ` +
            `Sensitive files are protected.`
          );
        }
      }

      // Guard 4: Block bash commands that target sensitive files
      if (input.tool === "bash") {
        const command = output.args.command || "";
        if (bashCommandTargetsSensitiveFile(command)) {
          throw new Error(
            `Blocked: Bash command targets a sensitive file. ` +
            `Commands that read, copy, or manipulate .env, credentials, secrets, or key files are not allowed. ` +
            `Command: "${command}"`
          );
        }
      }

      // Guard 5: Block edit/write to sensitive files
      if (input.tool === "edit" || input.tool === "write" || input.tool === "patch" || input.tool === "multiedit") {
        const filePath = output.args.filePath || "";
        if (isSensitivePath(filePath)) {
          throw new Error(
            `Blocked: Cannot modify sensitive file "${filePath}". ` +
            `Sensitive files must be edited manually.`
          );
        }
      }
    },
  };
};
