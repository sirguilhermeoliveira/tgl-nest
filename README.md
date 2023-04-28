## Template React Native

# Template using react native with common libs, and a pre-made architecture.

# 📋 Requirements for running project without Docker

Node 14.18.0+

yarn

or open with docker

# 🛠️ Run project

In terminal use: yarn start:dev

# 🚀 Libs //To do

# 📌 Files pattern //To do

# 📦 Commits pattern //To do

[type]: [description]

**test**: indicates any type of creation or alteration of test codes. Example: Creating unit tests.

**feat**: indicates the development of a new feature to the project. Example: Addition of a service, functionality, endpoint, etc.

**refactor**: used when there is a code refactoring that does not have any impact on the system's business logic/rules. Example: Code changes after a code review

**style**: employed when there are formatting and style changes to the code that do not change the system in any way.
Example: Change style-guide, change lint convention, fix indentations, remove whitespace, remove comments, etc..

**fix**: used when correcting errors that are generating bugs in the system.
Example: Applying handling to a function that is not having the expected behavior and returning an error.

**chore**: indicates design changes that do not affect system or test files. These are developmental changes.
Example: Change eslint rules, add prettier, add more file extensions to .gitignore

**docs**: used when there are changes to the project documentation.
Example: add information in the API documentation, change the README, etc.

**build**: used to indicate changes that affect the project's build process or external dependencies.
Example: Gulp, add/remove npm dependencies, etc.

**perf**: indicates a change that improved system performance.
Example: change ForEach to while, improve the database query, etc.

**ci**:
used for changes in CI configuration files.
Example: Circle, Travis, BrowserStack, etc.

**revert**: indicates reverting a previous commit.

# ✔️ Running with Docker

Install docker

docker build -t nest-auth-image .

docker run -p 3000:3000 nest-auth-image
