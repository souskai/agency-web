# Security Policy

## Reporting a vulnerability

**Please do not open a public issue for security vulnerabilities.**

Email `info@souskai.com` with:
- a description of the issue,
- steps to reproduce,
- the affected component/version (if known).

We will acknowledge within 2 business days and aim to resolve reported issues promptly. We ask that you do not disclose the vulnerability publicly until we have had a chance to respond and ship a fix.

## Scope

This repository is the production codebase behind [souskai.com](https://souskai.com). Please report anything that could expose:

- stored visitor data (e.g. contact-form submissions),
- environment secrets or credentials,
- unexpected write/delete access to the API or admin panel,
- any path that bypasses role-based access controls.

## Notes for operators

- `.env` and `.env.local` are gitignored **and** dockerignored — never commit or bake secrets into images.
- Contact-form submissions are PII: reads are restricted to `admin`/`editor`, and the public endpoint is spam-guarded.
- Keep `PAYLOAD_SECRET`, `CRON_SECRET`, and `PREVIEW_SECRET` long, random, and unique per environment.