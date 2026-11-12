---
name: Reparación de PC
description: An independent PC technician's profile, drawn as an exploded-view service manual.
colors:
  paper: "#f5f6f3"
  paper-2: "#ecede8"
  ink: "#141414"
  ink-2: "#55554f"
  rule: "#c4c5bf"
  rule-strong: "#8d8e87"
  signal: "#ff4d12"
  signal-ink: "#141414"
  signal-text: "#c23a0b"
  part-fill: "#fbfbf9"
  graphite-paper: "#161719"
  graphite-paper-2: "#1d1e21"
  graphite-ink: "#ecebe6"
  graphite-ink-2: "#a8a8a1"
  graphite-rule: "#393a3e"
  graphite-rule-strong: "#6c6d70"
  graphite-signal: "#ff6a33"
  graphite-signal-text: "#ff8a5c"
  graphite-part-fill: "#1b1c1f"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 4.2vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.5rem + 2.6vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.25rem + 1.1vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  lede:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.45vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)"
    fontWeight: 700
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 112"
rounded:
  none: "0px"
  callout: "50%"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.5rem"
  space-6: "2rem"
  space-7: "3rem"
  space-8: "clamp(3.5rem, 2.5rem + 4vw, 6.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.7em 1.2em"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-primary-lg:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.4em 0.85em 0.85em"
    height: "56px"
  button-primary-sm:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.none}"
    padding: "0.45em 0.95em"
    height: "40px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.4em 0.9em"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
  input:
    backgroundColor: "{colors.part-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.75em 0.85em"
  callout-number:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.callout}"
    size: "2.5rem"
  callout-number-lit:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
  whatsapp-bar:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.none}"
    height: "54px"
---

# Design System: Reparación de PC

## Overview

**Creative North Star: "The Exploded-View Service Manual"**

The site is a printed service manual for one desktop PC. Manual-paper off-white, one black ink drawn at single weights, a warm grey for secondary ink, and a single signal orange that marks exactly one thing at a time: the primary action, or the part currently being looked at. The drawing is the hero and the index: every service is a numbered callout on the part it fixes, and the parts list below is the manual's parts table, wired back to the drawing.

Density is that of a technical document, not a brochure: rows, rules, tables, figure captions ("Fig. 1", "Fig. 2"), data sheets with key/value rows, and a drawing title block as the footer. Hierarchy comes from width and weight of one variable family (Archivo, stretched to 125% for headings) and from rule weight (1.5px ink for table heads and frames, 1px grey for row divisions). Nothing floats; everything is printed flat on the sheet.

Dark mode is the same manual reprinted white-on-graphite, not a different mood. The confirmed rejection is the dark-tech hero with a stock PC photo above a row of icon cards.

**Key Characteristics:**
- One ink, one paper, one signal orange; orange means "this one" or "do this".
- Line drawings at single stroke weights; parts lift to orange when lit.
- Square corners everywhere except numbered callout circles.
- Flat: depth comes from rules, frames and paper tone, never shadow.
- Captions, footers and table keys carry the uppercase labels; headings stand alone.

## Colors

A near-monochrome print palette, slightly warm-green grey, with a single high-chroma orange.

### Primary
- **Signal Orange** (signal): the primary action (WhatsApp buttons, the mobile WhatsApp bar, the header Contacto button), the lit part and its leader line, the lit row's top bar and number, the selected symptom chip, the active process step, the open FAQ toggle, text selection and the focus outline. Brighter in dark mode (graphite-signal). Always paired with signal-ink text, never white.
- **Signal Text** (signal-text): the darker orange used when orange must be read as text on paper: part names in the parts list, the result row of a work sheet, form errors, FAQ question hover. In dark mode it lightens (graphite-signal-text).

### Neutral
- **Manual Paper** (paper): page background; also the field behind callout bubbles and the outline around the mobile WhatsApp bar.
- **Second Sheet** (paper-2): alternate sections (process, about), the composer's message preview, the case-back plate in the drawing. In dark mode it is the contact block's ground.
- **Part Fill** (part-fill): fill inside drawn parts and text fields, a shade lighter than paper so parts read as solid objects.
- **Ink** (ink): text, drawing strokes, 1.5px frames and table-head rules, the hover state of every button, the light-mode contact block.
- **Grey Ink** (ink-2): secondary copy, intros, captions, table keys, leader lines at rest.
- **Hairline** (rule): 1px row dividers, section top rules, header rule once scrolled.
- **Strong Hairline** (rule-strong): chip and field borders, dashed placeholder frames, dotted data sub-rows, the process rail, scrollbar thumb.
- **Graphite set** (graphite-*): the dark-mode reprint of each neutral above, mapped one to one.

### Named Rules
**The Single Signal Rule.** Orange marks the primary action or the one element currently lit, focused or selected. Never decoration, never a section background, never a second accent. If two unrelated things are orange at once, one is wrong.

**The Text-Orange Rule.** Orange as text on paper uses signal-text, never signal; signal is for fills, strokes and outlines.

**The Graphite Reprint Rule.** Dark mode swaps the paper and ink values and nothing else. The contact block, ink-black in light mode, stays graphite (paper-2) in dark mode rather than inverting to a light slab.

## Typography

**Display Font:** Archivo variable, width 125% (with Arial Narrow, system-ui)
**Body Font:** Archivo variable, width 100%
**Label Font:** Archivo variable, width 112%, uppercase

**Character:** One self-hosted variable family doing all the work through its width axis: extended heavy headings read like a manual's stamped titles, semi-extended for UI and labels, normal width for reading. Tabular numerals throughout so part numbers and steps align.

### Hierarchy
- **Display** (800, step-4, 0.96, width 125%): the page's single h1 and the 404 title. Balanced wrapping.
- **Headline** (800, step-3, 1.0, width 125%): section titles. May carry a second line in normal width, weight 400, grey ink, as a subtitle inside the heading.
- **Title** (700, step-2, 1.12, width 112%): parts-list symptoms, process panel titles, mobile menu links.
- **Lede** (400, step-1, 1.45): hero and about intro copy, grey ink, max 34ch, key phrase in ink 600.
- **Body** (400, step-0, 1.55): running copy, intros capped at 46ch, FAQ answers at 60ch.
- **Label** (650–700, step--1, 0.06–0.08em, uppercase, width 112%): figure numbers, sheet and title-block keys, part names, data-row keys.

### Named Rules
**The Caption-Not-Kicker Rule.** Uppercase labels live where a manual puts them: in figure captions, sheet footers, table keys and the title block. Nothing small and uppercase sits above a heading.

**The Width Axis Rule.** Emphasis is set with Archivo's width (100 / 112 / 125) and weight, never with a second family or italics.

## Layout

A centred sheet capped at 1240px with a fluid gutter (1rem to 2.5rem). Sections are separated by a 1px rule and generous fluid padding (space-8); alternate sections switch to paper-2. Section heads are a two-column grid: heading left, intro right, bottom-aligned.

Desktop compositions are asymmetric two-column splits (hero 0.85/1.15 copy/drawing, parts list 1.15/0.85 list/sticky figure, about 0.7/1.3, FAQ 0.8/1.2 with a sticky head). The services drawing (Fig. 2) stays sticky under the 4.25rem header while the parts list scrolls.

At 960px and below everything collapses to one column, the sticky figure is removed, and the menu becomes a full-screen sheet of large extended links. At 720px and below the parts row tightens, the process becomes a vertical rail, the title block goes to two columns, and a fixed WhatsApp bar sits at the bottom (body gains 4.5rem bottom padding). Spacing follows the space-1 to space-8 scale; tap targets are at least 44px.

## Elevation & Depth

The system is flat. No elevation shadows exist: depth is conveyed by paper tone (paper vs paper-2 vs part-fill), by frames (1.5px ink around sheets and the title block), and by rule weight. The only box-shadow in the build is a 3px translucent orange halo on focused text fields, a focus state, not elevation.

### Named Rules
**The Flat Print Rule.** Nothing lifts off the sheet. Where an element must separate from what scrolls under it (the mobile WhatsApp bar), it gets a 1.5px ink border plus a 4px paper outline, the way a printed sticker is cut out, not a shadow.

## Shapes

Square corners on every box, button, chip, field and frame (0px). The only curves are the numbered callout circles (bubbles in the drawing, part numbers, step numbers, the brand mark, the FAQ toggle), always 50% circles with a 1.4–1.5px stroke.

Line has meaning: solid 1.5px ink heads a table or frames a document; solid 1px hairline divides rows; dotted divides data sub-rows inside a sheet; dashed marks something provisional (the photo placeholder, the "Caso de ejemplo" tag, the unsent message preview, the open case outline in the drawing).

### Named Rules
**The Square-Except-Callouts Rule.** If it is not a numbered callout, its corners are square.

**The Dashed-Means-Provisional Rule.** A dashed border says "placeholder, example or draft". Real content never gets one.

## Components

### Buttons
Printed tabs: square, bold, semi-extended.
- **Shape:** square (0px), 1.5px border matching the fill.
- **Primary:** signal fill, signal-ink text, weight 650, min height 48px; large variant 56px with a leading callout number ("01") ring; small 40px for the header.
- **Hover / Focus:** fills with ink and paper text (0.2s, ease-out); pressed nudges down 1px; focus is a 2px orange outline offset 3px.
- **Quiet link:** grey ink, underlined in rule-strong; underline turns orange on hover. Used for the secondary phone action.
- **Icon button:** 44px square, 1px hairline border darkening to ink on hover (theme toggle, menu).

### Chips
- **Style:** square, 1.2px rule-strong border, no fill, 44px min height, small 550 text.
- **State:** hover darkens the border to ink; selected fills with signal and signal-ink text. Used as multi-select symptom checkboxes.

### Cards / Containers
- **Work sheets:** a single 1.5px ink frame holding three sheets divided by strong hairlines (stacking below 1080px). Each sheet: title, dotted key/value rows (last row in signal-text), footer row with the "Ficha A" label left and a dashed "Caso de ejemplo" tag right.
- **Composer:** paper panel with a 1px hairline, fluid padding, sitting inside the contact block.
- **Shadow Strategy:** none (see Elevation & Depth).

### Inputs / Fields
- **Style:** square, 1.2px rule-strong border, part-fill ground, labels at 650 semi-extended above.
- **Focus:** border turns signal with a 3px translucent orange halo; hover darkens the border to ink.
- **Error:** message and legend switch to signal-text, weight 600.

### Navigation
Small 550 semi-extended links in the sticky paper header; a 2px orange underline draws in from the left on hover and for the current section. The header gains a hairline once scrolled. At 960px and below a full-screen paper menu lists extended 750 links divided by hairlines, ending in a full-width primary button.

### Exploded View and Parts List (signature)
The drawing and the parts table are one instrument linked by part id. Parts are drawn in ink at 1.1px (detail lines 0.8px) over part-fill; numbered bubbles sit on leader lines. On load the parts start assembled inside the dashed case and separate once (0.9s ease-out, staggered), then callouts fade in. Hovering or focusing a row lights the matching part, leader and bubble in orange, and vice versa: the row gets a 2px orange top bar that draws from the left, a 6% orange wash, and its number fills orange. On desktop the second drawing (Fig. 2) is sticky beside the list; at 960px and below it is removed and the row nearest the viewport centre lights as you scroll. Every figure has a caption reading "Fig. N" in the label style followed by grey ink.

### Process Rail
Five numbered circles on a 2px rule-strong rail; done steps fill ink, the active step fills signal, and the orange fill grows along the rail with an ink "your equipment is here" marker above it. Below 720px it becomes a vertical rail with an inline ink tag on the active step.

### Title Block
The footer is a drawing title block: a 1.5px ink frame split into labelled cells (technician, service, sheet, year) with uppercase keys and 550 values.

## Do's and Don'ts

### Do:
- **Do** keep orange to the primary action and the single lit, focused or selected element; use signal-text when orange is text on paper.
- **Do** put uppercase labels in captions ("Fig. N"), sheet footers, table keys and the title block.
- **Do** caption every figure as "Fig. N" followed by a plain grey description.
- **Do** separate floating elements with a 1.5px ink border and a 4px paper outline instead of a shadow.
- **Do** link any new drawing to its list or text through the shared part id so both light together.
- **Do** keep placeholders ("Tu Nombre", "Tu Ciudad", example cases) visibly provisional, with a dashed frame or "Caso de ejemplo" tag where they stand in for real content.
- **Do** reprint dark mode with the graphite set and keep the contact block graphite (paper-2).

### Don't:
- **Don't** place a kicker or eyebrow label above a heading.
- **Don't** use elevation shadows, glass, blur or visible gradients.
- **Don't** round corners on anything but numbered callout circles.
- **Don't** add a second accent colour or use orange as a section background.
- **Don't** introduce a second typeface or icon glyph fonts; icons are inline SVG sprites at 1.25em.
- **Don't** fall back to a dark-tech hero with a stock PC photo and a row of icon cards.
