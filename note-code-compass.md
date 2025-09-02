## Core Concept

- Boilerplate code generation:

### The goal is

1. Read problem definition (YAML/JSON)
2. Validate format (schema)
3. Generate boilerplate for multiple languages (Python , Java, CPP)
4. Push to repo automatically (via CI/CD)

### == Decide on Input Format

          -- Structured format — YAML or JSON
          -- Must include:
          -- Problem metadata: id, title, difficulty
          -- description & constraints
          -- function (name, parameters, return type)
          -- test_cases (input/output)
          -- Add a JSON Schema so invalid definitions fail before code generation.

### === Create Templates for Each Language

          -- Store in /templates folder.
          -- Use placeholders like {{function_name}} and {{parameters}}.
          -- Tools:
          -- Python → Jinja2
          -- Node.js → Handlebars or Mustache
          -- Keep templates minimal but runnable.

### github/workflows/generate-boilerplate.yml

      name:

      on:
        push:
          paths: - "problems/**.yaml" - "problems/**.json"

      jobs:
        generate:
          runs-on: ubuntu-latest
            steps: - uses: actions/checkout@v3

              - name: Setup Node.js
                uses: actions/setup-node@v3
                with:
                  node-version: 18

              - name: Install dependencies
                run: npm install

              - name: Generate boilerplate
                run: node scripts/generate-boilerplate.js problems/101-two-sum.yaml

              - name: Commit boilerplate
                run: |
                  git config user.name "CI Bot"
                  git config user.email "ci@example.com"
                  git add boilerplate/
                  git commit -m "Generated boilerplate for new problem"
                  git push
