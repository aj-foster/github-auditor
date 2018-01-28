# GitHub Auditor

Generate reports about the users and teams of your GitHub organization and their access to your repositories.

### Requirements

- To use this tool, you must be an **Owner** of the GitHub organization you wish to audit.
- You will need a [Personal Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) from GitHub with the `repo` and `read:org` scopes enabled. Save this token in a file called `token.secret` in the base directory of this project.
- This project was created using Node.js version 9.4.0. It is untested in other versions.


### Usage

Begin by cloning this project to a convenient location on your local machine:

```shell
$ git clone https://github.com/aj-foster/github-auditor.git
```

Now, enter the project directory and install its dependencies:

```shell
$ cd github-auditor
$ npm install
```

Create a [Personal Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) for your GitHub account and save it in a file `token.secret` at the root of the project. **Note**: You probably want to revoke this token from your account when you finish the audit.

Finally, run the auditor by passing the URL-friendly name ("login") of the organization you wish to audit:

```shell
node index.js [organization]
```
