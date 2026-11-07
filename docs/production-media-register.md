# Namib Rage production media register

Updated 7 November 2026

This register separates genuine, attributable event imagery from required media that has **not yet been supplied or approved for publishing**. The site must not invent event footage, associate unrelated gallery photos with Barbarian or Howler operations, or show fabricated logos.

## Step 1: asset readiness

| Destination / data field | Current verified site data | Required approved delivery | Status |
| --- | --- | --- | --- |
| Homepage `homepageHeroVideo` | `null` | Genuine 5–10 second full-width Namib Rage montage, plus poster frame | Awaiting source |
| Sound of Summer `festivals[0].heroVideo` | `null` | Genuine 5–10 second festival clip, 16:9 and usable mobile crop | Awaiting source |
| Campout `festivals[1].heroVideo` | `null` | Genuine 5–10 second Campout clip, 16:9 and usable mobile crop | Awaiting source |
| Campout `campoutMedia` | Empty array | 6–10 genuine Campout images with specific caption/source | Awaiting source |
| Oktoberfest Namibia `poweredEvents[].photo` | `null` | One relevant photo proving Barbarian bar operations at this event | Awaiting source |
| Balcony Mix `poweredEvents[].photo` | `null` | One relevant photo proving Barbarian bar operations at this event | Awaiting source |
| KosFees `poweredEvents[].photo` | `null` | One relevant photo proving Barbarian bar operations at this event | Awaiting source |
| Liefde op die Nam `poweredEvents[].photo` | `null` | One relevant photo proving Barbarian bar operations at this event | Awaiting source |
| Barbarian service section | Namib Rage general event atmosphere | Attributable photos of actual bars, build, serving staff and operational scale | Awaiting source |
| Howler service section | Text pillars only | Approved images/video of ticket purchase, access scanning and cashless payment | Awaiting source |
| `brands[].logo` (six entities) | `null` (editorial names) | Official SVG/PNG marks, used without modification | Awaiting assets |
| `sponsors[]` | Empty, no approved logos | Named sponsor assets and explicit approval | Awaiting approval |

**Existing real content that can remain in its documented context:** `photos.sosCrowd`, `photos.sosStage`, `photos.sosBeach`, `photos.nrGallery1` through `photos.nrGallery4` and `photos.campArt` in `src/data/site.ts`. Their descriptions distinguish Sound of Summer, general Namib Rage events and 2026 Campout artwork. These are not evidence of a specific Barbarian event or Howler gate operation.

**2026 Sound of Summer poster:** The uploaded artwork was used as a colour reference for royal blue, sky blue, cyan, white, orange and pink. This does not automatically authorise reusing every included artist photo, headline or sponsor logo as a separate website asset.

## Delivery and encoding specifications

- Hero videos should be the actual owned/cleared event footage, preferably one 5–10 second loop per destination; muted, repeatable and free of third-party audio.
- Supply an MP4 (H.264) with optional WebM as an enhancement, plus a JPEG/WebP poster image. Avoid heavy original camera masters in the public web bundle.
- Provide an original uncompressed image when possible; create responsive variants rather than artificially upscaling.
- Record event name, photo/video owner, usage approval, date/edition, descriptive alt text and publication URL for every asset.
- Serve from an approved CDN or production asset host. Shared-drive preview links are not reliable direct video files for an HTML video element.
- Preserve reduced-motion fallback, lazy-load below-fold media and reserve image layout dimensions.
- For logos, use the exact approved mark without recolouring, recreating or re-typesetting.

## Sequencing safeguard

The supplied implementation directive expressly stops work before its Step 2 until each required asset has either a real approved, deployable URL or explicit owner confirmation that no asset is available. **None of the missing entries above has yet been confirmed as unavailable by the user.**

Changes in this asset-preparation step are limited to adding the homepage media slot, retaining null values, using the existing video poster/metadata behavior, and not rendering unrelated or fabricated media tiles. No approved website design, routes or content structure should be replaced based on a missing file.

Once the media is approved, proceed with brand tokens, media-first sections and verification against 390×844 and 1440×900 screenshots, while preserving the six-brand architecture and all ticket links.

## Design progress after instruction to proceed

On 7 November 2026, the project owner instructed the team to proceed with the redesign using available genuine media rather than blocking all design work until footage arrives. The homepage, editorial service layouts, event gallery and Fast Track conversion flow were updated accordingly, without fabricating or misattributing media.

The assets listed as **Awaiting source** above are still not supplied or approved, and all corresponding video fields remain `null`. No public video-loop completion, Campout gallery completion, Barbarian service photography or Howler operational image completion is claimed.

Source-level static checks have passed for presence of the new homepage sections, photo-only gallery behaviour, reduced-motion video support, brand tokens, links and conversion controls. The connected Lovable project reports a ready build with no error. Full mobile/desktop visual screenshot checks at 390×844 and 1440×900 and independently executed local `npm run build` / `npm run test` have not been run in this workspace due unavailable browser execution and a network-isolated local environment. These remain release QA tasks.
