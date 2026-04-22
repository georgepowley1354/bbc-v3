# Graph Report - .  (2026-04-12)

## Corpus Check
- Corpus is ~15,478 words - fits in a single context window. You may not need a graph.

## Summary
- 136 nodes · 160 edges · 13 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.82)
- Token cost: 12,500 input · 3,200 output

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md Quick Reference` - 9 edges
2. `T3 Plan A â€” Maintenance ($500/mo)` - 8 edges
3. `Agency Identity Workspace Context` - 7 edges
4. `6 Agency Voice Rules` - 7 edges
5. `Stage 03 â€” Builds` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Layer 0: CLAUDE.md (Always Loaded)` --semantically_similar_to--> `CLAUDE.md Quick Reference`  [INFERRED] [semantically similar]
  SYSTEM-ARCHITECTURE.md → CLAUDE.md
- `Layer 1: Top-Level CONTEXT.md` --semantically_similar_to--> `Task Routing Table`  [INFERRED] [semantically similar]
  SYSTEM-ARCHITECTURE.md → CONTEXT.md
- `Full BBC Project Pipeline (Lead to Retainer)` --semantically_similar_to--> `Deployment to Handoff Process`  [INFERRED] [semantically similar]
  project-engine/CONTEXT.md → delivery-playbook/CONTEXT.md
- `BBC Main Workflow` --semantically_similar_to--> `Cross-Workspace Flow`  [INFERRED] [semantically similar]
  CLAUDE.md → CONTEXT.md
- `Proposal Hook Types (1-5)` --semantically_similar_to--> `Pitch Tone Guidelines`  [INFERRED] [semantically similar]
  brief-lab/proposal-templates.md → agency-identity/voice-and-tone.md

## Hyperedges (group relationships)
- **Proposal Writing Context Triad (Voice + Identity + Framework + Templates)** — voicetone_agency_voice_rules, briefframework_sow_structure, proposaltemplates_tier1_website, whojorge_credibility_rule [EXTRACTED 0.95]
- **Build Pipeline: Design System + Component Standards + Build Studio** — designsystem_tokens_quick_ref, componentstandards_core_components, buildstudio_4stage_pipeline [EXTRACTED 0.95]
- **Agency DNA Triad (Story + Voice + Pillars)** — agstory_brand_values, voicetone_agency_voice_rules, servicepillars_s1_brand_identity, agidentity_readonly_dna [INFERRED 0.85]
- **BBC 4-Stage Build Pipeline (Briefs â†’ Designs â†’ Builds â†’ Live)** — briefs_context_stage01, designs_context_stage02, builds_context_stage03, live_context_stage04 [EXTRACTED 1.00]
- **BBC Deployment and Client Handoff System** — deployment_guide_netlify, deployment_guide_cloudflare, hosting_setup_dns, client_handoff_post_launch_checklist, client_handoff_call_agenda [EXTRACTED 0.95]
- **BBC Service Tiers and Pricing Structure (T1/T2/T3)** — tier1_package_a, tier2_package_d, tier3_plan_a, client_segments_fit_scoring, project_bank_tier_reference [INFERRED 0.85]

## Communities

### Community 0 - "System Architecture & Routing"
Cohesion: 0.11
Nodes (19): BBC Web Design Agency, BBC Brain Workspace, Deploy Targets (Netlify / Cloudflare Pages), Lead ID System (L-001+), Service Pillar ID System (S1-S6), Project ID System (P-001+), CLAUDE.md Quick Reference, BBC Main Workflow (+11 more)

### Community 1 - "Build Studio Pipeline"
Cohesion: 0.14
Nodes (18): Build Brief File Format, SOW Reference in Brief, Stage 01 â€” Briefs, Pre-Handoff Build Checklist, Build Tracking Log File Format, Stage 03 â€” Builds, Pre-Deploy Checklist, Design Spec File Format (+10 more)

### Community 2 - "Brief Lab & Discovery"
Cohesion: 0.12
Nodes (17): Discovery Note Format Template, Discovery Question Set, Brief Lab Workspace Context, Lead to Signed Scope Process, 4-Stage Build Pipeline (Brief â†’ Design â†’ Build â†’ Live), Build Studio Workspace Context, Build Studio Docs Context, BBC Core Components (NavBar, HeroSection, Button, etc.) (+9 more)

### Community 3 - "Delivery & Handoff"
Cohesion: 0.18
Nodes (16): Handoff Call Agenda, Handoff Document Template, Post-Launch Checklist, Delivery Playbook Context, Deployment to Handoff Process, Cloudflare Pages Deployment Guide, Netlify Deployment Guide, Cloudflare vs Netlify Decision Guide (+8 more)

### Community 4 - "Agency Identity Core"
Cohesion: 0.14
Nodes (15): Agency Identity Workspace Context, Agency Identity READ-ONLY Source of Truth, Agency Identity What-to-Load Guide, Canonical Sources Principle, CONTEXT.md = Routing Not Content Principle, Layer 0: CLAUDE.md (Always Loaded), Layer 1: Top-Level CONTEXT.md, Layer 2: Workspace CONTEXT.md Files (+7 more)

### Community 5 - "Brand Story & Positioning"
Cohesion: 0.15
Nodes (15): BBC Agency Story, BBC Market Positioning, BBC Brand Values (Directness, Craft, Clarity, Reliability), BBC Long-Game Narrative, Agency Story Short Version, BBC Target Clients (Small/Service Businesses), Proposal Review Checklist, Proposal Hook Types (1-5) (+7 more)

### Community 6 - "Client Qualification"
Cohesion: 0.18
Nodes (13): Client Offboarding Process, Borderline Client Handling Rationale, Client Fit Scoring System, Ideal Client Types, Client Red Flags, Active and Recent Projects (P-001 to P-005), Project Engine Context, Project Status Values (+5 more)

### Community 7 - "Services & Packages"
Cohesion: 0.29
Nodes (8): Services and Packages Context, T1 Add-Ons, T1 Package A â€” Launch Site ($2,500), T1 Package B â€” Launch + Content ($3,500), T1 Package C â€” Launch + Book ($4,500), T2 Package D â€” Custom Site ($5,000â€“$8,000), T2 Package E â€” Custom + Commerce ($8,000â€“$12,000), T2 Package F â€” Brand + Build ($7,500â€“$11,000)

### Community 8 - "Agency Operations"
Cohesion: 0.5
Nodes (5): Agency Rhythm Workspace Context, Agency Weekly Rhythm Overview, Client Communication Rules, Client Status Update Template, Weekly Sprint Rhythm (Mon-Fri)

### Community 9 - "Proposals & Contracts"
Cohesion: 0.5
Nodes (4): SOW 6-Section Structure, Change Order Template, SOW Template, Project Phase Timings (Discovery â†’ Launch)

### Community 10 - "Sprint & Retrospective"
Cohesion: 0.67
Nodes (3): Project Retrospective Template, Biweekly Sprint Structure, Multi-Project Management Rules

### Community 11 - "Project Tier Model"
Cohesion: 1.0
Nodes (2): Project Tier Reference, Service Tier Summary (T1/T2/T3)

### Community 12 - "Design Review"
Cohesion: 1.0
Nodes (1): Design Review Request Template

## Knowledge Gaps
- **52 isolated node(s):** `BBC Brain Workspace`, `BBC Web Design Agency`, `Project ID System (P-001+)`, `Lead ID System (L-001+)`, `Workspace Purpose Definitions` (+47 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Project Tier Model`** (2 nodes): `Project Tier Reference`, `Service Tier Summary (T1/T2/T3)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Design Review`** (1 nodes): `Design Review Request Template`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Agency Identity Workspace Context` connect `Agency Identity Core` to `System Architecture & Routing`, `Brief Lab & Discovery`, `Brand Story & Positioning`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `CLAUDE.md Quick Reference` connect `System Architecture & Routing` to `Agency Identity Core`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `Canonical Sources Principle` connect `Agency Identity Core` to `Brief Lab & Discovery`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `6 Agency Voice Rules` (e.g. with `BBC Brand Values (Directness, Craft, Clarity, Reliability)` and `Jorge Credibility Rule (Specificity over Claims)`) actually correct?**
  _`6 Agency Voice Rules` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `BBC Brain Workspace`, `BBC Web Design Agency`, `Project ID System (P-001+)` to the rest of the system?**
  _52 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `System Architecture & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Build Studio Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._