export type PhaseId = "0" | "0-R" | "1" | "2" | "3" | "4" | "5" | "6" | "7";

export interface Phase {
  id: PhaseId;
  name: string;
  label: string;
  description: string;
  markers: string[];
  primaryAgent: "outside" | "local" | "transitioning";
  missionaryTaskFocus: string[];
  transitionQuestion: string;
  transitionCriteria: string[];
  commonFailureModes: string[];
  acceleratorPriorities: string[];
}

export const phases: Phase[] = [
  {
    id: "0",
    name: "Waiting",
    label: "Phase 0 – Waiting",
    description:
      "There is no known reported engagement to establish self-sustaining churches among this people group.",
    markers: [
      "No known current effort with intention toward self-sustaining churches",
      "No workers or near-culture believers engaged with the group",
    ],
    primaryAgent: "outside",
    missionaryTaskFocus: ["Entry (research, access strategy)"],
    transitionQuestion:
      "Is there any known current effort with intention toward self-sustaining churches that is culturally appropriate and locally relevant?",
    transitionCriteria: [
      "Sustained activity to share Christ and make disciples has begun",
      "Efforts to establish self-sustaining churches are underway",
      "Work occurs in culturally appropriate and locally relevant ways",
    ],
    commonFailureModes: [
      "Treating the people group as researched without actual gospel access",
      "Counting diaspora engagement as engagement among the home group",
    ],
    acceleratorPriorities: [
      "Prayer",
      "Research/Cultural Insights",
      "Mobilization/Sending",
      "Vision Casting",
    ],
  },
  {
    id: "0-R",
    name: "Restart",
    label: "Phase 0-R – Restart Needed",
    description:
      "Previous efforts have not resulted in ongoing activity, or data has not been updated in three years. A restart is needed to reassess and potentially reinitiate engagement.",
    markers: [
      "Prior work ceased with no lasting gospel presence remaining",
      "No new incoming data for three or more years",
      "Believers have dispersed or external pressures disrupted ministry",
    ],
    primaryAgent: "outside",
    missionaryTaskFocus: ["Entry (fresh research, renewed access)"],
    transitionQuestion:
      "Is there verifiable current engagement with intention toward self-sustaining churches?",
    transitionCriteria: [
      "Fresh field assessment completed",
      "Current engagement confirmed — not legacy data",
      "Culturally appropriate access reestablished",
    ],
    commonFailureModes: [
      "Relying on outdated data without field verification",
      "Assuming prior momentum remains when it has stalled",
    ],
    acceleratorPriorities: [
      "Research/Cultural Insights",
      "Prayer",
      "Collaborative Engagement",
      "Mobilization/Sending",
    ],
  },
  {
    id: "1",
    name: "Entry",
    label: "Phase 1 – Entry",
    description:
      "Workers or near-culture believers gain access to the people group and begin laying relational foundations to share Christ and plant churches. The focus is on connecting, learning, and building bridges.",
    markers: [
      "Workers or near-culture believers have access to the people group",
      "Relational foundations are being built",
      "Language and culture learning is underway",
      "Gospel is being woven into relationships",
    ],
    primaryAgent: "outside",
    missionaryTaskFocus: [
      "Entry (presence, identity, communication ability)",
      "Evangelism (beginning)",
    ],
    transitionQuestion:
      "Is regular, culturally relevant gospel engagement taking place with the intention of planting self-sustaining churches?",
    transitionCriteria: [
      "Regular gospel engagement is occurring — not just presence",
      "Engagement is culturally relevant and locally appropriate",
      "Intention is explicit: church planting, not just friendship",
    ],
    commonFailureModes: [
      "Staying in 'learning mode' indefinitely without gospel proclamation",
      "Building relationships without introducing Christ",
      "Prioritizing social integration over evangelistic intentionality",
    ],
    acceleratorPriorities: [
      "Prayer",
      "Research/Cultural Insights",
      "Scripture/Resource Access",
      "Multi-Node Engagement",
      "Marketplace Involvement",
    ],
  },
  {
    id: "2",
    name: "Evangelism",
    label: "Phase 2 – Evangelism",
    description:
      "Regular, culturally relevant gospel engagement is taking place, with the intention of planting self-sustaining churches.",
    markers: [
      "Regular gospel conversations occurring across multiple relationships",
      "Gospel is presented with full content — not watered down",
      "Engagement is culturally appropriate and locally relevant",
      "Church planting is the stated intention",
    ],
    primaryAgent: "outside",
    missionaryTaskFocus: [
      "Evangelism (primary)",
      "Entry (sustained)",
      "Discipleship (beginning — for any who respond)",
    ],
    transitionQuestion:
      "Have individuals or small clusters responded in repentance and faith, with early discipleship emphasizing obedience to Scripture?",
    transitionCriteria: [
      "At least one individual or small cluster has responded in repentance and faith",
      "Early discipleship has begun",
      "Discipleship stresses obedience to Scripture",
      "Foundations are being laid for self-sustaining churches",
    ],
    commonFailureModes: [
      "Gospel engagement without full content (softening the message)",
      "Activity without accountability to gospel proclamation",
      "Sporadic rather than regular engagement",
    ],
    acceleratorPriorities: [
      "Prayer",
      "Scripture/Resource Access",
      "Multi-Node Engagement",
      "Mobilization/Sending",
      "Meeting Needs/Compassion",
    ],
  },
  {
    id: "3",
    name: "Discipleship",
    label: "Phase 3 – Discipleship",
    description:
      "Individuals or small clusters have responded in repentance and faith. Early discipleship stresses obedience to Scripture, laying foundations for self-sustaining churches consistent with evangelical faith and practice.",
    markers: [
      "At least one person or cluster has responded to the gospel in faith",
      "Early discipleship is underway",
      "Discipleship is grounded in Scripture obedience",
      "Foundation for a self-sustaining church is being laid",
    ],
    primaryAgent: "outside",
    missionaryTaskFocus: [
      "Discipleship (primary)",
      "Healthy Church Formation (beginning)",
      "Evangelism (ongoing)",
    ],
    transitionQuestion:
      "Are believers from the people group gathering regularly as local churches consistent with evangelical faith and practice, with local leaders emerging?",
    transitionCriteria: [
      "Believers are gathering regularly as a church body",
      "The gathering is consistent with evangelical faith and practice",
      "Leaders from the people group are beginning to emerge",
    ],
    commonFailureModes: [
      "Discipleship without church formation in view",
      "Foreign-style discipleship that won't reproduce locally",
      "Developing disciples without developing leaders",
      "Stalling at small group stage without moving toward church",
    ],
    acceleratorPriorities: [
      "Training/Equipping",
      "Critical Contextualization",
      "Scripture/Resource Access",
      "Multiplying Efforts",
      "Prayer",
    ],
  },
  {
    id: "4",
    name: "Local Church",
    label: "Phase 4 – Local Church",
    description:
      "Believers from the people group gather regularly, functioning as a local church consistent with evangelical faith and practice. Leaders from the people group are emerging among these churches.",
    markers: [
      "Believers gathering regularly as a local church",
      "Church is consistent with evangelical faith and practice",
      "Local leaders are emerging from within the people group",
      "Outside worker begins transition from leader to nurturer/coach",
    ],
    primaryAgent: "transitioning",
    missionaryTaskFocus: [
      "Healthy Church Formation (primary)",
      "Leadership Development (beginning — critical)",
      "Discipleship (ongoing)",
    ],
    transitionQuestion:
      "Are churches from the people group sending out evangelists or church planters, and are second-generation groups or churches forming?",
    transitionCriteria: [
      "Local churches are sending out their own evangelists or planters",
      "Second-generation groups or churches are forming",
      "Reproducing movement is initiated by local believers, not outsiders",
    ],
    commonFailureModes: [
      "Outside worker continues to lead rather than releasing authority",
      "Church formation without health (missing the 12 Characteristics)",
      "Leadership development without actual authority transfer",
      "Dependency on foreign funding for ongoing church operation",
    ],
    acceleratorPriorities: [
      "Training/Equipping",
      "Multiplying Efforts",
      "Collaborative Engagement",
      "Vision Casting",
      "Prayer",
    ],
  },
  {
    id: "5",
    name: "Reproducing Church",
    label: "Phase 5 – Reproducing Church",
    description:
      "Churches from the people group are sending out evangelists or church planters to plant new churches among their own people. Second-generation groups and churches are forming.",
    markers: [
      "Local churches are sending their own planters and evangelists",
      "Second-generation groups or churches have formed",
      "Reproduction is initiated and sustained by local believers",
      "Outside worker is coach/partner, not primary leader",
    ],
    primaryAgent: "local",
    missionaryTaskFocus: [
      "Leadership Development (primary)",
      "Healthy Church Formation (protecting health as networks grow)",
      "Exit to Partnership (in view)",
    ],
    transitionQuestion:
      "Are churches and leaders multiplying to the fourth generation or beyond?",
    transitionCriteria: [
      "Church and leader streams have reached fourth generation or beyond",
      "Multiplication is happening across the people group",
      "Local network structures are forming to empower local oversight",
    ],
    commonFailureModes: [
      "Reproduction of unhealthy patterns (syncretism, weak doctrine)",
      "Speed of reproduction outpacing quality of discipleship",
      "Outside worker re-centers as primary leader under pressure",
      "Network growth without health accountability structures",
    ],
    acceleratorPriorities: [
      "Multiplying Efforts",
      "Training/Equipping",
      "Collaborative Engagement",
      "Critical Contextualization",
      "Prayer",
    ],
  },
  {
    id: "6",
    name: "Multiplying Church",
    label: "Phase 6 – Multiplying Church",
    description:
      "Generational church streams spread across the people group, reaching 4th generation or beyond of both churches and leaders. Church network structures empower local oversight.",
    markers: [
      "Fourth-generation or beyond church and leader streams exist",
      "Local network structures empower local oversight",
      "Multiplication is self-sustaining without outside initiative",
      "Outside worker is at most a distant partner",
    ],
    primaryAgent: "local",
    missionaryTaskFocus: [
      "Exit to Partnership (primary — preparing for full handoff)",
      "Leadership Development (strengthening network health)",
    ],
    transitionQuestion:
      "Does the people group have 10% or more following Christ in churches, or several multiplying church planting networks led by believers who are sending workers to other people groups?",
    transitionCriteria: [
      "10% or more of the people group following Christ in churches, OR",
      "Several multiplying church planting networks led by local believers",
      "Local believers sending workers to other people groups",
      "Churches continuing to mature while sending outward",
    ],
    commonFailureModes: [
      "Failing to formalize exit — outside worker stays too long",
      "Networks growing without maintaining theological health",
      "Local oversight structures becoming controlling rather than empowering",
    ],
    acceleratorPriorities: [
      "Multiplying Efforts",
      "Vision Casting",
      "Collaborative Engagement",
      "Training/Equipping",
      "Prayer",
    ],
  },
  {
    id: "7",
    name: "Sustained Gospel Presence",
    label: "Phase 7 – Sustained Gospel Presence",
    description:
      "The people group has either (1) 10% or more following Christ and worshipping in churches, or (2) several multiplying church planting networks led by believers from the people group, who are sending workers to other people groups while continuing to mature at home.",
    markers: [
      "10%+ following Christ in churches, OR",
      "Multiple multiplying networks sending to other peoples",
      "Gospel presence is self-sustaining and locally owned",
      "Outside missionary role has fully transitioned to partnership",
    ],
    primaryAgent: "local",
    missionaryTaskFocus: [
      "Exit to Partnership (complete)",
      "Partnership — local churches now function as sending churches",
    ],
    transitionQuestion: "N/A — this is the destination phase.",
    transitionCriteria: [],
    commonFailureModes: [
      "Outside agencies maintaining a presence that creates dependency rather than celebrating exit",
      "Treating sustained presence as arrival rather than ongoing discipleship",
    ],
    acceleratorPriorities: [
      "Prayer",
      "Vision Casting (now outward — to other peoples)",
      "Mobilization/Sending (local churches sending outward)",
      "Collaborative Engagement",
    ],
  },
];

export function getPhase(id: PhaseId): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export const phaseDecisionTree = [
  {
    question:
      "Is there any known current effort with intention toward self-sustaining churches that is culturally appropriate and locally relevant?",
    no: "0",
    yes: "continue",
  },
  {
    question:
      "Are workers or near-culture believers gaining access and laying relational foundations to share Christ and plant churches?",
    no: "0",
    yes: "1",
  },
  {
    question:
      "Is regular, culturally relevant gospel engagement taking place with the intention of planting self-sustaining churches?",
    no: "1",
    yes: "2",
  },
  {
    question:
      "Have individuals or small clusters responded in repentance and faith, with early discipleship emphasizing obedience to Scripture and laying foundations for self-sustaining churches?",
    no: "2",
    yes: "3",
  },
  {
    question:
      "Are believers from the people group gathering regularly as local churches consistent with evangelical faith and practice, with leaders from the people group emerging?",
    no: "3",
    yes: "4",
  },
  {
    question:
      "Are churches sending evangelists/planters, and do you see second-generation groups or churches forming?",
    no: "4",
    yes: "5",
  },
  {
    question:
      "Are churches and leaders multiplying to the fourth generation?",
    no: "5",
    yes: "6",
  },
  {
    question:
      "Are there multiple streams of churches reaching fourth generation with evangelical doctrine and practice sustained locally, and are local networks sending workers to other people groups?",
    no: "6",
    yes: "7",
  },
];
