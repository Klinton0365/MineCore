# Alkebulan Underground & Surface Mining Services
## Project Requirements Document
**Extracted from:** Web Development Proposal (SOW-2026-V1.2)
**Date:** 2026-03-04
**Project Type:** Business Automation Platform (NOT a static website)

---

## 1. PROJECT OVERVIEW

### Core Objective
Design & develop a fully **dynamic, automated business website** integrated with the client's inventory management system via API.

### Key Capabilities
- Real-time Product Visibility
- Live Inventory Tracking
- Country-based Availability

### 6 Core Pillars of Automation
| # | Pillar | Description |
|---|--------|-------------|
| 1 | Multi-level Architecture | Category → Sub-Category → Individual Product Page with deep linking |
| 2 | API Inventory Integration | Real-time sync with inventory management system, zero manual data entry |
| 3 | Global Stock Visibility | Country-based & branch-wise stock display logic tailored to user location |
| 4 | Enquiry Automation | Lead capture triggering instant WhatsApp & Email notifications to sales teams |
| 5 | Dynamic Featured Products | "Products of the Week" with rotation logic and countdown timers |
| 6 | Full Admin Control | Backend dashboard for analytics, product management, and API monitoring |

---

## 2. TECHNOLOGY STACK

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Next.js |
| Backend | Node.js, PHP (final selection TBD at kickoff) |
| Database | MySQL, MongoDB |
| Security | SSL, Secure Cloud Hosting, Firewall |

> **Note:** Final technology stack selection (React vs. Next.js, Node.js vs. PHP) to be confirmed during project kickoff based on scalability requirements and developer assignment.

**Current Implementation:** Next.js 16 (frontend) + Laravel 12/PHP (backend) already scaffolded.

---

## 3. WEBSITE PAGES

### 3.1 Public-Facing Pages (Client & Customer Interface)

#### Page 1: Home Page `[Dynamic]`
**Sections & Components:**
- **Hero Banner Section** — High-impact mining banner image with strong Call-to-Action buttons driving immediate engagement
- **"Products of the Week" Section** — Auto-rotating featured products with countdown timer (OFFER ENDS IN: HH:MM:SS)
- **Featured Product Categories** — Dynamic grid displaying top product categories with automated country-based filtering logic
- **Quick Search Bar** — Prominent search bar with auto-suggestions and category filtering for rapid product discovery
- **Branch Availability Highlights** — Visual indicators highlighting global presence and stock status across key operational hubs (Bangalore, Dubai, UK)
- **WhatsApp & Enquiry CTA Buttons** — Persistent call-to-action buttons for lead generation
- **Country-based Filtering** — Automatic filtering via IP detection

#### Page 2: About Us `[Informational]`
**Sections & Components:**
- Company Overview
- Vision & Mission Statement
- Country-wise Branch List
- Infrastructure Details
- Certifications Section
- Global Presence Map (interactive)

#### Page 3: Products Module `[Core Feature]` — 3-Level Architecture

**Level 1 — Category Page (Broad Navigation)**
- Display all primary product categories with high-quality visuals
- Advanced filtering based on country availability
- Integrated intelligent search functionality for quick access

**Level 2 — Sub-Category Page (Detailed Selection)**
- Product grid with clear thumbnails and brief summaries
- Visual availability indicators before clicking through (stock badges)
- Direct "Enquire Now" buttons for faster lead generation

**Level 3 — Individual Product Page (Deep Information & Action)**
- Dynamic image gallery
- Technical specifications table
- API-driven country availability logic (IP-based)
- Real-time branch status: **IN STOCK** (green) / **LIMITED** (yellow) / **OUT OF STOCK** (red)
- Prominent "Add to Enquiry" CTA button for conversion

#### Page 4: Enquiry System `[Automation]`
- Enquiry Cart (add products to enquiry instead of direct checkout)
- Lead Form Capture
- Automated Triggers (WhatsApp Message + Email Notifications)

---

### 3.2 Backend Admin Panel (Management & Control Center)

#### Admin Page 1: Analytics Dashboard
- Overview of Total Enquiries (with trend: e.g., +12.5% vs last month)
- Top Product Interest tracker (e.g., "Mining Rig X1 — 342 Views this week")
- Country-wise/Region demand map visuals (e.g., "Dubai, UAE — High Activity Zone")
- Popular Products tracker

#### Admin Page 2: Product & Category Management
- Add / Edit / Delete Categories & Products
- Manage categories structure (3-level hierarchy)
- Upload specifications & galleries
- Control "Products of the Week" selection and rotation
- Set countdown timers
- Manage highlight badges ("Featured", "Best Seller")

#### Admin Page 3: Branch & API Control
- Manage Branch listings (Bangalore, Dubai, UK)
- Add / Edit / Delete Branches (CRUD)
- Inventory Mapping — Map specific product SKUs to individual branches
- Country Assignment — Link branches to specific countries/regions
- Display Control — Toggle visibility of branch-specific stock status on frontend
- Monitor API sync status and health logs
- View real-time sync status
- Access error & activity logs
- Manual stock override option

#### Admin Page 4: Lead Tracking / Lead Management
- View and manage incoming enquiries from frontend forms
- Track all incoming enquiries
- Export lead data to CSV
- View customer origin details
- Export data capabilities

#### Admin Page 5: Featured Products Management
- Weekly product selection
- Set countdown timers
- Manage highlight badges

#### Admin Page 6: Security & Backup
- Manage user access roles
- Automated backup controls
- System health status check

---

## 4. FEATURES & FUNCTIONAL REQUIREMENTS

### 4.1 Product Management System
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-01 | 3-Level Product Hierarchy | Category → Sub-Category → Product with deep linking | Critical |
| F-02 | Dynamic Image Gallery | Multiple product images with gallery view on product pages | Critical |
| F-03 | Technical Specifications | Structured specs table per product | Critical |
| F-04 | Product Search | Intelligent search with auto-suggestions and category filtering | Critical |
| F-05 | Country-based Filtering | Filter products by availability in user's detected country | Critical |
| F-06 | Availability Badges | Visual indicators: IN STOCK / LIMITED / OUT OF STOCK | Critical |
| F-07 | "Products of the Week" | Admin-selected featured products with auto-rotation | High |
| F-08 | Countdown Timer | Timer displayed on featured products showing offer end time | High |
| F-09 | Highlight Badges | "Featured" or "Best Seller" badges on selected items | Medium |

### 4.2 API & Inventory Integration
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-10 | Real-time API Sync | Secure API calls to central inventory system on user visit or schedule | Critical |
| F-11 | Data Retrieval | Extract: Product Stock Levels, Country Availability, Branch-specific Inventory | Critical |
| F-12 | Auto-Sync | System processes data at set intervals (admin-controlled sync intervals) | Critical |
| F-13 | Live Updates | Product pages reflect current status across all regions in real-time | Critical |
| F-14 | Error Logging | Automated error logging & failure handling for API sync | High |
| F-15 | Manual Stock Override | Admin can manually override stock visibility per branch | High |
| F-16 | API Health Monitoring | Real-time uptime tracking for inventory sync | High |

### 4.3 Country-Based Availability System
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-17 | IP-Based Detection | Auto-identify user location via IP address geolocation on site entry | Critical |
| F-18 | Dynamic Filtering | Product catalog filters to show only items available in detected region | Critical |
| F-19 | Smart Badging | Visual indicators confirming availability (e.g., "Available in India") | Critical |
| F-20 | Manual Override | Admin can override country logic per product | High |
| F-21 | Region Assignment | Admin assigns specific products to regions | High |
| F-22 | Regional Visibility Rules | Admin manages regional visibility rules | High |

### 4.4 Branch Management Module
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-23 | Branch CRUD | Add / Edit / Delete branch locations | Critical |
| F-24 | Branch Inventory Mapping | Map specific product SKUs to individual branches | Critical |
| F-25 | Country Assignment | Link branches to specific countries or regions | Critical |
| F-26 | Display Control | Toggle visibility of branch-specific stock status on frontend | High |

**Known Branches:**
| Branch | Region Code | Display Logic |
|--------|-------------|---------------|
| Bangalore Branch (Main Warehouse) | IN-BLR | Visible to India IP |
| Dubai Branch (Middle East Hub) | AE-DXB | Visible to GCC IP |
| United Kingdom (European Center) | GB-LDN | Enquiry Only Mode |

> Stock status updates automatically via API sync but can be manually overridden by admins for specific branches.

### 4.5 Enquiry & Lead Automation System
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-27 | Enquiry Cart | Customers add products to enquiry cart (not checkout) | Critical |
| F-28 | Lead Form | Captures: Name, Phone, Email, Country, specific Message | Critical |
| F-29 | WhatsApp Auto-Message | Opens WhatsApp with pre-filled template: "Hello, I am interested in [Product Name], available in [Country]. Please share details." | Critical |
| F-30 | Company Email Notification | Sales team receives immediate email: Subject "New Lead - [Customer Name] - [Country]" with full lead details and product interest list | Critical |
| F-31 | Customer Confirmation Email | Customer receives acknowledgement: "Thank you for your enquiry. Our team will contact you shortly." | Critical |
| F-32 | Lead Tracking Dashboard | View, manage, and export all incoming enquiries | High |

**Customer Journey Flow:**
1. Add to Enquiry → 2. Fill Lead Form → 3. Submit Enquiry → 4. Triggers Fired (WhatsApp + Company Email + Customer Confirmation simultaneously)

### 4.6 Homepage Dynamic Features
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-33 | Hero Banner | Admin-managed high-impact industry visuals with strong CTAs | Critical |
| F-34 | Intelligent Search | Prominent search bar with auto-suggestions and category filtering | Critical |
| F-35 | Branch Availability Display | Visual indicators of global presence and stock status | High |
| F-36 | Featured Categories Grid | Dynamic grid with automated country-based filtering | High |
| F-37 | "Products of the Week" Auto-Rotation | Products rotate automatically based on set schedules | High |
| F-38 | Countdown Timer Widget | OFFER ENDS IN: HH:MM:SS countdown display | Medium |

### 4.7 Admin Dashboard & Analytics
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-39 | Total Enquiries Overview | Count with trend comparison (e.g., +12.5% vs last month) | High |
| F-40 | Top Product Interest | Track most viewed/enquired products | High |
| F-41 | Top Region Demand | Identify high-activity geographic zones | High |
| F-42 | Country-wise Demand Map | Visual map showing enquiry distribution by country | Medium |

### 4.8 Authentication & Security
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| F-43 | Admin Authentication | Secure login for backend admin panel | Critical |
| F-44 | User Access Roles | Role-based access management for admin users | High |
| F-45 | SSL Implementation | Full HTTPS encryption for all data transmission | Critical |
| F-46 | Automated Backups | Daily scheduled backups of database and file systems | High |
| F-47 | System Health Check | Admin-accessible system health status dashboard | Medium |

---

## 5. FORMS

### Form 1: Enquiry / Lead Capture Form
| Field | Type | Required |
|-------|------|----------|
| Full Name | Text | Yes |
| Phone Number | Tel | Yes |
| Email Address | Email | Yes |
| Country | Dropdown/Auto-detect | Yes |
| Message | Textarea | Yes |
| Selected Products | Auto-populated from enquiry cart | Yes |

**On Submit Triggers:**
1. WhatsApp auto-message opens with pre-filled product details
2. Email notification sent to sales team
3. Confirmation email sent to customer
4. Lead saved to database for admin tracking

### Form 2: Admin Login Form
| Field | Type | Required |
|-------|------|----------|
| Email/Username | Text | Yes |
| Password | Password | Yes |

### Form 3: Product Management Form (Admin)
| Field | Type | Required |
|-------|------|----------|
| Product Name | Text | Yes |
| Category | Dropdown (3 levels) | Yes |
| Description | Rich Text | Yes |
| Technical Specifications | Key-Value pairs | No |
| Images | File Upload (multiple) | Yes |
| Branch Availability | Multi-select checkboxes | Yes |
| Country Availability | Multi-select checkboxes | Yes |
| Featured/Best Seller Badge | Toggle | No |
| "Product of the Week" | Toggle | No |

### Form 4: Branch Management Form (Admin)
| Field | Type | Required |
|-------|------|----------|
| Branch Name | Text | Yes |
| Region Code | Text (e.g., IN-BLR) | Yes |
| Country Assignment | Multi-select | Yes |
| Stock Status | Dropdown (In Stock / Limited / Out of Stock) | Yes |
| Display Logic | Dropdown/Config | Yes |
| Visibility Toggle | Toggle | Yes |

### Form 5: Category Management Form (Admin)
| Field | Type | Required |
|-------|------|----------|
| Category Name | Text | Yes |
| Parent Category | Dropdown (for sub-categories) | No |
| Category Image | File Upload | Yes |
| Display Order | Number | No |

---

## 6. INTEGRATIONS

| # | Integration | Type | Details |
|---|-------------|------|---------|
| 1 | Inventory Management System API | REST API | Client provides API docs and access tokens. Extracts stock levels, country availability, branch-specific inventory |
| 2 | WhatsApp Business API | External API | Pre-filled message automation on enquiry submission. Client responsible for WhatsApp Business API licensing |
| 3 | Email Service (SMTP/Transactional) | Email | Company notifications + Customer confirmation emails |
| 4 | IP Geolocation Service | External API | Detect user country for product filtering (e.g., ipinfo.io, MaxMind) |
| 5 | Automated Backup System | Internal | Scheduled database and file backups |

---

## 7. USER FLOWS

### Flow 1: Customer Product Discovery
```
Visit Site → IP Detected → Country Set
  → Home Page loads with country-filtered content
  → Browse Categories (Level 1)
  → Browse Sub-Categories (Level 2)
  → View Product (Level 3) with branch stock status
  → "Add to Enquiry" → Enquiry Cart
```

### Flow 2: Customer Enquiry Submission
```
Enquiry Cart → Click "Submit Enquiry"
  → Fill Lead Form (Name, Phone, Email, Country, Message)
  → Submit
  → Simultaneous triggers:
     ├── WhatsApp opens with pre-filled message
     ├── Email to sales team with lead details
     └── Confirmation email to customer
```

### Flow 3: Product Search
```
Home Page → Search Bar → Type query
  → Auto-suggestions appear (filtered by category & country)
  → Select result → Navigate to Product Page
```

### Flow 4: Admin Product Management
```
Admin Login → Dashboard
  → Product & Category Mgmt
  → Add/Edit/Delete Products
  → Assign to Categories, Branches, Countries
  → Upload Images & Specs
  → Set Featured/Badge status
```

### Flow 5: Admin "Products of the Week"
```
Admin Login → Featured Products
  → Select products for weekly feature
  → Set countdown timer
  → Apply badges ("Featured" / "Best Seller")
  → Products auto-rotate on frontend homepage
```

### Flow 6: API Inventory Sync
```
Scheduled Task or User Visit triggers API call
  → Website calls central inventory API
  → API returns: Stock Levels, Country Availability, Branch Inventory
  → System processes & syncs data
  → Frontend reflects: "In Stock" / "Limited" / "Out of Stock"
  → Errors logged automatically
  → Admin can manually override any stock status
```

### Flow 7: Admin Lead Management
```
Admin Login → Lead Tracking
  → View all incoming enquiries
  → Filter by date, country, product
  → View customer origin details
  → Export to CSV
```

---

## 8. UI/UX REQUIREMENTS

### 8.1 Design System
- **Theme:** Dark industrial/mining aesthetic (dark blue backgrounds, gold/amber accents)
- **Typography:** Clean, modern sans-serif fonts
- **Color Palette:**
  - Primary Background: Dark Navy (#0a1628 approx)
  - Accent Blue: Bright Blue (#2563eb approx)
  - Accent Gold/Amber: (#d4a437 approx)
  - Success Green: For "In Stock" badges
  - Warning Yellow/Amber: For "Limited" badges
  - Danger Red: For "Out of Stock" badges
  - Text: White/Light gray on dark backgrounds

### 8.2 Layout Requirements
- **Fully Responsive Design** — Mobile, Tablet, Desktop
- **Mobile-first approach** implied by responsiveness requirements
- **Cross-Browser Compatibility** — Chrome, Safari, Edge, Firefox

### 8.3 Interactive Components
| Component | Description |
|-----------|-------------|
| Hero Banner | Full-width image section with overlay text and CTA buttons |
| Product Grid Cards | Thumbnail image, title, brief summary, availability badge, "Enquire Now" button |
| Countdown Timer | Live HH:MM:SS countdown widget on "Products of the Week" |
| Search Bar | Auto-suggestion dropdown as user types |
| Enquiry Cart | Sidebar or modal showing selected products for enquiry |
| Stock Status Badges | Color-coded pills: green "IN STOCK", yellow "LIMITED", red "OUT OF STOCK" |
| Country Availability Badge | Location pin icon with "Available in [Country]" |
| Branch Status Cards | Per-branch cards showing location, region code, stock status, and display logic |
| Global Presence Map | Interactive map showing branch locations (Bangalore, Dubai, UK) |
| Analytics Charts | Trend lines, bar charts, map visuals for admin dashboard |
| WhatsApp CTA Button | Floating or inline WhatsApp button with brand icon |
| Image Gallery | Multi-image viewer on product pages (lightbox or carousel) |
| Category Filter | Dropdown or sidebar filter for country-based product filtering |
| Data Tables | Sortable, filterable tables for admin (leads, products, branches) |
| Toggle Switches | For admin controls (visibility, featured status, override) |
| Notification Badges | Count indicators on admin dashboard |

### 8.4 Performance Requirements
- **Sub-2s load times** — Image compression and code minification
- **Optimized Loading Speed** — Critical for user experience
- **SEO-Friendly URL Structure** — Clean, descriptive URLs for categories and products
- **Optimized Site Architecture** — Logical hierarchy for search engine crawling
- **Meta Data Management** — Dynamic generation of meta titles and descriptions per product

### 8.5 Animations & Interactive Elements
| Element | Suggested Implementation |
|---------|------------------------|
| "Products of the Week" auto-rotation | Carousel/slider with timed transitions |
| Countdown Timer | Real-time JS countdown (HH:MM:SS) |
| Search Auto-suggestions | Debounced dropdown appearing on keystroke |
| Stock Status Updates | Fade/color transition when status changes |
| Page Transitions | Smooth Next.js page transitions |
| Hover Effects | Product cards, CTA buttons |
| Loading States | Skeleton screens during API data fetch |

---

## 9. MISSING / UNCLEAR REQUIREMENTS — SUGGESTED SOLUTIONS

| # | Gap | Suggested Solution |
|---|-----|-------------------|
| 1 | **Admin authentication method not specified** | Implement Laravel Sanctum for API token-based auth between Next.js frontend and Laravel backend. Session-based auth for admin panel. |
| 2 | **Number of admin roles not defined** | Implement at minimum 2 roles: Super Admin (full access) and Editor (product/content management only). |
| 3 | **WhatsApp integration method unclear** | Use WhatsApp Click-to-Chat URL (`wa.me/<number>?text=<prefilled>`) for initial implementation. Upgrade to WhatsApp Business Cloud API when client obtains license. |
| 4 | **Email service provider not specified** | Use Laravel's built-in Mail with SMTP configuration. Support for services like SendGrid, Mailgun, or Amazon SES. |
| 5 | **IP Geolocation provider not specified** | Use a free tier service like ipinfo.io or ip-api.com for development. MaxMind GeoLite2 for production. |
| 6 | **Inventory API format/endpoints not documented** | Backend should implement an adapter/interface pattern so the API integration layer can be swapped when client provides API documentation. |
| 7 | **Image storage strategy not defined** | Use Laravel's filesystem abstraction with local storage for dev, S3-compatible storage for production. Implement image optimization on upload. |
| 8 | **Search implementation not specified** | Use database full-text search (MySQL FULLTEXT) for initial implementation. Consider Meilisearch/Algolia for scale. |
| 9 | **Backup frequency and retention not specified** | Daily automated backups with 30-day retention. Both database dumps and uploaded files. |
| 10 | **Product of the Week rotation schedule not defined** | Admin sets start date and duration (default 7 days). System auto-expires and can auto-rotate to next scheduled set. |
| 11 | **Pagination strategy not specified** | Implement cursor-based pagination for product listings. 12-24 products per page depending on view. |
| 12 | **Error handling UX not specified** | Implement user-friendly error pages (404, 500). Toast notifications for form errors. Retry mechanisms for failed API calls. |
| 13 | **Mobile navigation pattern not specified** | Hamburger menu with slide-out drawer for mobile. Bottom navigation bar for key actions (Home, Products, Enquiry, Search). |
| 14 | **Admin notification system not specified** | In-app notifications for new leads. Optional email digest for daily lead summaries. |
| 15 | **Multi-language support not mentioned** | Not in scope, but architecture should support i18n for future expansion to multiple regions. |

---

## 10. CRITICAL FEATURES SUMMARY

These features are **must-have** for MVP launch:

| Priority | Feature |
|----------|---------|
| P0 | 3-Level Product Hierarchy (Category → Sub-Category → Product) |
| P0 | Real-time API Integration with Inventory System |
| P0 | IP-based Country Detection & Product Filtering |
| P0 | Branch Management with Stock Status Display |
| P0 | Enquiry Cart + Lead Form with automated triggers |
| P0 | WhatsApp + Email automation on enquiry submission |
| P0 | Admin Panel with Product/Category CRUD |
| P0 | Admin Authentication & Role Management |
| P0 | SSL & Secure Hosting |
| P1 | "Products of the Week" with auto-rotation & countdown |
| P1 | Analytics Dashboard |
| P1 | Lead Tracking & CSV Export |
| P1 | API Health Monitoring & Error Logs |
| P1 | Automated Backups |
| P2 | Featured/Best Seller Badges |
| P2 | Country-wise Demand Map Visuals |
| P2 | Global Presence Interactive Map |

---

## 11. DATABASE ENTITIES (Suggested Schema)

Based on requirements, the following entities are needed:

| Entity | Key Fields |
|--------|-----------|
| `users` | id, name, email, password, role, created_at |
| `categories` | id, name, slug, parent_id (nullable for 3-level), image, display_order |
| `products` | id, name, slug, category_id, description, specifications (JSON), is_featured, is_product_of_week, featured_badge, created_at |
| `product_images` | id, product_id, image_path, display_order, is_primary |
| `branches` | id, name, region_code, country, description, is_visible, display_logic |
| `branch_product` | id, branch_id, product_id, stock_status (in_stock/limited/out_of_stock), is_override |
| `product_countries` | id, product_id, country_code, is_available |
| `enquiries` | id, customer_name, phone, email, country, message, status, created_at |
| `enquiry_items` | id, enquiry_id, product_id |
| `featured_schedules` | id, product_id, start_date, end_date, countdown_end, is_active |
| `api_sync_logs` | id, endpoint, status, response_code, error_message, synced_at |
| `settings` | id, key, value (for site-wide configs like sync intervals) |

---

## 12. DELIVERABLES (from Proposal)

- Full SDLC: Architecture Design → Development → Testing → Deployment
- Admin Panel training session for client staff
- Dedicated technical support during initial launch phase
- SEO-Optimized URL Structure
- Automated Data Backups
- Mobile Responsive Design

**Proposal valid until:** March 31, 2026
