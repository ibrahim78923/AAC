## Development

Clone the Project `git clone <remote url>`.

Install Dependencies using `npm ci`.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses google font weight and jakara plus family [`next/font`](https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap)

## Commit Format

We use the Conventional Commits format for our commit messages. Each commit message should have a specific format:

Format: `<type>(<scope>): <subject> (<issue number>)`

`<scope>` is optional

feat(hat): Implemented responsive design for the homepage and resolved compatibility issues with older browsers. (#2223)
^--^^--^      ^------------^ ^----^
|   |         |               |
|   |         |               +-----> Issue number.
|   |         |
|   |         +-> Summary in present tense.
|   |              
|   +-> Specific scope           
|
|
+-------> Type: chore, docs, feat, fix, refactor, style, breaking or test.
More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
- `breaking`: (introduces a breaking change which is affecting other things too)


Please follow this format when making commits to our project. It helps us maintain a clean and organized commit history.


## Best Practices

### Folder Name For Components

- Use descriptive and meaningful names for your component folders. Folder names should be in Pascal Case (e.g., `MyComponent`) and start with an uppercase letter.

### Page Name

- Use descriptive and meaningful names for your page files. Page names should be in kebab-case (e.g., `my-page`).
- There should be only one main component in each page, and the name should be suffixed with "Page," i.e., `SignUpPage`.

### Component Name

- Use descriptive and meaningful names for your components. Component names should be in PascalCase (e.g., `MyComponent`).
- Component file name should be `index.tsx`.

### Variable, CSS Class, and Function Name

- Use camel case for variable and function names (e.g., `myVariableName`).
- CSS class names should be in kebab-case (e.g., `my-page`).

### Component Modularity

- Keep components small. Break down complex components into smaller, reusable components.

### Conditional Rendering

- Use conditional statements (e.g., if statements, ternary operators) to conditionally render parts of a component.
- Avoid complex logic in JSX. Consider extracting complex rendering logic into helper functions or separate components.

### Comments

- Write comments for complex logic or non-obvious behavior.

### Error Handling

- Implement proper error handling in your components, including validation of incoming props and handling unexpected errors gracefully.

### Debugging Statements

- Before committing, ensure that all debugging statements, including console statements, are removed or commented out.

### Absolute Path

- Use absolute paths instead of relative paths for module imports.
  - Example: `import MyComponent from "@components/MyComponent"` (absolute path) instead of `import MyComponent from "../../components/ComponentName"` (relative path).

### Local Utils

- Keep component-level functions in separate files within the same folder along with the component. For example, functions in `MyComponent` component should be placed in `MyComponent.ts` file.

### isNullOrEmpty Global Utility Function

- Use the `isNullOrEmpty` utility function to check objects, arrays, and strings for emptiness.

### Commit Message

- Keep commit messages elaborative and meaningful.

### Rules For Making PR

- When making a pull request (PR), follow these rules:
  - Mention the ticket link.
  - Provide a reasonable description of the changes.
  - Be responsive to comments from project leads.
  - Name your branch according to the Jira ticket number followed by a brief description (e.g., `1234-authentication-added`).

Additional Best Practices:
- Use arrow functions.
- Append "Page" suffix to page names.
- Place styles at the top of the main component.
- Use the ternary operator.
- Mention the module name/role name with pages and folder names.
- Use arrow functions for your code.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
