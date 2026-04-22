export interface MissionaryTaskComponent {
  id: string;
  name: string;
  description: string;
  primaryPhases: string[];
  secondaryPhases: string[];
  keyPrinciples: string[];
  indigeneityNote: string;
}

export const missionaryTask: MissionaryTaskComponent[] = [
  {
    id: "entry",
    name: "Entry",
    description:
      "Gaining access to people who need to hear the gospel. Includes four elements: research (who and where are the unreached), presence (access strategy with integrity and fit), identity (an honest answer to 'what do you do?'), and communication ability (heart-language competency and cultural awareness).",
    primaryPhases: ["0", "0-R", "1"],
    secondaryPhases: ["2"],
    keyPrinciples: [
      "Research is foundational — know who, where, and what barriers exist",
      "Access strategy must have integrity: actually do what you say you do",
      "Access strategy must fit the worker: credibility requires genuine competence",
      "Access must reach the people group, not primarily expats or digital screens",
      "Heart-language learning is non-negotiable for deep gospel communication",
      "Evangelism begins during language learning — not after fluency",
    ],
    indigeneityNote:
      "Entry is primarily an outside-worker function. Near-culture believers may serve here. Goal is to establish presence that enables the full task.",
  },
  {
    id: "evangelism",
    name: "Evangelism",
    description:
      "Proclaiming the gospel with the full content of the message. Evangelism is the responsibility of every follower of Jesus and an element in the job description of every missionary regardless of assignment. The evangelistic task is urgent — and strategies must be intentional, accountable, and prayer-saturated.",
    primaryPhases: ["1", "2"],
    secondaryPhases: ["3", "4", "5", "6", "7"],
    keyPrinciples: [
      "Every missionary must evangelize — regardless of role or phase",
      "Evangelism must contain the full gospel content: sin, judgment, Christ's death and resurrection, substitutionary atonement, salvation by grace through faith alone",
      "Contextualization makes the gospel clear, not comfortable — never omit offensive truth",
      "Only the Holy Spirit can change a person's heart — fervent prayer underlies all evangelism",
      "The evangelistic task is urgent and should define the pace of work",
      "Evangelism incomplete until all components are communicated and connected in the hearer's mind",
    ],
    indigeneityNote:
      "Evangelism continues at all phases. In Phase 4+, local believers become the primary evangelists. Outside missionaries model evangelism even when local believers are leading it.",
  },
  {
    id: "discipleship",
    name: "Discipleship",
    description:
      "Making lifelong learners and followers of Jesus who progressively put sin to death and clothe themselves in the character of Christ. Biblical discipleship always includes intentional strategies and diligent work — evangelistic campaigns alone are never enough. Discipleship must happen in the context of a healthy church.",
    primaryPhases: ["3", "4"],
    secondaryPhases: ["2", "5", "6", "7"],
    keyPrinciples: [
      "Six transformations mark a disciple: transformed heart, mind, affections, will, relationships, purpose",
      "Discipleship is a lifelong process — not a course or a program",
      "New believers need most help early — like a newborn requiring more care than a grown adult",
      "Biblical discipleship requires engagement in a healthy local church",
      "Disciples make disciples — reproducibility must be built in from the start",
      "Discipleship is incomplete without the ordinances and accountability of church life",
    ],
    indigeneityNote:
      "Phase 4 marks the transition to locally-led discipleship. Local leaders must be equipped to disciple others without ongoing outside involvement. Self-theologizing is the goal.",
  },
  {
    id: "healthy-church-formation",
    name: "Healthy Church Formation",
    description:
      "Planting churches that exhibit the 12 Characteristics of a Healthy Church. Making disciples means planting healthy churches — a local church is the bride of Christ, the body of Christ, the household of God, the temple of the Holy Spirit, and the pillar and buttress of truth. The church is the goal and the means of gospel advance.",
    primaryPhases: ["3", "4", "5"],
    secondaryPhases: ["6", "7"],
    keyPrinciples: [
      "12 Characteristics: biblical evangelism, discipleship, membership, leadership, preaching/teaching, ordinances, worship, fellowship, prayer, accountability/discipline, giving, mission",
      "The most effective way to advance the gospel is to multiply churches that multiply churches",
      "Church can meet anywhere — form is flexible, biblical characteristics are not",
      "New churches must have clear identity as belonging to Jesus — not presenting as part of any non-Christian religion",
      "Churches should be indigenous in expression: look, sound, and feel local — not foreign",
      "Full discipleship requires the body of Christ functioning together with each member active",
    ],
    indigeneityNote:
      "Church formation must target the Four Selfs from day one: self-governing, self-financing, self-propagating, self-theologizing. Dependency on foreign leadership or funding is deadly to church health and multiplication.",
  },
  {
    id: "leadership-development",
    name: "Leadership Development",
    description:
      "Raising up local leaders who can govern, finance, propagate, and theologize without outside dependency. The missionary's normal role is not to plant a church and pastor it, but to plant and raise up local leaders. The goal is always to work toward local ownership and away from foreign control.",
    primaryPhases: ["4", "5", "6"],
    secondaryPhases: ["3", "7"],
    keyPrinciples: [
      "Raise up local leaders after the model of the Apostle Paul — plant, nurture, release",
      "Local churches should be self-governing: led by local elders, not under missionary authority",
      "Developing leaders means transferring actual authority, not just titles",
      "Self-theologizing means leaders can apply Scripture to local context without outside experts",
      "Leadership development is the primary vehicle for multiplication",
      "Outside worker's role in Phase 4+ is coach and accountability partner — not director",
    ],
    indigeneityNote:
      "Leadership Development is the critical hinge at Phase 4. Success means local leaders can fully carry the work without outside presence. Any training or equipping that creates long-term outside dependency has not achieved this component.",
  },
  {
    id: "exit-to-partnership",
    name: "Exit to Partnership",
    description:
      "The missionary's goal is to work themselves out of a role. Exit to Partnership means the outside worker transitions from primary agent to distant partner as local churches take full ownership. Universal missionary experience shows that dependency on foreign leadership and foreign funds is deadly to church health and multiplication.",
    primaryPhases: ["6", "7"],
    secondaryPhases: ["5"],
    keyPrinciples: [
      "Exit is a goal to plan for, not a crisis to manage — it should be anticipated from Phase 1",
      "Healthy exit means local churches function as fully self-sustaining — not that outside workers simply leave",
      "Partnership after exit looks like: peer relationship between sending churches and local churches, not continued oversight",
      "Local churches at Phase 7 become sending churches to other peoples — the mission continues through them",
      "Foreign dependency on leadership or funding at Phase 6-7 indicates incomplete leadership development",
      "Exit to Partnership is not abandonment — it is the fulfillment of the missionary task",
    ],
    indigeneityNote:
      "Exit to Partnership is the culmination of the indigeneity standard. The Four Selfs fully realized: self-governing, self-financing, self-propagating, self-theologizing — with the local church now sending to others.",
  },
];

export function getTaskComponent(id: string): MissionaryTaskComponent | undefined {
  return missionaryTask.find((c) => c.id === id);
}

export function getTaskComponentsForPhase(phaseId: string): {
  primary: MissionaryTaskComponent[];
  secondary: MissionaryTaskComponent[];
} {
  return {
    primary: missionaryTask.filter((c) => c.primaryPhases.includes(phaseId)),
    secondary: missionaryTask.filter((c) => c.secondaryPhases.includes(phaseId)),
  };
}
