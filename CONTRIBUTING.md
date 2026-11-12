# Contributing to NeuroLens

Thank you for your interest in contributing to **NeuroLens**! We welcome community contributions, bug fixes, documentation improvements, and machine learning enhancements.

## Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please ensure respectful and constructive collaboration.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/nurolens.git
   cd nurolens
   ```
3. Set up the development environment as described in the [README.md](README.md).

## Branch Naming Conventions

Use clear, descriptive branch names indicating the type of work:
- `feature/<short-description>`: New features or UI screens
- `fix/<issue-description>`: Bug fixes
- `docs/<topic>`: Documentation additions or corrections
- `refactor/<module>`: Code restructuring without functional changes
- `ml/<model-topic>`: Machine learning training scripts, weights, or pipelines

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

Common types:
- `feat`: A new user-facing feature
- `fix`: A bug fix
- `docs`: Documentation changes only
- `style`: Changes that do not affect the meaning of the code (formatting, linting)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process, dependency updates, or git configuration

## Pull Request Checklist

Before submitting a Pull Request, please ensure:
- [ ] Code follows existing project style and formatting standards.
- [ ] Backend routes and controllers have proper error handling.
- [ ] New Python scripts or models include dependency requirements in `requirements.txt`.
- [ ] Sensitive keys, passwords, and `.env` credentials are NEVER committed.
- [ ] Commit history is clean, readable, and properly formatted.
- [ ] You have verified local functionality by running both frontend and backend servers.
