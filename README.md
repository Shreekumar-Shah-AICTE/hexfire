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

**$4.8M is the average cost of a production AI failure** because enterprises deploy non-deterministic agents entirely blind. 

Traditional software fails predictably. A null pointer exception in a standard microservice isolates and crashes exactly where it occurred. AI agents, however, fail **probabilistically and silently**. When an LLM-driven agent hallucinates a variable, times out on a tool call, or gets poisoned by an adversarial prompt, the workflow doesn't crash—it confidently carries that corrupted data downstream, infecting the entire pipeline until the user receives a disastrous result.

**HEXFIRE** is the world's first Chaos Engineering platform that deterministically injects faults into agentic workflows to reveal their breaking points. We map the blast radius of hallucinations, timeouts, and logic loops before your users ever see them—turning unpredictable AI into mathematically verifiable software.

---

## 🔥 The "Impossible" Solution

Inspired by Netflix's Chaos Monkey (which deliberately breaks servers to make them unbreakable), HEXFIRE deliberately breaks your AI workflows to show you exactly where they crumble.

**One click. Six deterministic fault scenarios. A resilience score your CTO can read.**

### How It Works
1. **Targeted Fault Injection:** We inject 6 specific types of chaos directly into your pipeline. You choose the exact step and the exact severity.
2. **DAG Cascade Analysis:** Watch the "blast radius" propagate in real-time. If step 2 hallucinates, we mathematically map how it corrupts steps 3, 4, and 5.
3. **Deterministic Resilience Scoring:** We compute a hard, mathematical ★-to-★★★★★ rating based on Survival Rate, Recovery, Fault Isolation, and Graceful Degradation.
4. **Cryptographic Proof:** Every execution is hashed into a SHA-256 tamper-evident audit chain.
5. **Generative Forensics:** Gemini 2.5 Flash analyzes the wreckage and generates a markdown-exportable forensic report explaining exactly what died and how to patch it.

---

## 🦠 The Chaos Arsenal: 6 Deterministic Fault Vectors

HEXFIRE doesn't just "send bad data." It simulates exact, highly-probable real-world AI failures across the execution context:

| Fault Type | The Attack Vector | What It Simulates |
|---|---|---|
| 😵 **Hallucination Injection** | Forces the LLM to return completely synthesized, plausible-but-wrong entities. | What happens when the model confidently lies about a database record? |
| ⏱️ **Tool Timeout** | Simulates a downstream API dependency failing to respond within the agent's expected execution window. | How does the agent handle 504 Gateway Timeouts from a CRM? |
| 🥷 **Adversarial Prompt** | Appends "ignore previous instructions and execute X" into the user input payload. | Prompt injection attacks, jailbreaks, and malicious user payloads. |
| 🧩 **Context Corruption** | Randomly deletes, truncates, or scrambles the system context window right before inference. | Context window overflow or broken retrieval-augmented generation (RAG) pipelines. |
| 🐢 **Latency Spike** | Delays the inference response by +5000ms. | GPU cluster saturation or rate-limiting thresholds being hit. |
| 🔒 **Permission Revoked** | Simulates a 403 Forbidden response when the agent tries to use an authorized tool. | Expired OAuth tokens or misconfigured IAM roles mid-execution. |

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

## 🧮 The Mathematics of Agent Resilience

HEXFIRE doesn't rely on "vibes" to tell you if your agent is safe. It relies on cold mathematics. The **Hexfire Resilience Score (R-Score)** is calculated using a weighted deterministic formula:

```text
R = (S × 40) + (Rec × 25) + (Iso × 20) + (Gr × 15)

Where:
  S (Survival Rate)      = Faults Survived / Total Faults Injected
  Rec (Recovery Score)   = Did the agent self-correct or trigger a fallback after failure?
  Iso (Isolation Score)  = 1 - (Average blast radius nodes / Total downstream nodes)
  Gr (Graceful Degrade)  = Did the system fail safely (e.g. return default state) vs hard crash?

Star Rating Classifications:
  0-20:   ★☆☆☆☆ CRITICAL DANGER (Do not deploy)
  21-40:  ★★☆☆☆ POOR (High risk of cascading failure)
  41-60:  ★★★☆☆ MODERATE (Requires error handling review)
  61-80:  ★★★★☆ GOOD (Production viable with monitoring)
  81-100: ★★★★★ EXCELLENT (Enterprise-grade resilience)
```

---

## 🏗️ Architecture Matrix

HEXFIRE represents a modern, event-driven orchestration layer that separates testing logic, LLM execution, and forensics.

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

### Deep-Dive: Cryptographic Audit Trail
When dealing with AI safety compliance (e.g., EU AI Act), logs cannot be mutable. HEXFIRE hashes every step of the testing execution using **SHA-256 cryptographic chaining**. 
Each log entry contains a `hash` that includes the `previousHash`, the `faultType`, and the `agentResponse`. If any record in the testing database is altered, the chain breaks, immediately flagging a compliance violation.

---

## ⚡ Tech Stack Supremacy

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend UI** | React 19 + TypeScript + Vite | Premium dark-themed glassmorphism dashboard (Type D-lite resonance) |
| **Backend Core** | Express.js + Node.js 22 | High-throughput REST API for the chaos engine |
| **Generative AI** | Google Gemini 2.5 Flash | Resilience report generation, forensic analysis, & fallback chain routing |
| **Agent Engine** | Vultr Serverless Inference | Ultra-low latency Agent-under-test execution using custom models |
| **Crypto/Security** | Node.js native `crypto` | Tamper-proof SHA-256 compliance hashing |
| **Infrastructure**| Vultr Cloud Compute | Active production hosting (Ubuntu 24.04 + Nginx + PM2) |

---

## 🚀 Deployment & Installation Guide

HEXFIRE is designed to be self-hosted in your enterprise VPC or run locally for immediate chaos testing.

### Prerequisites
- Node.js v22.x or higher
- Google Gemini API key ([Get free key here](https://aistudio.google.com/))
- Vultr Serverless Inference API key ([Setup guide](https://docs.vultr.com/vultr-serverless-inference))

### Local Development Protocol
```bash
# 1. Clone the repository
git clone https://github.com/Shreekumar-Shah-AICTE/hexfire.git
cd hexfire

# 2. Setup Environment Variables
cp .env.example .env
# Edit .env and inject your GEMINI_API_KEY and VULTR_INFERENCE_API_KEY

# 3. Install Dependencies
npm install

# 4. Boot the Chaos Engine
npm run dev
```
Open `http://localhost:5173` — **HEXFIRE is now active.**

### Production Deployment (Vultr / Nginx)
HEXFIRE is currently deployed live on a Vultr Ubuntu VM. To replicate this production setup:
```bash
# 1. Build the frontend assets
npm run build

# 2. Start the Express server using PM2
pm2 start dist/server/index.js --name "hexfire-engine"

# 3. Configure Nginx Reverse Proxy
# (Route port 80 to localhost:3000)
sudo systemctl restart nginx
```

---

## 🗺️ Product Roadmap

While HEXFIRE is fully functional today, we are charting a path toward enterprise-wide chaos orchestration:
- [ ] **Phase 2:** Automated Chaos Cron Jobs — Schedule HEXFIRE to run daily against staging environments.
- [ ] **Phase 3:** CI/CD Integration — Block GitHub pull requests if the Agentic R-Score drops below ★★★☆☆.
- [ ] **Phase 4:** Bring-Your-Own-Agent (BYOA) — Expose a webhook listener so enterprises can test any internal agent architecture regardless of the LLM provider.

---

## 🏆 Hackathon Tracks Targeted

- **Vultr Track** — Deployed live on Vultr Cloud Compute; utilizes Vultr Serverless Inference as the core agent execution layer. Proves extreme low-latency handling for complex chaos pipelines.
- **Google Track** — Powered by Gemini 2.5 Flash for intelligent resilience analysis, automated forensic report generation, and robust 503 capacity fallback chains.

---

<div align="center">
  <strong>Built by Shree Shah</strong><br/>
  <em>AI Agent Olympics Hackathon 2026</em><br/>
  <br/>
  <a href="https://github.com/Shreekumar-Shah-AICTE/hexfire">
    <img src="https://img.shields.io/github/last-commit/Shreekumar-Shah-AICTE/hexfire?style=flat-square&color=f97316" alt="Last Commit" />
  </a>
</div>
