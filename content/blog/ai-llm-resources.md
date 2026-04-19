---
title: "AI/LLM Resources"
author: "Lars Peters"
pubDatetime: 2025-10-18T00:00:00Z
modDatetime: 2026-04-19T00:00:00Z
description: "A curated collection of artificial intelligence and large language model resources, including Claude Code tools, plugins, MCP servers, spec-driven workflows and Ruby/Rails AI frameworks."
tags: ["Resources", "AI"]
---

Collection of Artificial Intelligence / LLM resources I actually use day to day. Biased towards Claude and the Ruby ecosystem, because that's where I spend most of my time.

## Claude Code

[Claude Code](https://www.anthropic.com/claude-code?ref=larsp.de) is Anthropic's agentic coding CLI. It lives in the terminal, reads and edits files, runs commands, and keeps track of project context across sessions. Paired with `CLAUDE.md` files in the repo root, it becomes a pretty capable pair programmer.

- [CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference?ref=larsp.de)
- [Interesting uses, e.g. let Claude generate a presentation of your codebase with Marp](https://kadekillary.work/blog/?ref=larsp.de#2025-06-16-snorting-the-agi-with-claude-code)
- [Roadmap management with Claude Code](https://benenewton.com/blog/claude-code-roadmap-management?ref=larsp.de)

### Plugins & extensions

- [Ralph Wiggum plugin](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum?ref=larsp.de) — a Stop-hook that catches Claude trying to exit and feeds the same prompt back in. Useful for iterative tasks with clear success criteria ("all tests green") where you want the agent to keep grinding until it's done.
- [Codex plugin for Claude Code](https://github.com/openai/codex-plugin-cc?ref=larsp.de) — makes OpenAI's Codex available from inside Claude Code. Handy for a second opinion (`/codex:review`, `/codex:adversarial-review`) or for delegating background tasks (`/codex:rescue`).

### Spec-driven workflows

Both of these treat specifications as the source of truth: you write the spec first, then agents implement against it. Different flavours for different project sizes.

- [CCPM – Claude Code Project Management](https://github.com/automazeio/ccpm?ref=larsp.de) — uses GitHub Issues and Git worktrees to let up to 12 Claude instances work in parallel. Workflow is Brainstorm → PRD → Epic → Issues → Tracking, all via `/pm:*` slash commands.
- [Spec Kitty](https://github.com/Priivacy-ai/spec-kitty?ref=larsp.de) — CLI plus live Kanban dashboard, 6-phase lifecycle (spec → plan → tasks → implement → review → merge). Supports 12 agents including Claude Code, Cursor, Windsurf, Gemini and GitHub Copilot.

## Agent Skills

Skills are self-contained capability packages — a folder of instructions, scripts and resources that Claude can load on demand.

- [Agent Skills – official docs](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview?ref=larsp.de)
- [Claude Cookbooks: Skills](https://github.com/anthropics/claude-cookbooks/tree/main/skills?ref=larsp.de)
- [Public skills repository](https://github.com/anthropics/skills?ref=larsp.de)

## Model Context Protocol (MCP)

MCP is the open protocol that lets LLMs talk to external tools and data sources in a standardised way. The magic is that any MCP-compatible client (Claude Desktop, Claude Code, Cursor, …) can use any MCP server.

- [Get started with the Model Context Protocol](https://modelcontextprotocol.io/introduction?ref=larsp.de)

MCP servers I rely on:

- [Linear MCP](https://linear.app/integrations/claude?ref=larsp.de) — read and update Linear issues from within Claude.
- [Sunsama MCP](https://github.com/robertn702/mcp-sunsama?ref=larsp.de) — full CRUD on Sunsama tasks, subtasks and streams. Great for keeping the daily plan in sync without leaving the terminal.
- [Member Berries MCP](https://github.com/M-Pineapple/member-berries-apple-mcp?ref=larsp.de) — built on apple-mcp, adds memory-style tools for calendar, notes and reminders. Turns Claude into "a helpful friend who remembers your day".

## Ruby/Rails tools and frameworks

- [Raif (Ruby AI Framework)](https://github.com/CultivateLabs/raif?ref=larsp.de) — a Rails engine that helps you add AI-powered features to your Rails apps.
- [Claude on Rails](https://github.com/obie/claude-on-rails?ref=larsp.de) — Obie Fernandez's framework that orchestrates specialised agents (Architect, Models, Controllers, Views, Services, Tests, DevOps) on top of `claude-swarm`. Rails-aware, test-driven, integrates with the Rails MCP Server for up-to-date documentation.
- [classifier-reborn](https://github.com/jekyll/classifier-reborn?ref=larsp.de) — a general classifier module for Bayesian and other types of classification. Pre-LLM, but still useful for lightweight text categorisation without calling an API.
