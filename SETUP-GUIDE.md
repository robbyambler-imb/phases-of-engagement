# Phases of Engagement — AI Setup Guide

This guide connects the Phases of Engagement framework to your Claude AI assistant. Once set up, Claude will have the full framework available in every conversation — phases, accelerators, Foundations guardrails, the interview tool, and more.

**Time required:** About 5 minutes.

---

## What you'll need

- The **Claude desktop app** installed on your Mac or Windows computer
- A Claude account (free or paid at claude.ai)

That's it. Nothing else to install.

---

## Step 1 — Install Claude Desktop

If you don't have it yet, download the Claude desktop app at **claude.ai/download** and sign in with your Claude account.

---

## Step 2 — Open the configuration file

This step looks technical but is just opening and editing a text file.

**On Mac:**

1. Open **Finder**
2. Click **Go** in the menu bar, then **Go to Folder…**
3. Paste this and press Enter:
   ```
   ~/Library/Application Support/Claude
   ```
4. Find the file called `claude_desktop_config.json` and open it with any text editor (TextEdit works fine)

**On Windows:**

1. Press `Windows + R` to open the Run dialog
2. Paste this and press Enter:
   ```
   %APPDATA%\Claude
   ```
3. Find `claude_desktop_config.json` and open it with Notepad

---

## Step 3 — Add the Phases server

Inside the file, you'll see some existing content. You need to add the `mcpServers` section.

**If the file looks like this** (just preferences):
```json
{
  "preferences": {
    ...
  }
}
```

Add the server block so it looks like this:
```json
{
  "mcpServers": {
    "phases-of-engagement": {
      "type": "streamable-http",
      "url": "https://phases-of-engagement-production.up.railway.app/mcp"
    }
  },
  "preferences": {
    ...
  }
}
```

**If the file already has an `mcpServers` section**, just add the phases entry inside it alongside whatever is already there.

> **Important:** JSON is picky about commas and brackets. If Claude Desktop won't start after this step, double-check that every `{` has a matching `}` and that items within a section are separated by commas.

---

## Step 4 — Restart Claude Desktop

Fully quit Claude Desktop (don't just close the window — quit from the menu or taskbar), then reopen it.

---

## Step 5 — Confirm it's working

In any Claude conversation, click the **tools icon** (looks like a hammer) near the bottom of the chat. You should see **phases-of-engagement** listed as a connected server.

You're set.

---

## How to use it

You don't need to do anything special to activate the framework — just ask Claude naturally. A few ways to get started:

**Run a phase assessment interview:**
> "Use the phase-assessment-interview prompt for the [people group name] people group."

Claude will conduct a structured interview, ask field-grounded questions, determine the current phase, and surface accelerator priorities with Foundations guardrails applied.

**Ask framework questions directly:**
> "What accelerators should a team prioritize at Phase 3?"
> "What does Phase 4 mean for outside workers?"
> "Explain the indigeneity standard from Foundations."

**Check a proposed action against Foundations:**
> "We're thinking about funding the local pastor's salary. Is that a problem at Phase 4?"

**Generate training content:**
> "Use the training-module-outline prompt for a workshop on the Phase 4 agency shift, audience: field practitioners."

---

## Questions or problems?

Contact Robby at robby@taethni.com.
