# Demo video script (~75 seconds)

Contest judges skim hundreds of these. Open on the differentiator, not a logo screen. Screen-record
at 1080p, cursor visible, no dead air — cut the moment a beat lands.

---

**[0:00–0:08] Hook — open ON the skill map, not the landing copy**
Land straight on the intro screen so the empty skill map is the first thing judges see.
Voiceover (or on-screen text card): *"Most adaptive quizzes ask harder questions. This one
finds where your math actually breaks — and builds backward from there."*

**[0:08–0:15] Start the diagnostic**
Click "Start diagnostic." Answer the first 2-3 questions live (mix a correct and a wrong
answer on purpose). Point out — verbally or with a text callout — that the map above the
question lights up gold (★) or red (✕) in real time as each skill resolves.

**[0:15–0:30] Show the skip logic — this is the differentiator, don't rush it**
Deliberately miss both questions on a skill (e.g. multiplication facts) so it resolves as a
gap. Then let the next question load — call out on screen: *"It just skipped division facts
entirely — no point testing it on a shaky foundation."* Watch a downstream node turn grey
("blocked") without a question being asked. This 10 seconds is the single best proof the
agent is reasoning, not just branching on difficulty.

**[0:30–0:45] The gap report**
Cut to the finished gap report. The full skill map is now colored in. Zoom/highlight the
**root gap** callout box — say out loud *"not the first gap it found, the earliest one — the
one everything else depends on."* Click the red circled node directly on the map.

**[0:45–1:05] The generated lesson**
Show the loading state briefly (proves it's a live API call, not canned content), then the
lesson. Scroll through hook → build-on-known → worked example → practice. Pause 2 seconds on
the "Building on what you know" section and read it aloud if it explicitly names a skill the
learner actually got right earlier — that's the payoff of the whole diagnostic.

**[1:05–1:15] Close**
Cut back to the full colored skill map. Text card: *"Math Skills Builder — diagnoses the
gap, builds from exactly there."* End on the repo/live URL card.

---

## Shot list checklist

- [ ] Record at 1080p+, browser chrome trimmed or hidden if possible
- [ ] Rehearse the "miss two questions on purpose" beat so it's not awkward on camera
- [ ] Confirm `ANTHROPIC_API_KEY` is set on the deployed instance before recording — a lesson
      generation error on camera is the one thing to avoid
- [ ] Keep total runtime under 90 seconds — judges reward respect for their time
- [ ] Caption or voice over the two moments that prove *reasoning* (skip logic, root-gap
      selection) — everything else is self-explanatory from the UI
- [ ] End with a URL or QR code on screen for at least 3 seconds
