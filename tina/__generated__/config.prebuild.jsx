// tina/config.js
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  // Lấy branch từ env (Netlify tự inject BRANCH)
  branch: process.env.GITHUB_BRANCH || process.env.BRANCH || "main",
  // Lấy từ Tina Cloud dashboard → tạo project → copy vào Netlify env vars
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "d2c3f8d6-cf21-486e-804b-2938bab2d0e8",
  token: process.env.TINA_TOKEN || "e978b515d388645c7c4b07de2b3534b7cfdae503",
  build: {
    // Dùng "tina-admin" để không đè lên /admin của Decap CMS
    outputFolder: "tina-admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      {
        name: "siteData",
        label: "Site Content",
        // Trỏ đến file _data/site.yml
        path: "_data",
        format: "yaml",
        ui: {
          // Không cho tạo/xóa file, chỉ edit
          allowedActions: {
            create: false,
            delete: false
          },
          // Preview link (optional)
          router: () => "/"
        },
        match: {
          include: "site"
        },
        fields: [
          // ── Hero ──────────────────────────────────────
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title_line1",
                label: "Title \u2013 Line 1",
                required: true
              },
              {
                type: "string",
                name: "title_line2",
                label: "Title \u2013 Line 2 (green accent)",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Problems bar ──────────────────────────────
          {
            type: "object",
            name: "problems",
            label: "Problems Bar",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Problem" }),
              min: 4,
              max: 4
            },
            fields: [
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Approach ──────────────────────────────────
          {
            type: "object",
            name: "approach",
            label: "Approach Section",
            fields: [
              {
                type: "object",
                name: "steps",
                label: "Steps",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.title ? `${item.number} \u2013 ${item.title}` : "Step"
                  }),
                  min: 4,
                  max: 4
                },
                fields: [
                  { type: "string", name: "number", label: "Number (e.g. 01)" },
                  { type: "string", name: "title", label: "Title", required: true },
                  {
                    type: "string",
                    name: "desc",
                    label: "Description",
                    ui: { component: "textarea" }
                  }
                ]
              },
              {
                type: "string",
                name: "note",
                label: "Bottom Note",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Solutions ─────────────────────────────────
          {
            type: "object",
            name: "solutions",
            label: "Solutions",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Solution" }),
              min: 6,
              max: 6
            },
            fields: [
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Regions ───────────────────────────────────
          {
            type: "object",
            name: "regions",
            label: "Regions (Work section)",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Region" }),
              min: 4,
              max: 4
            },
            fields: [
              { type: "string", name: "name", label: "Region Name", required: true },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          // ── Footer ────────────────────────────────────
          {
            type: "string",
            name: "footer_headline",
            label: "Footer Headline"
          },
          {
            type: "string",
            name: "footer_headline_accent",
            label: "Footer Headline \u2013 Green Accent Part"
          },
          {
            type: "string",
            name: "footer_subtext",
            label: "Footer Subtext",
            ui: { component: "textarea" }
          },
          // ── Contact ───────────────────────────────────
          {
            type: "object",
            name: "contact",
            label: "Contact Info",
            fields: [
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "address", label: "Address" },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp Link (e.g. https://wa.me/902121234567)"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
