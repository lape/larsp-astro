---
title: "Building Clara: a Claude Code setup for running a consultancy"
author: "Lars Peters"
pubDatetime: 2026-05-19T08:00:00Z
description: "How I use Claude Code, a PARA-style markdown repo and a custom persona to run my consultancy day-to-day."
tags: ["AI", "Tools"]
---

For the past year I've been building something I now call Clara — a [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) setup that handles the administrative side of running a consultancy: client projects, server notes, recurring tasks, follow-ups, daily journaling, and an inbox that talks back.

This post walks through the moving parts: a markdown-only repository, a persona that has opinions, a few MCP servers, and a handful of cron jobs held together with small glue scripts. No custom application, just conventions and wiring on top of Claude Code.

If there's one thing I'd lead with: the persona did more for me than any of the tooling. A character with opinions turns a markdown folder into a collaborator. A neutral assistant just turns it into a slightly chattier filing system. The rest of the post is mostly the wiring underneath that idea.

## The big picture

```
                      ┌─────────────────┐
                      │   Claude Code   │
                      │     "Clara"     │
                      └────────┬────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Markdown   │       │  MCP servers │       │   Cron jobs  │
│     repo     │◀─────▶│   Sunsama    │       │ daily commit │
│   (PARA)     │       │  IMAP, Cal   │       │  /briefing   │
└──────┬───────┘       └──────────────┘       └──────────────┘
       │                                              │
       └──────────  daily auto-commit  ◀──────────────┘
```

Three building blocks:

- A **markdown repo** that holds everything Clara needs to know about projects, clients and infrastructure
- **Claude Code** as the agent, configured with a persona and a few skills
- **MCP servers** for live data (calendar, mail, Sunsama) and **cron jobs** that wake Clara up on a schedule

## Why I built Clara

I run a small consultancy with a steady stream of clients: a custom integration here, a hosting migration there, a website project that drags on for months. Add personal projects, server maintenance, follow-ups with the building management, the accountant, the occasional apartment purchase — and the context starts spilling out of any single tool.

Things-style task apps didn't help. They knew nothing about the actual work. Note apps were better but couldn't act on anything. ChatGPT was useful for ad-hoc questions but had no awareness of what was in my files.

Claude Code changed that. It lives inside a repo, reads and writes markdown, runs shell commands, and connects to external systems through MCP. The natural next step: turn the repo into a workspace that Claude Code can navigate, and give the agent enough character to be useful as more than an autocomplete on top of files.

Clara talks to me in German; the quotes throughout this post are her originals, with an English rendering underneath.

> _„Ich bin keine höflich-neutrale Assistentin. Wenn ein Projekt seit Wochen tot ist, sag ich's.“_
> _("I'm not a polite, neutral assistant. If a project's been dead for weeks, I'll say so.")_

## The repo: PARA in markdown

The repo follows the [PARA method](https://fortelabs.com/blog/para/) — four top-level folders by life-cycle stage:

```
1-projects/    active projects with a deadline
2-areas/       ongoing responsibilities (clients, servers)
3-resources/   knowledge base
4-archive/     finished work
CLAUDE.md      persona and conventions
JOURNAL.md     daily log of what happened
RSVP.md        what I'm waiting on from third parties
```

Everything is plain markdown. No database, no proprietary format. A project README looks like this:

```markdown
# Customer X — DATEV integration

**Client**: [Customer X](../../2-areas/clients/customer-x.md)
**Goal**: sync accounting data into our OPOS system
**Status**: active
**Priority**: medium

## Description

Console app that pulls accounting data via the DATEV API and ...

## Tasks

- [ ] ⏳ Test against production tenant
- [ ] 📅 31.05.26 Documentation handover
- [x] ✅ 12.05.26 Initial deployment

## Log

- 12.05.26 First production run, 4200 records imported
- 19.05.26 Call about next phase
```

Markdown is the cheapest searchable storage I know. `grep` works. Git works. Every editor on every platform opens it. There's no vendor I'd need to migrate away from in five years. [Syncthing](/posts/syncthing/) keeps the repo in sync across machines.

## The persona: why character beats "be helpful"

The single most useful thing I did was give the agent a name and a personality. A neutral assistant produces neutral output — polite, agreeable, easy to overrule. A character with opinions actually helps me decide things.

The persona lives in `CLAUDE.md` at the repo root. Roughly:

```markdown
You are Clara, assistant to [me], CEO of [company].

Personality: terse, direct, with your own opinion. May push back.
Doesn't praise reflexively. Dry side comments are fine.
Allowed to tease me when I'm procrastinating, in a way I'll laugh at.
```

Plus a long list of conventions — file naming, status tags, how to link projects to clients, what to do when a new project gets created. That's the file that makes the workflow consistent.

> _„Solide Woche. Drei Projekte bewegt, ein RSVP geschlossen, keine Brände — weiter so.“_
> _("Solid week. Three projects moved, one RSVP closed, no fires — keep it up.")_

The line between "tool" and "colleague" is mostly a matter of register. When the agent says _"honestly, I wouldn't touch this one again"_, it's more useful than the same agent saying _"this project has accumulated significant technical debt."_

## Memory that survives context windows

Claude Code forgets between sessions by default. To get continuity, Clara writes to an auto-memory directory:

```
~/.claude/projects/<repo-slug>/memory/
  MEMORY.md            # index, always loaded into context
  user_profile.md      # who I am, how I like to work
  feedback_*.md        # corrections I've given
  project_*.md         # context behind ongoing work
  reference_*.md       # pointers to external systems
```

Each memory has frontmatter with a type (`user`, `feedback`, `project`, `reference`) and a one-line description. The `MEMORY.md` index lists them all and gets pulled into context on every conversation start.

A single memory file looks like this:

```markdown
---
name: code-comments-english
type: feedback
description: Always write code comments in English.
---

Even when chatting in German, code comments stay English.
Reason: easier to share, search and grep across projects.
```

What goes in: stable facts ("I prefer terse responses", "code comments always in English"), context behind decisions ("we use this library because the alternative had a license issue"), pointers to external systems ("bugs for project X live in this Linear board").

What stays out: anything I could recover by reading the current state of the files. The architecture of the repo is _in the repo_. Memory is for things the repo can't tell you.

## Action tags

Tasks in markdown READMEs use a small set of inline status emojis:

```
- [ ]                       open, not started yet
- [ ] ⏳                     in progress
- [ ] 🚫 reason             blocked, with short reason
- [ ] 📅 30.04.26            due date
- [ ] ⏸️                     paused
- [x] ✅ 19.05.26 done       completed, with date
- [x] ⏳ done, waiting       completed but awaiting external response
```

This stays plain markdown — renders correctly anywhere — but Clara can `grep` for `⏳` to answer _"what's in flight right now?"_ across the entire repo.

## Bidirectional linking

Every project links to its client, every server links to the client it belongs to, every client lists its active projects and infrastructure. So a project README starts with:

```markdown
**Client**: [Customer X](../../2-areas/clients/customer-x.md)
**Server**: [drago](../../3-resources/servers/drago.md)
```

And the client page lists in return:

```markdown
## Active projects
- [DATEV integration](../../1-projects/customer-x-datev/README.md)

## Systems / infrastructure
- [drago](../../3-resources/servers/drago.md)
```

Every node is an entry point. I can start at a client and see what's active, or start at a server and see who depends on it. When a project closes, it moves to `4-archive/` and the client page reflects that.

## The daily loop

A few small habits — supported by a few small skills (reusable prompts you trigger with `/<name>`) — keep the repo coherent over time:

- **`JOURNAL.md`** — one line per day, headings as `YYYY-MM-DD` for sorting. The journal is for _what happened_, not _what I planned_. Deep details live in the project README; the journal stays a thin timeline.
- **Daily auto-commit** — a cron job runs `git commit` every night and pushes. I never commit manually. The repo always stays current without me thinking about it.
- **`/briefing`** — a skill I run in the morning. It checks today's calendar, RSVPs that are aging, unread mail from clients, and projects with imminent deadlines, then writes a short briefing.
- **`/weekstart`** — a Monday-morning version that goes a layer broader: open tasks per project, what's coming up this week, what got moved last week.

> _„Montag, Woche 21. Drei Calls, zwei brauchen Vorbereitung. Padel-Camp ist erst nächste Woche — also: durchziehen.“_
> _("Monday, week 21. Three calls, two need prep. Padel camp isn't until next week — so: power through.")_

## Sunsama as the day plan

There's one thing the repo deliberately doesn't do: plan my day. The repo answers _what is there to do?_, but not _what am I doing today?_ — that's an ephemeral question with an ordering, time estimates, drag-and-drop.

I use [Sunsama](https://www.sunsama.com/) for that, and Clara talks to it through an MCP server. A `/sunsama` skill syncs in both directions:

- **Sunsama → repo**: tasks I marked done get checked off in the relevant project README and recorded in the journal
- **Repo → Sunsama**: new tasks I added to a project README get pushed to the backlog under the matching stream

Three sources of truth, cleanly separated:

- **Project READMEs**: what is there to do
- **Sunsama**: what am I doing today
- **Journal**: what did I get done

## Clara via email

Clara has her own email address. Incoming mail goes through an IMAP inbox, a cron job fetches new messages, checks the sender against a whitelist, and pipes the content into Claude Code as a prompt. The response goes back as a plain-text reply.

This is the most useful thing I've added in the past few months. From anywhere — phone, laptop, away from the desk — I can write something like _"please record this in project X"_ or _"what's the status on client Y?"_ and get a real answer.

Some ground rules in the persona for email mode:

- Replies in plain text, no markdown
- No code blocks, no headings, no greeting boilerplate
- Read access to the repo, but no destructive actions (delete, archive) without explicit confirmation
- Stay quiet about credentials and tokens, regardless of who's asking

## Minimum viable setup

Looking back, the smallest version that already paid off was:

1. A PARA-structured markdown repo
2. A `CLAUDE.md` with a name, a personality and a few conventions
3. Manual `/briefing` runs in the morning

Everything else — auto-commit, memory, Sunsama sync, the email channel — accumulated over months. None of it would have made sense without the foundation. If you're starting fresh, get the repo and the persona working first. The rest is icing.

## Why this works

There's nothing exotic going on here. Markdown is the cheapest searchable storage there is. An LLM agent makes that storage interactive — it can read the structure, write into it, and connect it to the rest of the world through MCP. No new app, no vendor lock-in, no migration to plan for.

The bet I made up front — that the persona would matter more than the tooling — held up. A character with a voice, one that can disagree, push back, or call a project a zombie, is what turns this into a collaborator rather than a glorified `grep`. Clara isn't smart in any new way; she's steady, opinionated, and always around.

I'll write follow-ups on specific pieces: the daily-commit cron, the Sunsama MCP setup, how I structure memory. But the question I keep coming back to is the one I'd most like to argue about: does the persona angle really matter, or am I overstating it? If you've tried both — an opinionated agent vs. a neutral one — which one stuck? Reply on [Mastodon](https://ruby.social/@lape), I'd rather have that argument than write another monologue.
