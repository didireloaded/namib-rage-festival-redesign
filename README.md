# Namib Rage Events

Namib Rage's festival and event-services website. Two owned festivals, Sound of Summer and Campout Dune Fest, plus Barbarian Bar Management, Howler ticketing and cashless, and Fast Track services.

## Stack
TanStack Start, React 19, TypeScript, Tailwind CSS, and Lucide icons. The brand entrance is `/`, with the company page at `/namib-rage` and dedicated festival and service routes.

## Design
Read `.agents/skills/website-design-craft/SKILL.md` before UI work. Maintain the approved visual direction, real photography, responsive and reduced-motion behavior. Brand details and media are in `src/data/site.ts` and `src/styles.css`. Only use approved logos and verified event credits.

## Development
Install dependencies with `npm install`, run the local server using `npm run dev`, verify with `npm run test` and `npm run build`.

## Contacts
Tickets lead to the official Howler event pages. Staff links open the Namib Rage application portal. Enquiries can be prepared in the visitor's email client, and the published email address and phone number are clickable. An optional direct-send integration would need a secured email backend and credentials before it can be enabled. Never display an unverified sent confirmation.

## Deployment
GitHub main is connected to the Lovable project. Changes pushed to main sync into the Lovable workspace. Production domain publication and final business approvals are managed separately.
