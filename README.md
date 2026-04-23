# React + TypeScript + Vite + TanStack Query (Lab 5.2)

## Lab 5.2: TanStack Query Data Management

**Change:** Replaced useEffect/fetch with useQuery for departments/roles. 
Added department pagination with backend support. Pagination UI + loading. 
AddEmployeeForm invalidates queries on success.

**Tools:** @tanstack/react-query v5 (frontend caching/queries/invalidation); backend Prisma skip/take for page&limit.

**UX:** Instant loads cache, no refetch on nav, pagination scales data, auto-update after add. 

**Insight:** Query lib centralizes server-state loading/retry/stale/error. 
Backend APIs now paginated for prod data. Pairs with Clerk auth; extend to 
mutations/infinite.



