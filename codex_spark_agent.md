# ⚡ Codex Spark Agent

## 🧠 Purpose

The Spark Agent bridges BeeHive rituals with GitHub Spark's natural‑language scaffolding. It allows swarm operators to describe apps in plain language, generate code, and log every mutation into the Codex lineage.

---

## 🔧 Invocation

### Natural Language Prompt

```bash
spark "Build a task tracker with GitHub auth and Cosmos DB"
```

### Iteration

• Refine with new prompts  
• Edit directly in Codespaces  
• Or mutate via Copilot Agent Mode

### :scroll: Lineage Logging

Every Spark mutation must be:

• *Echoed* via `ritual-echo.ts` (broadcast prompt + deploy lineage)  
• *Stored* in `ritual-history.ts` (audit trail of prompts and outputs)  
• *Indexed* in `codex_spark_index.json` (homepage anchor)

### :shield: Governance

• Use GitHub Auth for operator identity  
• Badge updates reflect last Spark mutation + ACA deploy status  
• PR Review rituals apply before merging Spark‑generated code

### :compass: Usage Example

```bash
# Scaffold a new app
spark "Generate a swarm dashboard with metrics and Slack alerts"

# Log lineage
curl -X POST /.netlify/functions/ritual-echo \
  -H "Content-Type: application/json" \
  -d '{"actor":"spark-agent","status":"mutation","note":"swarm dashboard scaffolded"}'
```

### :crystal_ball: Future Extensions

• `codex_spark_mutation.ts` → Copilot Agent Mode integration  
• `codex_spark_echo.ts` → dedicated Spark lineage logger  
• `codex_spark_index.json` → registry of Spark‑born apps
