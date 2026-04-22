export interface GlossaryTerm {
  term: string;
  definition: string;
  source: "phases" | "foundations" | "both";
  relatedTerms?: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    term: "Unengaged People Group",
    definition:
      "A people group where there are no known efforts focused on establishing self-sustaining churches consistent with evangelical faith and practice.",
    source: "phases",
    relatedTerms: ["Engaged People Group", "Phase 0"],
  },
  {
    term: "Engaged People Group",
    definition:
      "A people group where there is: (1) sustained activity to share Christ and make disciples, (2) efforts to establish self-sustaining churches, and (3) work occurring in culturally appropriate and locally relevant ways.",
    source: "phases",
    relatedTerms: ["Unengaged People Group", "Phase 1"],
  },
  {
    term: "Phase of Engagement",
    definition:
      "An eight-step continuum (Phase 0 through Phase 7) that tracks where a people group stands in terms of gospel progress toward self-sustaining churches. Each phase describes a milestone and is not always reflected by Christian or Evangelical percentage alone.",
    source: "phases",
    relatedTerms: ["Engagement Strength", "Engagement Accelerators"],
  },
  {
    term: "Engagement Strength",
    definition:
      "A five-level indicator (Unknown, Initial, Growing, Active, Flourishing) that captures how robust or deep engagement actually is, based on quantitative events and qualitative field reports. Shows how active and pervasive gospel activity is relative to the size of the group.",
    source: "phases",
    relatedTerms: ["Phase of Engagement"],
  },
  {
    term: "Engagement Accelerators",
    definition:
      "Twelve strategic domains (e.g., prayer, Scripture access, training, collaboration) that apply across all phases but require different approaches at each phase. Diagnostic and catalytic — not a scorecard, prescription, or rigid method. Used to surface gaps, spark ideas, and focus next steps.",
    source: "phases",
    relatedTerms: ["Phase of Engagement", "Engagement Strength"],
  },
  {
    term: "Node",
    definition:
      "A strategic point of influence within a people group — such as a city, town, diaspora community, or digital platform — where gospel engagement can occur. Engaging multiple nodes broadens impact and reduces vulnerability to disruption in any single stream.",
    source: "phases",
    relatedTerms: ["Multi-Node Engagement"],
  },
  {
    term: "Phase 0-R",
    definition:
      "A sub-indicator marking that a restart is needed — either because previous efforts have not resulted in ongoing activity, or because no new incoming data has been received for three years.",
    source: "phases",
    relatedTerms: ["Phase 0"],
  },
  {
    term: "Missionary Task",
    definition:
      "The six core components of IMB missionary work: Entry, Evangelism, Discipleship, Healthy Church Formation, Leadership Development, and Exit to Partnership. Prayer is not a separate component but permeates all six.",
    source: "foundations",
    relatedTerms: ["Entry", "Exit to Partnership", "Healthy Church Formation"],
  },
  {
    term: "Entry",
    definition:
      "The first component of the Missionary Task. Gaining access to people who need to hear the gospel through four elements: research (who/where), presence (access strategy with integrity), identity (honest answer to 'what do you do?'), and communication ability (heart-language competency).",
    source: "foundations",
    relatedTerms: ["Missionary Task", "Creative Access", "Heart Language"],
  },
  {
    term: "Exit to Partnership",
    definition:
      "The sixth and final component of the Missionary Task. The missionary works toward transitioning from primary agent to distant partner as local churches take full ownership. Universal missionary experience shows that dependency on foreign leadership and funds is deadly to church health and multiplication.",
    source: "foundations",
    relatedTerms: ["Missionary Task", "Indigeneity", "Four Selfs"],
  },
  {
    term: "Healthy Church",
    definition:
      "A church exhibiting twelve biblical characteristics: evangelism, discipleship, membership, leadership, preaching and teaching, ordinances (baptism and Lord's Supper), worship, fellowship, prayer, accountability and discipline, giving, and mission.",
    source: "foundations",
    relatedTerms: ["Healthy Church Formation", "12 Characteristics"],
  },
  {
    term: "Indigeneity",
    definition:
      "The classical missiological principle that new churches should become self-governing, self-financing, self-propagating, and self-theologizing as quickly as possible. Dependence on foreign leadership and foreign funds is deadly to church health, growth, and multiplication.",
    source: "foundations",
    relatedTerms: ["Four Selfs", "Exit to Partnership"],
  },
  {
    term: "Four Selfs",
    definition:
      "The four marks of an indigenous church: self-governing (led by local leaders, not under missionary authority), self-financing (not dependent on foreign funds for ongoing operation), self-propagating (reproducing through local initiative), and self-theologizing (applying Scripture to local context without ongoing foreign expert input).",
    source: "foundations",
    relatedTerms: ["Indigeneity", "Exit to Partnership"],
  },
  {
    term: "Contextualization",
    definition:
      "Adapting the form of the gospel message and church expression to be culturally meaningful while maintaining full biblical content. The purpose is to make the gospel clear — not comfortable or acceptable to non-Christian hearers. Form is fully adaptable; content is not.",
    source: "foundations",
    relatedTerms: ["Indigeneity", "Critical Contextualization"],
  },
  {
    term: "6 Marks of a Disciple",
    definition:
      "Six transformations that characterize a growing follower of Christ: transformed heart, transformed mind, transformed affections, transformed will, transformed relationships, and transformed purpose.",
    source: "foundations",
    relatedTerms: ["Discipleship"],
  },
  {
    term: "Heart Language",
    definition:
      "The primary language in which a person thinks, processes emotion, and communicates worldview truth. The language in which the gospel is most deeply understood and Scripture most effectively transforms. Heart-language access is essential for evangelism, discipleship, and church formation.",
    source: "both",
    relatedTerms: ["Scripture/Resource Access", "Communication Ability"],
  },
  {
    term: "Self-Sustaining Church",
    definition:
      "A local church that is consistent with evangelical faith and practice and is able to operate, grow, and reproduce without dependency on outside leadership or funding. The stated goal of engagement from Phase 0 onward.",
    source: "both",
    relatedTerms: ["Healthy Church", "Four Selfs", "Indigeneity"],
  },
  {
    term: "Near-Culture Believer",
    definition:
      "A believer from a culturally proximate people group (not from the focus group itself) who can share the gospel and build relationships across a smaller cultural gap than an outside cross-cultural worker.",
    source: "phases",
    relatedTerms: ["Mobilization/Sending", "Phase 1"],
  },
  {
    term: "Creative Access",
    definition:
      "An access strategy used to establish presence in countries or contexts where missionary visas are unavailable or restricted. Must have integrity (actually do what you say), fit (credible to the worker's actual skills), and access to the people group (not primarily expats or screens).",
    source: "foundations",
    relatedTerms: ["Entry", "Marketplace Involvement"],
  },
];

export function getTerm(term: string): GlossaryTerm | undefined {
  return glossary.find(
    (g) => g.term.toLowerCase() === term.toLowerCase()
  );
}
