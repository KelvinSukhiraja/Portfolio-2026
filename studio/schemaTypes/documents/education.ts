import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "school",
      title: "School",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "degree", subtitle: "school" },
  },
});
