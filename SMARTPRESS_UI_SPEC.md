# SmartPress — Premium SaaS UI/UX Blueprint

## 1) Product Vision
SmartPress is a newsroom operations platform centered around **ticket-driven editorial missions**. Every mission is a task (report, news item, assignment) that flows through a structured lifecycle and can later be assembled into a broadcast-ready Queue.

Design principles:
- **Jira-like operational rigor** (task workflow, statuses, board mechanics)
- **Linear-like speed** (minimal latency patterns, keyboard-first interactions)
- **Notion-like clarity** (structured content, readable typography, clean hierarchy)
- **Newsroom realism** (deadlines, approvals, chapeau, queue sequencing)

---

## 2) Information Architecture

### Primary Navigation (Left Sidebar)
1. Dashboard
2. Roadmap
3. Queue
4. Workspace (Journalist)
5. Archive
6. Communication
7. Admin (permission-gated)
8. Profile

### Global Top Bar
- Universal Search (`⌘/Ctrl + K`)
- Filter chips (contextual)
- Notifications
- Quick create task (`N`)
- User profile menu

### Optional Right Utility Panel
- Context details (task metadata)
- Activity stream
- Comments / threaded updates
- Quick actions

---

## 3) Design System

## 3.1 Color Tokens (Light Theme First)

### Neutrals
- `bg.canvas`: `#F8FAFC` (page background)
- `bg.surface`: `#FFFFFF` (cards/panels)
- `bg.subtle`: `#F1F5F9` (grouping areas)
- `border.default`: `#E2E8F0`
- `text.primary`: `#0F172A`
- `text.secondary`: `#334155`
- `text.muted`: `#64748B`

### Accent (Blue-Teal Premium)
- `accent.500`: `#0EA5A4`
- `accent.600`: `#0D9488`
- `accent.700`: `#0F766E`
- `accent.soft`: `#CCFBF1`

### Semantic Status
- Draft: `#94A3B8`
- Assigned: `#0EA5E9`
- In Progress: `#3B82F6`
- Submitted: `#6366F1`
- Needs Revision: `#F59E0B`
- Completed: `#10B981`
- Approved: `#059669`
- Queued: `#14B8A6`
- Error: `#DC2626`
- Delayed: `#EF4444`

## 3.2 Typography
- Font family: **Inter**, fallback modern sans
- Base size: `14px`
- Scale:
  - Display: 28/36 semibold
  - H1: 24/32 semibold
  - H2: 20/28 semibold
  - H3: 18/26 medium
  - Body: 14/22 regular
  - Caption: 12/18 medium
  - Mono/meta IDs: 12/16 medium

## 3.3 Spacing & Layout
- 8px base system: `4, 8, 12, 16, 24, 32, 40, 48`
- Grid: 12-column responsive for full pages
- Sidebar width: 248px
- Content max width: 1440px
- Card radius: 10px
- Input radius: 8px
- Border thickness: 1px
- Shadows: minimal (`0 1px 2px rgba(15, 23, 42, 0.05)` only on elevated elements)

## 3.4 Motion & Feedback
- Duration scale: 100ms (hover), 160ms (state), 220ms (panel)
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- Drag feedback: subtle lift + accent border + ghost placeholder
- Success actions: short toast with check icon
- Errors: inline and persistent until dismissed or fixed

---

## 4) Reusable Component Library

1. **Task Card**
   - Header: title + task ID (`SP-241`)
   - Meta row: assignee avatar, priority badge, due date
   - Footer: comment count, attachments, activity dot
   - States: default, hover, selected, dragging, blocked

2. **Status Badge**
   - Compact rounded pill
   - Icon + text variant by state

3. **Priority Badge**
   - `Urgent / High / Medium / Low`
   - Color and icon-coded; text always visible for accessibility

4. **User Avatar**
   - 24/32/40 sizes
   - Presence dot (online/busy/offline)

5. **Filter Bar**
   - Dropdowns: assignee, priority, deadline, status
   - Search input + saved views
   - Clear all + active chips

6. **Activity Timeline**
   - Chronological event list (status changes, comments, edits)
   - Timestamp + actor + diff snippet

7. **Comment Block**
   - Avatar + rich text + mentions + attachments
   - Resolve thread action

8. **Notification Item**
   - Type icon (approval, mention, delay)
   - Actionable CTA

9. **Modal / Drawer**
   - Confirm workflows, quick edit forms, queue preview

10. **Table**
    - Sticky header, sortable columns, compact density toggle

11. **Kanban Column**
    - Title + count + WIP marker
    - Vertical list of task cards
    - Drop zone indicators

---

## 5) Primary Screens

## 5.1 Dashboard (Role-Based)

### Layout
- Top metrics row (4–6 cards)
- Main center: status distribution + “Assigned to me” list
- Right rail: activity feed + pending approvals

### Core Widgets
- Tasks by status (stacked bar or donut)
- My tasks (today/overdue)
- Delayed tasks spotlight
- Queue readiness score (`Ready / Needs review`)
- Team throughput (editor/director only)
- Journalist activity pulse (submissions in last 24h)

### Manager View Additions
- Approval bottlenecks
- Team load heatmap
- SLA risk panel (deadline breaches)

---

## 5.2 Roadmap (Main Jira-like Screen)

### Board Columns
`Draft → Assigned → In Progress → Submitted → Needs Revision → Completed → Approved → Queued`

### Interactions
- Drag and drop across columns with transition validation
- Bulk select + bulk move
- Quick add card in any column
- Column collapse/expand for dense mode

### Task Card Content
- Title + short context
- Assignee
- Priority
- Deadline (red if overdue)
- Status badge
- Indicators: comments, attachments, revisions

### Tooling Bar
- Search tasks
- Filters: user, priority, deadline
- Saved views: “Morning rundown”, “Overdue”, “Broadcast tonight”
- Quick actions: assign, set priority, request revision

---

## 5.3 Task Detail (Split View)

### Left Pane (Content Work)
- Task title + ID + breadcrumbs
- Chapeau (headline/intro) field
- Description / mission brief
- Lightweight editor for body content
- Attachment zone (upload, preview, remove)
- Revision history link (compare versions)

### Right Pane (Operational Metadata)
- Assignee
- Owner/editor
- Status
- Priority
- Deadline + reminder
- Activity timeline
- Comments/threads

### Primary Actions
- Save draft
- Submit for review (prominent CTA)
- Request clarification
- Mark ready for queue (if approved)

---

## 5.4 Queue (Newscast Builder)

### Structure
- Left: completed/approved task pool
- Center: active queue list with order numbers
- Right: selected item detail + chapeau editor + preview

### Features
- Add/remove tasks from queue
- Drag to reorder
- Priority overrides within queue
- Real-time final order preview
- Highlight selected queue item
- Show journalist + title + runtime estimate (optional)

---

## 5.5 Journalist Workspace

### Personal-Only Scope
- Today’s tasks timeline
- Deadlines calendar strip
- Personal mini-roadmap board
- Quick write panel
- Submission statuses (“Submitted”, “Needs revision”, etc.)

### Access Rules
- Cannot view others’ tasks
- Can collaborate via comments/mentions only on assigned tickets

---

## 5.6 Archive (Read-Only)

### Archive View
- Search + filters (date, tag, journalist, topic)
- List/table of completed reports
- Read-only detail drawer
- Export/share links (permission-based)

### Constraints
- No create/edit/delete actions
- Clear lock iconography for read-only context

---

## 5.7 Profile Page

- Name, role, function
- Short intro/bio
- Task metrics (completed, in progress, approvals)
- Personal archive shortcut
- Notification preferences (optional)

---

## 5.8 Admin Panel

### Sections
- User management
- Roles & permissions
- Organization structure
- System settings
- Audit logs

### UX Pattern
- Table-first navigation
- Side configuration drawers
- Clear save/publish status
- Immutable audit trail viewer

---

## 5.9 Communication Module

### Features
- Lightweight messaging threads
- Convocation (meeting invite) generator
- Meetup scheduling with availability hints
- Task-linked messages (context preserved)

### Principle
- Keep communication embedded into workflow, not separate “chat app sprawl”

---

## 6) States (Per Screen)

Each primary screen includes:

1. **Loading state**
   - Skeletons for cards, tables, and panels
   - Keep layout stable to avoid reflow

2. **Empty state**
   - Contextual illustration/icon
   - One explanatory sentence
   - One action CTA (e.g., “Create your first task”)

3. **Error state**
   - Human-readable issue
   - Retry action
   - Optional diagnostics in expandable section

---

## 7) UX Behavior & Productivity Patterns

- Keyboard shortcuts for high-frequency actions:
  - `N`: new task
  - `F`: focus search/filter
  - `G + R`: go to roadmap
  - `G + Q`: go to queue
  - `Cmd/Ctrl + Enter`: submit for review
- Inline editing for title, deadline, priority, assignee
- Optimistic updates on drag/drop with rollback on failure
- Sticky action bars for long task detail pages
- Context-aware toasts with undo where safe

---

## 8) Accessibility & Readability

- WCAG-friendly contrast for text and badges
- Focus rings on all interactive controls
- Touch targets ≥ 36px
- Screen-reader labels for status and priority icons
- Non-color-only state communication

---

## 9) Operational Realism for Newsrooms

- Deadline risk emphasis (overdue and nearing deadline states)
- Approval chain clarity (journalist → editor → director optional)
- Chapeau mandatory before queue insertion
- Queue lock for final broadcast cut
- Strong auditability in status changes and revisions

---

## 10) Suggested MVP Delivery Order

1. Core design system + layout shell
2. Roadmap board + task card interactions
3. Task detail split page + comments + revisions
4. Queue builder with ordering
5. Dashboard metrics + role conditions
6. Archive read-only mode
7. Admin + communication modules

This sequence maximizes operational value quickly while aligning to newsroom production cadence.
