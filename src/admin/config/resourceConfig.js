import {
  adminUsers, affiliates, contactMessages, events, impactStats, leadership, membershipApplications,
  news, opportunities, opportunityApplications, projects, resources, services,
} from "../../global/api";
import { REGIONS } from "../../global/siteConfig";

const opts = (pairs) => pairs.map(([value, label]) => ({ value, label }));
const REGION_OPTS = REGIONS;
const orderField = { name: "order", label: "Display order", type: "number", help: "Lower numbers appear first." };
const activeField = { name: "is_active", label: "Visible on the website", type: "checkbox", default: true };

// Each entry drives a list page + form: no per-resource components needed.
// field.type: text | textarea | number | date | datetime | select | checkbox | file | email | url | password
const resourceConfig = {
  "impact-stats": {
    title: "Impact statistics",
    singular: "statistic",
    api: impactStats,
    canAdd: false, // staff can only edit these; developers add/remove them (Django admin)
    canDelete: false,
    columns: [
      { key: "value", label: "Value" },
      { key: "label", label: "Label" },
      { key: "order", label: "Order" },
      { key: "is_active", label: "Visible", type: "bool" },
    ],
    fields: [
      { name: "value", label: "Big value", type: "text", required: true, help: "e.g. 2006 or 120+" },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "caption", label: "Caption", type: "text" },
      orderField,
      activeField,
    ],
  },
  services: {
    title: "What we do (services)",
    singular: "service",
    api: services,
    columns: [
      { key: "title", label: "Title" },
      { key: "summary", label: "Summary" },
      { key: "order", label: "Order" },
      { key: "is_active", label: "Visible", type: "bool" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "One-line summary", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "icon", label: "Icon", type: "select", default: "general",
        options: opts([
          ["development", "Cooperative development"], ["business", "Business"], ["agriculture", "Agriculture"],
          ["finance", "Finance"], ["property", "Property"], ["general", "General"],
        ]),
      },
      orderField,
      activeField,
    ],
  },
  news: {
    title: "News & announcements",
    singular: "post",
    api: news,
    files: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "category_display", label: "Type" },
      { key: "published_at", label: "Published", type: "date" },
      { key: "is_published", label: "Published", type: "bool" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Type", type: "select", default: "news", options: opts([["news", "News"], ["announcement", "Announcement"]]) },
      { name: "summary", label: "Summary", type: "text" },
      { name: "body", label: "Full text", type: "textarea" },
      { name: "image", label: "Image", type: "file", accept: "image/*" },
      { name: "file", label: "Attachment (PDF/Word)", type: "file" },
      { name: "published_at", label: "Publish date", type: "datetime" },
      { name: "is_published", label: "Published", type: "checkbox", default: true },
    ],
  },
  events: {
    title: "Events",
    singular: "event",
    api: events,
    files: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "event_date", label: "Date", type: "date" },
      { key: "location", label: "Location" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "event_date", label: "Date & time", type: "datetime", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "cover_photo", label: "Cover photo", type: "file", accept: "image/*" },
    ],
  },
  leadership: {
    title: "Leadership",
    singular: "leader",
    api: leadership,
    files: true,
    columns: [
      { key: "name", label: "Name" },
      { key: "position", label: "Position" },
      { key: "category_display", label: "Group" },
      { key: "is_active", label: "Visible", type: "bool" },
    ],
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "position", label: "Position", type: "text", required: true },
      {
        name: "category", label: "Group", type: "select", required: true, default: "board",
        options: opts([["board", "Board of Directors"], ["management", "Management"], ["governance", "Governance"]]),
      },
      { name: "bio", label: "Biography", type: "textarea" },
      { name: "image", label: "Photo", type: "file", accept: "image/*" },
      orderField,
      activeField,
    ],
  },
  affiliates: {
    title: "Affiliated cooperatives",
    singular: "affiliate",
    api: affiliates,
    files: true,
    columns: [
      { key: "name", label: "Cooperative" },
      { key: "region_display", label: "Region" },
      { key: "town", label: "Town" },
      { key: "is_active", label: "Visible", type: "bool" },
    ],
    fields: [
      { name: "name", label: "Cooperative name", type: "text", required: true },
      { name: "region", label: "Region", type: "select", options: REGION_OPTS },
      { name: "town", label: "Town", type: "text" },
      { name: "activities", label: "Activities", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "contact_person", label: "Contact person", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "website_url", label: "Website", type: "url" },
      { name: "logo", label: "Logo", type: "file", accept: "image/*" },
      activeField,
    ],
  },
  "membership-applications": {
    title: "Affiliate requests",
    singular: "request",
    api: membershipApplications,
    readOnlyList: true,
    columns: [
      { key: "cooperative_name", label: "Cooperative" },
      { key: "contact_person", label: "Contact" },
      { key: "region_display", label: "Region" },
      { key: "status", label: "Status", type: "status" },
      { key: "submitted_at", label: "Received", type: "date" },
    ],
    fields: [
      { name: "cooperative_name", label: "Cooperative", type: "text", readOnly: true },
      { name: "contact_person", label: "Contact person", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "text", readOnly: true },
      { name: "phone", label: "Phone", type: "text", readOnly: true },
      { name: "region_display", label: "Region", type: "text", readOnly: true },
      { name: "message", label: "Message", type: "textarea", readOnly: true },
      { name: "supporting_document", label: "Supporting document", type: "file", readOnly: true },
      {
        name: "status", label: "Status", type: "select", default: "new",
        options: opts([["new", "New"], ["in_review", "In review"], ["approved", "Approved"], ["declined", "Declined"]]),
      },
    ],
  },
  projects: {
    title: "Projects",
    singular: "project",
    api: projects,
    files: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "category_display", label: "Category" },
      { key: "status_display", label: "Status" },
      { key: "is_active", label: "Visible", type: "bool" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category", label: "Category", type: "select", default: "other",
        options: opts([["agriculture", "Agriculture"], ["financing", "Financing"], ["other", "Other"]]),
      },
      {
        name: "status", label: "Status", type: "select", default: "ongoing",
        options: opts([["planned", "Planned"], ["ongoing", "Ongoing"], ["completed", "Completed"]]),
      },
      { name: "summary", label: "Summary", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "file", accept: "image/*" },
      { name: "start_date", label: "Start date", type: "date" },
      activeField,
    ],
  },
  resources: {
    title: "Resources",
    singular: "document",
    api: resources,
    files: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "category_display", label: "Type" },
      { key: "year", label: "Year" },
      { key: "is_published", label: "Published", type: "bool" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category", label: "Type", type: "select", required: true, default: "report",
        options: opts([["report", "Report"], ["form", "Form"], ["policy", "Policy"], ["publication", "Publication"]]),
      },
      { name: "description", label: "Description", type: "textarea" },
      { name: "year", label: "Year", type: "number" },
      { name: "file", label: "File (PDF/Word)", type: "file", required: true },
      { name: "is_published", label: "Published", type: "checkbox", default: true },
    ],
  },
  opportunities: {
    title: "Opportunities",
    singular: "opportunity",
    api: opportunities,
    files: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "kind_display", label: "Type" },
      { key: "closing_date", label: "Closes", type: "date" },
      { key: "is_active", label: "Open", type: "bool" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "kind", label: "Type", type: "select", default: "vacancy",
        options: opts([["vacancy", "Vacancy"], ["tender", "Tender"], ["partnership", "Partnership"], ["business", "Business opportunity"]]),
      },
      { name: "summary", label: "Summary", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "requirements", label: "Requirements", type: "textarea" },
      { name: "closing_date", label: "Closing date", type: "date" },
      { name: "file", label: "Document (advert / tender)", type: "file" },
      { name: "is_active", label: "Open", type: "checkbox", default: true },
    ],
  },
  "opportunity-applications": {
    title: "Opportunity responses",
    singular: "response",
    api: opportunityApplications,
    readOnlyList: true,
    columns: [
      { key: "full_name", label: "Name" },
      { key: "opportunity_title", label: "Opportunity" },
      { key: "status", label: "Status", type: "status" },
      { key: "submitted_at", label: "Received", type: "date" },
    ],
    fields: [
      { name: "opportunity_title", label: "Opportunity", type: "text", readOnly: true },
      { name: "full_name", label: "Name", type: "text", readOnly: true },
      { name: "organisation", label: "Organisation", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "text", readOnly: true },
      { name: "phone", label: "Phone", type: "text", readOnly: true },
      { name: "message", label: "Message", type: "textarea", readOnly: true },
      { name: "document", label: "Document", type: "file", readOnly: true },
      {
        name: "status", label: "Status", type: "select", default: "new",
        options: opts([["new", "New"], ["reviewed", "Reviewed"], ["shortlisted", "Shortlisted"], ["rejected", "Rejected"], ["accepted", "Accepted"]]),
      },
    ],
  },
  "contact-messages": {
    title: "Contact messages",
    singular: "message",
    api: contactMessages,
    readOnlyList: true,
    columns: [
      { key: "full_name", label: "From" },
      { key: "subject", label: "Subject" },
      { key: "status", label: "Status", type: "status" },
      { key: "submitted_at", label: "Received", type: "date" },
    ],
    fields: [
      { name: "full_name", label: "Name", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "text", readOnly: true },
      { name: "phone", label: "Phone", type: "text", readOnly: true },
      { name: "subject", label: "Subject", type: "text", readOnly: true },
      { name: "message", label: "Message", type: "textarea", readOnly: true },
      {
        name: "status", label: "Status", type: "select", default: "new",
        options: opts([["new", "New"], ["in_progress", "In progress"], ["resolved", "Resolved"]]),
      },
    ],
  },
  "admin-users": {
    title: "Admin users",
    singular: "admin",
    api: adminUsers,
    columns: [
      { key: "username", label: "Username" },
      { key: "email", label: "Email" },
      { key: "is_superuser", label: "Superuser", type: "bool" },
      { key: "is_active", label: "Active", type: "bool" },
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password", help: "Leave blank to keep the current password." },
      { name: "is_staff", label: "Staff (can use this panel)", type: "checkbox", default: true },
      { name: "is_superuser", label: "Superuser", type: "checkbox" },
      { name: "is_active", label: "Active", type: "checkbox", default: true },
    ],
  },
};

export const SIDEBAR_GROUPS = [
  { label: "Site content", items: ["impact-stats", "services", "news", "events"] },
  { label: "Organisation", items: ["leadership", "affiliates", "membership-applications"] },
  { label: "Programmes", items: ["projects", "resources"] },
  { label: "Opportunities", items: ["opportunities", "opportunity-applications"] },
  { label: "Enquiries", items: ["contact-messages"] },
  { label: "Access", items: ["admin-users"] },
];

export default resourceConfig;