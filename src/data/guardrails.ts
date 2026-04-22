export interface Guardrail {
  id: string;
  category: string;
  title: string;
  principle: string;
  hardLimits: string[];
  applicationNotes: string[];
  failureMode: string;
}

export const guardrails: Guardrail[] = [
  {
    id: "gospel-content",
    category: "Evangelism",
    title: "Full Gospel Content",
    principle:
      "The gospel message must contain all components and connect them in the hearer's mind. Evangelism is incomplete until this happens. The purpose of contextualization is to make the gospel clear — not comfortable or acceptable to non-Christian hearers.",
    hardLimits: [
      "Never omit or downplay the One True God — Father, Son, Holy Spirit",
      "Never downplay the deity of Christ",
      "Never omit the reality of His death and resurrection",
      "Never soften the necessity of His substitutionary sacrifice",
      "Never alter salvation by grace alone, through faith alone, in Christ alone",
      "Never compromise the integrity, inerrancy, and finality of Scripture",
      "Never downplay the radical nature of conversion — it is death and new life",
    ],
    applicationNotes: [
      "Bridges from culture and religion to the gospel are valid as long as they do not imply divine inspiration or equality with the Bible",
      "Chronological Bible storying is an excellent tool for oral cultures",
      "The word used for God may vary by language context — what cannot vary is the biblical content imported into that word",
      "Contextualizing tone, approach, and style is expected; contextualizing the message itself is not permitted",
    ],
    failureMode:
      "Softening gospel content to reduce offense, omitting the cross or judgment from initial presentations, or treating contextualization as license to alter the message.",
  },
  {
    id: "contextualization",
    category: "Contextualization",
    title: "Biblical Contextualization Limits",
    principle:
      "The gospel is not tied to any culture, including Western or American culture. It can make itself at home in any culture while challenging and transforming every culture. The goal is biblically faithful Christians within their home culture — not North American Christians.",
    hardLimits: [
      "Churches must have clear identity as belonging to Jesus — never present as essentially part of a non-Christian religion",
      "Church teaching must not imply that other religions, their prophets, or their books are of divine origin",
      "Workers must never give the impression they have converted to the local religion",
      "Workers must not deny identity as followers of Jesus — even if cultural Christianity carries baggage",
      "Workers must not adopt any local cultural practice or attitude that violates Scripture",
    ],
    applicationNotes: [
      "The church should look, sound, and feel local — not foreign. Style is fully contextualizable.",
      "New believers should remain in their community and maintain cultural identity as much as possible without compromising Scripture obedience",
      "Local churches should be pointed to the Bible — not to foreign experts — for answers about Christian belief and living",
      "Goal is 'acceptable outsiders' — not invisible insiders who have merged identity with the local religion",
      "New churches can utilize local cultural practices consistent with Scripture",
    ],
    failureMode:
      "Insider movements where converts maintain a non-Christian religious identity, softening the exclusivity of Christ, or treating 'community-led application' as license to compromise doctrine.",
  },
  {
    id: "indigeneity",
    category: "Indigeneity",
    title: "The Four Selfs Standard",
    principle:
      "Universal missionary experience has shown that dependence on foreign leadership and foreign funds is deadly to the health, growth, and multiplication of churches. New churches should become self-governing, self-financing, self-propagating, and self-theologizing as quickly as possible.",
    hardLimits: [
      "Missionaries should not plant churches and then pastor them — raise up local leaders",
      "New churches are not under the authority of the missionary or the foreign organization",
      "Long-term foreign funding dependency undermines self-financing and multiplication",
      "Leadership development that does not transfer actual authority has not achieved the goal",
      "Outside worker's role in Phase 4+ is coach and accountability partner — not director",
    ],
    applicationNotes: [
      "Self-governing: led by local elders/leaders, not under missionary authority",
      "Self-financing: not dependent on foreign funds for ongoing operation",
      "Self-propagating: reproducing through local initiative and local sending",
      "Self-theologizing: applying Scripture to local context without ongoing foreign expert input",
      "Exit is the goal — plan for it from Phase 1, not as a crisis at Phase 6",
    ],
    failureMode:
      "Missionaries who continue to lead rather than release in late phases, compassion or training programs that create ongoing foreign dependency, or multiplication that requires outside workers to initiate and sustain.",
  },
  {
    id: "compassion",
    category: "Compassion",
    title: "Compassion as Gospel Servant",
    principle:
      "Compassion ministry is not one of the 6 Missionary Task components. It is valid as a servant of gospel proclamation — opening doors, dignifying communities, demonstrating love. It never replaces proclamation, precedes it as a substitute, or becomes the primary identity of the team.",
    hardLimits: [
      "Compassion must not substitute for gospel proclamation",
      "Compassion must not create dependency on foreign resources or expertise",
      "Compassion must not become the team's primary identity at the expense of the missionary task",
      "Compassion programs must be locally led wherever possible",
    ],
    applicationNotes: [
      "Compassion serves the missionary task when it opens relational doors for ongoing gospel engagement",
      "Acts of service should be designed to 'do no harm' — avoid power imbalances and dependency",
      "Compassion connected to long-term discipleship is qualitatively different from compassion as development work",
      "At Phase 4+, outside-led compassion programs undermine local self-sufficiency and should be handed to local believers",
    ],
    failureMode:
      "Teams that become known primarily as development or humanitarian organizations rather than gospel witnesses, compassion programs that attract participants without gospel engagement, or dependency models that slow local self-sufficiency.",
  },
  {
    id: "collaboration",
    category: "Collaboration",
    title: "Tiered Partnership Based on Alignment",
    principle:
      "Work within and through indigenous churches that are healthy in theology, ecclesiology, and missiology. Work alongside those healthy in two but not missiology. Work around those not aligned — maintaining relationship but not structural partnership.",
    hardLimits: [
      "Collaboration must not compromise theological standards (Baptist Faith and Message 2000 as the IMB benchmark)",
      "Structural partnership (co-planting, shared teams) requires alignment in all three areas",
      "Collaboration that advances the gospel among the unreached should never be sacrificed for organizational convenience",
    ],
    applicationNotes: [
      "Shared prayer, data, and learning are low-barrier entry points for collaboration",
      "Structural collaboration requires greater alignment than relational collaboration",
      "The default should be to engage as much as possible with indigenous churches",
      "Work to strengthen or revitalize existing churches even when their missiology is weak",
    ],
    failureMode:
      "Structural partnerships with churches whose theology or practice undermines the missionary task, or collaboration that creates confusion about the gospel or church health standards.",
  },
  {
    id: "sending",
    category: "Sending",
    title: "Church-Rooted Sending",
    principle:
      "Every missionary is sent by and accountable to a local church. The local church disciple believers, discerns their calling, trains them, assesses their readiness, and sends them out. Gospel workers report back to the churches that sent them. Long-distance sending relationships do not fulfill all that is necessary.",
    hardLimits: [
      "Missionaries must be discipled, examined, affirmed, and sent by a local church",
      "Missionaries must be actively involved in a local church on their field of service",
      "Sending that bypasses local church examination and accountability is outside the framework",
    ],
    applicationNotes: [
      "Involvement in a local church on the field can take many forms — including a church being planted",
      "The sending church relationship (North America) and the field church relationship are both required — neither fulfills all that the other provides",
      "At Phase 4+, local churches become the primary sending structures for their own people",
    ],
    failureMode:
      "Workers sent only by organizations without meaningful church accountability, or mobilization pipelines that treat church involvement as optional rather than foundational.",
  },
];

export function getGuardrail(id: string): Guardrail | undefined {
  return guardrails.find((g) => g.id === id);
}

export function getGuardrailsForAccelerator(acceleratorId: string): Guardrail[] {
  const categoryMap: Record<string, string[]> = {
    prayer: [],
    "scripture-access": ["gospel-content"],
    "multi-node": [],
    "vision-casting": [],
    "mobilization-sending": ["sending"],
    "collaborative-engagement": ["collaboration"],
    compassion: ["compassion"],
    contextualization: ["contextualization", "gospel-content"],
    research: [],
    multiplying: ["indigeneity"],
    training: ["indigeneity"],
    marketplace: ["gospel-content"],
  };

  const ids = categoryMap[acceleratorId] ?? [];
  return ids.map((id) => guardrails.find((g) => g.id === id)).filter(Boolean) as Guardrail[];
}
