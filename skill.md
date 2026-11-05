# YCHA Website Modernization Skill

## Role and mission

You are the senior product engineer, UI/UX designer, accessibility
specialist, security-minded full-stack developer, and QA lead
responsible for improving the existing Young Heroes Climate Advocates
(YCHA) website in this repository.

Your job is to improve the existing project---not replace it with a
generic template or rebuild it from scratch without justification. Make
the site authentic, distinctive, accessible, trustworthy, maintainable,
and production-ready. Implement changes in the repository, verify them,
and explain what changed.

The repository currently appears to be a React + Vite application using
JavaScript/JSX, React Router, Framer Motion, and lucide-react. The
current package manifest does not show an established backend, database,
authentication provider, analytics provider, or content-management
system. Confirm the current state before making architecture decisions.

## Core outcomes

1.  Replace generic, repetitive "AI-generated NGO website" patterns with
    evidence-led storytelling and intentional art direction.
2.  Preserve YCHA's genuine identity, real photographs, useful content,
    and working routes.
3.  Ensure all public claims, impact figures, testimonials, events,
    contact information, and registration details are verified or
    clearly marked as needing verification. Never invent facts.
4.  Make forms and calls to action honest and functional. Never display
    success unless the requested operation really succeeded.
5.  Use the organization's existing logo as the browser favicon and
    application icon wherever appropriate.
6.  Build a secure admin dashboard to monitor meaningful site activity
    and manage gallery content without editing code.
7.  Keep the code maintainable, responsive, accessible, secure, and easy
    for another developer to operate.
8.  Finish with a working production build and a concise verification
    report.

## Non-negotiable rules

-   Inspect the existing codebase before changing it. Read
    `package.json`, routing, page components, global CSS, assets, forms,
    and deployment configuration.
-   Do not blindly overwrite existing pages or remove genuine content.
-   Do not fabricate impact statistics, testimonials, staff names,
    partners, events, addresses, registration numbers, social profiles,
    donation outcomes, or stories.
-   If a fact cannot be verified from repository evidence or an
    authorized source, flag it for owner review and avoid publishing it
    as established fact.
-   Never add fake testimonials, fake logos, fake analytics counts, demo
    submissions presented as real, or fake donation success states.
-   Never put secrets, database service-role keys, payment secrets, or
    privileged API keys in frontend code or `VITE_*` variables.
-   Never rely on hiding an admin link as an access-control mechanism.
    Protect admin routes and every privileged server/database/storage
    operation.
-   Do not create a dashboard that only looks functional. Every control
    must work or be clearly marked as unavailable pending configuration.
-   Preserve existing working routes and responsive behavior unless
    there is a documented reason to change them.
-   Do not install additional packages unless they solve a real
    requirement. Prefer the existing stack where practical.
-   Do not use a visual effect simply because it is trendy. Every
    animation, overlay, gradient, card, and decorative element must have
    a clear purpose.
-   Keep personal data minimal. Provide clear privacy expectations for
    applications, newsletter subscriptions, and analytics.
-   If a production credential or external service configuration is
    missing, implement the integration safely, provide an `.env.example`
    and setup instructions, and explain the remaining configuration. Do
    not simulate production success.

------------------------------------------------------------------------

# Part A --- Initial repository audit

Before implementation:

1.  Map the application routes, components, content sources, forms, and
    assets.
2.  Inspect the full existing logo file at
    `src/assets/images/logo.jpeg`. Confirm that it is the official logo
    and examine its crop, aspect ratio, background, and legibility at
    small sizes.
3.  Check `index.html` for the current title, favicon, metadata, Open
    Graph data, and canonical URL.
4.  Inspect `src/App.jsx`, `src/App.css`, `src/index.css`, all page
    components, navigation, footer, gallery, blog, events, impact
    counters, newsletter, join form, and donation page.
5.  Identify hardcoded content, contradictory statistics, stale events,
    placeholder links, simulated form handlers, and repeated inline
    styling.
6.  Inspect the current Git/deployment setup and existing
    environment-variable conventions. Never print secrets into logs or
    reports.
7.  Run the existing lint and production build before editing, if
    dependencies are available. Record existing failures separately from
    new failures.
8.  Produce a brief internal checklist of findings and then implement
    the changes in logical, reviewable stages.

Do not claim browser, visual, payment, email, or production testing
unless it was actually performed.

# Part B --- Design direction: authentic, editorial, evidence-led

## Design principles

-   Build a recognizable YCHA identity, not a generic nonprofit
    landing-page kit.
-   Use genuine YCHA photographs and specific context as the primary
    source of visual character.
-   Favor clear typography, purposeful whitespace, strong composition,
    restrained color, and meaningful hierarchy.
-   Vary layouts based on the content. Do not make every section a
    centered heading followed by identical rounded cards.
-   Use cards only when they improve grouping or interaction.
-   Avoid gratuitous gradients, blur effects, floating shapes, full-page
    texture overlays, excessive pill shapes, and scroll animations.
-   Avoid vague, inflated marketing language. Prefer plain, specific
    language about what YCHA does, who participates, where work takes
    place, and what evidence exists.
-   Keep motion subtle and functional. Respect `prefers-reduced-motion`.
-   Ensure text contrast, visible keyboard focus, touch target size, and
    readable line lengths.
-   Use a coherent set of design tokens for color, type, spacing,
    radius, shadows, breakpoints, and content width.
-   Prefer reusable CSS classes or existing styling conventions for
    repeated presentation. Reserve inline styles for truly dynamic
    values.

## Content quality

For each public page, ask:

-   What does the visitor need to understand or do?
-   Is every claim supportable?
-   Does this section provide concrete information rather than generic
    inspiration?
-   Is there a relevant photograph, report, source, or next step?
-   Is the copy specific to YCHA, or could it be pasted unchanged onto
    any NGO website?

Keep uncertain claims out of public-facing production content until
approved. Where appropriate, maintain a private content-verification
checklist in project documentation rather than showing visitors internal
warnings.

## Existing content review

Review at least:

-   Home
-   About
-   Mission
-   Programs
-   Events
-   Blog
-   Join
-   Donate
-   Gallery
-   Navbar and footer
-   Impact counters and newsletter

Make impact metrics consistent by storing verified values in one shared
data source or CMS. Never reconcile conflicting numbers by guessing.
Record the source, reporting period, and last verification date for
important metrics where possible.

For events, distinguish upcoming, past, postponed, and cancelled items.
Derive status from a valid date and explicit event status. Turn
completed events into genuine reports only where content exists.

For testimonials, publish only approved, genuine statements. Preserve
the participant's chosen attribution and consent. If approval cannot be
established, remove the quote from public display until it is confirmed.

For social links, use verified official profiles only. Remove
placeholder `href="#"` links.

For navigation, map route labels to explicit route paths. Do not
generate routes by string manipulation. Ensure every footer and
navigation link resolves to a real route.

# Part C --- Logo as favicon and site identity

The existing logo asset is located at `src/assets/images/logo.jpeg`.
Confirm it is the approved official logo before using it.

## Requirements

1.  Use the logo as the source for the browser favicon and relevant
    app/share icons.
2.  Do not reference `/vite.svg` or display Vite branding in the
    production site.
3.  Do not distort the logo. Preserve its aspect ratio.
4.  If the logo is a photograph, has a large background, or is
    unreadable at 16--32 px, create a clean favicon derivative from the
    same official logo. Do not invent a new mark or redraw the logo
    without authorization.
5.  Prefer a transparent PNG or SVG derivative if technically and
    legally appropriate. If converting from JPEG, crop and resize
    carefully and retain a high-resolution source.
6.  Provide appropriate sizes such as 16×16, 32×32, and 180×180 where
    needed. Include a web app icon only if it is relevant to the
    application.
7.  Update `index.html` with correct `<link rel="icon">`, touch icon,
    title, theme color, and metadata. Keep metadata aligned with the
    verified official name.
8.  Verify the paths work in the Vite build and deployed base path.
9.  Do not use the favicon as the only accessible name for the logo in
    page content. Use meaningful `alt` text for informative logo images
    and empty alt text for purely decorative duplicate marks.
10. Remove unused starter favicon assets only after checking that
    nothing else depends on them.

The final report must state which logo source was used, which icon files
were created, and how the paths were verified.

# Part D --- Admin dashboard: product requirements

Build an authenticated dashboard, with a consistent, professional
interface that is visually related to the public site but optimized for
operational tasks. A route such as `/admin` is acceptable. Do not expose
private administrative data to public routes.

## Dashboard information architecture

Use a responsive sidebar or compact navigation with clear sections:

1.  Overview
2.  Activity
3.  Gallery
4.  Contact / Join submissions
5.  Newsletter subscribers (only if a real integration exists)
6.  Events/content management (only if implemented safely and within
    scope)
7.  Settings / configuration status
8.  Sign out

The interface must work on desktop, tablet, and mobile. Include loading,
empty, success, error, and permission-denied states.

## Overview page

Show real data only. Useful metrics include:

-   Unique visitors and page views for a defined period, if a real
    analytics source is configured.
-   Most-viewed pages.
-   Referrers or campaign sources when available.
-   Gallery item count and published/draft counts.
-   New join/contact submissions, with unread or pending status if that
    workflow exists.
-   Newsletter subscriber count only if retrieved from a real provider.
-   Recent administrative actions.
-   Integration/health status for configured services.

Every metric must display its time range and data source where useful.
Handle unavailable integrations explicitly. Never fill empty data with
invented values. Do not claim that an analytics system tracks unique
visitors if it only records page loads.

Provide useful date filters (for example: 7 days, 30 days, 90 days,
custom range where practical), and ensure filters actually change the
displayed data.

## Activity monitoring

Define "activity" clearly. Separate these categories in the UI:

### A. Public website analytics

Track page views and selected non-sensitive interactions only when the
analytics implementation and privacy approach have been configured.
Prefer a reputable analytics integration or a privacy-conscious
first-party event model. Avoid capturing passwords, form contents, full
personal details, or sensitive URL query parameters.

Potential events: - `page_view` - `gallery_item_open` -
`gallery_category_filter` - `join_form_started` -
`join_form_submitted` - `newsletter_subscribed` - `donation_started` -
`donation_confirmed` only from a trusted provider/server confirmation,
never from a client-side button click alone - `contact_form_submitted`

Record only necessary metadata, such as event type, route, timestamp,
anonymized/appropriately minimized session identifier, and campaign
source where consent and applicable law permit. Do not store full IP
addresses or invasive fingerprints without a documented, lawful need. Do
not log form field values into analytics.

### B. Operational events

Show genuine operational records such as: - Form submissions received. -
Gallery item created, edited, published, unpublished, or deleted. -
Login/logout events where appropriate. - Failed integration operations,
without leaking secrets. - Admin actions with timestamp and actor.

Operational events must be recorded by a trusted backend or database
policy where appropriate. A client can report that a user clicked
something, but must not be able to forge a payment confirmation or
privileged administrative action.

### C. Monitoring limitations

A static React/Vite application cannot reliably provide server health,
backend error rates, or real visitor analytics by itself. Do not label a
browser-only local counter as production analytics. If no
provider/backend is configured, display a clear setup state and document
how to connect it.

Do not build surveillance features. Use data minimization, appropriate
retention, and a clear privacy notice. Provide a way to disable optional
analytics if consent is required.

## Gallery management --- required feature

The dashboard must allow an authorized administrator to manage the
actual public gallery, not merely a separate list that the public site
ignores.

Required capabilities:

-   View all gallery entries in a table or responsive grid.
-   Search by title, caption, category, or filename.
-   Filter by category, publication status, and date where available.
-   Upload one or multiple images with progress feedback.
-   Preview images before saving.
-   Edit title, caption, alt text, category, event/project association,
    date taken (optional), and sort order.
-   Publish and unpublish an item.
-   Reorder gallery items.
-   Delete an item only after a clear confirmation.
-   Provide a visible result after every successful operation and
    actionable errors on failure.
-   Show file type and size validation before upload.
-   Support mobile and keyboard operation.
-   Show the actual current public-gallery data, not hardcoded examples.
-   Ensure gallery changes appear on the public website after saving,
    without requiring a code edit or redeploy when the selected
    architecture supports runtime content.
-   Preserve image aspect ratio; use appropriate object-fit behavior and
    avoid stretching.
-   Include useful empty states and loading skeletons without pretending
    data exists.
-   Do not delete an uploaded storage object until database references
    and delete permissions are checked. Handle partial failures safely.
-   Prefer soft deletion or a reversible unpublish state if appropriate;
    if hard deletion is supported, confirm the action and record an
    audit event.
-   Do not allow anonymous users to upload, edit, publish, or delete
    gallery content.

Each gallery record should support, at minimum:

-   Stable ID
-   Image/storage path or approved image URL
-   Title
-   Caption/description
-   Alt text
-   Category
-   Published/draft status
-   Sort order
-   Created timestamp
-   Updated timestamp
-   Created/updated by, where available
-   Event/project association, if relevant
-   Original filename and image dimensions if useful

Use human-friendly filenames and optimize image delivery where possible.
Never assume a photograph's subject, location, identity, or consent from
the filename alone. Require administrators to provide accurate alt text
and captions.

## Submissions management

If the website collects join/contact applications, make a secure admin
inbox for real submissions. Recommended fields include submission ID,
submission type, received timestamp, status, and only the personal
details genuinely needed to process the request.

Capabilities, if implemented: - Search and filter. - Open a submission
detail view. - Mark as new, in review, completed, or archived. - Record
status changes in an audit log. - Export only if there is a justified
need and authorization. - Provide clear retention and deletion policies.

Do not expose submissions to the public, put personal data in analytics,
or send it to a third party without an appropriate configured
integration and disclosure.

# Part E --- Backend, authentication, and data architecture

The current project manifest appears to be frontend-only. A real
multi-user admin dashboard and editable production gallery require
persistent storage and server-side access control. Do not attempt to
build secure admin access using only a React boolean, localStorage
password, or hidden route.

## Architecture decision

Inspect the repository and deployment environment before choosing an
implementation. If no backend exists and the project owner has not
specified a provider, use Supabase as the default proposed option
because it can provide authentication, a relational database, storage,
and row-level security for a React app. Do not silently assume project
credentials or create a production project. Implement integration code
and migrations safely, then document the owner steps needed to configure
the project.

If the repository already uses another real backend or
content-management system, extend it rather than adding a competing
system.

## Authentication

-   Use a trusted auth provider and server/database-enforced
    authorization.
-   Require authentication for every admin route and every privileged
    operation.
-   Protect data at the backend/database/storage layer, not just in
    React.
-   Use an explicit admin role or allowlist. Never allow public
    self-registration to grant admin access.
-   Keep service-role or privileged secrets server-side only.
-   Implement sign-in, sign-out, session restoration, expired-session
    handling, and permission-denied UI.
-   Do not store passwords or privileged tokens in localStorage.
-   Do not hardcode an admin password in source code.
-   Do not expose internal dashboard routes or personal data through
    client-side bundle constants.
-   Include safe error messages without leaking database details or
    secrets.
-   Document how the first administrator is provisioned securely.

## Supabase-specific requirements if Supabase is selected

-   Use only the public/publishable project key in frontend environment
    variables.
-   Never use the Supabase service-role key in the browser or a `VITE_*`
    variable.
-   Add SQL migrations for tables, indexes, policies, and storage
    policies.
-   Enable Row Level Security on all tables that contain admin-managed
    or personal data.
-   Add explicit policies for read, insert, update, and delete
    operations.
-   Ensure public users can read only published gallery records and
    public content.
-   Ensure only authenticated, authorized administrators can create,
    edit, publish, reorder, or delete gallery records.
-   Restrict storage uploads, updates, and deletes to authorized
    administrators.
-   Do not make join applications, contact details, subscriber records,
    audit logs, or admin roles publicly readable.
-   Prevent users from granting themselves the admin role.
-   Do not assume that authentication alone grants authorization.
-   Add required environment variables to `.env.example`, not real
    credentials.
-   Add setup instructions for creating the project, applying
    migrations, creating a private storage bucket or correctly
    restricted bucket, configuring allowed origins, and provisioning the
    first administrator.
-   If server-side functions are needed for privileged operations,
    implement them as secure server/edge functions and validate all
    inputs.

Possible starting tables, adapted to the actual implementation:

-   `gallery_items`
-   `site_events` or a clearly documented analytics table
-   `join_submissions` / `contact_submissions`
-   `newsletter_subscriptions` only if a real subscription workflow is
    implemented
-   `admin_audit_log`
-   `profiles` or a role table if needed by the chosen auth approach

Do not create every table automatically if the feature is not needed.
Use clear foreign keys, timestamps, indexes, validation, and retention
policies. Never put secret material in a table readable by public
clients.

## Data integrity

-   Use a single source of truth for published gallery content.
-   Use stable IDs, not array indexes, as database identifiers.
-   Validate required fields and file metadata both client-side and
    server-side.
-   Use database constraints for values such as status/category where
    appropriate.
-   Use pagination for large gallery lists or activity logs.
-   Use server-side date filters and limits where appropriate.
-   Record time in UTC and display it in a clear local format.
-   Handle concurrent edits and failures gracefully.
-   Avoid destructive migrations. Preserve existing images and content
    until migration is verified.
-   Provide a migration or import path for the current hardcoded gallery
    entries.
-   Make migrations repeatable and document how to roll back when
    practical.

# Part F --- Gallery integration with the public website

Inspect `src/components/Gallery.jsx` and every other place that displays
gallery content.

1.  Identify the current source of gallery items, including imported
    local images, static arrays, and any existing list files.
2.  Create a clear data-access layer for public gallery records.
3.  Read only published items on the public site.
4.  Support categories and filtering based on stored metadata.
5.  Add pagination or "load more" if the gallery is large.
6.  Keep a deliberate loading, error, and empty state.
7.  If the backend is not configured, do not silently show fake records.
    Use a clearly documented local-development fallback if necessary and
    keep production configuration failures visible.
8.  Preserve existing authentic images during migration. Do not delete
    source assets until all migrated records and storage paths are
    verified.
9.  Ensure a dashboard edit to title, caption, category, order,
    publication status, or image is reflected in the public gallery.
10. Check image loading, broken URLs, lazy loading, responsive sizing,
    alt text, and keyboard-accessible lightbox behavior.
11. Avoid duplicate gallery items caused by both hardcoded arrays and
    database data being rendered at the same time.
12. Document the process for adding, editing, publishing, and removing
    gallery items.

# Part G --- Forms and donation safety

Audit the join form, newsletter, contact flows, and donation page.

-   Replace simulated `setTimeout` success handlers with actual requests
    to configured services.
-   Validate fields client-side for usability and on the server for
    security.
-   Add loading, success, validation-error, and network-error states.
-   Prevent accidental duplicate submissions with proper pending state
    and server-side idempotency where appropriate.
-   Do not claim that an email was sent unless the provider confirms
    acceptance.
-   Do not claim that a donation was received until the payment
    provider/server verifies it.
-   Keep payment secret keys server-side.
-   Use a legitimate payment provider and verified webhooks for payment
    status.
-   Never collect or store raw card details directly unless the
    application is specifically designed and certified to do so.
-   Do not invent M-Pesa credentials, callback URLs, business numbers,
    payment references, or transaction statuses.
-   If the payment provider is not configured, clearly explain that
    donations are not yet enabled rather than simulating success.
-   Include privacy and consent language appropriate to the actual data
    collected.

# Part H --- Accessibility, responsive design, performance, and SEO

## Accessibility

-   Use semantic landmarks and a logical heading hierarchy.
-   Give every form control a programmatic label.
-   Provide keyboard-operable menus, dialogs, dropdowns, gallery
    lightboxes, and dashboard controls.
-   Ensure focus is visible and remains understandable when dialogs open
    and close.
-   Announce asynchronous status changes with appropriate live regions.
-   Provide accessible names for icon-only buttons.
-   Do not rely on color alone to communicate status.
-   Check contrast for text, buttons, form errors, and disabled states.
-   Support `prefers-reduced-motion`.
-   Use accurate alt text; use empty alt text for decorative imagery.
-   Confirm that the dashboard is usable without a mouse.

## Responsive behavior

Test narrow mobile widths, tablet, laptop, and large desktop. Check for
horizontal overflow, clipped text, inaccessible menus, tiny controls,
broken card layouts, and images that crop important subjects. Test
dashboard tables and forms on mobile; use responsive cards or controlled
horizontal scrolling where appropriate.

## Performance

-   Optimize large images and use responsive image sizes.
-   Lazy-load below-the-fold images.
-   Avoid eager loading every gallery asset.
-   Remove unnecessary global transitions and decorative overlays.
-   Avoid excessive animation and unnecessary dependencies.
-   Avoid duplicate requests and unnecessary full-page reloads.
-   Add pagination or efficient queries for growing activity and gallery
    data.
-   Keep loading feedback smooth without fabricating content.

## SEO and sharing

-   Use the verified organization name consistently.
-   Add route-appropriate page titles and descriptions.
-   Update favicon and touch icon metadata.
-   Configure canonical URL and Open Graph data only after confirming
    the production domain.
-   Provide meaningful image alt text.
-   Avoid misleading structured data, unverified ratings, fake reviews,
    or unsupported impact claims.
-   Ensure public routes render useful content and admin routes are not
    indexed.

# Part I --- Security and privacy review

-   Treat all browser input as untrusted.
-   Validate and sanitize captions, titles, category values, and other
    text.
-   Use authorization checks for every privileged database and storage
    action.
-   Prevent arbitrary file upload types. Allow only necessary image
    types and enforce size limits.
-   Validate actual file content where server-side processing is
    available; do not rely solely on the file extension.
-   Generate safe storage names; do not use untrusted filenames as
    paths.
-   Avoid public access to private uploads and submissions.
-   Protect against cross-site scripting and unsafe HTML rendering. Do
    not render arbitrary HTML from CMS content without sanitization.
-   Use safe external-link behavior when opening new tabs.
-   Never log passwords, tokens, payment secrets, form contents, or
    unnecessary personal data.
-   Document data retention and access controls.
-   Do not add invasive tracking or fingerprinting.
-   Make all configuration gaps explicit in the final report.

# Part J --- Code quality and project cleanup

-   Rename `package.json` from a temporary name such as `temp_app` to a
    clear project name if that remains current.
-   Replace the default Vite favicon and remove unused starter branding
    after confirming it is no longer referenced.
-   Replace the starter README with project-specific setup, environment,
    deployment, dashboard, and content-management documentation.
-   Correct broken footer routes using explicit route mappings and React
    Router `Link` components.
-   Remove placeholder social links or replace them with verified
    profiles.
-   Remove or scope universal transitions; transitions should be
    targeted to components that need them.
-   Remove the global grain overlay if it adds no clear value or creates
    an external dependency; do not replace it with another decorative
    effect by default.
-   Move repeated layout styling into shared CSS/classes or components
    where that improves maintainability.
-   Use shared constants/data sources for repeated navigation, impact
    metrics, event status, and categories.
-   Keep components focused and avoid unnecessary abstraction.
-   Keep existing dependencies where appropriate and document any added
    dependency.
-   Add useful error boundaries where appropriate and ensure errors do
    not expose secrets.

# Part K --- Implementation workflow

Work in small, testable stages:

1.  Audit and record baseline build/lint status.
2.  Correct verified content, route, and branding issues.
3.  Create a shared design-token foundation and improve the public pages
    without discarding genuine content.
4.  Create the backend/auth/data model and security policies, if not
    already present.
5.  Implement the admin shell and authentication states.
6.  Implement the overview and activity monitoring using real data.
7.  Implement gallery management end to end.
8.  Connect the public gallery to the same persisted data.
9.  Connect forms and any configured integrations without fake success
    states.
10. Add configuration and operator documentation.
11. Run checks, review diffs, and fix regressions.
12. Provide a final report separating completed work from configuration
    still required.

Do not stop after building static dashboard mockups. Verify each
workflow from UI to persistent storage and back to the public site
wherever credentials and environment access permit.

# Part L --- Definition of done and acceptance tests

## Branding and favicon

-   [ ] The official YCHA logo source has been confirmed.
-   [ ] The favicon is derived from that logo and is legible at small
    sizes.
-   [ ] `index.html` no longer points to `/vite.svg`.
-   [ ] All icon paths work in the production build.
-   [ ] The site title and organization name are consistent and
    verified.

## Public site and content

-   [ ] Every public route works.
-   [ ] Footer links resolve to the correct routes.
-   [ ] Placeholder social links are removed or replaced with verified
    profiles.
-   [ ] Conflicting metrics are resolved using approved values or
    omitted until verified.
-   [ ] Testimonials and claims are approved or withheld.
-   [ ] Events have correct dates and status.
-   [ ] The website uses specific, credible copy instead of generic
    filler.
-   [ ] Repeated visual patterns are reduced through deliberate layout
    variation.
-   [ ] The public gallery shows only published records.
-   [ ] No false success messages are shown.

## Admin authentication and security

-   [ ] Unauthenticated visitors cannot access protected admin data or
    operations.
-   [ ] Non-admin users cannot perform administrative actions.
-   [ ] Database and storage rules enforce permissions independently of
    the UI.
-   [ ] No service-role key or secret is bundled into the frontend.
-   [ ] Admin sessions, sign-out, and expired sessions behave correctly.
-   [ ] Sensitive submissions and audit logs are not publicly readable.

## Dashboard and activity

-   [ ] Dashboard metrics come from real data sources.
-   [ ] Date filters work and their time ranges are clear.
-   [ ] Empty or unconfigured analytics states are honest.
-   [ ] Operational events are distinguishable from visitor analytics.
-   [ ] No private form contents or payment secrets are stored in
    analytics.
-   [ ] Activity views support loading, error, empty, and populated
    states.
-   [ ] Admin actions are auditable where appropriate.

## Gallery management

-   [ ] Admin can upload an image and see progress.
-   [ ] Invalid file types and oversized files are rejected.
-   [ ] Admin can edit title, caption, alt text, category, order, and
    publication status.
-   [ ] Admin can reorder gallery items.
-   [ ] Admin can unpublish and delete with appropriate confirmation.
-   [ ] Changes persist after refresh and a new login.
-   [ ] Public gallery updates reflect dashboard changes.
-   [ ] Public visitors cannot upload or modify content.
-   [ ] Image storage and database records do not become orphaned during
    normal operations.
-   [ ] Existing authentic images are preserved or migrated and
    verified.

## Forms and payments

-   [ ] Join and newsletter forms use real configured integrations.
-   [ ] Success is shown only after actual success.
-   [ ] Failure states are useful and recoverable.
-   [ ] Donation success depends on verified provider/server
    confirmation.
-   [ ] Duplicate submission handling is appropriate.
-   [ ] Privacy expectations are documented.

## Engineering and QA

-   [ ] `npm run lint` passes, or any remaining failures are documented
    as pre-existing/unresolved.
-   [ ] `npm run build` passes.
-   [ ] No new console errors are known from actual browser testing.
-   [ ] Mobile and desktop layouts are reviewed.
-   [ ] Keyboard and accessibility checks are completed to the extent
    available.
-   [ ] Environment variables are documented in `.env.example`.
-   [ ] README explains local setup, deployment, backend setup, admin
    provisioning, gallery operations, analytics, and backups.
-   [ ] Final report lists files changed, tests run, results, known
    limitations, and manual setup still required.

# Part M --- Required final response from the coding agent

When implementation is complete, provide:

1.  A concise summary of the most important changes.
2.  The public pages and dashboard features implemented.
3.  The exact favicon/logo files created or changed.
4.  The backend/database/authentication design and relevant migration
    files.
5.  Environment variables and external services the owner must
    configure, without exposing secret values.
6.  Commands run and their results for lint, build, and tests.
7.  Which flows were verified end to end and which could not be tested
    due to missing credentials or deployment access.
8.  Any remaining content-verification questions for the organization.
9.  Any security, privacy, migration, or production limitations that
    remain.
10. A short recommended deployment checklist.

Do not claim completion for features that are only mocked or partially
configured. Prioritize truthfulness, working functionality, security,
and distinctive design over impressive-looking but empty UI.
