/* DISCLAIMER: this is an example, not meant to be used in production */

import { formatDate } from "./helpers";
import type {
  DateTimeFormValues,
  ExtendedTableDataRow,
  TableDataRow,
} from "./types";

export const ROOM_TYPES = ["All", "Group", "WebRTC Go", "Peer to Peer"];
export const DATE_RANGES = [
  { name: "Last 24 hours", value: "1" },
  { name: "Last 7 days", value: "7" },
  { name: "Last 14 days", value: "14" },
  { name: "Custom", value: "Custom" },
];
export const DATE_TIME_RANGES = [
  { name: "All", value: "all" },
  { name: "Last 12 hours", value: "12hours" },
  { name: "Last 24 hours", value: "day" },
  { name: "Last 3 days", value: "threeDays" },
  { name: "Custom", value: "custom" },
];
export const TABLE_HEADERS = [
  "Room SID",
  "Unique Name",
  "Room Type",
  "Participants",
  "Date Completed",
];
export const EXTENDED_TABLE_HEADERS = [
  "Room SID",
  "Unique Name",
  "Room Type",
  "Participants",
  "Date Completed",
  "Status",
  "Host Name",
  "Department",
  "Platform",
  "Tags",
];

const today = new Date();
const fourteenHoursAgo = new Date();
fourteenHoursAgo.setHours(fourteenHoursAgo.getHours() - 14);
const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
const fourWeeksAgo = new Date();
fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

export const FORM_DEFAULT_VALUES: DateTimeFormValues = {
  search: "",
  type: "Group",
  range: "all",
  customDate: {
    startDate: formatDate(today),
    startTime: "00:00",
    endDate: formatDate(today),
    endTime: "23:59",
  },
};

export const TABLE_DATA: TableDataRow[] = [
  {
    roomSid: "RM76426b3e9986878d6316a22bf02d6fc3",
    uniqueName: "Test Room",
    roomType: "Group",
    participants: 50,
    dateCompleted: today,
  },
  {
    roomSid: "RMmg889qwslt6bijmzfjxleq4fn3eyxwdj6",
    uniqueName: "Quick Sync",
    roomType: "Peer to Peer",
    participants: 3,
    dateCompleted: fourWeeksAgo,
  },
  {
    roomSid: "RM8fcu56sr0tz6cf9a2phf5zo8vv5m65697",
    uniqueName: "My 1:1",
    roomType: "WebRTC Go",
    participants: 2,
    dateCompleted: today,
  },
  {
    roomSid: "RM1z17xfzcjdgwf254jk3k0gtu3r7xzxo0l",
    uniqueName: "Team Meeting",
    roomType: "Group",
    participants: 23,
    dateCompleted: oneWeekAgo,
  },
  {
    roomSid: "RMx2fw108pgls48zzf4oh6uzl4ly4s4j6b8",
    uniqueName: "All Hands",
    roomType: "Group",
    participants: 41,
    dateCompleted: twoWeeksAgo,
  },
  {
    roomSid: "RMwwxh0rskqqy2wzg7t7f3ha4haavymbnqt",
    uniqueName: "Project Meeting",
    roomType: "Group",
    participants: 6,
    dateCompleted: twoWeeksAgo,
  },
  {
    roomSid: "RMi2or733rf2vd6lziwe8g66smzykqkoplf",
    uniqueName: "Test Room 2",
    roomType: "WebRTC Go",
    participants: 1,
    dateCompleted: fourWeeksAgo,
  },
];

export const STATIC_TABLE_DATA: TableDataRow[] = [
  {
    roomSid: "RM76426b3e9986878d6316a22bf02d6fc3",
    uniqueName: "Test Room",
    roomType: "Group",
    participants: 50,
    dateCompleted: new Date(2024, 6, 1, 8, 39, 25),
  },
  {
    roomSid: "RMmg889qwslt6bijmzfjxleq4fn3eyxwdj6",
    uniqueName: "Quick Sync",
    roomType: "Peer to Peer",
    participants: 3,
    dateCompleted: new Date(2024, 6, 1, 18, 39, 25),
  },
  {
    roomSid: "RM8fcu56sr0tz6cf9a2phf5zo8vv5m65697",
    uniqueName: "My 1:1",
    roomType: "WebRTC Go",
    participants: 2,
    dateCompleted: new Date(2024, 7, 1, 8, 39, 25),
  },
  {
    roomSid: "RM1z17xfzcjdgwf254jk3k0gtu3r7xzxo0l",
    uniqueName: "Team Meeting",
    roomType: "Group",
    participants: 23,
    dateCompleted: new Date(2024, 6, 22, 8, 39, 25),
  },
  {
    roomSid: "RMx2fw108pgls48zzf4oh6uzl4ly4s4j6b8",
    uniqueName: "All Hands",
    roomType: "Group",
    participants: 41,
    dateCompleted: new Date(2024, 6, 15, 8, 39, 25),
  },
  {
    roomSid: "RMwwxh0rskqqy2wzg7t7f3ha4haavymbnqt",
    uniqueName: "Project Meeting",
    roomType: "Group",
    participants: 6,
    dateCompleted: new Date(2024, 6, 15, 8, 39, 25),
  },
  {
    roomSid: "RMi2or733rf2vd6lziwe8g66smzykqkoplf",
    uniqueName: "Test Room 2",
    roomType: "WebRTC Go",
    participants: 1,
    dateCompleted: new Date(2024, 6, 1, 18, 39, 25),
  },
  {
    roomSid: "RM1234567890abcdef1234567890abcdef",
    uniqueName: "Brainstorming Session",
    roomType: "Group",
    participants: 15,
    dateCompleted: new Date(2024, 6, 10, 10, 30, 0),
  },
  {
    roomSid: "RMabcdef1234567890abcdef1234567890",
    uniqueName: "Client Call",
    roomType: "Peer to Peer",
    participants: 2,
    dateCompleted: new Date(2024, 6, 11, 14, 0, 0),
  },
  {
    roomSid: "RM7890abcdef1234567890abcdef123456",
    uniqueName: "Daily Standup",
    roomType: "Group",
    participants: 10,
    dateCompleted: new Date(2024, 6, 12, 9, 0, 0),
  },
  {
    roomSid: "RM4567890abcdef1234567890abcdef123",
    uniqueName: "Sprint Planning",
    roomType: "Group",
    participants: 8,
    dateCompleted: new Date(2024, 6, 13, 11, 0, 0),
  },
  {
    roomSid: "RMabcdef7890abcdef1234567890abcdef",
    uniqueName: "Design Review",
    roomType: "Group",
    participants: 5,
    dateCompleted: new Date(2024, 6, 14, 15, 0, 0),
  },
  {
    roomSid: "RM123456abcdef1234567890abcdef1234",
    uniqueName: "Code Review",
    roomType: "Group",
    participants: 4,
    dateCompleted: new Date(2024, 6, 15, 16, 0, 0),
  },
  {
    roomSid: "RMabcdef1234567890abcdef1234567891",
    uniqueName: "One-on-One",
    roomType: "Peer to Peer",
    participants: 2,
    dateCompleted: new Date(2024, 6, 16, 13, 0, 0),
  },
  {
    roomSid: "RM7890abcdef1234567890abcdef123457",
    uniqueName: "Team Sync",
    roomType: "Group",
    participants: 7,
    dateCompleted: new Date(2024, 6, 17, 10, 0, 0),
  },
  {
    roomSid: "RM4567890abcdef1234567890abcdef124",
    uniqueName: "Project Kickoff",
    roomType: "Group",
    participants: 12,
    dateCompleted: new Date(2024, 6, 18, 9, 0, 0),
  },
  {
    roomSid: "RMabcdef7890abcdef1234567890abcde1",
    uniqueName: "Retrospective",
    roomType: "Group",
    participants: 6,
    dateCompleted: new Date(2024, 6, 19, 14, 0, 0),
  },
  {
    roomSid: "RM123456abcdef1234567890abcdef1235",
    uniqueName: "Town Hall",
    roomType: "Group",
    participants: 50,
    dateCompleted: new Date(2024, 6, 20, 11, 0, 0),
  },
  {
    roomSid: "RMabcdef1234567890abcdef1234567892",
    uniqueName: "Training Session",
    roomType: "Group",
    participants: 20,
    dateCompleted: new Date(2024, 6, 21, 15, 0, 0),
  },
  {
    roomSid: "RM7890abcdef1234567890abcdef123458",
    uniqueName: "Webinar",
    roomType: "Group",
    participants: 100,
    dateCompleted: new Date(2024, 6, 22, 17, 0, 0),
  },
  {
    roomSid: "RM4567890abcdef1234567890abcdef125",
    uniqueName: "Workshop",
    roomType: "Group",
    participants: 30,
    dateCompleted: new Date(2024, 6, 23, 9, 0, 0),
  },
  {
    roomSid: "RMabcdef7890abcdef1234567890abcde2",
    uniqueName: "Strategy Meeting",
    roomType: "Group",
    participants: 10,
    dateCompleted: new Date(2024, 6, 24, 13, 0, 0),
  },
  {
    roomSid: "RM123456abcdef1234567890abcdef1236",
    uniqueName: "Product Demo",
    roomType: "Group",
    participants: 25,
    dateCompleted: new Date(2024, 6, 25, 16, 0, 0),
  },
  {
    roomSid: "RMabcdef1234567890abcdef1234567893",
    uniqueName: "Sales Call",
    roomType: "Peer to Peer",
    participants: 2,
    dateCompleted: new Date(2024, 6, 26, 11, 0, 0),
  },
  {
    roomSid: "RM7890abcdef1234567890abcdef123459",
    uniqueName: "Customer Feedback",
    roomType: "Group",
    participants: 5,
    dateCompleted: new Date(2024, 6, 27, 14, 0, 0),
  },
  {
    roomSid: "RM4567890abcdef1234567890abcdef126",
    uniqueName: "Board Meeting",
    roomType: "Group",
    participants: 10,
    dateCompleted: new Date(2024, 6, 28, 9, 0, 0),
  },
  {
    roomSid: "RMabcdef7890abcdef1234567890abcde3",
    uniqueName: "Networking Event",
    roomType: "Group",
    participants: 40,
    dateCompleted: new Date(2024, 6, 29, 18, 0, 0),
  },
];

export const EXTENDED_STATIC_TABLE_DATA: ExtendedTableDataRow[] = [
  {
    roomSid: "RM76426b3e9986878d6316a22bf02d6fc3",
    uniqueName: "Test Room",
    roomType: "Group",
    participants: 50,
    dateCompleted: new Date(2024, 6, 1, 8, 39, 25),
    status: "Active",
    hostName: "Luffy Lawson",
    department: "Operations",
    platform: "Zoom",
    tags: "Training",
  },
  {
    roomSid: "RMmg889qwslt6bijmzfjxleq4fn3eyxwdj6",
    uniqueName: "Quick Sync",
    roomType: "Peer to Peer",
    participants: 3,
    dateCompleted: new Date(2024, 6, 1, 18, 39, 25),
    status: "Completed",
    hostName: "Brooks Benson",
    department: "Marketing",
    platform: "Meets",
    tags: "Meeting",
  },
  {
    roomSid: "RM8fcu56sr0tz6cf9a2phf5zo8vv5m65697",
    uniqueName: "My 1:1",
    roomType: "WebRTC Go",
    participants: 2,
    dateCompleted: new Date(2024, 7, 1, 8, 39, 25),
    status: "Scheduled",
    hostName: "Tony Tony Turner",
    department: "Customer Support",
    platform: "Microsoft Teams",
    tags: "Support",
  },
  {
    roomSid: "RM1z17xfzcjdgwf254jk3k0gtu3r7xzxo0l",
    uniqueName: "Team Meeting",
    roomType: "Group",
    participants: 23,
    dateCompleted: new Date(2024, 6, 22, 8, 39, 25),
    status: "Cancelled",
    hostName: "Sanji Stevens",
    department: "IT",
    platform: "Slack",
    tags: "External",
  },
  {
    roomSid: "RMx2fw108pgls48zzf4oh6uzl4ly4s4j6b8",
    uniqueName: "All Hands",
    roomType: "Group",
    participants: 41,
    dateCompleted: new Date(2024, 6, 15, 8, 39, 25),
    status: "Active",
    hostName: "Robin Rye",
    department: "R&D",
    platform: "Meets",
    tags: "Urgent",
  },
  {
    roomSid: "RMwwxh0rskqqy2wzg7t7f3ha4haavymbnqt",
    uniqueName: "Project Meeting",
    roomType: "Group",
    participants: 6,
    dateCompleted: new Date(2024, 6, 15, 8, 39, 25),
    status: "Completed",
    hostName: "Nami Nelson",
    department: "Finance",
    platform: "Zoom",
    tags: "Recurring",
  },
  {
    roomSid: "RMi2or733rf2vd6lziwe8g66smzykqkoplf",
    uniqueName: "Test Room 2",
    roomType: "WebRTC Go",
    participants: 1,
    dateCompleted: new Date(2024, 6, 1, 18, 39, 25),
    status: "Scheduled",
    hostName: "Tony Tony Turner",
    department: "Customer Support",
    platform: "Others",
    tags: "Support",
  },
];
