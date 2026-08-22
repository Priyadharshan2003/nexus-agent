# Contributing to Nexus Agent

Thank you for your interest in contributing to **Nexus Agent**! 🎉

Nexus Agent is an open-source enterprise multi-agent AI orchestration platform designed for SAP ecosystems (SAP S/4HANA, SAP ECC, SAP BTP, ABAP Modernization, Clean Core, and CAP Services). We welcome contributions from developers, architects, SAP practitioners, and AI enthusiasts of all skill levels.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Enhancements](#suggesting-enhancements)
   - [Contributing Code](#contributing-code)
   - [Improving Documentation](#improving-documentation)
3. [Development Setup](#development-setup)
4. [Branching & Git Workflow](#branching--git-workflow)
5. [Commit Message Conventions](#commit-message-conventions)
6. [Code Style & Best Practices](#code-style--best-practices)
7. [Submitting a Pull Request](#submitting-a-pull-request)
8. [Security Reporting](#security)

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please be respectful, constructive, and collaborative in all discussions, issues, and pull requests.

---

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to ensure it hasn't already been reported. When filing a bug report, please provide:

- A clear, descriptive title.
- Steps to reproduce the behavior.
- Expected behavior vs. actual behavior.
- Screenshots, terminal logs, or error stack traces if applicable.
- Your OS, Node.js version, and browser version.

### Suggesting Enhancements

Feature requests and modernization patterns are always welcome! When suggesting an enhancement:

- Explain the use case and why this feature would benefit the SAP/AI community.
- Provide examples of the expected input/output or UI workflow.
- Describe any architectural considerations or dependencies.

### Contributing Code

We welcome PRs for:
- 🤖 Adding or refining Agent personas, prompt templates, and reasoning chains in `src/lib/agents/`.
- ⚡ ABAP to Clean Core transformation rules & RAP modernization patterns.
- 📦 SAP CAP service templates, CDS generator models, and Fiori UI enhancements.
- 🎨 UI/UX improvements, responsive dashboard components, and dark mode optimizations.
- 🧪 Unit tests, integration tests, and mock SAP service endpoints.

---

## Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/nexus-agent.git
   cd nexus-agent
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up local environment:**
   ```bash
   cp .env.example .env.local
   ```
   *(Populate with your optional API keys for OpenAI, Anthropic, Gemini, or SAP BTP)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Verify build and types:**
   ```bash
   npm run lint
   npm run build
   ```

---

## Branching & Git Workflow

- **`main`**: The default branch containing stable, release-ready code.
- Always branch off `main` for your work.
- Use descriptive branch names:
  - `feat/add-cds-test-generator`
  - `fix/approval-modal-scroll`
  - `docs/update-btp-connectivity-guide`
  - `refactor/agent-telemetry-store`

---

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add SAP HANA vector store adapter`
- `fix: correct token count computation for stream responses`
- `docs: update deployment instructions for Vercel and Cloud Foundry`
- `style: adjust layout spacing on workflow execution trace`
- `refactor: extract reusable agent card component`
- `test: add unit tests for ABAP modernizer prompt parser`

---

## Code Style & Best Practices

- **TypeScript**: Strict typing is enabled. Avoid `any` types; define reusable interfaces in [types.ts](file:///c:/Users/priychan/Downloads/nexus-agent/src/lib/types.ts).
- **React 19 & Next.js 15**: Use React Server Components (RSC) where appropriate, and mark interactive client components with `'use client'`.
- **Styling**: Use Tailwind CSS with established design system tokens. Keep layouts responsive and visually polished.
- **Clean Code**: Keep functions modular and components self-contained.

---

## Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `main` branch of `Priyadharshan2003/nexus-agent`.
3. Fill out the PR description with:
   - Summary of changes.
   - Related issue numbers (e.g., `Closes #12`).
   - Testing steps or screenshots demonstrating the change.
4. Maintainers will review your PR, provide feedback, and merge once approved!

---

## Security

If you discover a security vulnerability within Nexus Agent, please do **not** open a public issue. Instead, report it responsibly to the project maintainers via email or private vulnerability disclosure.

---

Thank you for helping build the future of AI-driven enterprise orchestration! 🚀
