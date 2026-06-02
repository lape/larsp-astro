---
title: "AI/LLM Resources"
author: "Lars Peters"
pubDatetime: 2025-10-18T00:00:00Z
modDatetime: 2026-06-02T00:00:00Z
description: "A curated collection of artificial intelligence and large language model resources, including Claude Code tools, plugins, MCP servers, spec-driven workflows and Ruby/Rails AI frameworks."
tags: ["Resources", "AI"]
---

Collection of Artificial Intelligence / LLM resources I actually use day to day. Biased towards Claude and the Ruby ecosystem, because that's where I spend most of my time.

## Claude Code

[Claude Code](https://www.anthropic.com/claude-code) is Anthropic's agentic coding CLI. It lives in the terminal, reads and edits files, runs commands, and keeps track of project context across sessions. Paired with `CLAUDE.md` files in the repo root, it becomes a pretty capable pair programmer.

- [CLI reference](https://code.claude.com/docs/en/cli-reference)
- [Interesting uses, e.g. let Claude generate a presentation of your codebase with Marp](https://kadekillary.work/blog/#2025-06-16-snorting-the-agi-with-claude-code)
- [Roadmap management with Claude Code](https://benenewton.com/blog/claude-code-roadmap-management)
- [Building Clara: a Claude Code setup for running a consultancy](/posts/clara-claude-code-secretary/) — my own workflow: PARA-style markdown repo, custom persona, MCP servers and a few cron jobs.

### Subagents & hooks

Two building blocks I lean on heavily in [Clara](/posts/clara-claude-code-secretary/):

- [Subagents](https://code.claude.com/docs/en/sub-agents) — specialised sessions, each with its own context window and tool access. Claude hands a side task (research, a broad search) to one and gets back just the summary, so the main conversation stays clean. You can also pin them to a cheaper model like Haiku.
- [Hooks](https://code.claude.com/docs/en/hooks) — shell commands that fire on lifecycle events (before/after a tool runs, on session start, …). The place to enforce conventions, auto-format, or wire in your own automation without nagging the model to remember.

### Plugins & extensions

Plugins bundle skills, subagents, hooks and MCP servers into one installable unit. The [`/plugin` marketplace](https://code.claude.com/docs/en/discover-plugins) is the central place to browse and install them — Anthropic ships a curated official marketplace, and you can add community ones (any GitHub repo or Git URL).

- [Codex plugin for Claude Code](https://github.com/openai/codex-plugin-cc) — makes OpenAI's Codex available from inside Claude Code. Handy for a second opinion (`/codex:review`, `/codex:adversarial-review`) or for delegating background tasks (`/codex:rescue`).
- [Claude for Legal](https://github.com/anthropics/claude-for-legal) — Anthropic's plugin suite for legal workflows (commercial, corporate, employment, privacy, IP, litigation, regulatory, AI governance). 100+ named agents that draft, triage and review documents, with MCP connectors for CourtListener, Westlaw, Ironclad, iManage and others. Every output is framed as a draft for attorney review. A good template for what a domain-specific Claude Code plugin pack can look like.

### Spec-driven workflows

Both of these treat specifications as the source of truth: you write the spec first, then agents implement against it. Different flavours for different project sizes.

- [GitHub Spec Kit](https://github.com/github/spec-kit) — GitHub's own SDD toolkit and the de-facto standard (90k+ stars). The flow is Spec → Plan → Tasks → Implement via `/specify`, `/plan` and `/tasks` slash commands. Agent-agnostic: it drives Claude Code, Copilot, Gemini and ~30 others, so you can switch the underlying agent without rewriting the workflow.
- [CCPM – Claude Code Project Management](https://github.com/automazeio/ccpm) — uses GitHub Issues and Git worktrees to let up to 12 Claude instances work in parallel. Workflow is Brainstorm → PRD → Epic → Issues → Tracking, all via `/pm:*` slash commands.
- [Spec Kitty](https://github.com/Priivacy-ai/spec-kitty) — CLI plus live Kanban dashboard, 6-phase lifecycle (spec → plan → tasks → implement → review → merge). Supports 12 agents including Claude Code, Cursor, Windsurf, Gemini and GitHub Copilot.

## Agent Skills

Skills are self-contained capability packages — a folder of instructions, scripts and resources that Claude can load on demand.

- [Agent Skills – official docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Claude Cookbooks: Skills](https://github.com/anthropics/claude-cookbooks/tree/main/skills)
- [Public skills repository](https://github.com/anthropics/skills)

## Model Context Protocol (MCP)

MCP is the open protocol that lets LLMs talk to external tools and data sources in a standardised way. The magic is that any MCP-compatible client (Claude Desktop, Claude Code, Cursor, …) can use any MCP server.

- [Get started with the Model Context Protocol](https://modelcontextprotocol.io/introduction)

MCP servers I rely on:

- [Linear MCP](https://linear.app/integrations/claude) — read and update Linear issues from within Claude.
- [Sunsama MCP](https://github.com/robertn702/mcp-sunsama) — full CRUD on Sunsama tasks, subtasks and streams. Great for keeping the daily plan in sync without leaving the terminal.
- [Member Berries MCP](https://github.com/M-Pineapple/member-berries-apple-mcp) — built on apple-mcp, adds memory-style tools for calendar, notes and reminders. Turns Claude into "a helpful friend who remembers your day".

## Ruby/Rails tools and frameworks

- [RubyLLM](https://github.com/crmne/ruby_llm) — one clean Ruby API across OpenAI, Anthropic, Gemini, Ollama and friends: chat, vision, embeddings, tool calls and streaming, with a model registry covering hundreds of models. First-class Rails integration (`acts_as_chat`, install generators), so wiring an LLM into an app is genuinely a handful of lines. My default starting point these days.
- [Raif (Ruby AI Framework)](https://github.com/CultivateLabs/raif) — a Rails engine that helps you add AI-powered features to your Rails apps.
- [Claude on Rails](https://github.com/obie/claude-on-rails) — Obie Fernandez's framework that orchestrates specialised agents (Architect, Models, Controllers, Views, Services, Tests, DevOps) on top of `claude-swarm`. Rails-aware, test-driven, integrates with the Rails MCP Server for up-to-date documentation.
- [classifier-reborn](https://github.com/jekyll/classifier-reborn) — a general classifier module for Bayesian and other types of classification. Pre-LLM, but still useful for lightweight text categorisation without calling an API.
