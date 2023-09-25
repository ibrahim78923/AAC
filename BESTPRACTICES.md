Best Practices 

 

Folder Name For components:  

Use descriptive and meaningful names for your Folder. Folder names should be in Pascal Case (e.g., MyComponent) and start with an uppercase letter. 

 

Page  Name: 

Use descriptive and meaningful names for your Page. Page names should be in kebab-case (e.g., my-page) 

Note: There should be only one main Component in page  and the name should be suffix with Page i.e SignUpPage

Component Name:  

Use descriptive and meaningful names for your components. Component names should be in PascalCase e.g., MyComponent. 
Component file name is index.tsx



Variable,css Class and Function Name: 

 use camel case for variable and function names. Camelcase means starting with a lowercase letter and using uppercase letters to separate words, e.g., myVariableName. 

Css class name should be in kebab-case (e.g,my-page) 

 

Component Modularity: 

 Keep components small. Break down complex components into smaller, reusable components. 


 Conditional Rendering:  

Use conditional statements (e.g., if, ternary operators) to conditionally render parts of a component. 

Avoid complex logic in JSX. If your rendering logic becomes too complex, consider extracting it into helper functions or separate components 

 

Comments:  

Write comments for complex logic or non-obvious behavior  

 

Error Handling: 

Implement proper error handling in your components, including validation of incoming props and handling unexpected errors gracefully. 

 

 

Remove or Comment Out Debugging Statements: 

Before committing, ensure that all debugging statements, including console statements, are removed or commented out 

 

Absolute Path: 

Use Absolute path instead of relative path 

Absolute paths are paths that specify the exact location of a file or module in the project, regardless of the current file's location 

e.g import MyComponent from “@components/MyComponent” (absolute path) 

 Import MyComponent from “../../components/ComponentName” 

 

Local utils: 

Keep the component level function in separate file with in same folder along with component  e.g functions in MyComponent component should be placed in MyComponent.ts file 


IsNullOREmpty Global utility function: 

Object ,array and string every thing should be checked through isNullOrEmpty utility funciton 

 

Commit Message: 
 

Keep commit message elaborative .Meaningful summary 
 
 

 

Rules For Making PR: 
Rules for making pr 

(i) Mention  ticket link 

(ii) Give reasonable description 

(iii) Reply on comments from lead 

(iv) Branch name should be  jira ticket number followed by brief description  e.g 1234-authentication-added