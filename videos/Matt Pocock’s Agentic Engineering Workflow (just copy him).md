---
date: "2026-06-25T15:02:00+02:00"
title: "Matt Pocock’s Agentic Engineering Workflow (just copy him)"
---
- Source: <https://www.youtube.com/watch?v=nQwJVHCtDDY&t=59s>
- Author: [[David Ondrej]]
- Related: [[Videos]], [[Matt Pocock]]

---

##  Summary

- **Agentic Engineering Mindset** – Treat AI as the *utility* that runs your development pipeline, not the primary builder of the product. The human remains the *architect* who defines problem boundaries, sets quality gates, and reviews work. 
- **Phase‑Based Process** – Break the journey into 7 clear phases: 
  1. **Research & Prototyping** – Detect feasibility, gather requirements, and prototype prompts with the model. 
  2. **The Grill Session** – Experiment, iterate and refine the prompt design using debugging from the model’s responses. 
  3. **PRD Writing** – Translate the findings into a product‑ready PRD, including test cases and baselines for model output. 
  4. **Issue Slicing** – Decompose the PRD into granular, AI‑applicable tasks and feed them to scheduler/agent engine. 
  5. **Implementation with AI Agents** – Automate the code generation, docs, tests, and CI/CD configurations via the agent stack. 
  6. **Human‑in‑the‑Loop Review** – Inspect each artifact; it’s the human who determines if the output is acceptable and safe. 
  7. **Deployment & Monitoring** – Release the code, roll out feedback loops, and continuously fine‑tune the whole AI workflow. 
- **Tooling & Architecture** – Use a dedicated **MCP** (Management, Coordination, and Processing) stack, version control hooks, and a **global memory file** to keep the agent context. 
- **Takeaway** – Agentic engineering frees engineers from repetitive tasks but keeps the *creative, architectural, and quality‐assurance* parts entirely human. The model is a *high‑velocity tool* that accelerates and scales the engineer’s craft.

---

**Key Ideas Explained**
  * **Human‑in‑the‑Loop** – The final check guarantees ownership, skill preservation, and safety. 
  * **Phase granularity** – Structured phases avoid scope creep and give the AI concrete boundaries. 
  * **MCP & Memory** – Centralizing context prevents model drift and ensures consistent outcomes across tasks. 
  * **Parallel Agent Chains** – Compute multiple agents in parallel to handle large‑scale projects more efficiently. 
  * **Feedback Loops** – Every rollout feeds back into the prompt/artifact stack, continuously improving the agent’s performance. 

## Transcript

0:00 – "Introduction: The thesis of AI engineering – why designers need to become agent architects instead of just hand‑coding every line of code."
4:20 – "Phase 1, Research & Prototyping: Explore model capabilities, create a small proof‑of‑concept, identify problems and define success metrics."
12:45 – "Phase 2, The Grill Session: Debug prompts, modify the context, run lots of small trials and extract valuable patterns from model outputs."
22:10 – "Phase 3, Writing the PRD: Convert the research into a product‑ready PRD, including detailed test cases and acceptance criteria."
35:50 – "Phase 4, Slicing work into issues: Break the PRD into AI‑friendly, atomic tasks that can be fed to an agent scheduler."
48:15 – "Phase 5, Implementation with AI Agents: Automate code generation, documentation, tests, and CI/CD pipelines via the agent stack."
55:00? – "Phase 6, Human‑in‑the‑Loop Review: Inspect, validate, and approve each artifact."
? — "Phase 7, Deployment & Monitoring: Release the code, monitor usage, capture feedback, and refine the entire agentic workflow."
? – "Throughout: maintain a global memory file to keep context and avoid drift across long‑running sessions."
? – "Throughout: build and orchestrate multiple agents in parallel for large projects, scaling from a single linear chain to a full policy‑shaped HPC model."

## Notes

- AI give a very big boost to seniors, companies are not as incentives to hire juniors
	- skills are more important, AI is a multiplier
- Pocock took his experience from teaching to write a skill to learn and dive deep
	- *teach*