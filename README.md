# Salon POS Backend

Node.js + Express + Prisma v6 backend for:
- Members
- Discounts
- Packages
- Membership Plans
- Loyalty (Earn/Redeem)
- Leaderboard

Bonus implemented:
- RBAC (`ADMIN` / `STAFF` via headers)
- Audit logs

## Environment Variables
Create `.env` with:
- `DATABASE_URL="file:./salon.db"`
- `PORT=4000` (optional)

## Run
1. `npm install`
2. `npm run prisma:migrate -- --name init`
3. `npm run prisma:seed`
4. `npm run dev`

Base URL: `http://localhost:4000`

## Submission API Tests
- Postman collection: `Salon POS Backend - Submission.postman_collection.json`

## RBAC Headers
- `x-user-id`
- `x-user-name`
- `x-user-role` (`ADMIN` or `STAFF`)

## Main Endpoints
- `GET /health`
- `GET|POST|PATCH|DELETE /api/members`
- `GET|POST|PATCH|DELETE /api/discounts`
- `GET|POST|PATCH|DELETE /api/packages`
- `GET|POST|PATCH|DELETE /api/membership-plans`
- `GET|PUT /api/loyalty/rules/:sourceType`
- `GET|PUT /api/loyalty/config`
- `POST /api/loyalty/earn`
- `POST /api/loyalty/redeem`
- `GET /api/leaderboard`
- `GET /api/audit-logs` (ADMIN only)
