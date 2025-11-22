# 04_TESTING.md

# 4. Testing (Framework and Block Diagrams — No Coding)

**Project:** Pre-Flight Checklist — Full Stack CRUD Application  
**Location:** `docs/04_TESTING.md`  
**Assessment requirement:** Describe testing approach for frontend & backend. Include frameworks, sample test cases, and block diagrams. No implementation code required.

---

## 4.1 Overview & Objectives

**Purpose:** Validate correctness, reliability and robustness of the Pre-Flight Checklist application.

**Objectives**
- Verify core CRUD flows (Create, Read, Update, Delete) work end-to-end.
- Confirm backend API correctness (status codes, payload validation).
- Confirm frontend UI behaviors (data render, interactions, visual states).
- Ensure graceful handling of errors and edge cases.
- Provide a test plan that an evaluator or developer can follow or implement.

**Scope**
- Backend: Express.js API + SQLite DB.
- Frontend: React SPA (ChecklistPage, ChecklistItem, FlightHeader).
- Tests described include Unit tests, Integration tests, and End-to-End (E2E) flows (E2E optional / conceptual).

**Reference UI image:** `/mnt/data/9.png`

---

## 4.2 Testing Strategy (Summary)

| Level | Purpose | Tools (recommended) |
|-------|---------|---------------------|
| Unit Tests (Backend) | Validate validators, small functions, utilities | Jest |
| Integration Tests (Backend) | Test Express endpoints with DB | Jest + Supertest (runs against express app instance) |
| Unit/Component Tests (Frontend) | Component rendering and behavior | Jest + React Testing Library |
| Integration Tests (Frontend) | UI interactions with API mocked | Jest + React Testing Library (mock `api.js`) |
| E2E Tests (Optional) | Full user flow end-to-end | Cypress or Playwright |

Notes:
- Use in-memory or temporary DB for integration tests (or run tests against a test sqlite file).
- Where network requests are not desirable in unit tests, mock `api.js` in frontend tests.

---

## 4.3 Backend Testing

### 4.3.1 Recommended tools
- **Jest** — test runner / assertion library  
- **Supertest** — for HTTP assertions against Express app  
- **better-sqlite3 (test DB)** — use a separate test DB file to avoid polluting dev DB  

### 4.3.2 Unit Tests (Backend)
**Target Areas**
- Joi validators (`validators/checks.js`)  
  - Missing title → expect validation error  
  - Invalid priority string → expect validation error  
- Utility functions (e.g., `nowISO`)  
  - Returns valid ISO timestamp string  
- DB initialization (`db.js`)  
  - Table creation should not throw  

**Example unit test descriptions**
1. **Validator: createSchema** — When `title` is empty → validation should fail (400).
2. **Validator: updateSchema** — When body empty → validation fails (min(1) enforced).
3. **Date util** — `nowISO()` returns ISO formatted string (e.g., matches `/\d{4}-\d{2}-\d{2}T/`).

### 4.3.3 Integration Tests (Backend)
**Test setup**
- Use `app.js` export and import it into test runner.
- Use a fresh SQLite file for tests or wrap transactions and rollback.

**Key test scenarios**

| Endpoint | Scenario | Expected |
|---------:|---------|---------|
| POST /api/checks | Valid payload | 201 Created, body contains created item with id |
| POST /api/checks | Missing title | 400 Bad Request, error message |
| GET /api/checks | When items exist | 200 OK, JSON array |
| GET /api/checks/:id | Valid id | 200 OK, single item returned |
| GET /api/checks/:id | Non-existent id | 404 Not Found |
| PUT /api/checks/:id | Update `completed` | 200 OK, item shows updated completed value |
| PUT /api/checks/:id | Invalid update body | 400 Bad Request |
| DELETE /api/checks/:id | Delete existing | 200 OK, success or 204 |
| DELETE /api/checks/:id | Delete non-existing | 404 Not Found |

**Assertions**
- Correct HTTP status codes
- Response body structure and types (id, title, description, completed, createdAt)
- DB reflects changes (e.g., after delete, item not present)

---

## 4.4 Frontend Testing

### 4.4.1 Recommended tools
- **Jest** — test runner  
- **React Testing Library** — DOM testing utilities  
- **msw (optional)** — mock server for better integration-like tests  
- **Cypress / Playwright** — for E2E (optional)

### 4.4.2 Component Unit Tests

**ChecklistItem component**
- Renders `item.title` correctly.
- Checkbox toggling calls `onToggle` exactly once with the item.
- Typing into comment input calls `onUpdate` with correct id and partial payload.
- Delete button calls `onDelete` with correct id.

**ChecklistPage component**
- On mount, calls `api.fetchChecks` and renders list.
- Add form validation: empty title should not call API.
- Add form submit calls `api.createCheck` and appends the new item.
- Displays loading indicator while fetching.
- Displays error message when fetch fails.
- Displays empty-state message when API returns empty array.

### 4.4.3 Integration Tests (Frontend)
- Mock `api.js` functions using Jest mock functions:
  - `fetchChecks`, `createCheck`, `updateCheck`, `deleteCheck`
- Simulate Add flow:
  1. Mock `createCheck` to return created item.
  2. Fill input and submit.
  3. Expect new row appended and inputs cleared.
- Simulate Update flow:
  1. Mock `updateCheck` to return updated item.
  2. Toggle checkbox or change comment.
  3. Expect UI to show updated value.
- Simulate Delete flow:
  1. Mock `deleteCheck` resolves successfully.
  2. Click delete.
  3. Expect row removed from DOM.

### 4.4.4 Example test cases summary

| Component | Test case | Expectation |
|----------|-----------|-------------|
| ChecklistItem | Renders inputs correctly | Title text shown; comment input value initialised |
| ChecklistItem | Checkbox change | `onToggle` invoked with item |
| ChecklistPage | Loading state | Shows "Loading" message while fetch pending |
| ChecklistPage | Empty state | Shows helpful message when no items |
| ChecklistPage | Add item | Calls `createCheck`; new item appears |

---

## 4.4 End-to-End (E2E) — Optional, recommended for full demonstration

**Tool:** Cypress or Playwright

**Flow to test**
1. Start backend on test environment (or run locally).
2. Start frontend against that backend.
3. Test actions:
   - Add new check (verify item appears)
   - Toggle status (verify UI and backend reflect change)
   - Edit comment (verify updated)
   - Delete check (verify removed)
4. Clean-up: remove created test data

**Why E2E**
- Demonstrates real-world flow
- Catches integration gaps not visible in unit tests

---

## 4.6 Test Data & Fixtures

**Sample test item payload**
```json
{
  "title": "Check Fuel Quantity",
  "description": "OK"
}
