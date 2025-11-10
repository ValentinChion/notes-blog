---
title: "Spec-Kit Tutorial"
description: "J'ai utilisé spec-kit pour un side project perso."
pubDate: "Nov 10 2025"
heroImage: "/notes-blog/assets/speckit.png"
---

In this post, I will explain all my discoveries on spec-kit. This tool is amazing and here's what I learned for now.

## 1. Spec-Kit ?

Spec-Kit is tool to get you started with `Spec-Driven Development` (SDD). Basically it provides you with a set of commands for your AI CLI Agent.

It connects with most of the popular AI providers oriented in code generation such as OpenAI, Claude, Cursor, Github etc...

It will basically orient your AI Agent with commands and specific prompts to start SDD.

### A. Pre-requisites

You need to have already installed an AI CLI Tool such as Claude which I used in my discovery.

### B. How to install it ?

You should install it globally by doing so :

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

And that's all ! You're ready to use the speckit CLI.

### C. How to use it ?

First of all, from an existing project or not, run the following command :

```bash
specify init <PROJECT_NAME>
```

It will ask for the AI you want to use and then start working.

At the end of the command, you should have a new folder called `commands`

Those are all the commands provided by `Spec-Kit`. Let's detail them one by one in the order they should be use.

- `/speckit.constitution` : This command is used to govern the AI Agent based on principles and guidelines you want to implement. (or is already implemented for existing project)

  - Here was my prompt for the side project

  ```
  Create principles based on code quality and readability for future developers, user experience consistency and test-driven developments standards.

  Include governance for how these principles should guide technical decisions and implementation choices.
  ```

- `/speckit.specify` : You should really focus on what and why here. You MUST not describe a tech stack. Let's imagine you're a product owner describing your project to a client.
  The first part of the command should focused on the general purpose of the project while the second part should be focused on the specific features you want to implement. The AI will generate User Stories and Acceptance Criteria for the project.
- `/speckit.clarify` : This command is mandatory after you used specify. The AI will ask up to 5 questions to clarify the specifications created. It will updated all the specs and provide you a history of the question and answers session.

This command should also be used during the `implementation` part when you realize that the AI missed or you want to add other features.

- `/speckit.plan` : Describe the tech stack you want to use and your architecture choices. If you are in an existing project, you can also asks the AI to analyze the existing codebase in the prompt and then provide only additionnal informations.
- `/speckit.tasks` : This command will create all the tasks of the implementation based on the specs and the tech stack choosed.
- `/speckit.implement` : This is when the magic happens. The AI starts to implement the project and create all the needed code for you.

## 2. Lifecycle of a project

The lifecycle of a project using `Spec-Kit` is the following :

##### a. Constitution

First, you must use the `/speckit.consitution` command to create the principles of your project. Once you are satisfied with the result, it does not need to be reused. You can always revised the version of your principles as the project evolves, but this is "transversal" to the lifecycle of the project.

##### b. Specifications

Then, you `/speckit.specify` To create specifications for your project. Here was mine :

```
Create and develop an application called [Fortuna.](http://Fortuna.cv)CV (or Fortuna), a platform to handle job applications as a person looking for a job.

This webapp should helps users to organize and SIMPLIFY their jobs processes because we, most of the times, applies to way too much applications for human to be able to follow everyone of them.

The first feature should allow users to create and edit applications and have a global list on those applications. Let’s call this feature “Applications List”. This list should contain for the first version the following informations :

- Name
- Status which can be : First Contact, Job Interview Planned, Pending, Validated, Accepted, Refused
- Current Step which is A free input
- Salary as a Range but can be also a defined number
- Date of the last contact.

The second feature is called “CV Handler”. This feature let users drop CV files as .pdf and can manage them (change name, delete…)

This then allow users to associate CVs to job applications created.

The third feature is called “Application Detail”. When a user click on one application in the “Applications List” they can see the detail of an application. There is a a first part which shows the same fields from the “Applications List” : Name, Status, Current Step, Salary, Date of the last contact which is a summary.

If a user associated a CV to the application, he can click on a button/link “See CV Preview” which opens a sidebar on the right with a pdf viewer containing the CV.

The second part let the user see all the written exchanges made on this application. If there was meetings, it is also showed there as a timeline (from most recent to oldest). For the initial phase of the project, this will be a manual input, so there will be a “Plus button” somewhere letting him choose between a meeting and a written exchange, if it’s a meeting he can add the name of the people he met, the date of the meeting, and a little description of the meeting. For the written part, he must have somewhere to copy/past the exchange and he must fill the name (either him or the person he met) and the date of the exchange.

The fourth and last feature is called “Applications Dashboard”, This let the user see key informations :

- A counter of job applications
- A Line chart showing the number of applications made per week.
- A Pie chart on the answers rate : In the last month, how many applications are in “First Contact” status for more than 4 days versus how many are not in “First Contact” status.
    - This Pie chart part should have a trending indicator next to his title showing how the percentage of status not in “First Contact” increased or decreased
- A Scatter Chart showing the salary proposed by companies (only for the applications that are not in a “First Contact” status) along time going.

Those are the core features of the application. For now, don’t include a login feature as we just want to test everything. You can just have a “faked” user to associate all the testing data to him.

Later we will add high added value features to the application.
```

##### c. Clarify the specifications

Use the `/speckit.clarify` command to clarify the specifications. It will starts asking 5 questions and you'll have to answer them.

Then, you `/speckit.plan` for the techstack. This command is very different when you are in an existing project or not. I couldn't test an existing codebase yet.

##### d. Plan the tech stack

This command is like `/constitution` but for the tech stack. There's no need to reuse apart when you want to update or evolve the tech stack.

##### e. Create the tasks for the agent

Then, you `/speckit.tasks` to create the tasks for the implementation. This is very useful for the AI-Agent but there is not much to say, it's very intuitive.

###### f. Implement the project

Finally, you `/speckit.implement` to implement the project. This is the most important command. It will create all the needed code for you. It can take some time because you'll go back-and-forth with the AI Agent to implement the project.

To resume you have :

- On first run : `constitution` -> `specify` -> `clarify` -> `plan` -> `tasks` -> `implement`
- On next runs : `specify` -> `clarify` -> `tasks` -> `implement`

## 3. Conclusion

So whenever you want to update your project, you can reuse the second lifecycle. Once you've done it a first time, it gets way easier ! It's also reduce the time taken to implement since the core part is already done.
