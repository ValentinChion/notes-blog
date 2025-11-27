---
title: "Unit Testing Helper"
description: "Helper to make decision while unit testing."
pubDate: "Nov 27 2025"
heroImage: "/notes-blog/assets/unit-testing.png"
---

## Testing Decision Tree

This testing Decision tree should help you create your test at anytime.
It is focused on UI Unit testing.

### Tree

```
Do I need to test this element/component?
│
├─ 1. Does this element affect USER EXPERIENCE?
│   │   (Can users see it, interact with it, or does it change their workflow?)
│   │
│   ├─ NO → ⏭️ SKIP TESTING
│   │   │   Examples: Pure layout wrappers, CSS-only animations, pass-through components
│   │   └─ Exception: Test the PARENT component that contains meaningful behavior
│   │
│   └─ YES → Continue to #2
│
├─ 2. What is the PRIMARY PURPOSE of this element?
│   │
│   ├─ A) USER INPUT / INTERACTION
│   │   │   (Forms, buttons, clicks, navigation, lists, any user action)
│   │   │
│   │   ├─ What to test:
│   │   │   • User can interact and get expected result
│   │   │   • Validation/error states work correctly
│   │   │
│   │   ├─ How to interact:
│   │   │   • await user.click(element)
│   │   │   • await user.type(input, 'text')
│   │   │
│   │   └─ Assert examples:
│   │       expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
│   │       expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
│   │
│   ├─ B) DISPLAY INFORMATION
│   │   │   (Text, images, status, notifications, alerts, data from API)
│   │   │
│   │   ├─ What to test:
│   │   │   • Correct data is displayed
│   │   │   • Loading/error/empty states appear correctly
│   │   │
│   │   └─ Assert examples:
│   │       expect(await screen.findByText('John Doe')).toBeInTheDocument()
│   │       expect(screen.queryByText(/user details/i)).not.toBeInTheDocument()
│   │
│   └─ E) CONDITIONAL VISIBILITY
│       │   (Modals, dropdowns, tooltips, collapsible sections, toggles)
│       │
│       ├─ What to test:
│       │   • Opens/closes on trigger actions
│       │   • Content is accessible when visible
│       │
│       └─ Assert examples:
│           expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
│           expect(screen.getByRole('dialog')).toBeVisible()
│
├─ 3. Does this involve ASYNC OPERATIONS?
│   │   (API calls, timeouts, debounce, lazy loading)
│   │
│   ├─ YES → Use async queries and waits
│   │   │
│   │   ├─ What to test:
│   │   │   • Loading → Success/Error state transitions
│   │   │
│   │   ├─ How to handle:
│   │   │   • await screen.findByText(...) - built-in waiting
│   │   │   • await waitFor(() => expect(...))
│   │   │   • Mock API with MSW (recommended)
│   │   │
│   │   └─ Assert examples:
│   │       expect(await screen.findByText(/error loading/i)).toBeInTheDocument()
│   │       await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))
│   │
│   └─ NO → Continue to #4
│
├─ 4. Does this use CONTEXT or GLOBAL STATE?
│   │   (React Context, Redux, Zustand)
│   │
│   ├─ YES → Wrap component in provider with test values
│   │   │
│   │   └─ Assert examples:
│   │       expect(button).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' })
│   │       expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_USER' })
│   │
│   └─ NO → Continue to #5
│
├─ 5. Does this require USER ROLES or PERMISSIONS?
│   │   (Protected routes, role-based access)
│   │
│   ├─ YES → Test different user states separately
│   │   │
│   │   └─ Assert examples:
│   │       expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument() // admin
│   │       expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument() // user
│   │
│   └─ NO → Continue to #6
│
└─ 6. Does this involve ROUTING?
    │   (React Router, navigation, URL params)
    │
    ├─ YES → Use MemoryRouter with test routes
    │   │
    │   └─ Assert examples:
    │       expect(screen.getByRole('heading', { name: /user profile/i })).toBeInTheDocument()
    │       expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    │
    └─ NO → ✅ TESTS COMPLETE !
```

### Quick Reference : What to use ?

```
1. getByRole              ← Use this 80% of the time
2. getByLabelText         ← For form inputs
3. getByPlaceholderText   ← Acceptable for inputs
4. getByText              ← For non-interactive content
5. getByDisplayValue      ← For input current values
6. getByAltText           ← For images
7. getByTitle             ← Rarely needed
8. getByTestId            ← Last resort only
```

### Coverage Checklist

```
□ Does it render without crashing ? -> (Smoke test)
□ Does it display correct content based on props ? -> (Conditional rendering)
□ Do user interactions work as expected ? -> (click, hover, focus)
□ Do edge cases work (empty, loading, error states) ? (Use code coverage and AI to help you)
□ Does async behavior work correctly ? (API calls etc...)
□ Does it integrate with other components/state ? (Test parent component etc..)
```

### Good Tests / Bad Tests Checklist

This does not really apply to other languages, but it does work for others, we just need to rename the informations :

#### Red Flags

```
🚩 Using querySelector or getElementsByClassName
🚩 Testing state variables or internal functions directly
🚩 Tests break when you refactor without changing behavior
🚩 Lots of data-testid everywhere
🚩 Testing CSS classes or exact DOM structure
🚩 Mocking everything (too many mocks = not testing real behavior)
🚩 No async handling (missing await, getting "act" warnings)
```

#### Green Flags

This is in order of importance :

```
✅ Tests read like user stories -> This is the most important !!
✅ Each test is independent (can run in any order)
✅ Testing behavior, not implementation
✅ Query by role, label, text (how users find things)
✅ Tests survive refactoring
✅ Fast test execution (<1s per test typically)
✅ Clear test failures (know exactly what broke)
✅ Minimal mocking (only external dependencies)
```
