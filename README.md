<div align="center">

# 🔥 HEXFIRE

### Break Your Agent Before Production Does

*The first chaos engineering platform purpose-built for autonomous AI agents.*

[![Vultr Deployed](https://img.shields.io/badge/Deployed%20on-Vultr-007BFC?style=for-the-badge&logo=vultr)](http://78.141.223.19)
[![Gemini Powered](https://img.shields.io/badge/Powered%20by-Gemini%202.5-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript)](/)

</div>

---

## 💀 The Problem

**40% of enterprise AI agent projects will be cancelled by 2027** — not because the AI is bad, but because nobody tested what happens when things go wrong.

When a production agent hallucinates, times out, or gets prompt-injected, the entire workflow cascades into failure. And nobody knows why.

| The Reality | The Cost |
|---|---|
| Agents are non-deterministic — same input can produce different outputs | Traditional testing can't catch probabilistic failures |
| Multi-step workflows compound errors exponentially | A 6-step pipeline at 95% per-step = only 74% overall |
| No standardized way to stress-test agent resilience | Enterprises deploy agents blind |

**There is no chaos engineering for AI agents. Until now.**

---

## 🔥 The Solution: HEXFIRE

HEXFIRE is the first **chaos engineering platform purpose-built for autonomous AI agents**. Inspired by Netflix's Chaos Monkey (which deliberately breaks servers to make them unbreakable), HEXFIRE deliberately breaks your agent workflows to reveal exactly where they crumble.

**One click. Six fault scenarios. A resilience score your CTO can read.**

### What HEXFIRE Does

1. **Injects 6 types of faults** into your agent pipeline — hallucinations, timeouts, adversarial prompts, context corruption, latency spikes, and permission revocations
2. **Maps cascade failures** — visualizes exactly which downstream steps are affected by each fault
3. **Computes a resilience score** — deterministic ★-to-★★★★★ rating based on survival rate, recovery ability, fault isolation, and graceful degradation
4. **Generates a forensic report** — Gemini-powered analysis explaining what broke, why, and how to fix it
5. **Produces a tamper-proof audit trail** — SHA-256 hash-chained log of every fault injection and response

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    HEXFIRE PLATFORM                      │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │  FAULT   │  │ CASCADE  │  │RESILIENCE│  │  AUDIT   ││
│  │ INJECTOR │──│  GRAPH   │──│  SCORER  │──│  CHAIN   ││
│  │ (6 types)│  │  (DAG)   │  │ (R-score)│  │ (SHA-256)││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│       │              │              │              │      │
│       ▼              ▼              ▼              ▼      │
│  ┌──────────────────────────────────────────────────────┐│
│  │            GEMINI 2.5 FLASH (Google AI)              ││
│  │     Resilience Report Generation + Prompt Attacks    ││
│  └──────────────────────────────────────────────────────┘│
│       │                                                   │
│       ▼                                                   │
│  ┌──────────────────────────────────────────────────────┐│
│  │         VULTR SERVERLESS INFERENCE                   ││
│  │    Agent-Under-Test execution (kimi-k2-instruct)     ││
│  └──────────────────────────────────────────────────────┘│
│       │                                                   │
│       ▼                                                   │
│  ┌──────────────────────────────────────────────────────┐│
│  │         VULTR CLOUD COMPUTE                          ││
│  │    Production Deployment (Ubuntu + Nginx + PM2)      ││
│  └──────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 🛡️ Technical Gravity — What Makes This a System, Not a Wrapper

> **Remove ALL LLM calls from HEXFIRE. What remains?**
> 
> ✅ A complete fault injection engine with 6 deterministic fault types
> ✅ A DAG-based cascade failure graph algorithm
> ✅ A mathematical resilience scoring formula (R = S×40 + Rec×25 + Iso×20 + Gr×15)
> ✅ A SHA-256 hash-chained, tamper-evident audit trail
>
> **4 independent systems.** The AI enhances HEXFIRE. It doesn't define it.

### The Resilience Score Formula

```
R = (S × 40) + (Rec × 25) + (Iso × 20) + (Gr × 15)

Where:
  S   = Survival Rate (faults survived / faults injected)
  Rec = Recovery Score (did the agent self-correct after failure?)
  Iso = Isolation Score (1 - average blast radius across all faults)
  Gr  = Graceful Degradation (safe failure vs hard crash)

Star Rating:
  0-20:   ★☆☆☆☆ CRITICAL
  21-40:  ★★☆☆☆ POOR
  41-60:  ★★★☆☆ MODERATE
  61-80:  ★★★★☆ GOOD
  81-100: ★★★★★ EXCELLENT
```

---

## ⚡ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 + TypeScript + Vite | Premium dark dashboard |
| Backend | Express.js + TypeScript | REST API for chaos engine |
| AI | Google Gemini 2.5 Flash | Resilience report generation |
| Agent Engine | Vultr Serverless Inference | Agent-under-test execution |
| Crypto | Node.js `crypto` (SHA-256 + HMAC) | Tamper-proof audit chain |
| Deployment | Vultr Cloud Compute (Ubuntu + Nginx) | Production hosting |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- Gemini API key ([Get free key](https://aistudio.google.com/))
- Vultr Serverless Inference API key ([Setup guide](https://docs.vultr.com/vultr-serverless-inference))

### Setup
```bash
git clone https://github.com/Shreekumar-Shah-AICTE/hexfire.git
cd hexfire
cp .env.example .env
# Add your API keys to .env
npm install
npm run dev
```

Open `http://localhost:5173` — HEXFIRE is ready to break things.

---

## 🏆 Hackathon Tracks

- **Vultr Track** — Deployed on Vultr Cloud Compute, uses Vultr Serverless Inference as agent execution layer
- **Google Track** — Powered by Gemini 2.5 Flash for intelligent resilience analysis

---

## 📄 License

MIT — See [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built by Team O(1) | Shree Shah</strong><br/>
  <em>AI Agent Olympics Hackathon 2026</em>
</div>
