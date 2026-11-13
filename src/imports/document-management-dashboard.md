---
id: 032-document-management-dashboard
diagram_id: DASH-08
prd_section: Dashboard
title: Document management dashboard — proposals, reports, deliverables, and file organization
skill: frontend
phase: MEDIUM
priority: P2
status: Not Started
owner: Frontend
dependencies:
  - 027-project-delivery-dashboard
estimated_effort: M
percent_complete: 0
area: client-dashboard
wizard_step: null
schema_tables: [documents, projects, deliverables, clients, organizations]
figma_prompt: prompts/032-document-management-dashboard.md
---

# 032 — Document Management Dashboard

## Summary Table

| Field            | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| **ID**           | 032-document-management-dashboard                              |
| **Diagram ID**   | DASH-08                                                        |
| **Section**      | Dashboard                                                      |
| **Phase**        | MEDIUM                                                         |
| **Priority**     | P2                                                             |
| **Effort**       | M (Medium)                                                     |
| **Owner**        | Frontend                                                       |
| **Dependencies** | 027-project-delivery-dashboard                                 |
| **Schema**       | documents, projects, deliverables, clients, organizations      |
| **Wizard Step**  | None (consumes wizard outputs as generated documents)          |

---

## Description

**Situation.** Every client engagement generates documents — proposals crafted from wizard data, contracts signed during onboarding, deliverables produced during implementation, weekly reports, and analysis exports. Today these files live in scattered locations: email attachments, Google Drive folders, Slack messages. Neither the agency nor the client has a single place to find everything related to their project.

**Why it matters.** Document chaos erodes trust. When a client asks "Can you resend the proposal?" and the consultant spends 10 minutes searching email, that is a professionalism failure. When a deliverable is uploaded but the client never gets notified, that is an onboarding failure. A centralized document hub gives both parties a reliable, organized, always-available repository that builds confidence in the engagement.

**What exists.** The `documents` table stores metadata (name, type, url, project_id, category, version, uploaded_by, created_at). The `deliverables` table links specific project deliverables to documents. The wizard generates structured data in Steps 1-5 that can be auto-converted into proposal PDFs, analysis exports, and roadmap documents. Supabase Storage provides the file hosting backend.

**The build.** A document dashboard with a left folder tree organized by project, a main content area showing documents in grid or list view, and supporting features for upload, preview, versioning, sharing, and search. Auto-generated documents from wizard data appear automatically in the appropriate project folder. Drag-and-drop upload handles manual additions.

**Example.** The "Acme Retail" project folder contains: (1) auto-generated proposal PDF from wizard Steps 1-3, (2) auto-generated roadmap PDF from Step 5, (3) signed contract uploaded by the consultant, (4) Phase 1 deliverable: "Support Engine Configuration Guide" uploaded last week, (5) weekly status report auto-generated from project data. The client clicks the proposal to preview it inline, downloads the roadmap PDF, and sees that the Phase 1 deliverable was uploaded 2 days ago.

---

## User Stories

- As a **business owner**, I want a single place to find all documents related to my project so I do not have to search through emails and chat messages.
- As a **business owner**, I want to preview documents inline without downloading them so I can quickly review content.
- As a **consultant**, I want to upload deliverables with drag-and-drop and have them automatically categorized so document management is effortless.
- As a **consultant**, I want auto-generated proposals from wizard data so I do not have to manually create proposal documents.
- As a **business owner**, I want to receive a notification when a new document is uploaded to my project so I never miss a deliverable.
- As a **consultant**, I want version history on documents so I can track changes and revert if needed.
- As an **agency owner**, I want share links for documents so I can send specific files to external stakeholders without giving them dashboard access.

---

## Goals & Acceptance Criteria

- [ ] Folder tree on the left organizes documents by project, with each project showing document count
- [ ] Documents display in grid view (thumbnail cards) and list view (table rows) with a toggle to switch
- [ ] Grid view shows: document thumbnail/icon, name, category badge, upload date, file size
- [ ] List view shows: name, category, type (PDF/DOCX/PNG/etc.), uploaded by, version, date, size, actions
- [ ] Five document categories are supported: Proposals, Contracts, Deliverables, Reports, Analysis Exports
- [ ] Category filter allows viewing one or all categories at a time
- [ ] Drag-and-drop upload zone accepts files and uploads to Supabase Storage with progress indicator
- [ ] Upload form captures: name, category (auto-suggested from file type), project association
- [ ] Auto-generated documents appear automatically: proposal PDF from wizard Steps 1-3, roadmap PDF from Step 5, analysis export from Step 4
- [ ] Version history panel shows all versions of a document with timestamp, uploader, and "restore" action
- [ ] Document preview modal supports PDF, images, and text files inline without download
- [ ] Share link generation creates a time-limited public URL with optional password protection
- [ ] Search bar filters documents by name, type, and project with real-time results
- [ ] Document count badge on each project folder in the tree
- [ ] Page follows design system: #F1EEEA background, #0A211F text, #84CC16 accents, Playfair Display headings, Lora body, 1200px max-width, card-based layout, no shadows, no gradients

---

## Wiring Plan

| Data need                         | Source table(s)          | Query / logic                                                                              |
| --------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| Document list by project          | `documents`              | `SELECT * FROM documents WHERE project_id = ? ORDER BY created_at DESC`                    |
| Document categories               | `documents`              | `SELECT DISTINCT category FROM documents WHERE project_id = ?`                             |
| Project folder structure           | `projects`, `clients`    | `SELECT p.id, p.name, c.name as client_name, COUNT(d.id) as doc_count FROM projects p JOIN clients c ON p.client_id = c.id LEFT JOIN documents d ON d.project_id = p.id GROUP BY p.id` |
| Deliverable-linked documents       | `deliverables`           | `SELECT d.*, doc.* FROM deliverables d JOIN documents doc ON d.document_id = doc.id WHERE d.project_id = ?` |
| Version history                    | `documents`              | `SELECT * FROM documents WHERE parent_document_id = ? ORDER BY version DESC`               |
| File upload                        | Supabase Storage         | Upload to `documents` bucket, store URL in `documents.url`                                 |
| Auto-generated proposal            | `wizard_answers`         | Read Steps 1-3 ai_results, generate PDF via edge function, insert into `documents`         |
| Auto-generated roadmap             | `wizard_answers`         | Read Step 5 ai_results (roadmap data), generate PDF, insert into `documents`               |
| Search                             | `documents`              | `SELECT * FROM documents WHERE name ILIKE '%query%' OR category ILIKE '%query%'`           |
| Share link                         | `documents`              | Generate signed URL from Supabase Storage with TTL                                         |

---

## Screen Purpose

Central repository for all project documents — proposals generated from wizard data, contracts, deliverables, reports, and shared files. Organized by project and category with version tracking. Serves as the single source of truth for all files in a client engagement, replacing scattered email attachments and external file shares.

---

## Target User

Business owners accessing their project documents to review proposals, download deliverables, and track what has been produced. Consultants uploading deliverables, managing versions, and sharing files with clients. Agency owners monitoring document completeness across all projects.

---

## Core Features

1. **Document grid/list view** — Toggle between thumbnail grid (visual browsing) and detailed list (sortable table). Grid shows document icon by type, name truncated to 2 lines, category badge, and relative upload time. List shows full metadata columns with sort on any column.
2. **Project folder tree** — Left sidebar tree showing all projects grouped by client. Each project node shows a document count badge. Click a project to filter the main view. "All Documents" node at the top shows everything.
3. **Document categories** — Five categories with color-coded badges: Proposals (blue), Contracts (purple), Deliverables (#84CC16 lime), Reports (amber), Analysis Exports (teal). Filter buttons above the document grid.
4. **Upload with drag-and-drop** — Drop zone overlay appears when dragging files over the content area. Accepts multiple files simultaneously. Shows upload progress bar per file. Auto-suggests category based on file extension (PDF -> Proposal/Report, DOCX -> Contract/Deliverable).
5. **Auto-generated documents** — When a wizard session completes, edge functions automatically generate: (a) Proposal PDF from Steps 1-3 data (business context, diagnostics, recommendations), (b) Roadmap PDF from Step 5 data (phases, timeline, milestones), (c) Analysis Export from Step 4 data (readiness scores, executive summary). These appear in the project folder without manual intervention.
6. **Version history** — Each document maintains a version chain. Uploading a new version of an existing document increments the version number and preserves all previous versions. Version history panel shows timeline of changes.
7. **Share link generation** — Create a public URL for any document with configurable expiration (1 hour, 1 day, 1 week, 30 days) and optional password. Share links are logged for audit purposes.
8. **Document search** — Global search bar with real-time filtering by document name, type, category, or project name.

---

## Data Displayed

- **Folder tree**: Client name (group header), project name (node), document count badge per project
- **Grid card**: Document type icon (PDF/DOCX/PNG/XLS), document name (truncated), category badge, upload date (relative), file size
- **List row**: Document name, category badge, file type, uploaded by (avatar + name), version number, upload date, file size, action buttons (preview, download, share, delete)
- **Version history**: Version number, upload date, uploaded by, file size, "Restore" and "Download" buttons
- **Upload progress**: File name, progress bar (percentage), estimated time remaining, cancel button
- **Share modal**: Generated URL, expiration selector, password toggle, copy button

---

## UI Components

| Component            | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `FolderTree`         | Left sidebar tree with client/project hierarchy and document count badges |
| `DocumentGrid`       | Responsive grid of document thumbnail cards                               |
| `DocumentListView`   | Sortable table with full document metadata columns                        |
| `ViewToggle`         | Grid/list view switch (icon buttons)                                      |
| `UploadDropzone`     | Drag-and-drop file upload area with progress indicators                   |
| `DocumentPreview`    | Modal with inline PDF/image viewer and document metadata                  |
| `VersionHistory`     | Timeline panel showing all versions with restore/download actions         |
| `ShareLinkModal`     | Modal for generating and configuring share links                          |
| `CategoryFilter`     | Horizontal button group for filtering by document category                |
| `SearchBar`          | Text input with real-time search across document names and metadata       |
| `DocumentTypeBadge`  | Color-coded badge showing document category                               |
| `UploadProgressBar`  | Per-file progress indicator during upload                                 |

---

## Layout Structure

```
+---------------------------------------------------------------+
| Sidebar (240px) | Folder Tree (200px) | Main Content           |
|                 |                     |                        |
| [Navigation]    | All Documents       | [Search Bar] [View Toggle] |
|                 | > Acme Retail (7)   | [Category Filters]     |
|                 |   - AI Transform.   | +---------+---------+  |
|                 | > BrightPath (4)    | | Doc Card| Doc Card|  |
|                 |   - Phase 1 Impl.   | +---------+---------+  |
|                 | > TechFlow (3)      | | Doc Card| Doc Card|  |
|                 |                     | +---------+---------+  |
|                 |                     | | Doc Card| Doc Card|  |
|                 |                     | +---------+---------+  |
|                 |                     |                        |
|                 |                     | [Upload Drop Zone]     |
+---------------------------------------------------------------+
```

- **Sidebar**: 240px, standard dashboard navigation
- **Folder tree**: 200px, scrollable, collapsible client/project nodes
- **Main content**: Fills remaining width, max-width 1200px
- **Grid**: Responsive — 4 columns on wide screens, 3 on medium, 2 on narrow
- **Background**: #F1EEEA, cards #FFFFFF, folder tree background slightly darker (#FAFAF8)

---

## Interaction Patterns

- **Select project**: Click project in folder tree -> main view filters to that project's documents
- **Switch view**: Click grid/list toggle -> view transitions smoothly, maintaining current filters
- **Upload files**: Drag files onto content area -> drop zone highlights -> files upload with progress bars -> documents appear in grid on completion
- **Preview document**: Click document card/row -> preview modal opens with inline viewer (PDF rendered in iframe, images displayed directly)
- **Version management**: Click version icon on document -> version history panel slides in from right -> click "Restore" to make an older version current
- **Generate share link**: Click share button -> modal opens -> select expiration, optional password -> click "Generate" -> URL displayed with copy button
- **Search**: Type in search bar -> results filter in real-time as user types, highlighting matched text
- **Category filter**: Click category button -> toggles filter on/off (multiple categories can be active)

---

## Example User Workflows

**Workflow 1: Client reviews their proposal**
1. Business owner logs into dashboard, navigates to Documents
2. Their project folder is pre-selected (single-project clients see their project by default)
3. Sees auto-generated "AI Transformation Proposal" in the Proposals category
4. Clicks to preview -> PDF renders inline showing business context, diagnostics, and recommended systems
5. Downloads the PDF for internal sharing with their team

**Workflow 2: Consultant uploads a deliverable**
1. Consultant navigates to Documents, selects "Acme Retail" project
2. Drags "Support Engine Configuration Guide.pdf" onto the content area
3. Drop zone activates, file uploads with progress bar
4. Upload form auto-suggests category "Deliverables" based on project context
5. Consultant confirms, document appears in the grid
6. Client receives notification that a new deliverable was uploaded

**Workflow 3: Sharing a document externally**
1. Agency owner needs to share a proposal with an external partner
2. Navigates to the document, clicks "Share" button
3. Sets expiration to 7 days, adds a password
4. Copies the generated URL
5. Sends URL and password to the partner via email

---

## AI Features

1. **Auto-generate proposal PDF** — When a wizard session completes Steps 1-3, an edge function compiles the business context, industry diagnostics, and system recommendations into a formatted proposal PDF. The PDF uses the agency's brand template with Playfair Display headings and the #0A211F / #84CC16 color palette.
2. **Auto-generate roadmap PDF** — When Step 5 completes, the roadmap data (phases, timelines, milestones, investment) is compiled into a visual roadmap PDF.
3. **AI document summarization** — For any uploaded document, AI generates a 2-3 sentence summary that appears on the document card, making it easy to identify content without opening.
4. **Smart categorization** — When files are uploaded, AI analyzes the filename, file type, and content (for text-based files) to auto-suggest the correct category.
5. **Related document suggestions** — When viewing a document, AI suggests other documents that may be relevant based on content similarity and project context.

---

## Data Sources

| Source Table      | Data Used                                                           |
| ----------------- | ------------------------------------------------------------------- |
| `documents`       | All document metadata: name, type, url, project_id, category, version, uploaded_by, created_at |
| `projects`        | Folder structure, project names, project-document association       |
| `deliverables`    | Links specific project deliverables to their document records       |
| `clients`         | Client names for folder tree grouping                               |
| `organizations`   | Organization context for document branding and access control       |
| `wizard_answers`  | Source data for auto-generated proposals (Steps 1-3), roadmaps (Step 5), analysis exports (Step 4) |
| Supabase Storage  | Actual file hosting, signed URL generation for downloads and shares |

---

## Automation Opportunities

- **Auto-generation pipeline**: Wizard completion triggers automatic creation of proposal, roadmap, and analysis export documents without any manual step.
- **Notification on upload**: When a consultant uploads a deliverable, the client automatically receives an email and in-app notification with a direct link to the document.
- **Expiring share link cleanup**: Scheduled job removes expired share links and logs the access history.
- **Version pruning**: Auto-archive versions older than 90 days for documents with more than 10 versions, keeping storage costs manageable.
- **Completeness check**: For each project, verify that required documents exist (proposal, contract, at least one deliverable per milestone) and flag missing items on the project delivery dashboard.

---

## Visual Hierarchy

1. **Primary focus**: Document grid/list in the main content area — this is where users spend most of their time browsing and finding files
2. **Secondary focus**: Folder tree on the left — persistent navigation context showing project structure
3. **Tertiary focus**: Search bar and category filters at the top — tools for narrowing results
4. **Supporting elements**: Upload zone at the bottom, version history and share modals on demand
5. **Typography**: Playfair Display for "Documents" page heading and project folder names, Lora for document names, metadata, and all body text
6. **Color coding**: Category badges use distinct colors (blue proposals, purple contracts, #84CC16 deliverables, amber reports, teal exports). Document type icons use muted versions of the same palette.
7. **Cards**: White (#FFFFFF) document cards on #F1EEEA background, #D4CFC8 borders, no shadows, no gradients. Hover state adds a subtle #84CC16 left border accent.

---

## Frontend Wiring

### Component Tree

```
<DocumentManagementPage>                       ← route: /app/documents
  <div className="flex">
    <FolderTree>                               ← 200px left sidebar
      <FolderNode client="All Documents" />
      <FolderNode client="Acme Retail">
        <FolderNode project="AI Transform" count={7} />
      </FolderNode>
      <FolderNode client="BrightPath">
        <FolderNode project="Phase 1" count={4} />
      </FolderNode>
    </FolderTree>
    <div className="flex-1">                   ← main content area
      <div className="flex items-center gap-4">
        <SearchBar />
        <ViewToggle />                         ← grid/list switch
      </div>
      <CategoryFilter>
        <CategoryButton category="proposals" />
        <CategoryButton category="contracts" />
        <CategoryButton category="deliverables" />
        <CategoryButton category="reports" />
        <CategoryButton category="exports" />
      </CategoryFilter>
      <DocumentGrid>                           ← shown when view = "grid"
        <DocumentCard />
        <DocumentCard />
      </DocumentGrid>
      <DocumentListView>                       ← shown when view = "list"
        <DocumentRow />
        <DocumentRow />
      </DocumentListView>
      <UploadDropzone />                       ← always visible at bottom
    </div>
  </div>
  <DocumentPreview />                          ← modal, conditionally rendered
  <VersionHistory />                           ← slide-in panel from right
  <ShareLinkModal />                           ← modal for share link config
</DocumentManagementPage>
```

### TypeScript Interfaces

```ts
// src/lib/types/document.ts

type DocumentCategory = 'proposals' | 'contracts' | 'deliverables' | 'reports' | 'exports';
type FileType = 'pdf' | 'docx' | 'png' | 'jpg' | 'xls' | 'xlsx' | 'txt' | 'csv' | 'other';

interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  file_type: FileType;
  url: string;                                 // Supabase Storage URL
  project_id: string;
  project_name: string;
  uploaded_by: string;
  uploaded_by_name: string;
  version: number;
  parent_document_id: string | null;           // null if original, set if version
  file_size: number;                           // bytes
  ai_summary: string | null;                   // AI-generated 2-3 sentence summary
  created_at: string;
}

interface DocumentVersion {
  id: string;
  version: number;
  uploaded_by: string;
  uploaded_by_name: string;
  file_size: number;
  created_at: string;
  url: string;
}

interface ProjectFolder {
  project_id: string;
  project_name: string;
  client_id: string;
  client_name: string;
  document_count: number;
}

interface ShareLink {
  id: string;
  document_id: string;
  url: string;
  expires_at: string;
  password_protected: boolean;
  created_at: string;
  created_by: string;
  access_count: number;
}

interface UploadProgress {
  file_name: string;
  progress: number;                            // 0-100
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error_message: string | null;
}

interface DocumentFilters {
  project_id: string | null;
  categories: DocumentCategory[];
  search: string;
  sort_by: 'name' | 'created_at' | 'file_size' | 'category';
  sort_dir: 'asc' | 'desc';
}
```

### Custom Hooks

```ts
// src/lib/hooks/useDocuments.ts
function useDocuments(filters: DocumentFilters): {
  documents: Document[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// src/lib/hooks/useProjectFolders.ts
function useProjectFolders(): {
  folders: ProjectFolder[];
  loading: boolean;
}

// src/lib/hooks/useDocumentUpload.ts
function useDocumentUpload(): {
  upload: (files: File[], projectId: string, category?: DocumentCategory) => Promise<void>;
  uploads: UploadProgress[];
  isUploading: boolean;
}

// src/lib/hooks/useDocumentVersions.ts
function useDocumentVersions(documentId: string): {
  versions: DocumentVersion[];
  loading: boolean;
  restore: (versionId: string) => Promise<void>;
}

// src/lib/hooks/useShareLink.ts
function useShareLink(): {
  generate: (documentId: string, expiresIn: string, password?: string) => Promise<ShareLink>;
  loading: boolean;
}
```

### State Management

| State | Location | Reason |
|-------|----------|--------|
| Selected project (folder tree) | `DocumentManagementPage` useState, synced to URL param `?project=<id>` | Deep-linkable project filtering |
| View mode (grid/list) | `DocumentManagementPage` useState, persisted to localStorage | User preference |
| Active category filters | `CategoryFilter` local useState, lifted via `onFilterChange` | Multi-select filter state |
| Search query | `SearchBar` local useState with debounce (300ms) | Real-time filtering |
| Sort column and direction | `DocumentListView` local useState | Table sorting |
| Preview modal open + document | `DocumentManagementPage` useState `{ open: boolean, doc: Document \| null }` | Controls preview modal |
| Version panel open + document ID | `DocumentManagementPage` useState | Controls slide-in panel |
| Share modal open + document ID | `DocumentManagementPage` useState | Controls share modal |
| Upload progress entries | `useDocumentUpload` hook (useState) | Tracks multi-file upload state |
| Drag-over state | `UploadDropzone` local useState | Highlights drop zone |

### Data Fetching Pattern

```
DocumentManagementPage mounts
  → useProjectFolders()
      → api<ProjectFolder[]>('/dashboard/documents/folders', { method: 'GET' })
      → populates folder tree sidebar

  → useDocuments(filters)
      → api<Document[]>('/dashboard/documents', { method: 'POST', body: filters })
      → re-fetches when filters change (project, category, search, sort)

  Upload files (drag-and-drop or file picker)
    → useDocumentUpload().upload(files, projectId, category)
        → for each file:
            1. supabase.storage.from('documents').upload(path, file)
            2. api('/dashboard/documents', { method: 'PUT', body: { name, url, project_id, category, file_type, file_size } })
        → updates UploadProgress state per file
        → calls refetch() on documents when all complete

  Preview document
    → opens DocumentPreview modal with doc.url
    → PDF: rendered in <iframe>, images: rendered in <img>

  Version history
    → useDocumentVersions(documentId)
        → api<DocumentVersion[]>('/dashboard/documents/versions', { method: 'POST', body: { document_id } })

  Generate share link
    → useShareLink().generate(documentId, expiresIn, password)
        → api<ShareLink>('/dashboard/documents/share', { method: 'POST', body: { document_id, expires_in, password } })
```

### Component Communication

- **Props down**: `DocumentManagementPage` passes `documents` to `DocumentGrid` / `DocumentListView`, `folders` to `FolderTree`, `filters` state to filter components
- **Callbacks up**: `FolderTree` fires `onSelectProject(projectId)` which updates the filter; `DocumentCard` / `DocumentRow` fire `onPreview(doc)`, `onShare(docId)`, `onVersions(docId)`, `onDelete(docId)`; `UploadDropzone` fires upload through the hook, then `onUploadComplete` triggers `refetch()`
- **Category filter**: `CategoryFilter` maintains which categories are active and calls `onFilterChange(categories)` on parent, which updates the filter state driving `useDocuments`
- **Search debounce**: `SearchBar` debounces input by 300ms, then calls `onSearch(query)` on parent
- **Modal/panel coordination**: Only one of `DocumentPreview`, `VersionHistory`, or `ShareLinkModal` can be open at a time — the page component manages this with a discriminated union state

---

## Backend Wiring

### New Edge Function Routes

| Method | Route | Handler | Request Body | Response Shape |
|--------|-------|---------|-------------|----------------|
| GET | `/dashboard/documents/folders` | List projects with document counts | — | `ProjectFolder[]` |
| POST | `/dashboard/documents` | List documents with filters | `DocumentFilters` | `Document[]` |
| PUT | `/dashboard/documents` | Create document metadata record | `{ name, url, project_id, category, file_type, file_size }` | `{ id: string }` |
| DELETE | `/dashboard/documents/:id` | Delete document and storage file | — | `{ success: boolean }` |
| POST | `/dashboard/documents/versions` | List versions of a document | `{ document_id: string }` | `DocumentVersion[]` |
| POST | `/dashboard/documents/versions/restore` | Restore a previous version | `{ document_id: string, version_id: string }` | `{ success: boolean }` |
| POST | `/dashboard/documents/share` | Generate a time-limited share link | `{ document_id: string, expires_in: string, password?: string }` | `ShareLink` |
| POST | `/dashboard/documents/generate` | Auto-generate doc from wizard data | `{ session_id: string, type: 'proposal' \| 'roadmap' \| 'analysis' }` | `{ document_id: string, url: string }` |
| POST | `/dashboard/documents/search` | Full-text search across documents | `{ query: string }` | `Document[]` |

### Supabase Client Queries

```ts
// Project folder structure with document counts
const { data: folders } = await db
  .from('projects')
  .select(`
    id,
    name,
    client_id,
    clients ( name ),
    documents ( count )
  `)
  .order('name', { ascending: true });

// Document list with filters
let query = db
  .from('documents')
  .select('*, projects(name)')
  .order(sortBy, { ascending: sortDir === 'asc' });
if (projectId) query = query.eq('project_id', projectId);
if (categories.length > 0) query = query.in('category', categories);
if (search) query = query.ilike('name', `%${search}%`);
const { data: documents } = await query;

// Create document record after storage upload
await db.from('documents').insert({
  name,
  category,
  file_type: fileType,
  url: storageUrl,
  project_id: projectId,
  uploaded_by: userId,
  version: 1,
  parent_document_id: null,
  file_size: fileSize,
  created_at: new Date().toISOString(),
});

// Version history for a document
const { data: versions } = await db
  .from('documents')
  .select('id, version, uploaded_by, file_size, created_at, url')
  .or(`id.eq.${documentId},parent_document_id.eq.${documentId}`)
  .order('version', { ascending: false });

// Restore a version: create new version record pointing to old file
const { data: oldVersion } = await db
  .from('documents')
  .select('*')
  .eq('id', versionId)
  .single();
await db.from('documents').insert({
  ...oldVersion,
  id: undefined,                               // auto-generate new ID
  version: currentMaxVersion + 1,
  parent_document_id: documentId,
  created_at: new Date().toISOString(),
});

// Generate share link (signed URL from Supabase Storage)
const { data: signedUrl } = await db.storage
  .from('documents')
  .createSignedUrl(filePath, expiresInSeconds);

// Auto-generate proposal from wizard data
const { data: answers } = await db
  .from('wizard_answers')
  .select('step_number, ai_results')
  .eq('session_id', sessionId)
  .in('step_number', [1, 2, 3])
  .order('step_number');
// ... compile into PDF via edge function, upload to storage

// Deliverable-linked documents
const { data: deliverableDocs } = await db
  .from('deliverables')
  .select('*, documents(*)')
  .eq('project_id', projectId);
```

### RLS Policies Needed

| Table | Policy | Rule |
|-------|--------|------|
| `documents` | SELECT for project members | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = (SELECT org_id FROM projects WHERE id = documents.project_id))` |
| `documents` | INSERT for consultants and admins | `auth.uid() IN (SELECT user_id FROM org_members WHERE role IN ('admin', 'consultant') AND org_id = ...)` |
| `documents` | DELETE for admins and document uploader | `auth.uid() = uploaded_by OR auth.uid() IN (SELECT user_id FROM org_members WHERE role = 'admin')` |
| `projects` | SELECT for org members | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = projects.org_id)` |
| `deliverables` | SELECT for project org members | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = (SELECT org_id FROM projects WHERE id = deliverables.project_id))` |
| `clients` | SELECT for org members | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = clients.org_id)` |
| `organizations` | SELECT for org members | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = organizations.id)` |
| Supabase Storage `documents` bucket | SELECT for org members, INSERT for consultants/admins | Storage policies mirror documents table RLS |

### API Response Interfaces

```ts
// GET /dashboard/documents/folders response
type FoldersResponse = ProjectFolder[];

// POST /dashboard/documents response (filtered list)
type DocumentListResponse = Document[];

// PUT /dashboard/documents response (create)
interface DocumentCreateResponse {
  id: string;
}

// POST /dashboard/documents/versions response
type VersionListResponse = DocumentVersion[];

// POST /dashboard/documents/versions/restore response
interface VersionRestoreResponse {
  success: boolean;
  new_version: number;
}

// POST /dashboard/documents/share response
interface ShareLinkResponse {
  id: string;
  url: string;
  expires_at: string;
  password_protected: boolean;
}

// POST /dashboard/documents/generate response
interface DocumentGenerateResponse {
  document_id: string;
  url: string;
  name: string;
  category: DocumentCategory;
}

// POST /dashboard/documents/search response
type DocumentSearchResponse = Document[];
```

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No documents for selected project | Empty state in grid/list: "No documents yet. Upload files or complete the wizard to auto-generate proposals." |
| No projects exist | Folder tree shows only "All Documents" node; main area shows global empty state |
| File upload fails mid-way | `UploadProgress` shows error status per file with message; successful uploads in the same batch are kept; retry button per failed file |
| Unsupported file type for preview | Preview modal shows file icon + metadata + download button instead of inline viewer; message: "Preview not available for this file type" |
| Version restore when original file deleted from storage | Edge function returns 404; UI shows "Original file no longer available in storage" |
| Share link accessed after expiration | Supabase Storage signed URL returns 403; share page shows "This link has expired" |
| Share link with wrong password | Edge function returns 401; UI prompts "Incorrect password" |
| Search returns no results | Grid/list shows "No documents match your search" with suggestion to clear filters |
| Auto-generated doc already exists for session | Skip generation; return existing document record; UI shows the existing doc in the folder |
| Large file upload (>50MB) | Client-side validation prevents upload; shows "File too large. Maximum size: 50MB" |
| Concurrent uploads (5+ files) | Queue uploads, process 3 at a time; show all progress bars; complete notification when all done |

---

## Detailed ASCII Wireframes

### Desktop Layout (1200px content width)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)  │  FOLDER TREE (200px)  │  MAIN CONTENT (flex-1)         │
│                  │                       │                                 │
│ ┌──────────────┐ │ ┌───────────────────┐ │ ┌─────────────────────────────┐ │
│ │ AMO AI       │ │ │ All Documents     │ │ │ Documents                   │ │
│ │              │ │ │                   │ │ └─────────────────────────────┘ │
│ │ Dashboard    │ │ │ ▾ Acme Retail     │ │                                 │
│ │ Projects     │ │ │   ▸ AI Trans. (7) │ │ ┌──────────────────┐ ┌──┬──┐  │
│ │ CRM          │ │ │                   │ │ │ 🔍 Search docs...│ │▦ │☰ │  │
│ │ AI Insights  │ │ │ ▾ BrightPath     │ │ └──────────────────┘ └──┴──┘  │
│ │ ▸ Documents  │ │ │   ▸ Phase 1  (4) │ │  View toggle ──────────────┘   │
│ │ Financial    │ │ │                   │ │                                 │
│ │ Settings     │ │ │ ▾ TechFlow       │ │ ┌──────────────────────────────┐│
│ │              │ │ │   ▸ Consult.  (3) │ │ │ [Proposals] [Contracts]     ││
│ └──────────────┘ │ │                   │ │ │ [Deliverables] [Reports]    ││
│                  │ │ Active: #84CC16   │ │ │ [Analysis Exports]          ││
│                  │ │ left border on    │ │ │  ← active filters get       ││
│                  │ │ selected project  │ │ │     #84CC16 bg + white text ││
│                  │ │                   │ │ └──────────────────────────────┘│
│                  │ │ #FAFAF8 bg        │ │                                 │
│                  │ └───────────────────┘ │ ── GRID VIEW ─────────────────  │
│                  │                       │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│                  │                       │ │ 📄      │ │ 📄      │ │ 📄      │ │ 🖼️      ││
│                  │                       │ │         │ │         │ │         │ │         ││
│                  │                       │ │AI Trans-│ │Roadmap  │ │Contract │ │Support  ││
│                  │                       │ │form Pro-│ │Q1 2026  │ │v2.pdf   │ │Engine   ││
│                  │                       │ │posal.pdf│ │.pdf     │ │         │ │Config.  ││
│                  │                       │ │         │ │         │ │         │ │pdf      ││
│                  │                       │ │Proposals│ │Reports  │ │Contract │ │Deliver. ││
│                  │                       │ │ 2d ago  │ │ 1w ago  │ │ 2w ago  │ │ 3d ago  ││
│                  │                       │ │ 2.4 MB  │ │ 1.1 MB  │ │ 340 KB  │ │ 5.2 MB  ││
│                  │                       │ └─────────┘ └─────────┘ └─────────┘ └─────────┘│
│                  │                       │ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│                  │                       │ │ 📊      │ │ 📄      │ │ 📄      │           │
│                  │                       │ │         │ │         │ │         │           │
│                  │                       │ │Readiness│ │Weekly   │ │Phase 1  │           │
│                  │                       │ │Export   │ │Status   │ │Summary  │           │
│                  │                       │ │.xlsx    │ │.pdf     │ │.pdf     │           │
│                  │                       │ │         │ │         │ │         │           │
│                  │                       │ │Exports  │ │Reports  │ │Deliver. │           │
│                  │                       │ │ 1w ago  │ │ 5d ago  │ │ 1w ago  │           │
│                  │                       │ │ 89 KB   │ │ 420 KB  │ │ 1.8 MB  │           │
│                  │                       │ └─────────┘ └─────────┘ └─────────┘           │
│                  │                       │                                                │
│                  │                       │ ── LIST VIEW (alternate) ─────────────────────  │
│                  │                       │ ┌──────────────────────────────────────────────┐│
│                  │                       │ │ Name          │Cat    │Type│By    │Ver│Date │ ││
│                  │                       │ ├───────────────┼───────┼────┼──────┼───┼─────┤ ││
│                  │                       │ │ AI Transform  │Propos.│PDF │Maria │ 1 │ 2d  │ ││
│                  │                       │ │ Proposal      │  🔵   │    │      │   │     │ ││
│                  │                       │ │ Roadmap Q1    │Report │PDF │Auto  │ 1 │ 1w  │ ││
│                  │                       │ │               │  🟡   │    │      │   │     │ ││
│                  │                       │ │ Contract v2   │Contr. │PDF │James │ 2 │ 2w  │ ││
│                  │                       │ │               │  🟣   │    │      │   │     │ ││
│                  │                       │ └──────────────────────────────────────────────┘│
│                  │                       │                                                │
│                  │                       │ ┌──────────────────────────────────────────────┐│
│                  │                       │ │ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  ││
│                  │                       │ │   Drop files here to upload              │  ││
│                  │                       │ │ │ or click to browse                       ││
│                  │                       │ │   Supports PDF, DOCX, PNG, JPG, XLS    │  ││
│                  │                       │ │ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  ││
│                  │                       │ │  #D4CFC8 dashed border, 80px height         ││
│                  │                       │ │  Drag-over: #84CC16 border, #F1EEEA bg      ││
│                  │                       │ └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Document Preview Modal (overlay)

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────┐ │
│ │ AI Transformation Proposal.pdf          [×]      │ │
│ │──────────────────────────────────────────────────│ │
│ │ Category: Proposals  │  Version: 1               │ │
│ │ Uploaded by: Maria   │  Size: 2.4 MB             │ │
│ │ Date: Mar 5, 2026    │  Project: AI Transform    │ │
│ │──────────────────────────────────────────────────│ │
│ │                                                  │ │
│ │  ┌──────────────────────────────────────────┐    │ │
│ │  │                                          │    │ │
│ │  │    PDF rendered in <iframe>              │    │ │
│ │  │    or image rendered in <img>            │    │ │
│ │  │                                          │    │ │
│ │  │    500px height, full width              │    │ │
│ │  │                                          │    │ │
│ │  │                                          │    │ │
│ │  └──────────────────────────────────────────┘    │ │
│ │                                                  │ │
│ │  [Download]  [Share]  [Versions]  [Delete]       │ │
│ └──────────────────────────────────────────────────┘ │
│  Modal: #FFFFFF, 800px width, centered, backdrop     │
└──────────────────────────────────────────────────────┘
```

### Tablet Layout (768px)

```
┌───────────────────────────────────────────────────┐
│ ☰  Documents                                      │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ 🔍 Search documents...          [▦] [☰]      │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ Project: [Acme Retail ▾]                      │ │
│ │  ← folder tree becomes dropdown on tablet     │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ [Proposals] [Contracts] [Deliverables]        │ │
│ │ [Reports] [Exports]                           │ │
│ │  ← category filters wrap to 2 rows            │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ Grid: 3 columns                                   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ 📄       │ │ 📄       │ │ 📄       │           │
│ │ AI Trans.│ │ Roadmap  │ │ Contract │           │
│ │ Proposal │ │ Q1 2026  │ │ v2.pdf   │           │
│ │ Proposals│ │ Reports  │ │ Contract │           │
│ │ 2d │2.4MB│ │ 1w│1.1MB│ │ 2w│340KB │           │
│ └──────────┘ └──────────┘ └──────────┘           │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ 📄       │ │ 📊       │ │ 📄       │           │
│ │ Support  │ │ Readiness│ │ Weekly   │           │
│ │ Engine   │ │ Export   │ │ Status   │           │
│ │ Deliver. │ │ Exports  │ │ Reports  │           │
│ │ 3d│5.2MB │ │ 1w│89KB │ │ 5d│420KB │           │
│ └──────────┘ └──────────┘ └──────────┘           │
│                                                   │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│   Drop files here or click to browse           │  │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  │
└───────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌─────────────────────────────┐
│ ☰  Documents                │ 56px header
├─────────────────────────────┤
│ 🔍 Search...     [▦] [☰]   │
├─────────────────────────────┤
│ Project: [Acme Retail ▾]    │ dropdown
├─────────────────────────────┤
│ ◄ Proposals│Contracts│... ► │ scroll
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ 📄 AI Transform Proposal│ │
│ │ Proposals │ PDF │ 2.4 MB│ │
│ │ Maria │ 2 days ago      │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 📄 Roadmap Q1 2026     │ │
│ │ Reports │ PDF │ 1.1 MB  │ │
│ │ Auto-gen │ 1 week ago   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 📄 Contract v2          │ │
│ │ Contracts │ PDF │ 340 KB│ │
│ │ James │ 2 weeks ago     │ │
│ └─────────────────────────┘ │
│ ... single column cards     │
│                             │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│   Tap to upload files     │ │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│  (drag-drop not supported  │
│   on mobile, tap to browse)│
└─────────────────────────────┘
```

### Key Component Detail: DocumentCard (Grid View)

```
┌────────────────────────────┐
│ ┌────────────────────────┐ │
│ │         📄             │ │  ← file type icon, 64px
│ │                        │ │     PDF=red, DOCX=blue,
│ │    (thumbnail area)    │ │     PNG/JPG=preview thumb,
│ │                        │ │     XLS=green
│ └────────────────────────┘ │
│                            │
│ AI Transformation          │  ← name, Lora 14px, 2 lines max
│ Proposal.pdf               │     truncate with ellipsis
│                            │
│ ┌──────────┐               │
│ │ Proposals│               │  ← category badge (blue bg)
│ └──────────┘               │
│                            │
│ 2 days ago  │  2.4 MB      │  ← metadata, Lora 12px, #6B7280
└────────────────────────────┘
  Card: 260px width, #FFFFFF bg, #D4CFC8 border, 8px radius
  Hover: #84CC16 left border accent (2px), cursor pointer
  Category badge colors:
    Proposals = #3B82F6 (blue)
    Contracts = #8B5CF6 (purple)
    Deliverables = #84CC16 (lime)
    Reports = #F59E0B (amber)
    Exports = #14B8A6 (teal)
```

### Key Component Detail: Version History Panel

```
┌─ VERSION HISTORY ──────────────────────┐
│                                        │  ← slides in from right
│ Contract v2.pdf                   [×]  │     320px wide
│────────────────────────────────────────│
│                                        │
│ ● Version 2 (current)                 │
│   Mar 1, 2026 │ James │ 340 KB        │
│   [Download]                           │
│   │                                    │
│ ● Version 1                            │
│   Feb 15, 2026 │ Maria │ 310 KB       │
│   [Download] [Restore]                 │
│                                        │
│ Timeline: vertical line connecting     │
│ version dots, #D4CFC8 line,           │
│ #84CC16 current version dot,          │
│ #D4CFC8 past version dots             │
└────────────────────────────────────────┘
```

### Key Component Detail: Upload Progress

```
┌──────────────────────────────────────────────────┐
│ Uploading 3 files...                             │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📄 proposal-final.pdf                    ✓   │ │
│ │ ████████████████████████████████████████ 100% │ │
│ └──────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📄 config-guide.pdf                 62%      │ │
│ │ ████████████████████████░░░░░░░░░░░░  ~8s   │ │
│ └──────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📄 wireframes.png                   Queued   │ │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%    │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ Progress bar fill: #84CC16                       │
│ Progress bar track: #D4CFC8                      │
│ Completed: green checkmark                       │
│ Error: red ✗ with retry button                   │
└──────────────────────────────────────────────────┘
```

---

## Outcomes

| Outcome                                | Metric                                            | Target          |
| -------------------------------------- | ------------------------------------------------- | --------------- |
| Document findability                   | Time to locate a specific project document         | < 10 seconds    |
| Auto-generation coverage               | Percentage of projects with auto-generated proposal | > 90%           |
| Upload adoption                        | Percentage of deliverables uploaded to platform     | > 80%           |
| Client document access                 | Client logins to view documents per week            | 2+ per client   |
| Share link usage                       | Share links generated per month                     | Increasing trend |
| Version tracking                       | Documents with 2+ versions tracked                  | > 50%           |
