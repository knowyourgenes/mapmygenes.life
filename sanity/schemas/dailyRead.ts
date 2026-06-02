import { defineArrayMember, defineField, defineType } from "sanity";

export const dailyRead = defineType({
  name: "dailyRead",
  title: "Daily read",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Question / headline",
      type: "string",
      description:
        "The question the reader actually asks themselves. Written for AI-snippet pickup.",
      validation: (Rule) => Rule.required().min(8).max(200),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theme",
      title: "Theme (weekday)",
      type: "reference",
      to: [{ type: "theme" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "week",
      title: "Week (1-4)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(20).integer(),
    }),
    defineField({
      name: "shortAnswer",
      title: "Short answer (first line)",
      type: "text",
      rows: 3,
      description:
        "The single sentence written to be the exact text a snippet or voice assistant lifts. Plain prose, no 'The short answer:' prefix - that label is rendered in the UI.",
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    defineField({
      name: "body",
      title: "Body paragraphs",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "genesInPlay",
      title: "Genes in play",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "doThisToday",
      title: "Do this today",
      type: "text",
      rows: 3,
      description: "One concrete action. No 'Do this today' prefix - that label is rendered in UI.",
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "readTimeMinutes",
      title: "Read time (minutes)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(30),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured as today's read",
      type: "boolean",
      initialValue: false,
      description:
        "Toggle to pin this as the homepage 'Today's read' regardless of weekday rotation.",
    }),
  ],
  orderings: [
    {
      title: "Week then day",
      name: "weekDay",
      by: [
        { field: "week", direction: "asc" },
        { field: "theme.order", direction: "asc" },
      ],
    },
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", theme: "theme.name", week: "week" },
    prepare: ({ title, theme, week }) => ({
      title,
      subtitle: [`Week ${week}`, theme].filter(Boolean).join(" · "),
    }),
  },
});
