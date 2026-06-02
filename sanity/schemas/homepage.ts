import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage content",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero · Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero · Headline (plain part)",
      type: "string",
      description: "Plain leading sentence, e.g. 'Your body has its own rules.'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero · Headline (italic accent)",
      type: "string",
      description: "Italic emphasised tail, e.g. 'Read one today.'",
    }),
    defineField({
      name: "heroSubhead",
      title: "Hero · Subhead",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero · Primary CTA label",
      type: "string",
      initialValue: "Read today's",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero · Secondary CTA label",
      type: "string",
      initialValue: "Get the daily read by email",
    }),

    defineField({
      name: "weeklyRhythmEyebrow",
      title: "Weekly rhythm · Eyebrow",
      type: "string",
      initialValue: "The weekly rhythm",
    }),
    defineField({
      name: "weeklyRhythmTitle",
      title: "Weekly rhythm · Title",
      type: "string",
    }),
    defineField({
      name: "weeklyRhythmIntro",
      title: "Weekly rhythm · Intro",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "categoryChipsLabel",
      title: "Category chips · Label",
      type: "string",
      initialValue: "Browse by category",
    }),

    defineField({
      name: "thisWeeksReadsTitle",
      title: "This week's reads · Title",
      type: "string",
      initialValue: "This week's reads",
    }),
    defineField({
      name: "thisWeeksReadsCta",
      title: "This week's reads · CTA",
      type: "string",
      initialValue: "Browse the full library",
    }),

    defineField({
      name: "shareEyebrow",
      title: "Share strip · Eyebrow",
      type: "string",
      initialValue: "Save & share",
    }),
    defineField({
      name: "shareTitle",
      title: "Share strip · Title",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "shareBody",
      title: "Share strip · Body",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "newsletterTitle",
      title: "Newsletter · Title",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter · Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "newsletterSmallprint",
      title: "Newsletter · Smallprint",
      type: "string",
      initialValue: "No ads. No selling. Unsubscribe anytime.",
    }),

    defineField({
      name: "footerMission",
      title: "Footer · Mission line",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage content" }),
  },
});
