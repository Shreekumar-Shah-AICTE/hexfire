<div align="center">

<img src="./public/hexfire-logo.png" width="180" alt="Hexfire Logo" />

# HEXFIRE — Watch Your Agentic Pipelines Bleed Before They Hit Production

*The first chaos engineering platform purpose-built for autonomous AI agents.*

[![Vultr Deployed](https://img.shields.io/badge/Deployed%20on-Vultr-007BFC?style=for-the-badge&logo=vultr)](http://78.141.223.19)
[![Gemini Powered](https://img.shields.io/badge/Powered%20by-Gemini%202.5-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 💀 The Agentic Black Box

$4.8M is the average cost of a production AI failure because enterprises deploy non-deterministic agents entirely blind. **HEXFIRE** is the world's first Chaos Engineering platform that deterministically injects faults into agentic workflows to reveal their breaking points. We map the blast radius of hallucinations, timeouts, and logic loops before your users ever see them—turning unpredictable AI into mathematically verifiable software.

---

## 🔥 The "Impossible" Solution

Inspired by Netflix's Chaos Monkey (which deliberately breaks servers to make them unbreakable), HEXFIRE deliberately breaks your AI workflows to show you exactly where they crumble.

**One click. Six deterministic fault scenarios. A resilience score your CTO can read.**

### How It Works
1. **Targeted Fault Injection:** We inject 6 specific types of chaos directly into your pipeline (Hallucinations, Tool Timeouts, Adversarial Prompts, Context Corruption, Latency Spikes, and Permission Revocations).
2. **DAG Cascade Analysis:** Watch the "blast radius" propagate in real-time. If step 2 hallucinates, we mathematically map how it corrupts steps 3, 4, and 5.
3. **Deterministic Resilience Scoring:** We compute a hard, mathematical ★-to-★★★★★ rating based on Survival Rate, Recovery, Fault Isolation, and Graceful Degradation.
4. **Cryptographic Proof:** Every execution is hashed into a SHA-256 tamper-evident audit chain.
5. **Generative Forensics:** Gemini 2.5 Flash analyzes the wreckage and generates a markdown-exportable forensic report explaining exactly what died and how to patch it.

---

## 🛡️ Technical Gravity — What Makes This a System, Not a Wrapper

> **If you remove ALL LLM calls from HEXFIRE, what remains?**

A championship-tier system must contain core IP. HEXFIRE is not a thin API wrapper; it is a multi-layered engineering architecture.

✅ **A Deterministic Processing Engine:** The fault injector maps 6 hard-coded failure states independent of any LLM.  
✅ **A Graph Algorithm:** The cascade failure graph uses DAG (Directed Acyclic Graph) traversal to calculate the downstream blast radius.  
✅ **A Mathematical Scoring Validator:** `R = S×40 + Rec×25 + Iso×20 + Gr×15` — deterministic validation of resilience.  
✅ **Cryptographic Infrastructure:** A SHA-256 hash-chaining mechanism that creates tamper-evident compliance logs.  

**4 independent computer science systems.** The AI enhances HEXFIRE; it doesn't define it.

---

## 🏗️ Architecture Matrix

```text
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

## ⚡ Tech Stack Supremacy

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + TypeScript + Vite | Premium dark-themed glassmorphism dashboard (Type D-lite resonance) |
| **Backend** | Express.js + TypeScript | REST API for chaos engine |
| **Generative AI** | Google Gemini 2.5 Flash | Resilience report generation & multi-model fallback chains |
| **Agent Engine** | Vultr Serverless Inference | Ultra-low latency Agent-under-test execution |
| **Crypto** | Node.js `crypto` | Tamper-proof SHA-256 audit chain |
| **Infrastructure**| Vultr Cloud Compute | Active production hosting (Ubuntu + Nginx) |

---

## 🚀 Quick Start (The 30-Second Audit)

### Prerequisites
- Node.js 22+
- Gemini API key
- Vultr Serverless Inference API key

### Launch Protocol
```bash
git clone https://github.com/Shreekumar-Shah-AICTE/hexfire.git
cd hexfire
cp .env.example .env
# Add your API keys to .env
npm install
npm run dev
```

Open `http://localhost:5173` — **HEXFIRE is ready to break things.**

---

## 🏆 Hackathon Tracks Targeted

- **Vultr Track** — Deployed live on Vultr Cloud Compute; utilizes Vultr Serverless Inference as the core agent execution layer.
- **Google Track** — Powered by Gemini 2.5 Flash for intelligent resilience analysis, automated forensic report generation, and robust fallback fallback chains.

---

<div align="center">
  <strong>Built by Shree Shah</strong><br/>
  <em>AI Agent Olympics Hackathon 2026</em><br/>
  <br/>
  <a href="https://github.com/Shreekumar-Shah-AICTE/hexfire">
    <img src="https://img.shields.io/github/last-commit/Shreekumar-Shah-AICTE/hexfire?style=flat-square&color=f97316" alt="Last Commit" />
  </a>
</div>
