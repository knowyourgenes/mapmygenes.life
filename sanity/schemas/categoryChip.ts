import { defineField, defineType } from "sanity";

export const categoryChip = defineType({
  name: "categoryChip",
  title: "Category chip",
  type: "document",
  description:
    "The chip-row above the library: All reads · Move · Food · Sleep · Mind · Family · Energy · Skin.",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "label", maxLength: 24 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "themeSlug",
      title: "Linked theme slug (optional)",
      type: "string",
      description: "If this chip filters to a weekday theme, the matching theme.slug.",
    }),
    defineField({
      name: "order",
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
});
