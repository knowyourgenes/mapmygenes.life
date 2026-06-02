/**
 * Daily question pool - one bucket per weekday.
 *
 * The homepage's "Today's read" section picks one entry at random from the
 * current weekday's bucket on a user's first visit of the day, then persists
 * that choice in localStorage under  mmgl:today-pick:<YYYY-MM-DD>  so reloads
 * keep the same pick until midnight.
 *
 * Feed this file with as many questions per day as you like - the section
 * scales automatically. Every entry's `id` must be unique across the whole file
 * (used as the localStorage value).
 *
 * `linkSlug` is optional. When present and matches a Sanity dailyRead slug, the
 * card's "Open full read" button links to /reads/<linkSlug>. Otherwise it links
 * to /library.
 */

export type DailyEntry = {
  id: string;
  theme: string; // e.g. "Move" | "Food" | "Sleep" | "Mind" | "Family" | "Skin" | "Reflect"
  question: string;
  shortAnswer: string;
  body: string[];
  genesInPlay: string[];
  doThisToday: string;
  readTimeMinutes: number;
  linkSlug?: string;
};

export type WeekdayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export const WEEKDAY_KEYS: WeekdayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const WEEKDAY_LABELS: Record<WeekdayKey, string> = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

export const WEEKDAY_THEMES: Record<WeekdayKey, string> = {
  mon: "Move",
  tue: "Food",
  wed: "Sleep",
  thu: "Mind",
  fri: "Family",
  sat: "Skin",
  sun: "Reflect",
};

export const dailyQuestions: Record<WeekdayKey, DailyEntry[]> = {
  mon: [
    {
      id: "mon-actn3",
      theme: "Move",
      question: "Why does my friend build muscle faster than me on the same workout?",
      shortAnswer:
        "Roughly half of how you respond to training is genetic, and a single gene called ACTN3 helps decide whether you are built more for power or for endurance.",
      body: [
        "ACTN3 makes a protein in fast-twitch muscle fibres, the ones that fire during sprints and heavy lifts. People with the working version tend to gain explosive strength quickly. People with two non-working copies - common across South Asian populations - lean more towards endurance and recover differently.",
        "This is not an excuse and it is not a ceiling. It is a starting point. If you are a power type doing only long slow cardio, you are training against your wiring. If you are an endurance type chasing one-rep maxes, the same. The fix is not more effort. It is the right kind of effort.",
      ],
      genesInPlay: ["ACTN3", "ACE", "PPARGC1A"],
      doThisToday:
        "Pick one strength session and one endurance session this week. Notice which one leaves you energised and which one wrecks you. That gap is data.",
      readTimeMinutes: 5,
      linkSlug: "why-does-my-friend-build-muscle-faster-than-me-on-the-same-workout",
    },
    {
      id: "mon-cardio-vs-weights",
      theme: "Move",
      question: "Should I do cardio or weights to lose weight for my body?",
      shortAnswer:
        "Both help, but your genes tilt the balance - some people lose fat more efficiently with resistance training, others with sustained cardio, and a DNA wellness panel can hint which.",
      body: [
        "Weight response to exercise is partly governed by how your muscles use fuel and how your body stores fat. The same twelve-week plan produces very different results across people, and a chunk of that gap is genetic rather than effort.",
        "The practical takeaway is to stop copying whatever worked for someone with a different body. Find the training style your body responds to and your adherence improves, because results arrive faster and motivation follows.",
      ],
      genesInPlay: ["FTO", "PPARGC1A", "ADRB2"],
      doThisToday:
        "Commit to one training style for four weeks instead of switching every week. Consistency reveals what your body actually responds to.",
      readTimeMinutes: 5,
      linkSlug: "should-i-do-cardio-or-weights-to-lose-weight-for-my-body",
    },
    {
      id: "mon-running-injury",
      theme: "Move",
      question: "Why do I keep getting injured when I run?",
      shortAnswer:
        "Part of injury and recovery risk is genetic - variants in genes like COL1A1 affect tendon and ligament resilience, which is why some bodies tolerate high mileage and others break down.",
      body: [
        "Collagen-related genes influence how your connective tissue handles repeated load. If you carry variants linked to lower tendon resilience, ramping up mileage too fast is more likely to end in a niggle than it would for a friend with sturdier wiring.",
        "This does not mean you cannot run. It means your safe rate of progression is slower, your warm-up matters more, and strength work around the joints is not optional for you the way it might be for someone else.",
      ],
      genesInPlay: ["COL1A1", "COL5A1", "GDF5"],
      doThisToday:
        "Increase your weekly running distance by no more than ten percent. Boring, unglamorous, and the single best way to stay uninjured.",
      readTimeMinutes: 5,
      linkSlug: "why-do-i-keep-getting-injured-when-i-run",
    },
    {
      id: "mon-workout-fatigue",
      theme: "Move",
      question: "Why am I exhausted after workouts that energise other people?",
      shortAnswer:
        "Recovery capacity is partly genetic - how quickly you clear exercise stress and rebuild depends on genes affecting inflammation and stress-hormone clearance.",
      body: [
        "Two people can do the same session and walk away in opposite states. If your body clears the stress chemistry of hard exercise slowly, intense daily training will dig a hole rather than build fitness. The fatigue is a signal, not a weakness.",
        "For slow recoverers, the gains come from spacing hard sessions further apart and protecting sleep around them. Training less often, but recovering fully, beats grinding daily and never adapting.",
      ],
      genesInPlay: ["COMT", "IL6", "ACTN3"],
      doThisToday:
        "Put a genuine rest day between your two hardest sessions this week. Watch whether your performance improves rather than drops.",
      readTimeMinutes: 5,
      linkSlug: "why-am-i-exhausted-after-workouts-that-energise-other-people",
    },
  ],

  tue: [
    {
      id: "tue-dal-chawal",
      theme: "Food",
      question: "Why does dal-chawal spike my blood sugar but not my sister's?",
      shortAnswer:
        "How fast you turn carbohydrates into blood sugar is partly genetic, shaped by genes like AMY1 and TCF7L2 that vary a lot between people in the same family.",
      body: [
        "AMY1 controls how much carb-digesting enzyme your saliva makes. Some people carry many copies and break starch down fast; others carry few. Two siblings can sit at the same table, eat the same rice, and see very different blood-sugar curves an hour later.",
        "For a population with India's diabetes burden, this matters. It is why a meal that keeps one person steady can leave another foggy and hungry again in ninety minutes. The plate is not wrong. The pairing is.",
      ],
      genesInPlay: ["AMY1", "TCF7L2", "FTO"],
      doThisToday:
        "Add protein or fibre to your highest-carb meal - a bowl of dahi, a side of sprouts, an extra sabzi. Same meal, slower curve.",
      readTimeMinutes: 5,
      linkSlug: "why-does-dal-chawal-spike-my-blood-sugar-but-not-my-sisters",
    },
    {
      id: "tue-milk-bloat",
      theme: "Food",
      question: "Why do I feel bloated after milk when everyone says it's healthy?",
      shortAnswer:
        "Because most Indian adults stop making the enzyme that digests milk sugar after childhood - only around one in eight carries the variant for lifelong tolerance.",
      body: [
        "The LCT gene decides whether you keep producing lactase into adulthood. In Northern Europe most people do. Across South Asia, most people do not. The bloating after the second chai is not in your head; it is the default state of the subcontinent's digestion.",
        "This is not a reason to fear dairy. It is a reason to choose the right form. Fermented dairy - dahi, chaas - is easier because fermentation has already broken down much of the lactose.",
      ],
      genesInPlay: ["LCT", "MCM6"],
      doThisToday:
        "Swap one glass of milk for a bowl of dahi or a glass of chaas. Notice whether your afternoon feels lighter.",
      readTimeMinutes: 5,
      linkSlug: "why-do-i-feel-bloated-after-milk-when-everyone-says-its-healthy",
    },
    {
      id: "tue-supplements",
      theme: "Food",
      question: "Do I actually need all these supplements I'm taking?",
      shortAnswer:
        "Probably not - most people absorb only some of what they take, and which ones depend on genes like MTHFR for B12 and VDR for vitamin D.",
      body: [
        "The average wellness-focused adult takes a shelf full of supplements on best guess. But the standard form of B12 does little if you carry the MTHFR variant, and your vitamin D response is shaped by VDR. Half the bottles may be passing straight through.",
        "Fewer, better-matched supplements beat a crowded shelf. The goal is not to take more. It is to take the two or three your particular body actually uses.",
      ],
      genesInPlay: ["MTHFR", "VDR", "FUT2"],
      doThisToday:
        "Pick the one supplement you are least sure about and pause it for two weeks. If nothing changes, you have your answer.",
      readTimeMinutes: 5,
      linkSlug: "do-i-actually-need-all-these-supplements-im-taking",
    },
    {
      id: "tue-fto-weight",
      theme: "Food",
      question: "Why does the same diet make me gain weight but not my friend?",
      shortAnswer:
        "The FTO gene influences appetite and how your body responds to high-carbohydrate diets, so the same eating pattern can drive weight gain in one person and not another.",
      body: [
        "FTO variants, common in South Asians, are associated with stronger hunger signals and more weight gain on carbohydrate-heavy diets. Your friend without the variant may eat the same and stay steady because their appetite and metabolism respond differently.",
        "Knowing this reframes willpower. If you carry the variant, you are not weaker - you are working against a stronger appetite signal, and structuring meals to manage that signal is more effective than blaming yourself.",
      ],
      genesInPlay: ["FTO", "MC4R"],
      doThisToday:
        "Front-load protein at breakfast tomorrow. It blunts the appetite signal that FTO turns up, and the effect lasts into the afternoon.",
      readTimeMinutes: 5,
      linkSlug: "why-does-the-same-diet-make-me-gain-weight-but-not-my-friend",
    },
  ],

  wed: [
    {
      id: "wed-nine-hours",
      theme: "Sleep",
      question: "Am I lazy for needing nine hours, or is that real?",
      shortAnswer:
        "It is real. About 40 to 50 percent of whether you are a short or long sleeper, and whether you are a morning or night person, is written in your genes.",
      body: [
        "Your chronotype - the clock your body actually keeps - is shaped by genes including PER3 and CRY1. A genuine night owl trying to wake at 5am is fighting their own hormones, not their discipline. Cortisol and melatonin peak at different clock times depending on your wiring.",
        "You cannot fully override it, but you can work with it. Around half of chronotype is environment: light, screens, meal timing, and consistent sleep windows can shift you by an hour or so. The other half is just who you are.",
      ],
      genesInPlay: ["PER3", "CRY1", "CLOCK"],
      doThisToday:
        "For three days, sleep and wake at the times your body drifts to on a free weekend. Notice how your afternoons feel. That is your real clock talking.",
      readTimeMinutes: 5,
      linkSlug: "am-i-lazy-for-needing-nine-hours-or-is-that-real",
    },
    {
      id: "wed-coffee-after-lunch",
      theme: "Sleep",
      question: "Why does coffee after lunch ruin my sleep but not my friend's?",
      shortAnswer:
        "Around half of all adults are slow caffeine metabolisers, and for them the CYP1A2 gene keeps caffeine active in the body for up to ten hours instead of four.",
      body: [
        "If you are a slow metaboliser, a 2pm coffee can still be circulating at midnight. Your friend with the fast variant has cleared the same cup by dinner. Same drink, opposite night.",
        "A second gene, ADORA2A, decides how strongly you feel caffeine even if you clear it quickly. Between the two, some people simply cannot have afternoon coffee without paying for it at night.",
      ],
      genesInPlay: ["CYP1A2", "ADORA2A"],
      doThisToday:
        "Cut all caffeine after noon for one week. If you fall asleep noticeably faster, you have your answer about your own wiring.",
      readTimeMinutes: 5,
      linkSlug: "why-does-coffee-after-lunch-ruin-my-sleep-but-not-my-friends",
    },
    {
      id: "wed-eight-hours-tired",
      theme: "Sleep",
      question: "Why do I wake up tired even after eight hours in bed?",
      shortAnswer:
        "Because time in bed is not the same as deep sleep - variants in PER3 and CLOCK can compress the restorative phases, so eight hours of sleep delivers five hours of recovery.",
      body: [
        "Deep sleep is when your body and brain actually repair. Some people's wiring shortens those windows, so they clock the recommended hours and still wake unrefreshed. The number on the clock looks fine; the recovery underneath it is short.",
        "You can protect deep sleep with the basics - cool dark room, consistent timing, no late caffeine or alcohol - but if you have always woken tired despite enough hours, your architecture, not your effort, may be the variable.",
      ],
      genesInPlay: ["PER3", "CLOCK", "ADA"],
      doThisToday:
        "Keep your bedroom cooler tonight and put screens away 45 minutes before bed. Deep sleep responds to both.",
      readTimeMinutes: 5,
      linkSlug: "why-do-i-wake-up-tired-even-after-eight-hours-in-bed",
    },
    {
      id: "wed-night-owl",
      theme: "Sleep",
      question: "Is it bad that I'm a natural night owl?",
      shortAnswer:
        "Not bad - just genetic. A late chronotype is a real, inherited setting, and forcing an early schedule onto it fights your own hormones rather than fixing anything.",
      body: [
        "Night owls produce melatonin later and peak in alertness later. In a world built around early starts, this gets misread as a discipline problem. It is not. It is your circadian wiring, and roughly half of it is set by genes.",
        "Where you have room is the environmental half. Bright morning light, consistent wake times, and earlier meals can pull a late clock forward by an hour or so. Beyond that, the wiser move is to design your day around your peak rather than against it.",
      ],
      genesInPlay: ["PER3", "CRY1", "CLOCK"],
      doThisToday:
        "Get ten minutes of bright daylight within an hour of waking. It is the single strongest lever for nudging a late clock earlier.",
      readTimeMinutes: 5,
      linkSlug: "is-it-bad-that-im-a-natural-night-owl",
    },
  ],

  thu: [
    {
      id: "thu-stress-recovery",
      theme: "Mind",
      question: "Why does a stressful week flatten me when my colleague bounces back by Monday?",
      shortAnswer:
        "Your body clears stress hormones at a genetically set speed, and the COMT and FKBP5 genes mean some people recover in hours while others take days.",
      body: [
        "COMT helps break down adrenaline and dopamine. A slower variant means stress chemistry lingers longer in your system. The same deadline that energises a fast-clearing colleague can keep you wired and depleted well into the weekend.",
        "Knowing this changes how you plan recovery. If you are a slow clearer, you do not need to toughen up. You need a longer runway after intense weeks, and protected downtime that a faster-clearing person can skip.",
      ],
      genesInPlay: ["COMT", "FKBP5"],
      doThisToday:
        "After your next hard day, block 30 minutes of genuinely low-stimulation time - a walk without your phone. Treat recovery as part of the work, not a reward for it.",
      readTimeMinutes: 5,
      linkSlug: "why-does-a-stressful-week-flatten-me-when-my-colleague-bounces-back-by-monday",
    },
    {
      id: "thu-brain-fog",
      theme: "Mind",
      question: "Is my afternoon brain fog something I can actually fix?",
      shortAnswer:
        "Often yes - much of the classic 3pm fog traces to how your body absorbs B12 and iron and how deeply you sleep, all of which have a strong genetic component.",
      body: [
        "Three common variants stack up here. MTHFR can blunt B12 activation. TMPRSS6 can lower iron uptake. PER3 can shorten the deep-sleep phases that should clear your head overnight. Any one alone is mild. Together they read as a foggy afternoon.",
        "The reason generic advice misses it is that each piece looks normal on a standard report. The pattern only shows up when you look at how your particular body handles these nutrients.",
      ],
      genesInPlay: ["MTHFR", "TMPRSS6", "PER3"],
      doThisToday:
        "Track your energy at 3pm for five days alongside what you ate and how you slept. Patterns you can see are patterns you can change.",
      readTimeMinutes: 5,
      linkSlug: "is-my-afternoon-brain-fog-something-i-can-actually-fix",
    },
    {
      id: "thu-caffeine-anxious",
      theme: "Mind",
      question: "Why does caffeine make me anxious even in small amounts?",
      shortAnswer:
        "A gene called ADORA2A controls how sensitive your brain's receptors are to caffeine, so some people feel jittery and anxious on a dose that barely registers for others.",
      body: [
        "Caffeine works by blocking adenosine receptors. If your ADORA2A variant makes those receptors especially responsive, even a small coffee can spike your heart rate and tip you into anxiety. This is separate from how fast you clear caffeine - you can be sensitive even as a fast metaboliser.",
        "The fix is simple once you know: a smaller dose, or switching to something gentler like green tea, can give you the lift without the edge.",
      ],
      genesInPlay: ["ADORA2A", "CYP1A2"],
      doThisToday:
        "If coffee makes you anxious, try half your usual dose tomorrow. Sensitivity often responds to amount more than you would expect.",
      readTimeMinutes: 5,
      linkSlug: "why-does-caffeine-make-me-anxious-even-in-small-amounts",
    },
    {
      id: "thu-work-vs-home",
      theme: "Mind",
      question: "Why do I handle pressure well at work but crash at home?",
      shortAnswer:
        "Stress-clearance genes set your baseline, but the context decides when you feel it - many slow-clearing people hold it together under structure and crash once the structure drops.",
      body: [
        "If your COMT and FKBP5 wiring clears stress chemistry slowly, the load does not disappear when the workday ends - it surfaces. The collapse at home is often the delayed cost of a held-together day, not a separate problem.",
        "This is worth naming with the people you live with. The crash is not about them. It is your nervous system finally processing a day it could not process in real time.",
      ],
      genesInPlay: ["COMT", "FKBP5"],
      doThisToday:
        "Build a ten-minute decompression buffer between work and home - a walk, a shower, silence in the car. Give the crash somewhere to land before you walk in the door.",
      readTimeMinutes: 5,
      linkSlug: "why-do-i-handle-pressure-well-at-work-but-crash-at-home",
    },
  ],

  fri: [
    {
      id: "fri-family-tired",
      theme: "Family",
      question: "My whole family is 'always tired' - is that just us, or is it genetic?",
      shortAnswer:
        "Often it is both. Shared kitchens and shared habits get blamed, but families also share variants like MTHFR that quietly affect how everyone absorbs B12 and folate.",
      body: [
        "The MTHFR variant, common across Indian families, can reduce how well the body activates B12 and folate. When it runs through a household, three generations can carry the same low-energy pattern and assume it is simply their nature.",
        "The useful part: once one person notices the pattern, the whole family can act on it. A shared trait becomes a shared fix - the right form of a vitamin instead of the standard one, for everyone who carries it.",
      ],
      genesInPlay: ["MTHFR", "TMPRSS6"],
      doThisToday:
        "At your next family meal, ask one question: does low energy in the afternoon run on one side of the family? You may be naming a pattern out loud for the first time.",
      readTimeMinutes: 5,
      linkSlug: "my-whole-family-is-always-tired-is-that-just-us-or-is-it-genetic",
    },
    {
      id: "fri-family-diabetes",
      theme: "Family",
      question: "Should I worry about diabetes if it runs on one side of my family?",
      shortAnswer:
        "Family history raises your risk meaningfully, but it is not destiny - for type 2 diabetes, lifestyle can roughly halve the genetic risk you inherit.",
      body: [
        "South Asians develop type 2 diabetes earlier and at lower body weights than many other populations, and a family history compounds that. But large studies are consistent: diet, movement, sleep, and weight respond strongly even in people with high genetic risk.",
        "The honest framing is that family history is a reason to pay attention earlier, not a sentence. The people who do best are the ones who learn the family pattern young and act while the dial is still easy to move.",
      ],
      genesInPlay: ["TCF7L2", "FTO", "KCNJ11"],
      doThisToday:
        "If diabetes runs in your family, ask your doctor for an HbA1c at your next visit - even if you feel fine. Early numbers are the most useful ones.",
      readTimeMinutes: 5,
      linkSlug: "should-i-worry-about-diabetes-if-it-runs-on-one-side-of-my-family",
    },
    {
      id: "fri-test-parents",
      theme: "Family",
      question: "Is it worth testing my parents' genes, not just mine?",
      shortAnswer:
        "It can be - many wellness and risk patterns are shared across a family, so testing parents often explains your own results and flags risks worth acting on for everyone.",
      body: [
        "Because you inherit half your DNA from each parent, their results illuminate yours. A pattern that looks ambiguous in you alone often becomes clear when you can see which side of the family it came from. For risk markers, it can prompt earlier screening across the household.",
        "The Indian joint-family setup makes this especially powerful. Shared kitchens and shared genes mean a single conversation can change habits for three generations at once.",
      ],
      genesInPlay: ["Shared familial variants"],
      doThisToday:
        "Have one honest conversation with a parent about what runs in the family - heart, sugar, thyroid. Write down what you learn. It is the cheapest family health record you will ever build.",
      readTimeMinutes: 5,
      linkSlug: "is-it-worth-testing-my-parents-genes-not-just-mine",
    },
    {
      id: "fri-family-conversation",
      theme: "Family",
      question: "What's the one conversation about health I should have with my parents?",
      shortAnswer:
        "Ask what runs in the family - heart disease, diabetes, cancers, thyroid - and at what age. It is the most valuable wellness data you will ever collect, and it costs nothing.",
      body: [
        "Family medical history is a free, powerful predictor. Knowing that a parent had a cardiac event at 53, or that diabetes appeared early on one side, changes when you should start screening and how seriously to take prevention now.",
        "In many Indian families this conversation never happens. Bringing it up is not morbid; it is the kindest, most practical thing you can do for everyone at the table, including the next generation.",
      ],
      genesInPlay: ["Family history as data"],
      doThisToday:
        "Write down three health facts about each parent and grandparent you can recall or ask about. Keep the list. Update it. Share it with a sibling.",
      readTimeMinutes: 5,
      linkSlug: "whats-the-one-conversation-about-health-i-should-have-with-my-parents",
    },
  ],

  sat: [
    {
      id: "sat-skin-stress",
      theme: "Skin",
      question: "Why does stress show up on my skin first?",
      shortAnswer:
        "Because skin has its own stress receptors, and variants in FLG and IL-6 decide whether the same cortisol surge triggers a breakout, a flare, or nothing visible at all.",
      body: [
        "Cortisol does not just travel in your blood - your skin actively senses and responds to it. People with FLG variants have a thinner skin barrier to start with, so stress chemistry leaks symptoms faster: an inflamed jawline before a presentation, a flare in eczema before a flight.",
        "The skincare aisle treats this as a topical problem. It is mostly an internal one. The most effective skin intervention for stress-reactive skin is sleep and nervous-system recovery, not a stronger serum.",
      ],
      genesInPlay: ["FLG", "IL6", "TNF"],
      doThisToday:
        "If your skin reacts to stress, track one week of mood + sleep + skin together. The pattern is almost always upstream of what you put on your face.",
      readTimeMinutes: 4,
    },
    {
      id: "sat-tan-easily",
      theme: "Skin",
      question: "Why do some people tan instead of burn?",
      shortAnswer:
        "A gene called MC1R decides how much of which type of melanin your skin makes - and most South Asian skin is built to tan, but a small fraction is wired more like burn-prone skin.",
      body: [
        "MC1R controls the balance between eumelanin (brown, protective) and pheomelanin (red, less protective). Indian skin sits across a wide spectrum here - most people produce a lot of eumelanin and tan smoothly, but some carry variants that lean towards burning, freckling, and elevated UV damage risk despite a 'medium' skin tone.",
        "What this means in practice is that 'I have brown skin so I don't need sunscreen' is partly true for some Indians and dangerously wrong for others. The variant tells you which.",
      ],
      genesInPlay: ["MC1R", "OCA2", "TYR"],
      doThisToday:
        "If you burn even slightly in Indian sun, treat that as the signal it is - wear SPF on neck, hands, and scalp parting daily. Those are the spots that age fastest.",
      readTimeMinutes: 4,
    },
    {
      id: "sat-acne-genes",
      theme: "Skin",
      question: "Why does adult acne run in my family?",
      shortAnswer:
        "Because acne is partly inherited - variants affecting androgen sensitivity and skin inflammation are shared across generations, which is why the same chin breakouts appear in your mother's photos at your age.",
      body: [
        "Adult acne is rarely about cleanliness. It is the interaction of hormone-driven sebum production with how your skin's immune cells respond to it. Both halves are partly genetic, and both run in families.",
        "Treatments work better when you stop framing acne as a hygiene failure. The genuinely effective interventions - retinoids, hormonal balance, gut health - are slow and unglamorous, and they work on the underlying biology.",
      ],
      genesInPlay: ["TNF", "IL1A", "DDB2"],
      doThisToday:
        "If acne has been with you for years, give one intervention an honest twelve weeks instead of swapping products every three. Skin biology takes a quarter to respond.",
      readTimeMinutes: 4,
    },
    {
      id: "sat-pigmentation",
      theme: "Skin",
      question: "Why does pigmentation come back even after I treat it?",
      shortAnswer:
        "Because pigmentation has a strong genetic floor - South Asian skin produces melanin in response to almost any inflammation, and that response is dialled up by variants like SLC24A5 and TYR.",
      body: [
        "Post-inflammatory hyperpigmentation is the default reaction of Indian skin to almost any disruption - acne, friction, a scratched mosquito bite, even harsh actives. The same wiring that gives South Asian skin lower skin-cancer rates makes it pigment more readily.",
        "Treatments fade existing patches, but the underlying response is still there. Long-term progress comes from preventing the inflammation in the first place: gentler routines, sun protection, and patience with what 'better' looks like over six months.",
      ],
      genesInPlay: ["SLC24A5", "TYR", "MC1R"],
      doThisToday:
        "Cut one harsh product from your routine for two weeks. Often the routine itself is keeping the inflammation alive.",
      readTimeMinutes: 4,
    },
  ],

  sun: [
    {
      id: "sun-track-what",
      theme: "Reflect",
      question: "If I had to track only one health metric, which one matters most?",
      shortAnswer:
        "For most people in their twenties to forties, the single most useful number is your fasting blood sugar trend over time - it catches metabolic drift years before anything else does.",
      body: [
        "South Asians develop insulin resistance earlier and at lower body weights than most populations. A fasting glucose creeping from 88 to 96 to 102 over five years is the most important early-warning signal you can watch, and it costs about ₹100 a test.",
        "Weight, blood pressure, and lipids all matter, but they tend to move after glucose has already started to drift. Tracking glucose annually catches the trajectory while it is still easy to bend.",
      ],
      genesInPlay: ["TCF7L2", "FTO", "PPARG"],
      doThisToday:
        "Find your last three fasting glucose values if you have them. The number is less important than the trend across years.",
      readTimeMinutes: 4,
    },
    {
      id: "sun-consistency",
      theme: "Reflect",
      question: "Why does consistency beat intensity for almost every wellness goal?",
      shortAnswer:
        "Because biology adapts on a timescale of weeks and months, not hours and days - your body responds to what you do most of the time, not what you do occasionally.",
      body: [
        "The genes that govern fat storage, muscle adaptation, sleep architecture, and mood regulation all change their expression in response to repeated signals. A single 90-minute workout or a single bad night barely registers. Three months of regular movement or chronic short sleep changes how the system runs.",
        "This is why the boring advice keeps winning - daily walks, regular meal times, fixed sleep windows. Not because they are dramatic, but because they are the only signals your biology hears.",
      ],
      genesInPlay: ["PER3", "PPARGC1A", "BDNF"],
      doThisToday:
        "Pick one habit you have been doing for less than two weeks. Commit to twelve weeks before judging whether it works.",
      readTimeMinutes: 4,
    },
    {
      id: "sun-how-do-i-know",
      theme: "Reflect",
      question: "How do I know what actually works for my body versus what's hype?",
      shortAnswer:
        "Run a one-person experiment - change one thing for four weeks, keep everything else the same, and use a measurable outcome. Most wellness trends survive a week in a real life; few survive a month.",
      body: [
        "Generic wellness advice averages across millions of bodies. Your body is one of them, and the variance is often larger than the effect. The only reliable way to know if cold showers, intermittent fasting, magnesium at night, or anything else works for you is to test it.",
        "Pick one outcome you can measure (sleep score, afternoon energy, weekly soreness, mood diary). Change one variable for at least four weeks. Compare. That is more useful than any influencer's testimonial.",
      ],
      genesInPlay: ["Individual variation"],
      doThisToday:
        "Pick one thing you have been meaning to try. Write the start date in your calendar and the day you will judge it. Honest experiments need both.",
      readTimeMinutes: 4,
    },
    {
      id: "sun-one-conversation",
      theme: "Reflect",
      question: "What's the one wellness conversation worth having every Sunday?",
      shortAnswer:
        "Ask yourself one question - what did this week cost my body, and what is it asking for next week? Five minutes of that beats a month of generic resolutions.",
      body: [
        "Most people review their week through productivity (what got done) or finance (what got spent). Reviewing it through biology - sleep debt, training stress, social load, food quality - is a cheaper, faster way to spot what is about to go wrong.",
        "The pattern matters more than the perfection. Three months of even casual weekly check-ins outperforms a January detox or a thirty-day challenge, because it adjusts to your real life as it changes.",
      ],
      genesInPlay: ["Pattern recognition"],
      doThisToday:
        "Put a recurring 5-minute Sunday block in your calendar. Ask the two questions out loud. Write down one thing for the week ahead.",
      readTimeMinutes: 4,
    },
  ],
};
