Format: `<type>(<scope>): <subject> (<issue number>)`

`<scope>` is optional

## Example

```
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
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
- `breaking`: (introduces a breaking change which is affecting other things too)



References:

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html