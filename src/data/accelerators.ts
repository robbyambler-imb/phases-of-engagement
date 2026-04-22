export type AlignmentTier = "clean" | "reframe" | "guardrail" | "significant-guardrail";

export interface Accelerator {
  id: string;
  name: string;
  description: string;
  missionaryTaskComponents: string[];
  alignmentTier: AlignmentTier;
  alignmentNote: string;
  foundationsGuardrail: string;
  phase4PlusShift: string;
  diagnosticQuestions: string[];
}

export const accelerators: Accelerator[] = [
  {
    id: "prayer",
    name: "Prayer",
    description:
      "Sustained intercession focused on the people group's specific realities. Seeks God's guidance, protection, and breakthrough. Includes personal prayer, households, and networks of churches praying together.",
    missionaryTaskComponents: ["All — prayer permeates every component"],
    alignmentTier: "reframe",
    alignmentNote:
      "Foundations elevates prayer above the other accelerators — it is not one of 12 equal levers but the atmosphere of the entire task. Prayer must permeate every aspect of the missionary task.",
    foundationsGuardrail:
      "Do not treat prayer as one diagnostic gap among 12. It is the mode of the entire framework — lead every phase assessment and planning process in prayer as posture, not checklist item.",
    phase4PlusShift:
      "Local believers intercede for their own people group and outward to other peoples. Outside workers pray in support of local initiative, not as the primary intercessors.",
    diagnosticQuestions: [
      "Who specifically needs sustained prayer to break through into the next phase, and who could join you in praying for this breakthrough?",
      "Is prayer integrated into team rhythms as posture, or treated as a task to complete before the real work begins?",
      "Are local believers and churches being mobilized to pray for their own people group?",
    ],
  },
  {
    id: "scripture-access",
    name: "Scripture/Resource Access",
    description:
      "Heart-language access to Scripture and gospel content in usable formats (print, audio, app, oral). Focuses on translation, product development, distribution pathways, local ownership, and feedback on translation quality.",
    missionaryTaskComponents: [
      "Entry (communication ability, language)",
      "Evangelism (full gospel content)",
      "Discipleship (obedience to Scripture)",
    ],
    alignmentTier: "clean",
    alignmentNote:
      "Direct alignment. Foundations is deeply committed to heart-language Scripture access at every phase. Translation and localized resources must maintain full theological integrity.",
    foundationsGuardrail:
      "Scripture access efforts must prioritize theological accuracy. Foundations is explicit: the gospel message cannot be softened or altered because it offends non-Christian hearers. This applies to all translated and localized resources.",
    phase4PlusShift:
      "Local church takes ownership of Scripture distribution, translation feedback, and resource development. Outside workers support local ownership rather than maintaining control of distribution.",
    diagnosticQuestions: [
      "What barriers keep people from engaging with Scripture in their heart language and preferred format?",
      "How could removing those barriers accelerate progress toward the next phase?",
      "Do local believers have the Scripture tools they need to disciple others without outside assistance?",
    ],
  },
  {
    id: "multi-node",
    name: "Multi-Node Engagement",
    description:
      "Gospel activity across multiple geographic, demographic, or digital spaces. A node is a strategic point of influence — a city, town, diaspora community, or digital platform — where gospel engagement can occur. Engaging multiple nodes broadens impact and reduces vulnerability to disruption in any single stream.",
    missionaryTaskComponents: [
      "Evangelism",
      "Entry (presence across geography and demographics)",
    ],
    alignmentTier: "clean",
    alignmentNote:
      "Consistent with Foundations' priority on reaching unreached peoples and places. Multiple nodes align with team-based, non-lone-worker approach.",
    foundationsGuardrail:
      "Node selection should maximize access to the focus people group — not ease of access to expats or existing networks. Entry guidance applies: prioritize actual contact with the people being reached.",
    phase4PlusShift:
      "Local churches identify and engage new nodes among their own people. Outside workers support local node identification rather than initiating new nodes themselves.",
    diagnosticQuestions: [
      "Which geographic, demographic, or digital spaces remain untouched or show the most receptivity?",
      "Could engaging them unlock movement toward the next phase?",
      "Are multiple nodes engaged, or is all activity concentrated in one location?",
    ],
  },
  {
    id: "vision-casting",
    name: "Vision Casting",
    description:
      "A clear, compelling picture of gospel advance for the people group that aligns teams, churches, and partners. Uses stories and simple data to set direction and sustain momentum.",
    missionaryTaskComponents: [
      "Mobilization/Sending (upstream alignment)",
      "Collaborative Engagement",
    ],
    alignmentTier: "reframe",
    alignmentNote:
      "Valid tool, but Foundations roots vision in the glory of God and the weight of lostness — not primarily in data or strategic momentum. Vision must be theologically grounded before it is strategically compelling.",
    foundationsGuardrail:
      "Vision casting must lead with theological gravity — the glory of God, the reality of lostness, the urgency of proclamation — before moving to strategic clarity. Data and story serve that vision; they don't constitute it.",
    phase4PlusShift:
      "Local leaders hold and articulate vision for their own people. Outside workers serve that local vision rather than casting a foreign vision for the group.",
    diagnosticQuestions: [
      "What compelling picture of gospel breakthrough could unite, mobilize, and inspire people toward the next phase?",
      "Is the vision rooted in God's glory and the reality of lostness, or primarily in organizational strategy?",
      "Are local believers able to articulate vision for their own people group?",
    ],
  },
  {
    id: "mobilization-sending",
    name: "Mobilization/Sending",
    description:
      "Identifying, preparing, deploying, and caring for workers (local, near-culture, cross-culture). Includes simple pipelines, coaching, and member care.",
    missionaryTaskComponents: [
      "Entry (presence)",
      "Team structure across all 6 components",
    ],
    alignmentTier: "guardrail",
    alignmentNote:
      "Strong alignment with Foundations' team-based sending model and emphasis on member care. Guardrail: Foundations requires missionaries to be sent by and accountable to local churches — sending is ecclesiological, not merely organizational.",
    foundationsGuardrail:
      "Mobilization pipelines must be church-rooted. Workers should be examined, affirmed, and sent by a local church, with ongoing accountability to that church. Mobilization that bypasses local church accountability — even if practically efficient — is outside Foundations' framework.",
    phase4PlusShift:
      "Local churches become the primary sending structures. Outside agencies shift from sending workers in to supporting local churches in sending workers out — including to other people groups.",
    diagnosticQuestions: [
      "What type of worker does your current phase require?",
      "Who needs to be identified, prepared, or sent to drive progress toward the next phase?",
      "Are workers being sent by and accountable to local churches, or only to organizations?",
    ],
  },
  {
    id: "collaborative-engagement",
    name: "Collaborative Engagement",
    description:
      "Shared prayer, learning, data, and mutual care among churches, agencies, and local believers. Clarifies roles through simple agreements and works together on crises and opportunities.",
    missionaryTaskComponents: ["Runs across all 6 components"],
    alignmentTier: "guardrail",
    alignmentNote:
      "Foundations actively encourages working alongside other evangelical churches and organizations, with clear guidance on levels of collaboration based on theological, ecclesiological, and missiological alignment.",
    foundationsGuardrail:
      "Work within and through churches healthy in all three alignment areas (theology, ecclesiology, missiology). Work alongside those healthy in two but not missiology. Work around those not aligned — maintaining relationship but not structural partnership. Collaboration must not compromise standards.",
    phase4PlusShift:
      "Local churches become primary collaborators — not recipients of collaboration. Outside agencies and networks serve the collaboration that local churches are leading.",
    diagnosticQuestions: [
      "What would you gain by partnering more intentionally with other workers, local believers, or nearby churches?",
      "Are partnerships clarifying roles, or creating confusion and duplication?",
      "Are collaboration structures built on aligned theology, ecclesiology, and missiology?",
    ],
  },
  {
    id: "compassion",
    name: "Meeting Needs/Compassion",
    description:
      "Tangible expressions of love that dignify communities and open relational doors. Designed to 'do no harm,' be locally led, and connect naturally to long-term discipleship.",
    missionaryTaskComponents: [
      "Entry (servant posture, blessing the host community)",
    ],
    alignmentTier: "significant-guardrail",
    alignmentNote:
      "Highest friction with Foundations. Compassion is not one of the 6 Missionary Task components. Foundations is proclamation-centered: people must hear, understand, and believe the gospel to be saved. Compassion serves gospel engagement — it never replaces or precedes it.",
    foundationsGuardrail:
      "Compassion activities are valid when: (1) they serve the people group being reached, (2) they are locally led and avoid dependency on foreign resources, (3) they connect intentionally to gospel engagement and discipleship, and (4) they do not substitute for proclamation or define the team's primary identity. Compassion that crowds out the missionary task or creates dependency is outside Foundations' framework.",
    phase4PlusShift:
      "Local believers serve their own neighbors. Dependency risk increases sharply if outside workers remain primary compassion agents at Phase 4+. Outside compassion at this stage undermines self-sufficiency.",
    diagnosticQuestions: [
      "How can tangible acts of love open relational doors for deeper gospel engagement — without creating dependency or power imbalances?",
      "Is compassion ministry connecting to discipleship, or running as a parallel track?",
      "Who is leading compassion work — outside workers or local believers?",
    ],
  },
  {
    id: "contextualization",
    name: "Critical Contextualization",
    description:
      "Community-led application of Scripture that is biblically faithful and culturally meaningful. Regularly reviews forms and practices with diverse voices to guard against drift and syncretism.",
    missionaryTaskComponents: ["Runs across all 6 components"],
    alignmentTier: "significant-guardrail",
    alignmentNote:
      "Foundations has the most extensive guidance here. The goal is to adapt form without compromising content. The phrase 'community-led' in the Accelerator can drift toward insider movement territory if not anchored to Foundations' explicit limits.",
    foundationsGuardrail:
      "Hard limits — never negotiate: the deity of Christ, His death and resurrection, substitutionary atonement, salvation by grace through faith alone, Scripture's inerrancy and finality, and the radical nature of conversion. Churches must have clear Christian identity — not present themselves as part of any non-Christian religion. The purpose of contextualization is clarity, not comfort.",
    phase4PlusShift:
      "Local believers lead contextualization discernment. Outside workers offer accountability and theological resourcing when requested — they do not prescribe or veto local application. Diverse local voices guard against drift better than external review.",
    diagnosticQuestions: [
      "Where might current forms or practices feel disconnected from local culture or Scripture?",
      "Could addressing these unlock movement toward the next phase?",
      "Are contextualization decisions maintaining clear Christian identity and central gospel content?",
    ],
  },
  {
    id: "research",
    name: "Research/Cultural Insights",
    description:
      "An ongoing learning posture to understand insights from language, worldview, social networks, migration, and pressure points that impact fruitful strategy and practice.",
    missionaryTaskComponents: [
      "Entry (research — the first element: who, where, language, culture, history, existing work)",
    ],
    alignmentTier: "clean",
    alignmentNote:
      "Direct alignment. Foundations treats research as foundational to Entry and calls for structures and processes to coordinate it. Research is an ongoing posture, not a one-time task.",
    foundationsGuardrail:
      "Research serves the missionary task, not organizational reporting. Use research to sharpen evangelism, discipleship, and church planting strategy — not just to populate databases.",
    phase4PlusShift:
      "Local believers are the primary knowledge holders. Insider cultural insight supersedes outside research at Phase 4+. Research efforts should amplify local knowledge, not substitute for it.",
    diagnosticQuestions: [
      "What don't you yet know about people's spiritual hunger, barriers, social networks, or receptive subgroups?",
      "Would learning this remove key obstacles to the next phase?",
      "Are local believers being treated as the primary cultural experts?",
    ],
  },
  {
    id: "multiplying",
    name: "Multiplying Efforts",
    description:
      "Habits and systems that drive the reproduction of what the current phase requires. The emphasis is on reproducibility and wise release of authority.",
    missionaryTaskComponents: [
      "Healthy Church Formation",
      "Leadership Development",
      "Exit to Partnership",
    ],
    alignmentTier: "guardrail",
    alignmentNote:
      "Strong alignment with Foundations' conviction that multiplying churches that multiply churches is the most effective gospel advance strategy. Guardrail: multiplication must be of healthy churches, not just any reproducing group.",
    foundationsGuardrail:
      "Evaluate multiplication against church health (12 Characteristics), not reproduction metrics alone. A multiplying network lacking biblical teaching, accountability, or the ordinances is not a success state. Wise release of authority means indigenous leaders can maintain health without outside input.",
    phase4PlusShift:
      "Local churches are the multiplying agents. Outside workers step back from initiating new patterns and focus on supporting and strengthening what local churches are reproducing.",
    diagnosticQuestions: [
      "What's currently reproducing on its own versus requiring your constant involvement?",
      "What would need to multiply to sustain movement into the next phase?",
      "Is authority being released wisely, or is reproduction dependent on outside workers?",
    ],
  },
  {
    id: "training",
    name: "Training/Equipping",
    description:
      "Reproducible formation for people in the skills and biblical knowledge needed to strengthen their current phase and catalyze movement to the next. Delivered by practitioners and designed to be passed on.",
    missionaryTaskComponents: [
      "Leadership Development (primary)",
      "Discipleship",
    ],
    alignmentTier: "clean",
    alignmentNote:
      "Direct alignment with Foundations' Leadership Development component. Training that is reproducible, practitioner-delivered, and designed to be passed on matches Foundations' indigeneity standard.",
    foundationsGuardrail:
      "Training must target indigeneity as the outcome — not dependence on outside trainers or foreign curriculum. The standard: trained leaders can apply Scripture to their own context without ongoing foreign expert input. Long-term trainer dependency falls short of self-theologizing.",
    phase4PlusShift:
      "Local practitioners become the primary trainers. Outside trainers become coaches or occasional consultants. The training system itself should be reproducible without outside involvement.",
    diagnosticQuestions: [
      "What training is needed to strengthen the current phase and catalyze movement to the next?",
      "Who delivers training — outside practitioners or local ones?",
      "Is training designed to be passed on, or does it require outside experts to repeat it?",
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace Involvement",
    description:
      "Leveraging positions in business that provide access, witness, and tangible blessing. Operates ethically, favors local ownership, and integrates workplace discipleship where appropriate.",
    missionaryTaskComponents: [
      "Entry (creative access, presence, identity)",
    ],
    alignmentTier: "guardrail",
    alignmentNote:
      "Foundations explicitly addresses Business as Mission (BAM) and creative access. Requirements: integrity (actually do what you say), fit (skills and interests match the role), and access to people (not primarily expats or screens).",
    foundationsGuardrail:
      "Marketplace involvement is a valid Entry and presence strategy, not a long-term identity cover. Must provide genuine relational access to the people group. Workers must have a ready, honest answer to 'what do you do?' and must never deny their identity as followers of Jesus. Any model requiring hidden Christian identity falls outside Foundations' framework.",
    phase4PlusShift:
      "Local believers become the primary marketplace witnesses in their own community. Outside workers shift from using marketplace for access to supporting local believers in integrating faith and work.",
    diagnosticQuestions: [
      "Does marketplace involvement provide genuine access to the focus people group, or primarily to expats and screens?",
      "Can workers honestly and clearly answer 'what do you do?' without compromising their identity as followers of Jesus?",
      "Are local believers being equipped for marketplace witness in their own context?",
    ],
  },
];

export function getAccelerator(id: string): Accelerator | undefined {
  return accelerators.find((a) => a.id === id);
}
