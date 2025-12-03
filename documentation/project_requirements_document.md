# Project Requirements Document (PRD)

## 1. Project Overview

Thejoflowers-KOS2 is a single-page web application that offers advanced data management, visualization, and form-driven workflows. Built on the ExtJS 3.4 framework, it provides business users with rich, interactive interfaces—grids, pivot tables, forms, and drag-and-drop panels—to explore, filter, and analyze large datasets without page reloads. Multiple CSS themes and internationalization support ensure the UI can adapt to different branding and language needs.

This project is being built to replace or enhance traditional, static reporting tools with a more dynamic, user-driven dashboard experience. Key objectives include delivering sub-second grid interactions on typical datasets, supporting pivot-style data summarization with configurable aggregators (sum, average, count, etc.), and offering enterprise-grade form validation. Success will be measured by user adoption (number of active sessions per week), average response times (grid render under 200 ms), and positive feedback on ease of use and customization.

---

## 2. In-Scope vs. Out-of-Scope

**In-Scope (Version 1):**
- Interactive data grids (`Ext.grid.GridPanel`, `EditorGridPanel`, `PropertyGrid`).
- Pivot table functionality via `Ext.grid.PivotGrid` with basic aggregators.
- Form management (`TextField`, `NumberField`, `DateField`, `ComboBox`, `TimeField`) with validation rules (using `Ext.form.VTypes`).
- Theming and CSS support (access, blue, gray, custom themes).
- Internationalization with `.po`/`.pot` files for UI text.
- Client-side utilities for object manipulation, date calculations, and AJAX (`Ext.Ajax`).
- Drag-and-drop on trees and grid elements (`Ext.dd`).
- Browser history integration to preserve back/forward navigation within the app.
- Build process using Apache Ant (`build.xml`) for minification and packaging.

**Out-of-Scope (Future Phases):**
- User authentication and role-based access control.
- Export to PDF, Excel, or other offline formats.
- Server-side API development (assumes existing PHP/Composer backend).
- Mobile-first or responsive design optimizations.
- Real-time collaboration or presence indicators.
- Dashboard sharing or report scheduling.

---

## 3. User Flow

When a new user lands on the application URL, they see the main dashboard container. A top toolbar lets them select data sources and themes; a left sidebar lists available modules (e.g., Data Grid, Pivot Analysis, Forms). Clicking **Data Grid** loads a grid panel where rows are fetched via `Ext.data.Store` from a JSON endpoint. Users can sort columns, apply filters via header menus, and toggle grouping views.

Switching to the **Pivot Analysis** module displays the pivot grid interface: users drag fields into row or column axes, choose an aggregator (sum, avg, count), and click **Refresh** to rerender the summary. The **Forms** section presents a multi-tab form, with date pickers, combo boxes, and numeric inputs—validated in real time by `Ext.form.VTypes`. Any change updates the URL fragment so that browser back/forward buttons restore the previous state.

---

## 4. Core Features

- **Data Grids**: Standard, editable, and property grid variants with sorting, filtering, grouping, and custom renderers.
- **Pivot Tables**: Drag-and-drop axes, configurable aggregators (sum, average, min, max, count).
- **Form Builder**: Multiple field types, inline validation, submit/load actions, error handling.
- **Theming**: Four built-in CSS themes; easy addition of new theme files.
- **Internationalization (i18n)**: `.po`/`.pot` resource files; language switching at runtime.
- **Drag-and-Drop**: Tree nodes, grid rows/headers; drop targets with custom handlers.
- **Browser History**: Integration with `Ext.History` to store UI state in the URL.
- **Client-side Utilities**: Singleton managers (`Ext.Ajax`, `Ext.util.JSON`), object helpers, date math, platform detection.
- **Build System**: Apache Ant script for concatenation, minification, and packaging of front-end assets.

---

## 5. Tech Stack & Tools

- **Frontend Framework**: ExtJS 3.4 for UI components and event management.
- **Libraries**: jQuery (minified) for supplemental DOM/Ajax work.
- **Styling**: CSS (multiple theme files), optional SASS/LESS in future.
- **Build Tool**: Apache Ant (`build.xml`) for JS/CSS bundling and minification.
- **Backend Assumption**: PHP (Composer) serving JSON APIs and static assets.
- **Internationalization**: GNU gettext `.po`/`.pot` files and loaders.
- **IDE/Plugins**: Any JavaScript–friendly IDE (VSCode, WebStorm); no special plugins required.

---

## 6. Non-Functional Requirements

- **Performance**: Initial dashboard load < 2 s; grid rendering < 200 ms on 1,000 records.
- **Scalability**: Support up to 10,000 concurrent users (read-only heavy grid usage).
- **Security**: Prevent XSS by sanitizing HTML renderers; scope prototype extensions to avoid pollution.
- **Usability**: Keyboard navigation for all interactive components; ARIA attributes for accessibility.
- **Browser Support**: Chrome, Firefox, Edge, IE 11+ with polyfills.
- **Internationalization**: Must switch languages without reload; date/number formats adapt per locale.

---

## 7. Constraints & Assumptions

- **Framework Lock**: Sticks to ExtJS 3.4—no framework upgrades in Version 1.
- **Back-end API**: Assumes existing JSON endpoints; error responses follow `{ success: false, message: "..." }`.
- **Prototype Extensions**: Native prototypes are extended by ExtJS—avoid other global polyfills.
- **Build Environment**: Java 8+ for Ant; Node/npm not required initially.
- **Data Volume**: Typical datasets ≤ 5,000 rows; very large datasets require paging or server-side limits.

---

## 8. Known Issues & Potential Pitfalls

- **Obsolete Framework**: ExtJS 3.4 is end-of-life; security patches are unavailable. Mitigation: plan for future migration.
- **Prototype Pollution**: ExtJS extends native objects—watch for conflicts if adding new libraries.
- **CSS Duplication**: Multiple theme files share overlapping rules. Mitigation: consider a CSS preprocessor later.
- **Large Data Performance**: PivotGrid may slow on > 5,000 rows. Mitigation: enforce paging or server-side aggregation.
- **Browser Quirks**: IE-specific repaint issues—test extensively in IE11.
- **API Rate Limits**: If backend enforces throttling, implement client-side request queuing or exponential backoff.


---

This PRD lays out the full scope and requirements for Thejoflowers-KOS2 Version 1. It captures the core features, user journeys, technical stack, and known constraints so that all subsequent technical documents (frontend guidelines, backend contracts, file structures, etc.) can be drafted without ambiguity.