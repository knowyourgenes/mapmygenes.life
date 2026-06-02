// Source of truth for both the seed script (pnpm seed) and the build-time
// fallback when Sanity isn't configured. Every read here is verbatim from
// content.pdf - SITE 01 (mapmygenes.life).

export type SeedTheme = {
  slug: string;
  name: string;
  day: string;
  shortDay: string;
  tagline: string;
  accentColor: string;
  icon: string;
  order: number;
};

export type SeedRead = {
  slug: string;
  week: number;
  themeSlug: string;
  title: string;
  shortAnswer: string;
  body: string[];
  genesInPlay: string[];
  doThisToday: string;
  readTimeMinutes: number;
  publishedAt: string;
  featured: boolean;
};

export type SeedChip = {
  slug: string;
  label: string;
  themeSlug: string | null;
  order: number;
};

export type SeedHomepage = {
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSubhead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  weeklyRhythmEyebrow: string;
  weeklyRhythmTitle: string;
  weeklyRhythmIntro: string;
  categoryChipsLabel: string;
  thisWeeksReadsTitle: string;
  thisWeeksReadsCta: string;
  shareEyebrow: string;
  shareTitle: string;
  shareBody: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterSmallprint: string;
  footerMission: string;
};

export const homepageContent: SeedHomepage = {
  heroEyebrow: "A new read every weekday. For the body you live in.",
  heroHeadline: "Your body has its own rules.",
  heroHeadlineAccent: "Read one today.",
  heroSubhead:
    "Daily, plain-language wellness reads grounded in your genes - food, movement, sleep, stress, and the family patterns nobody talks about. Five minutes. One fact. One thing to do about it. Written for South Asian biology.",
  heroPrimaryCta: "Read today's",
  heroSecondaryCta: "Get the daily read by email",
  weeklyRhythmEyebrow: "The weekly rhythm",
  weeklyRhythmTitle: "Every weekday has a theme. You always know what's coming.",
  weeklyRhythmIntro:
    "Predictability is what turns a casual visitor into a daily habit. Five themes, five days, one read at a time.",
  categoryChipsLabel: "Browse by category",
  thisWeeksReadsTitle: "This week's reads",
  thisWeeksReadsCta: "Browse the full library",
  shareEyebrow: "Save & share",
  shareTitle: "Wellness is more useful when it travels between people who care about each other.",
  shareBody:
    "Every read has a one-tap WhatsApp share. The kind of fact you send to the friend who drinks coffee at 9pm and wonders why she cannot sleep.",
  newsletterTitle: "One read in your inbox, every weekday morning.",
  newsletterBody: "Five minutes with your tea, before the day starts asking things of you.",
  newsletterSmallprint: "No ads. No selling. Unsubscribe anytime.",
  footerMission:
    "Daily, plain-language wellness for the body you actually live in - written for South Asian biology, free for everyone.",
};

export const themes: SeedTheme[] = [
  {
    slug: "move",
    name: "Move",
    day: "Monday",
    shortDay: "Mon",
    tagline: "How your genes shape strength, endurance, and recovery.",
    accentColor: "#E87A4C",
    icon: "M",
    order: 1,
  },
  {
    slug: "food",
    name: "Food",
    day: "Tuesday",
    shortDay: "Tue",
    tagline: "Why the same plate lands differently in two bodies.",
    accentColor: "#D87A3C",
    icon: "F",
    order: 2,
  },
  {
    slug: "sleep",
    name: "Sleep",
    day: "Wednesday",
    shortDay: "Wed",
    tagline: "Chronotype, deep sleep, and the 3pm crash.",
    accentColor: "#5A7B5C",
    icon: "S",
    order: 3,
  },
  {
    slug: "mind",
    name: "Mind",
    day: "Thursday",
    shortDay: "Thu",
    tagline: "Stress clearance, focus, mood, and the genes behind them.",
    accentColor: "#7A5C8C",
    icon: "M",
    order: 4,
  },
  {
    slug: "family",
    name: "Family",
    day: "Friday",
    shortDay: "Fri",
    tagline: "The wellness patterns that run quietly through Indian homes.",
    accentColor: "#C45A2E",
    icon: "F",
    order: 5,
  },
];

export const categoryChips: SeedChip[] = [
  { slug: "all-reads", label: "All reads", themeSlug: null, order: 1 },
  { slug: "move", label: "Move", themeSlug: "move", order: 2 },
  { slug: "food", label: "Food", themeSlug: "food", order: 3 },
  { slug: "sleep", label: "Sleep", themeSlug: "sleep", order: 4 },
  { slug: "mind", label: "Mind", themeSlug: "mind", order: 5 },
  { slug: "family", label: "Family", themeSlug: "family", order: 6 },
  { slug: "energy", label: "Energy", themeSlug: null, order: 7 },
  { slug: "skin", label: "Skin", themeSlug: null, order: 8 },
];

// Anchor for publishedAt timestamps so re-seeds remain idempotent.
const SEED_EPOCH = Date.UTC(2026, 4, 25, 7, 0, 0); // 25 May 2026 07:00 UTC
function dateFor(week: number, dayIdx: number): string {
  // dayIdx: 0=Mon..4=Fri. Each week advances 7 days.
  const ms = SEED_EPOCH + ((week - 1) * 7 + dayIdx) * 24 * 60 * 60 * 1000;
  return new Date(ms).toISOString();
}

function dayIndex(themeSlug: string): number {
  return ["move", "food", "sleep", "mind", "family"].indexOf(themeSlug);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

const raw: Array<Omit<SeedRead, "slug" | "publishedAt" | "readTimeMinutes" | "featured">> = [
  // Week 1
  {
    week: 1,
    themeSlug: "move",
    title: "Why does my friend build muscle faster than me on the same workout?",
    shortAnswer:
      "Roughly half of how you respond to training is genetic, and a single gene called ACTN3 helps decide whether you are built more for power or for endurance.",
    body: [
      "ACTN3 makes a protein in fast-twitch muscle fibres, the ones that fire during sprints and heavy lifts. People with the working version tend to gain explosive strength quickly. People with two non-working copies - common across South Asian populations - lean more towards endurance and recover differently.",
      "This is not an excuse and it is not a ceiling. It is a starting point. If you are a power type doing only long slow cardio, you are training against your wiring. If you are an endurance type chasing one-rep maxes, the same. The fix is not more effort. It is the right kind of effort.",
    ],
    genesInPlay: ["ACTN3", "ACE", "PPARGC1A"],
    doThisToday:
      "Pick one strength session and one endurance session this week. Notice which one leaves you energised and which one wrecks you. That gap is data.",
  },
  {
    week: 1,
    themeSlug: "food",
    title: "Why does dal-chawal spike my blood sugar but not my sister's?",
    shortAnswer:
      "How fast you turn carbohydrates into blood sugar is partly genetic, shaped by genes like AMY1 and TCF7L2 that vary a lot between people in the same family.",
    body: [
      "AMY1 controls how much carb-digesting enzyme your saliva makes. Some people carry many copies and break starch down fast; others carry few. Two siblings can sit at the same table, eat the same rice, and see very different blood-sugar curves an hour later.",
      "For a population with India's diabetes burden, this matters. It is why a meal that keeps one person steady can leave another foggy and hungry again in ninety minutes. The plate is not wrong. The pairing is.",
    ],
    genesInPlay: ["AMY1", "TCF7L2", "FTO"],
    doThisToday:
      "Add protein or fibre to your highest-carb meal - a bowl of dahi, a side of sprouts, an extra sabzi. Same meal, slower curve.",
  },
  {
    week: 1,
    themeSlug: "sleep",
    title: "Am I lazy for needing nine hours, or is that real?",
    shortAnswer:
      "It is real. About 40 to 50 percent of whether you are a short or long sleeper, and whether you are a morning or night person, is written in your genes.",
    body: [
      "Your chronotype - the clock your body actually keeps - is shaped by genes including PER3 and CRY1. A genuine night owl trying to wake at 5am is fighting their own hormones, not their discipline. Cortisol and melatonin peak at different clock times depending on your wiring.",
      "You cannot fully override it, but you can work with it. Around half of chronotype is environment: light, screens, meal timing, and consistent sleep windows can shift you by an hour or so. The other half is just who you are.",
    ],
    genesInPlay: ["PER3", "CRY1", "CLOCK"],
    doThisToday:
      "For three days, sleep and wake at the times your body drifts to on a free weekend. Notice how your afternoons feel. That is your real clock talking.",
  },
  {
    week: 1,
    themeSlug: "mind",
    title: "Why does a stressful week flatten me when my colleague bounces back by Monday?",
    shortAnswer:
      "Your body clears stress hormones at a genetically set speed, and the COMT and FKBP5 genes mean some people recover in hours while others take days.",
    body: [
      "COMT helps break down adrenaline and dopamine. A slower variant means stress chemistry lingers longer in your system. The same deadline that energises a fast-clearing colleague can keep you wired and depleted well into the weekend.",
      "Knowing this changes how you plan recovery. If you are a slow clearer, you do not need to toughen up. You need a longer runway after intense weeks, and protected downtime that a faster-clearing person can skip.",
    ],
    genesInPlay: ["COMT", "FKBP5"],
    doThisToday:
      "After your next hard day, block 30 minutes of genuinely low-stimulation time - a walk without your phone. Treat recovery as part of the work, not a reward for it.",
  },
  {
    week: 1,
    themeSlug: "family",
    title: "My whole family is 'always tired' - is that just us, or is it genetic?",
    shortAnswer:
      "Often it is both. Shared kitchens and shared habits get blamed, but families also share variants like MTHFR that quietly affect how everyone absorbs B12 and folate.",
    body: [
      "The MTHFR variant, common across Indian families, can reduce how well the body activates B12 and folate. When it runs through a household, three generations can carry the same low-energy pattern and assume it is simply their nature.",
      "The useful part: once one person notices the pattern, the whole family can act on it. A shared trait becomes a shared fix - the right form of a vitamin instead of the standard one, for everyone who carries it.",
    ],
    genesInPlay: ["MTHFR", "TMPRSS6"],
    doThisToday:
      "At your next family meal, ask one question: does low energy in the afternoon run on one side of the family? You may be naming a pattern out loud for the first time.",
  },

  // Week 2
  {
    week: 2,
    themeSlug: "move",
    title: "Should I do cardio or weights to lose weight for my body?",
    shortAnswer:
      "Both help, but your genes tilt the balance - some people lose fat more efficiently with resistance training, others with sustained cardio, and a DNA wellness panel can hint which.",
    body: [
      "Weight response to exercise is partly governed by how your muscles use fuel and how your body stores fat. The same twelve-week plan produces very different results across people, and a chunk of that gap is genetic rather than effort.",
      "The practical takeaway is to stop copying whatever worked for someone with a different body. Find the training style your body responds to and your adherence improves, because results arrive faster and motivation follows.",
    ],
    genesInPlay: ["FTO", "PPARGC1A", "ADRB2"],
    doThisToday:
      "Commit to one training style for four weeks instead of switching every week. Consistency reveals what your body actually responds to.",
  },
  {
    week: 2,
    themeSlug: "food",
    title: "Why do I feel bloated after milk when everyone says it's healthy?",
    shortAnswer:
      "Because most Indian adults stop making the enzyme that digests milk sugar after childhood - only around one in eight carries the variant for lifelong tolerance.",
    body: [
      "The LCT gene decides whether you keep producing lactase into adulthood. In Northern Europe most people do. Across South Asia, most people do not. The bloating after the second chai is not in your head; it is the default state of the subcontinent's digestion.",
      "This is not a reason to fear dairy. It is a reason to choose the right form. Fermented dairy - dahi, chaas - is easier because fermentation has already broken down much of the lactose.",
    ],
    genesInPlay: ["LCT", "MCM6"],
    doThisToday:
      "Swap one glass of milk for a bowl of dahi or a glass of chaas. Notice whether your afternoon feels lighter.",
  },
  {
    week: 2,
    themeSlug: "sleep",
    title: "Why does coffee after lunch ruin my sleep but not my friend's?",
    shortAnswer:
      "Around half of all adults are slow caffeine metabolisers, and for them the CYP1A2 gene keeps caffeine active in the body for up to ten hours instead of four.",
    body: [
      "If you are a slow metaboliser, a 2pm coffee can still be circulating at midnight. Your friend with the fast variant has cleared the same cup by dinner. Same drink, opposite night.",
      "A second gene, ADORA2A, decides how strongly you feel caffeine even if you clear it quickly. Between the two, some people simply cannot have afternoon coffee without paying for it at night.",
    ],
    genesInPlay: ["CYP1A2", "ADORA2A"],
    doThisToday:
      "Cut all caffeine after noon for one week. If you fall asleep noticeably faster, you have your answer about your own wiring.",
  },
  {
    week: 2,
    themeSlug: "mind",
    title: "Is my afternoon brain fog something I can actually fix?",
    shortAnswer:
      "Often yes - much of the classic 3pm fog traces to how your body absorbs B12 and iron and how deeply you sleep, all of which have a strong genetic component.",
    body: [
      "Three common variants stack up here. MTHFR can blunt B12 activation. TMPRSS6 can lower iron uptake. PER3 can shorten the deep-sleep phases that should clear your head overnight. Any one alone is mild. Together they read as a foggy afternoon.",
      "The reason generic advice misses it is that each piece looks normal on a standard report. The pattern only shows up when you look at how your particular body handles these nutrients.",
    ],
    genesInPlay: ["MTHFR", "TMPRSS6", "PER3"],
    doThisToday:
      "Track your energy at 3pm for five days alongside what you ate and how you slept. Patterns you can see are patterns you can change.",
  },
  {
    week: 2,
    themeSlug: "family",
    title: "Should I worry about diabetes if it runs on one side of my family?",
    shortAnswer:
      "Family history raises your risk meaningfully, but it is not destiny - for type 2 diabetes, lifestyle can roughly halve the genetic risk you inherit.",
    body: [
      "South Asians develop type 2 diabetes earlier and at lower body weights than many other populations, and a family history compounds that. But large studies are consistent: diet, movement, sleep, and weight respond strongly even in people with high genetic risk.",
      "The honest framing is that family history is a reason to pay attention earlier, not a sentence. The people who do best are the ones who learn the family pattern young and act while the dial is still easy to move.",
    ],
    genesInPlay: ["TCF7L2", "FTO", "KCNJ11"],
    doThisToday:
      "If diabetes runs in your family, ask your doctor for an HbA1c at your next visit - even if you feel fine. Early numbers are the most useful ones.",
  },

  // Week 3
  {
    week: 3,
    themeSlug: "move",
    title: "Why do I keep getting injured when I run?",
    shortAnswer:
      "Part of injury and recovery risk is genetic - variants in genes like COL1A1 affect tendon and ligament resilience, which is why some bodies tolerate high mileage and others break down.",
    body: [
      "Collagen-related genes influence how your connective tissue handles repeated load. If you carry variants linked to lower tendon resilience, ramping up mileage too fast is more likely to end in a niggle than it would for a friend with sturdier wiring.",
      "This does not mean you cannot run. It means your safe rate of progression is slower, your warm-up matters more, and strength work around the joints is not optional for you the way it might be for someone else.",
    ],
    genesInPlay: ["COL1A1", "COL5A1", "GDF5"],
    doThisToday:
      "Increase your weekly running distance by no more than ten percent. Boring, unglamorous, and the single best way to stay uninjured.",
  },
  {
    week: 3,
    themeSlug: "food",
    title: "Do I actually need all these supplements I'm taking?",
    shortAnswer:
      "Probably not - most people absorb only some of what they take, and which ones depend on genes like MTHFR for B12 and VDR for vitamin D.",
    body: [
      "The average wellness-focused adult takes a shelf full of supplements on best guess. But the standard form of B12 does little if you carry the MTHFR variant, and your vitamin D response is shaped by VDR. Half the bottles may be passing straight through.",
      "Fewer, better-matched supplements beat a crowded shelf. The goal is not to take more. It is to take the two or three your particular body actually uses.",
    ],
    genesInPlay: ["MTHFR", "VDR", "FUT2"],
    doThisToday:
      "Pick the one supplement you are least sure about and pause it for two weeks. If nothing changes, you have your answer.",
  },
  {
    week: 3,
    themeSlug: "sleep",
    title: "Why do I wake up tired even after eight hours in bed?",
    shortAnswer:
      "Because time in bed is not the same as deep sleep - variants in PER3 and CLOCK can compress the restorative phases, so eight hours of sleep delivers five hours of recovery.",
    body: [
      "Deep sleep is when your body and brain actually repair. Some people's wiring shortens those windows, so they clock the recommended hours and still wake unrefreshed. The number on the clock looks fine; the recovery underneath it is short.",
      "You can protect deep sleep with the basics - cool dark room, consistent timing, no late caffeine or alcohol - but if you have always woken tired despite enough hours, your architecture, not your effort, may be the variable.",
    ],
    genesInPlay: ["PER3", "CLOCK", "ADA"],
    doThisToday:
      "Keep your bedroom cooler tonight and put screens away 45 minutes before bed. Deep sleep responds to both.",
  },
  {
    week: 3,
    themeSlug: "mind",
    title: "Why does caffeine make me anxious even in small amounts?",
    shortAnswer:
      "A gene called ADORA2A controls how sensitive your brain's receptors are to caffeine, so some people feel jittery and anxious on a dose that barely registers for others.",
    body: [
      "Caffeine works by blocking adenosine receptors. If your ADORA2A variant makes those receptors especially responsive, even a small coffee can spike your heart rate and tip you into anxiety. This is separate from how fast you clear caffeine - you can be sensitive even as a fast metaboliser.",
      "The fix is simple once you know: a smaller dose, or switching to something gentler like green tea, can give you the lift without the edge.",
    ],
    genesInPlay: ["ADORA2A", "CYP1A2"],
    doThisToday:
      "If coffee makes you anxious, try half your usual dose tomorrow. Sensitivity often responds to amount more than you would expect.",
  },
  {
    week: 3,
    themeSlug: "family",
    title: "Is it worth testing my parents' genes, not just mine?",
    shortAnswer:
      "It can be - many wellness and risk patterns are shared across a family, so testing parents often explains your own results and flags risks worth acting on for everyone.",
    body: [
      "Because you inherit half your DNA from each parent, their results illuminate yours. A pattern that looks ambiguous in you alone often becomes clear when you can see which side of the family it came from. For risk markers, it can prompt earlier screening across the household.",
      "The Indian joint-family setup makes this especially powerful. Shared kitchens and shared genes mean a single conversation can change habits for three generations at once.",
    ],
    genesInPlay: ["Shared familial variants"],
    doThisToday:
      "Have one honest conversation with a parent about what runs in the family - heart, sugar, thyroid. Write down what you learn. It is the cheapest family health record you will ever build.",
  },

  // Week 4
  {
    week: 4,
    themeSlug: "move",
    title: "Why am I exhausted after workouts that energise other people?",
    shortAnswer:
      "Recovery capacity is partly genetic - how quickly you clear exercise stress and rebuild depends on genes affecting inflammation and stress-hormone clearance.",
    body: [
      "Two people can do the same session and walk away in opposite states. If your body clears the stress chemistry of hard exercise slowly, intense daily training will dig a hole rather than build fitness. The fatigue is a signal, not a weakness.",
      "For slow recoverers, the gains come from spacing hard sessions further apart and protecting sleep around them. Training less often, but recovering fully, beats grinding daily and never adapting.",
    ],
    genesInPlay: ["COMT", "IL6", "ACTN3"],
    doThisToday:
      "Put a genuine rest day between your two hardest sessions this week. Watch whether your performance improves rather than drops.",
  },
  {
    week: 4,
    themeSlug: "food",
    title: "Why does the same diet make me gain weight but not my friend?",
    shortAnswer:
      "The FTO gene influences appetite and how your body responds to high-carbohydrate diets, so the same eating pattern can drive weight gain in one person and not another.",
    body: [
      "FTO variants, common in South Asians, are associated with stronger hunger signals and more weight gain on carbohydrate-heavy diets. Your friend without the variant may eat the same and stay steady because their appetite and metabolism respond differently.",
      "Knowing this reframes willpower. If you carry the variant, you are not weaker - you are working against a stronger appetite signal, and structuring meals to manage that signal is more effective than blaming yourself.",
    ],
    genesInPlay: ["FTO", "MC4R"],
    doThisToday:
      "Front-load protein at breakfast tomorrow. It blunts the appetite signal that FTO turns up, and the effect lasts into the afternoon.",
  },
  {
    week: 4,
    themeSlug: "sleep",
    title: "Is it bad that I'm a natural night owl?",
    shortAnswer:
      "Not bad - just genetic. A late chronotype is a real, inherited setting, and forcing an early schedule onto it fights your own hormones rather than fixing anything.",
    body: [
      "Night owls produce melatonin later and peak in alertness later. In a world built around early starts, this gets misread as a discipline problem. It is not. It is your circadian wiring, and roughly half of it is set by genes.",
      "Where you have room is the environmental half. Bright morning light, consistent wake times, and earlier meals can pull a late clock forward by an hour or so. Beyond that, the wiser move is to design your day around your peak rather than against it.",
    ],
    genesInPlay: ["PER3", "CRY1", "CLOCK"],
    doThisToday:
      "Get ten minutes of bright daylight within an hour of waking. It is the single strongest lever for nudging a late clock earlier.",
  },
  {
    week: 4,
    themeSlug: "mind",
    title: "Why do I handle pressure well at work but crash at home?",
    shortAnswer:
      "Stress-clearance genes set your baseline, but the context decides when you feel it - many slow-clearing people hold it together under structure and crash once the structure drops.",
    body: [
      "If your COMT and FKBP5 wiring clears stress chemistry slowly, the load does not disappear when the workday ends - it surfaces. The collapse at home is often the delayed cost of a held-together day, not a separate problem.",
      "This is worth naming with the people you live with. The crash is not about them. It is your nervous system finally processing a day it could not process in real time.",
    ],
    genesInPlay: ["COMT", "FKBP5"],
    doThisToday:
      "Build a ten-minute decompression buffer between work and home - a walk, a shower, silence in the car. Give the crash somewhere to land before you walk in the door.",
  },
  {
    week: 4,
    themeSlug: "family",
    title: "What's the one conversation about health I should have with my parents?",
    shortAnswer:
      "Ask what runs in the family - heart disease, diabetes, cancers, thyroid - and at what age. It is the most valuable wellness data you will ever collect, and it costs nothing.",
    body: [
      "Family medical history is a free, powerful predictor. Knowing that a parent had a cardiac event at 53, or that diabetes appeared early on one side, changes when you should start screening and how seriously to take prevention now.",
      "In many Indian families this conversation never happens. Bringing it up is not morbid; it is the kindest, most practical thing you can do for everyone at the table, including the next generation.",
    ],
    genesInPlay: ["Family history as data"],
    doThisToday:
      "Write down three health facts about each parent and grandparent you can recall or ask about. Keep the list. Update it. Share it with a sibling.",
  },
];

export const reads: SeedRead[] = raw.map((r, i) => ({
  slug: slugify(r.title),
  week: r.week,
  themeSlug: r.themeSlug,
  title: r.title,
  shortAnswer: r.shortAnswer,
  body: r.body,
  genesInPlay: r.genesInPlay,
  doThisToday: r.doThisToday,
  readTimeMinutes: 5,
  publishedAt: dateFor(r.week, dayIndex(r.themeSlug)),
  // Feature the most recent Monday-Move read by default.
  featured: i === 15, // Week 4 · Move
}));
