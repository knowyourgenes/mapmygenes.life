import { defineField, defineType } from "sanity";

export const theme = defineType({
  name: "theme",
  title: "Weekday theme",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Theme name",
      type: "string",
      description: "e.g. Move, Food, Sleep, Mind, Family",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 32 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "day",
      title: "Day of week",
      type: "string",
      options: {
        list: [
          { title: "Monday", value: "Monday" },
          { title: "Tuesday", value: "Tuesday" },
          { title: "Wednesday", value: "Wednesday" },
          { title: "Thursday", value: "Thursday" },
          { title: "Friday", value: "Friday" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "shortDay",
      title: "Short day label",
      type: "string",
      description: "e.g. Mon, Tue, Wed, Thu, Fri",
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "tagline",
      title: "What you'll read",
      type: "text",
      rows: 2,
      description: "Shown in the weekly rhythm grid.",
    }),
    defineField({
      name: "accentColor",
      title: "Accent color (CSS hex)",
      type: "string",
      description: "Optional override for badges/cards, e.g. #E87A4C",
    }),
    defineField({
      name: "icon",
      title: "Icon glyph",
      type: "string",
      description: "Single character/emoji shown in the day card.",
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "day" },
  },
});
