# Contributing to AtlasAI

Thanks for your interest in contributing to AtlasAI! This guide is for everyone, including first-time contributors. AtlasAI is currently a project foundation: some apps, services, and workflows are planned but not implemented yet. Check the relevant documentation before starting work, and avoid treating planned designs as existing runtime behavior.

## Before you start

1. Read the [project overview](README.md) to understand the repository.
2. Check the relevant design docs, such as [architecture](docs/architecture.md), [database design](docs/database-design.md), and [API design](docs/api-design.md).
3. Look at open issues or discussions, if available, to avoid duplicating work. For a large change or a new feature, open an issue or discussion first so the scope can be agreed on.
4. Make sure Git is installed. Install language runtimes or dependencies only when required by the component you are changing.

## Set up your local copy

Replace `<your-fork-url>` with the URL of your fork. If you have permission to contribute directly, you can clone the project repository instead.

```bash
git clone <your-fork-url>
cd atlas-ai
git remote add upstream https://github.com/shubhshot17/atlas-ai.git
git switch main
git pull upstream main
```

Create a branch before making changes:

```bash
git switch -c docs/add-contributing-guide
```

If you cloned the project repository directly, skip `git remote add upstream` and use the repository's normal process for keeping your local `main` up to date.

## Branch naming

Use lowercase names with hyphens. Start with a short type that describes the work:

- `feat/` — a user-facing feature
- `fix/` — a bug fix
- `docs/` — documentation-only changes
- `refactor/` — restructuring without intentional behavior changes
- `test/` — adding or improving tests
- `chore/` — maintenance and tooling

Add a short, specific description after the prefix, such as `feat/trip-sharing`, `fix/date-validation`, or `docs/api-examples`. Keep a branch focused on one change.

## Make your changes

- Follow the existing structure and style of the component you are changing. If conventions are not established yet, favor simple, readable, maintainable solutions.
- Keep changes focused. Update related documentation when behavior, setup, or design changes.
- Add or update tests when changing implemented behavior. Do not claim a planned feature is implemented unless the code is actually present.
- Never commit credentials, API keys, private user data, or other secrets. Use documented environment variables and safe example values.
- Avoid unrelated formatting or cleanup changes that make a review harder.

## Code quality expectations

Before opening a pull request, make sure your change:

- has a clear purpose and handles relevant error cases;
- follows the component's established naming, formatting, and architectural patterns;
- does not introduce unnecessary dependencies or expose secrets;
- includes suitable tests for changed behavior, where a test setup exists; and
- updates documentation that would otherwise become inaccurate.

For documentation-only changes, check spelling, links, examples, and consistency with the current repository. Do not invent commands, features, or guarantees that the project does not support.

## Testing and checks

There is not currently a repository-wide test command or configured test runner. For the component you change:

1. Read its `README` and package or service configuration for the available setup, lint, type-check, build, and test commands.
2. Install only that component's documented dependencies if they are needed.
3. Run the relevant checks for your change. For application behavior, run focused tests and any applicable lint, type-check, or build commands. Add tests for new behavior when practical.
4. If a check cannot be run because the required tooling or implementation is not present, say so in your pull request rather than implying it passed.
5. Review the final changes with `git diff` and check for whitespace errors with:

   ```bash
   git diff --check
   ```

For documentation-only contributions, manually verify the rendered Markdown structure and any relative links, then run `git diff --check`.

## Commit messages

Use a short Conventional Commit-style subject:

```text
<type>(optional-scope): <imperative summary>
```

Common types are `feat`, `fix`, `docs`, `refactor`, `test`, and `chore`. Examples:

```text
docs(api): add itinerary endpoint examples
feat(trips): support trip collaborators
fix(web): handle empty destination results
```

Keep the subject concise and focused on what the commit does. Use the body to explain context or trade-offs when the subject is not enough. Avoid vague messages such as `changes` or `updates`.

## Pull requests

When your work is ready:

1. Push your branch and open a pull request against `main`.
2. Give the PR a descriptive title using the same conventions as commit messages.
3. Explain the problem and the approach. Link the related issue or discussion, if one exists.
4. Summarize the main changes and list the checks you ran, including any checks you could not run and why.
5. Include screenshots or short recordings for visual changes when useful. For API or design changes, include representative examples.
6. Confirm that the PR is focused, documentation is current, and no secrets or unrelated files are included.
7. Respond to review feedback and update the PR until it is ready to merge.

Please keep pull requests small enough to review comfortably. If the work grows beyond its original scope, consider splitting it into separate PRs.

## Questions

If anything in this guide is unclear, or you are unsure where a change belongs, open an issue or discussion before investing in a large change. We appreciate thoughtful questions and contributions at every experience level.
