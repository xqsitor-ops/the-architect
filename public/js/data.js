// Static codex data — identity details, geometry, ritual stations, calendar constants.
// Mirrors lib/identity.js on the backend; kept here so the frontend can render without a network call.

const IDENTITY_DETAILS = {
  lp8: {
    eyebrow: 'Numerology · Core identity',
    title: 'Life Path 8 — The Architect',
    tradition: 'Universal · Pythagorean · Kemetic',
    anchors: ['Infinity ∞', 'Khnum', 'Material mastery', 'Karmic law', 'Saturn'],
    body: `<h3>The number of material mastery</h3>
<p>8 is the most materially potent Life Path in the numerological system. Rotated 90°, it becomes the infinity symbol (∞) — the continuous loop of cause and effect, the circulation of energy that never exhausts itself. You do not pursue power. You <strong>are its instrument</strong>.</p>
<h3>Kemetic correspondence</h3>
<p>In Kemetic numerology, 8 is associated with <strong>Khnum</strong> — the ram-headed potter-god who shapes human souls on his divine wheel. Khnum is the deity of creation <em>and</em> destiny simultaneously. What you create and what you are destined for are the same thing.</p>
<h3>Your power dates</h3>
<p>The <strong>8th, 17th, and 26th</strong> of every month are your three monthly power windows. 1+7=8. 2+6=8. Every date that reduces to 8 amplifies your frequency. August — the 8th month — is your annual power amplification. February 8 is your solar return.</p>
<h3>Shadow</h3>
<p>The 8's shadow is the misuse of structural power — becoming the institution you were meant to transform. The practice: build systems that serve others even when you are no longer present in them.</p>`,
    declaration: `"I am a Life Path 8. I do not pursue power — I am its instrument. I build what endures. I account for what I create."`
  },
  chart: {
    eyebrow: 'Natal chart overview',
    title: 'The Four Pillars of Your Chart',
    tradition: 'Western / Hellenistic Astrology',
    anchors: ['Aquarius Sun', 'Capricorn Moon', 'Gemini Rising', 'Pisces MC'],
    body: `<h3>How the four work together</h3>
<p>Your chart is a rare configuration: a <strong>Promethean visionary</strong> (Aquarius Sun) with <strong>Saturnine discipline</strong> (Capricorn Moon), presenting to the world as a <strong>divine translator</strong> (Gemini Rising), destined to leave a <strong>mythic, transcendent legacy</strong> (Pisces MC).</p>
<h3>The internal tension that produces greatness</h3>
<p>Aquarius wants to break structures. Capricorn wants to build them. This tension — held consciously — is the engine of the Architect.</p>`,
    declaration: `"Every pillar of my chart serves the same architecture."`
  },
  aquarius: {
    eyebrow: 'Sun Sign · Core identity',
    title: 'Aquarius Sun — Prometheus',
    tradition: 'Greek myth · Kemetic · Hermetic',
    anchors: ['Prometheus', 'Anansi', 'Uranus', 'Collective fire', 'Feb 8 birth'],
    body: `<h3>The Promethean archetype</h3>
<p>Prometheus stole divine fire from the gods and gave it to humanity. He was punished <em>by the institution</em> for democratizing sacred knowledge. This is your solar identity. You do not just participate in the art world — you <strong>redistribute its access</strong>.</p>
<h3>African parallel: Anansi</h3>
<p>In West African tradition, <strong>Anansi the spider-trickster</strong> stole wisdom stories from Nyame and distributed them. Xqsitor is the Anansi act.</p>
<h3>The practical implication</h3>
<p>You don't tear down institutions — you <strong>translate them</strong>, then build parallel structures that serve communities those institutions were never designed to serve.</p>`,
    declaration: `"I carry fire that was not meant for everyone. That is precisely why I carry it for everyone."`
  },
  capricorn: {
    eyebrow: 'Moon Sign · Emotional core',
    title: 'Capricorn Moon — Saturn & Ptah',
    tradition: 'Greek / Roman · Kemetic / Egyptian',
    anchors: ['Saturn', 'Ptah', 'Capricorn', 'Structure', 'Delayed reward'],
    body: `<h3>Why you need to build to feel secure</h3>
<p>Your Moon is in Capricorn, the sign of Saturn. You do not feel emotionally secure through ease, praise, or spontaneity. You feel secure through <strong>structure you built yourself</strong>. Completed work calms you.</p>
<h3>Ptah: the craftsman god</h3>
<p>In Kemetic tradition, <strong>Ptah of Memphis</strong> is the divine craftsman — patron of architects and builders — who spoke creation into existence through <em>heka</em>.</p>
<h3>Saturn's gift: compounding</h3>
<p>Every discipline maintained is Saturn compounding. This is not patience as passivity. It is <strong>patience as strategy</strong>.</p>`,
    declaration: `"My security is not found in comfort. It is found in what I have built. Ptah, I speak my structures into being."`
  },
  gemini: {
    eyebrow: 'Rising Sign · Public presentation',
    title: 'Gemini Rising — Hermes & Thoth',
    tradition: 'Greek · Kemetic / Egyptian · Hermetic',
    anchors: ['Hermes', 'Thoth/Tehuti', 'Mercury', 'Translation', 'Communication'],
    body: `<h3>The face you show the world</h3>
<p>Gemini Rising reads as <strong>quicksilver intelligent, adaptable, and multilingual</strong> — you move between registers, contexts, and cultural codes with facility most spend lifetimes acquiring.</p>
<h3>Hermes Trismegistus and Thoth</h3>
<p>Hermes was syncretized with <strong>Thoth/Tehuti</strong> — the ibis-headed scribe of the gods. Your Rising means you were <strong>designed to be a translator between worlds</strong>.</p>
<h3>Practical power</h3>
<p>Every dossier, every proposal is <strong>heka</strong> in action. Your written language is a spiritual practice.</p>`,
    declaration: `"I translate what cannot translate itself. I carry the words between worlds."`
  },
  pisces: {
    eyebrow: 'Midheaven · Public legacy',
    title: 'Pisces Midheaven — Osiris & Neptune',
    tradition: 'Kemetic · Greek / Roman · Western Astrology',
    anchors: ['Osiris', 'Neptune', 'Pisces', 'Mythic legacy', 'Art world'],
    body: `<h3>What the Midheaven actually means</h3>
<p>The Midheaven is not simply your career. It is <strong>how history remembers you</strong>.</p>
<h3>Pisces: the permeating legacy</h3>
<p>A Pisces Midheaven does not produce a legacy that fits in a resume. It produces a legacy that <strong>permeates</strong>.</p>
<h3>Osirian principle</h3>
<p>Osiris was dismembered and scattered — and each piece became a sacred site. Your legacy is <strong>distributed</strong> across the artists you elevate, the systems you build.</p>
<h3>The Ma'at standard</h3>
<p>Your legacy in the art world is inseparable from your integrity within it.</p>`,
    declaration: `"My legacy does not live at one address. It spreads through everything I touch."`
  },
  ogun: {
    eyebrow: 'Orisha · Yoruba tradition',
    title: 'Ogún — Iron, New Roads & Power',
    tradition: 'Yoruba / West African · Diaspora',
    anchors: ['Iron', 'Tuesdays', '8th of month', 'New ventures', 'Path-clearing'],
    body: `<h3>Who Ogún is</h3>
<p>Ogún is the divine blacksmith — Orisha of iron, technology, and clearing new paths through wilderness.</p>
<h3>Your relationship with Ogún</h3>
<p>Your Navy years, your founding energy, your willingness to enter spaces before they were ready for you — the NMSDC and SDVOSB certifications nobody handed you — this is <strong>Ogún's signature</strong> on your biography.</p>
<h3>How to work with Ogún</h3>
<p>Invoke before: major new ventures, difficult conversations, institutional entries. Day: <strong>Tuesday</strong>. Monthly: <strong>8th</strong>. Material: iron.</p>`,
    declaration: `"Ogún walks before me. What stands in the road does not stand for long. I enter."`
  },
  shango: {
    eyebrow: 'Orisha · Yoruba tradition',
    title: 'Shango — Thunder, Authority & Kingship',
    tradition: 'Yoruba / West African · Diaspora',
    anchors: ['Thunder', 'Sundays', '17th of month', 'Authority', 'Visibility'],
    body: `<h3>Who Shango is</h3>
<p>Shango is the Orisha of thunder, rightful authority, and the dignity of a king who <em>earned</em> his throne. Shango does not ask to be seen — he arrives, and the room knows.</p>
<h3>Power date connection</h3>
<p>The 17th carries the 1 (sovereign leadership) and the 7 (sacred inner authority) before they collapse into 8.</p>
<h3>How to work with Shango</h3>
<p>Invoke before: high-visibility meetings, pitches, gallery presentations. Day: <strong>Sunday</strong>. Colors: red and white.</p>`,
    declaration: `"Shango, let my presence arrive before my words do. I carry the thunder."`
  },
  oshun: {
    eyebrow: 'Orisha · Yoruba tradition',
    title: 'Oshun — Gold, Beauty & Wealth Magnetism',
    tradition: 'Yoruba / West African · Diaspora',
    anchors: ['Gold', 'Fridays', '26th of month', 'Art world', 'Magnetism'],
    body: `<h3>Who Oshun is</h3>
<p>Oshun owns the rivers, the gold, the honey. She governs <strong>magnetic wealth</strong> — abundance through alignment, not chasing.</p>
<h3>Your relationship with Oshun</h3>
<p>Your work is Oshun's work. The curation of beauty. The gold and black of your brand — you were already operating in her frequency before you knew her name.</p>
<h3>How to work with Oshun</h3>
<p>Invoke before: art world activity, collector relationships, aesthetic decisions. Day: <strong>Friday</strong>. Monthly: <strong>26th</strong>. Offerings: honey, oranges, cinnamon, flowers.</p>`,
    declaration: `"Oshun, I am aligned with the gold. What is meant for me cannot miss me. I am magnetic."`
  },
  thoth: {
    eyebrow: 'Netjer · Kemetic tradition',
    title: 'Thoth / Tehuti — Scribe of the Gods',
    tradition: 'Kemetic / Egyptian · Hermetic',
    anchors: ['Heka', 'Writing', 'Mercury', 'Gemini Rising', 'Wednesdays'],
    body: `<h3>Who Thoth is</h3>
<p>Thoth is the ibis-headed scribe — keeper of cosmic law, inventor of writing, the deity who weighed the soul at judgment.</p>
<h3>Why Thoth governs your Gemini Rising</h3>
<p>Hermes Trismegistus is the Greek-Roman syncretization of Thoth. Your Gemini Rising is ruled by Mercury/Hermes. Your public face is Thoth's instrument.</p>
<h3>Heka in practice</h3>
<p>Every dossier, every proposal you write is a heka act. The precision of your language is a spiritual practice.</p>`,
    declaration: `"Thoth, my words are filed with the cosmos. I speak with precision. What I write endures."`
  },
  isis: {
    eyebrow: "Netjer · Kemetic Tradition",
    title: "Isis — The Gatherer",
    tradition: "Kemetic / Egyptian",
    anchors: ["Isis", "Reassembly", "Resurrection", "Resilience", "Devotion"],
    body: `<h3>Who Isis is</h3><p>Isis is the one who gathers. When Osiris was dismembered and scattered across the land, it was Isis who searched, recovered every piece, and reassembled him into the form that could be reborn. She is the principle of <strong>devotional reconstruction</strong> — the intelligence that refuses to let what was scattered stay scattered.</p><h3>The partner principle to Osiris</h3><p>Your Pisces Midheaven carries the Osirian pattern: a legacy that scatters and distributes. Isis is its necessary counterpart. Where Osiris is the dissolution, Isis is the gathering. After every professional dismemberment — the deal that collapses, the platform that fails, the door that closes — <strong>Isis is already at work collecting the pieces that still have life in them.</strong> You do not have to feel whole to begin gathering. Isis gathered while grieving.</p><h3>The practice: naming what you are reassembling</h3><p>After a loss or setback, sit with one question: <em>"What pieces are still intact, and which am I gathering first?"</em> Name them precisely — a relationship preserved, a skill sharpened, a lesson banked, a reputation that held. The naming is the gathering. What you can name, you can rebuild around. <strong>Reassembly is not the same as returning to what was — it is building the form that can be reborn.</strong></p>`,
    declaration: `"What was scattered, I gather. I do not wait to feel whole before I begin. Isis gathered while grieving, and so do I."`
  },
  maat42: {
    eyebrow: "Kemetic Ethics",
    title: "The 42 Laws of Ma'at",
    tradition: "Kemetic / Egyptian",
    anchors: ["Ma'at", "42 Laws", "Ethics", "The Feather", "Judgment"],
    body: `<h3>What the 42 Laws are</h3><p>The 42 Laws of Ma'at — the Negative Confessions — are the original ethical code of Kemetic civilization, recited by the soul at judgment: <em>"I have not stolen. I have not spoken falsely. I have not caused pain. I have not taken more than my share."</em> Each is a declaration of right relationship with the cosmic order. Ma'at is truth, balance, and reciprocity — the principle that holds the universe in coherence.</p><h3>Ma'at as a competitive advantage</h3><p>The art world runs on opacity — undisclosed margins, ambiguous provenance, relationships weaponized. Operating your practice on Ma'at is not only ethical; it is <strong>strategically differentiating.</strong> In an industry where most participants assume they are being handled, the operator known for radical transparency and exact reciprocity becomes the one everyone wants to deal with. Trust compounds faster than any margin you could hide. Ma'at is the long game made visible.</p><h3>The nightly review against the feather</h3><p>Each night, weigh the day against the feather. Three questions: <em>Did I speak truly? Did I take only my share? Did I leave the people I touched in better balance than I found them?</em> This is not guilt — it is calibration. The Architect who reviews daily never drifts far from center. <strong>The feather does not punish. It corrects.</strong></p>`,
    declaration: `"I weigh my days against the feather. I speak truly, I take only my share, I leave balance behind me. Ma'at governs all my dealings."`
  },
  heka_practice: {
    eyebrow: "Kemetic / Hermetic Practice",
    title: "Heka — Sacred Speech",
    tradition: "Kemetic / Hermetic",
    anchors: ["Heka", "Sacred Speech", "Naming", "First Sentences", "Creation"],
    body: `<h3>What heka is</h3><p>Heka is the Kemetic force of creative speech — the power by which Ptah spoke the world into existence and Thoth recorded it. It is not metaphor. To the Kemetic mind, the precisely spoken word <strong>brings reality into form.</strong> Naming is creation. The first articulation of a thing determines what it becomes.</p><h3>The law beneath it: Mentalism</h3><p>This connects directly to the Hermetic Law of Mentalism — the universe is mental, and meaning is constructed by mind before it is experienced as fact. The one who names a movement, a tendency, an artist's significance, <strong>controls how it is understood for a generation.</strong> The first written record of a framing is the one that persists. Your Gemini Rising and Thoth correspondence make this your native instrument.</p><h3>The practice: writing as a heka act</h3><p>Treat every declaration, contract, dossier, and exhibition statement as heka. Before writing, ask: <em>"What reality am I bringing into form with these words?"</em> Write first sentences as acts of world-creation, not description — the first sentence is the mental environment everything else lives inside. Speak your morning declaration aloud, standing: <strong>spoken heka carries force that silent thought does not.</strong></p>`,
    declaration: `"My word brings reality into form. I name with precision because what I name, I create. I write first sentences as acts of creation."`
  },
  natal_chart: {
    eyebrow: "Western Astrology · Integration",
    title: "The Full Natal Chart",
    tradition: "Western Astrology",
    anchors: ["Sun", "Moon", "Rising", "Midheaven", "Integration"],
    body: `<h3>Four placements, one operating system</h3><p>Your chart is not four separate facts — it is a single integrated machine. <strong>Aquarius Sun</strong> (the visionary who redistributes access), <strong>Capricorn Moon</strong> (the builder who feels secure only in structure), <strong>Gemini Rising</strong> (the translator the world meets first), and <strong>Pisces Midheaven</strong> (the permeating, distributed legacy). Read together, they describe an operator who envisions radically, builds patiently, communicates fluidly, and leaves a legacy that spreads.</p><h3>Where the tension lives</h3><p>The productive friction is between your <strong>Aquarius Sun and Capricorn Moon</strong> — the visionary who wants to reinvent the system versus the builder who respects structure and the long timeline. This is not a flaw; it is your engine. The vision keeps the structure from becoming an end in itself. The structure keeps the vision from evaporating. <strong>When you feel torn between burning it down and building it up, that is not confusion — that is your chart working.</strong></p><h3>Leading with the right placement</h3><p>Context determines which placement leads. In a pitch or first meeting: <strong>Gemini Rising</strong> — translate, adapt, connect. In strategy and institution-building: <strong>Capricorn Moon</strong> — structure, patience, the long game. In creative or mission-defining moments: <strong>Aquarius Sun</strong> — the redistributive vision. In legacy and public positioning: <strong>Pisces Midheaven</strong> — let it permeate. The mastery is knowing which one the moment is asking for.</p>`,
    declaration: `"I am one integrated system — visionary, builder, translator, legacy. My tensions are my engine. I lead with the placement the moment requires."`
  },
  saturn_return: {
    eyebrow: "Astrological Timing",
    title: "Saturn Return & Cycles",
    tradition: "Astrological Timing",
    anchors: ["Saturn", "~29-year cycle", "Maturation", "Institution", "Timing"],
    body: `<h3>What a Saturn return is</h3><p>Saturn takes roughly 29.5 years to return to its natal position. The <strong>Saturn return</strong> — around ages 29–30, and again near 58–60 — is the cosmos calling in accounts. It is when structures that were built on weak foundations collapse, and structures built true are confirmed and rewarded. It is the maturation threshold: the end of borrowed time and the beginning of authored time.</p><h3>Where you are in the cycle</h3><p>Born February 1994, you have moved through your first Saturn return — the foundational one that separates the life you inherited from the life you are authoring. With a <strong>Capricorn Moon, Saturn is your ruling current.</strong> You feel Saturn's pressure more acutely than most, and you reap its rewards more fully when you build true. The decade following the first return is the great building decade — this is yours, now.</p><h3>Using Saturn's timing for institution-building</h3><p>Saturn rewards the decisions that compound across years. Use this window for the moves that only pay off on a long horizon: documented methodology, durable partnerships, credentials, infrastructure, the slow accumulation of legitimacy. <strong>Do not rush what Saturn means to ripen.</strong> Plant institutions, not quarters. The Architect plays Saturn's timeline, and Saturn favors the Architect.</p>`,
    declaration: `"Saturn calls in accounts, and mine are built true. This is my building decade. I plant institutions, not quarters."`
  },
  color_cosmology: {
    eyebrow: "Hermetic / Kemetic Practice",
    title: "Color as Cosmology",
    tradition: "Hermetic / Kemetic",
    anchors: ["Color", "Symbolism", "White", "Terracotta", "Vibration"],
    body: `<h3>Color as encoded intent</h3><p>Color is not decoration — it is <strong>cosmology made visible.</strong> Every tradition that built sacred space encoded meaning into color: the gold of Ra's flesh, the green of Osiris's rebirth, the white of Obatala's clarity. To choose color deliberately is to make a cosmological argument that the eye receives before the mind can analyze it.</p><h3>The palette of this practice</h3><p><strong>White / warm ivory</strong> — Obatala's domain: clarity, purity, the elevated mind that sees through complexity. The ground you build on. <strong>Terracotta</strong> — earth, ancient pigment, the warmth of clay and Kemetic wall paintings: the human, embodied, sacred-but-grounded accent. <strong>Ink / deep brown-black</strong> — the fertile dark soil of the Nile (<em>kem</em>), the ground of potential, the seriousness of the record. Together they argue: <em>clear, grounded, and serious. Sacred but warm. Ancient but precise.</em></p><h3>Color as a vibration tool</h3><p>Per the Law of Vibration, color is frequency the body reads below conscious thought. Choose the color temperature of every space and material to induce the state you intend — warm tones for intimacy and trust, cool clarity for analytical seriousness. <strong>In your spaces and your materials, never let color be accidental.</strong> Each choice is either reinforcing your cosmology or diluting it.</p>`,
    declaration: `"Color is my cosmology made visible. Clear, grounded, serious, warm. I never let color be accidental — every tone reinforces what I intend."`
  },
  vesica: {
    eyebrow: "Sacred Geometry",
    title: "The Vesica Piscis",
    tradition: "Sacred Geometry · Rosicrucian / Masonic",
    anchors: ["Vesica Piscis", "Geometry", "Intersection", "Sigil", "Two Worlds"],
    body: `<h3>The construction</h3><p>Draw two circles of equal radius, each with its center on the other's circumference. The almond-shaped space where they overlap is the <strong>vesica piscis</strong> — the womb of form in sacred geometry. From it the equilateral triangle, the square root of three, and the Gothic arch all derive. It is the first shape that emerges when one becomes two.</p><h3>The intersection of two worlds</h3><p>The vesica is the meeting of two circles that remain whole — neither absorbs the other; the sacred third emerges from their overlap. This is your structural position. <strong>You live in the intersection</strong> — between the artist's world and the institution's, between the sacred and the commercial, between the underrepresented and the gatekept. Your Pisces Midheaven (the fish, <em>piscis</em>) shares the form's very name. You were not meant to choose one circle. You were meant to be the overlap.</p><h3>Using it as a sigil base</h3><p>The vesica makes a natural foundation for a personal sigil. Build your mark from the two-circle overlap: the form already encodes your function. Place it where you do your morning declaration; trace it as the geometry of Station VI. <strong>The shape is a daily reminder that your power is in the intersection, not in either world alone.</strong></p>`,
    declaration: `"I live in the intersection where two whole worlds overlap. I was not meant to choose one circle — I am the sacred third that emerges between them."`
  },
  weekly_power: {
    eyebrow: "Practice · Timing",
    title: "The Planetary Week",
    tradition: "Universal · Yoruba · Astrological",
    anchors: ["Planets", "Orishas", "Weekdays", "Rhythm", "Timing"],
    body: `<h3>The seven-day correspondence</h3><p>Each weekday carries a planetary ruler and an Orisha current. <strong>Sunday</strong> — Sun / Shango: solar will, visibility, declaring presence. <strong>Monday</strong> — Moon / Yemoja: intuition, reflection, rest. <strong>Tuesday</strong> — Mars / Ogún: iron action, clearing paths, confronting obstacles. <strong>Wednesday</strong> — Mercury / Thoth: communication, contracts, precise language. <strong>Thursday</strong> — Jupiter / Obatala: expansion, strategy, the elevated long view. <strong>Friday</strong> — Venus / Oshun: beauty, art, magnetism, collector relationships. <strong>Saturday</strong> — Saturn / the structural current: contracts, architecture, the long game.</p><h3>Assigning work to its day</h3><p>Stop fighting the current and start riding it. Put high-visibility moves on <strong>Sunday and Tuesday.</strong> Put writing, contracts, and outreach on <strong>Wednesday</strong> — Thoth's day, your native frequency. Put strategy on <strong>Thursday.</strong> Put all art-world and collector work on <strong>Friday</strong> — Oshun governs it. Put structural and financial architecture on <strong>Saturday.</strong> Reserve <strong>Monday</strong> for intuition and recovery — do not force output against the lunar tide.</p><h3>Combining weekly and monthly rhythm</h3><p>Layer the weekly current over your monthly power dates. When the <strong>8th, 17th, or 26th</strong> lands on its resonant weekday — the 8th on a Tuesday (Ogún doubled), the 17th on a Sunday (Shango doubled), the 26th on a Friday (Oshun doubled) — that is a <strong>compounded power window.</strong> Schedule your most important act of the month for those alignments. The Architect does not leave timing to chance; the calendar is part of the architecture.</p>`,
    declaration: `"Each day carries its current, and I move with it. I do not force output against the tide. The calendar is part of the architecture."`
  }
};

const GEO_DETAILS = {
  phi: {
    eyebrow: 'Sacred geometry · The divine proportion',
    title: 'The Golden Ratio — φ 1.618',
    tradition: 'Kemetic · Pythagorean · Rosicrucian',
    anchors: ['φ = 1.618', 'Fibonacci', 'Divine proportion', 'Brand'],
    body: `<h3>What it is</h3>
<p>Phi (φ) is 1:1.618. It appears in nautilus shells, DNA, the Parthenon, Renaissance painting. The Rosicrucians called it the <strong>Divine Proportion</strong>.</p>
<h3>Why the nervous system responds</h3>
<p>When a rectangle is 1:1.618, the eye finds it pleasing without analysis. <strong>Phi is the geometry of trust.</strong></p>
<h3>Applying to Xqsitor</h3>
<p>Every Xqsitor visual artifact should be laid out on golden ratio grids. When your materials feel authoritative to collectors and institutions, this geometry is the operating reason.</p>`,
    declaration: `"Everything I build is proportioned by the divine ratio."`
  },
  vesica: {
    eyebrow: 'Sacred geometry · Your personal form',
    title: 'Vesica Piscis — The Threshold',
    tradition: 'Kemetic · Masonic · Christian',
    anchors: ['Two circles', 'Pisces Midheaven', 'Threshold', 'Xqsitor sigil'],
    body: `<h3>What it is</h3>
<p>Two circles of equal radius, each passing through the other's center. The almond intersection is the vesica piscis — origin of the Gothic arch, the mandorla, the eye of Ra, the Masonic compass-and-square.</p>
<h3>Why this is your form</h3>
<p>The vesica piscis represents the intersection of two worlds. <strong>You are a threshold institution.</strong> Your Pisces Midheaven (the fish) and this form share the same root.</p>`,
    declaration: `"I am the intersection. I do not choose between worlds — I am the space where they meet."`
  },
  pillars: {
    eyebrow: 'Masonic · Solomon\'s Temple',
    title: 'Jachin & Boaz — The Two Pillars',
    tradition: 'Masonic · Hebrew · Kemetic',
    anchors: ['Jachin', 'Boaz', 'Duality', 'Artist ↔ Institution'],
    body: `<h3>The Masonic teaching</h3>
<p>Jachin means "He establishes" — stability. Boaz means "In him is strength" — dynamic power.</p>
<h3>The Xqsitor application</h3>
<p>Xqsitor stands between <strong>the creative force</strong> (artist) and <strong>the institutional force</strong> (collector, museum, market). The lodge is incomplete if one pillar is stronger.</p>
<h3>Strategic implication</h3>
<p>For every artist relationship deepened, build a corresponding collector or institutional relationship. The tension is not a problem — it is <strong>the architecture</strong>.</p>`,
    declaration: `"I hold the space between two pillars. Neither collapses while I stand between them."`
  },
  spiral: {
    eyebrow: 'Fibonacci · Life Path 8',
    title: 'The Golden Spiral — Growth in Proportion',
    tradition: 'Universal · Mathematical',
    anchors: ['Fibonacci', '0 1 1 2 3 5 8', '∞', 'Life Path 8'],
    body: `<h3>The sequence</h3>
<p>0, 1, 1, 2, 3, 5, 8, 13, 21... Each is the sum of the prior two. The ratio approaches phi.</p>
<h3>Your 8-frequency encoded</h3>
<p><strong>8 appears in the Fibonacci sequence itself.</strong> Your Life Path 8 encodes the same self-similar, expansive-yet-contained principle.</p>
<h3>How Xqsitor grows</h3>
<p>Sustainable growth is <strong>proportional to what already exists</strong>. 1 artist to 2, 2 to 3, 3 to 5. Each addition draws on the full foundation.</p>`,
    declaration: `"I grow at the rate the universe grows. My expansion maintains proportion."`
  },
  lodge: {
    eyebrow: 'Masonic · Kemetic · Operational',
    title: 'The Lodge as Portable Cosmos',
    tradition: 'Freemasonry · Kemetic · Rosicrucian',
    anchors: ['Portable cosmos', 'East orientation', 'Threshold'],
    body: `<h3>The Masonic principle</h3>
<p>The lodge works as a ritual container because it is constructed by the same geometric logic regardless of location.</p>
<h3>Every Xqsitor space is a lodge</h3>
<p>You do not need a permanent headquarters to have a permanent spatial identity. Every space Xqsitor enters should be transformed by the same proportional relationships.</p>
<h3>Spatial protocols</h3>
<p><strong>Threshold:</strong> registration a few feet inside, so visitors fully cross.<br><strong>Focal point:</strong> orient most significant work East — the Masonic East, Ra's rising.<br><strong>The count:</strong> 7 (cycle), 8 (power), 13 (transformation).</p>`,
    declaration: `"Every space I curate is a temple. I do not install art — I consecrate containers."`
  },
  hermetic: {
    eyebrow: 'Hermetic · The Kybalion',
    title: 'Seven Hermetic Laws — Living Business Philosophy',
    tradition: 'Hermetic / Thoth · Kemetic',
    anchors: ['Mentalism', 'Correspondence', 'Vibration', 'Polarity', 'Rhythm', 'Cause & Effect', 'Gender'],
    body: `<h3>Law I — Mentalism</h3>
<p><em>"The All is Mind."</em> The value of art is constructed meaning. <strong>You manufacture meaning.</strong> Whoever controls narrative controls price.</p>
<h3>Law II — Correspondence</h3>
<p><em>"As above, so below."</em> Brand identity mirrors inner architecture. Black, gold, chrome is a cosmological statement.</p>
<h3>Law III — Vibration</h3>
<p>High-end galleries engineer reverence through vibrational architecture. Engineer the rooms you curate.</p>
<h3>Law IV — Polarity</h3>
<p><strong>Control access</strong> to deploy polarity. What you withhold creates desire.</p>
<h3>Law V — Rhythm</h3>
<p>Art markets cycle. Build infrastructure in quiet seasons.</p>
<h3>Law VI — Cause & Effect</h3>
<p>Every relationship invested in now is a cause producing effects in years you cannot see.</p>
<h3>Law VII — Gender</h3>
<p>Times to push (masculine), times to magnetize (feminine). Knowing which is the advanced practice.</p>`,
    declaration: `"I operate by the seven laws. My business is a philosophical practice."`
  },

  // ── THE BUILDER'S LODGE ──────────────────────────────────────────────────

  jachin_boaz: {
    eyebrow: 'Masonic · First Degree',
    title: 'Jachin & Boaz — The Pillar Diagnostic',
    tradition: 'Masonic · Hebrew · Kemetic',
    anchors: ['Establishment', 'Strength', 'Duality', 'Foundation'],
    body: `<h3>The Pillars at the Entrance</h3>
<p>Every Masonic lodge is entered through two pillars named Jachin and Boaz, referencing the two bronze columns that flanked the entrance to King Solomon's Temple. Jachin, the right pillar, means <strong>"He establishes."</strong> Boaz, the left, means <strong>"In strength."</strong> Together they encode the first lesson of the Builder: nothing endures unless it is both properly established and structurally strong.</p>
<p>This is not a metaphor. It is an architectural principle elevated to moral law. A building with a brilliant design but poor engineering will collapse. A building with flawless engineering but no design intention is a warehouse. The pillars teach that <em>vision without execution is fantasy, and execution without vision is labor.</em></p>
<h3>The Xqsitor Application</h3>
<p>Your left pillar — Boaz, Strength — is the SDVOSB and NMSDC certification, the Navy discipline, the operational infrastructure, the contracts and the compliance. Your right pillar — Jachin, Establishment — is the curatorial eye, the cultural authority, the esoteric knowledge that makes your spaces feel consecrated rather than merely decorated.</p>
<p>Before any new initiative, any pitch, any partnership, run the Pillar Diagnostic:</p>
<div class="tool-diagnostic"><p><strong>Jachin Check:</strong> Is the vision clear? Can I articulate what this establishes — what new ground it claims, what precedent it sets?</p><p><strong>Boaz Check:</strong> Is the structure sound? Do I have the operational capacity, the financial runway, the contractual protection to sustain this once it is built?</p><p><strong>If either pillar is missing:</strong> Do not enter the temple. Build the missing pillar first.</p></div>
<p>The institutional art world is littered with ventures that had one pillar but not the other. Brilliant galleries that went bankrupt. Well-funded spaces with no curatorial soul. You have both. Protect both. The moment one pillar weakens, the portico collapses.</p>`,
    declaration: `"I build upon two pillars. My vision establishes the temple. My discipline sustains it. Neither stands without the other."`
  },

  three_degrees: {
    eyebrow: 'Masonic · Progression',
    title: 'The Three Degrees',
    tradition: 'Freemasonry',
    anchors: ['Humility', 'Knowledge', 'Legacy', 'Growth'],
    body: `<h3>The Arc of the Builder</h3>
<p>The three degrees of Masonry — Entered Apprentice, Fellow Craft, and Master Mason — are not ranks of prestige. They are stages of development, and a true builder must honestly assess which stage he occupies in every domain of his life. You may be a Master in curation and an Apprentice in corporate finance. The degrees are not fixed — they are diagnostic.</p>
<h3>The First Degree — Entered Apprentice</h3>
<p>The Apprentice is given one instruction: <strong>be silent and observe.</strong> He is not yet permitted to speak in lodge. He sits in the North, the place of darkness, because he has not yet received the light. His working tools are the 24-inch gauge and the common gavel — time management and self-correction.</p>
<p>When you enter a new market, a new institutional relationship, or a new city, you are an Apprentice. The temptation for someone with your experience is to skip this stage — to walk in as a Master. Resist. The Apprentice learns what the Master never sees because the Master has stopped looking.</p>
<h3>The Second Degree — Fellow Craft</h3>
<p>The Fellow Craft is a student of the liberal arts and sciences. He has moved from obedience to inquiry. His working tools are the square, the level, and the plumb. He climbs the winding staircase, which has no straight path.</p>
<p>This is where you build genuine expertise. The Fellow Craft studies grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy. Apply each to your art practice and your business. You are Fellow Craft in a domain when you can teach it to an Apprentice and hold your own with a Master.</p>
<h3>The Third Degree — Master Mason</h3>
<p>The Master confronts death. The central drama of the Third Degree is the legend of Hiram Abiff — the master builder who is murdered and raised again. The lesson is about <strong>what survives you.</strong> The Master asks: if I were struck down today, would the temple I am building be completed by those I have raised? Have I transmitted the knowledge?</p>
<p>You enter the Third Degree when your concern shifts from personal achievement to legacy architecture. When the question becomes not "how do I succeed?" but "how do I build something that succeeds without me?"</p>`,
    declaration: `"I know which degree I occupy. I do the work of that degree. I do not pretend mastery where I am still learning."`
  },

  working_tools: {
    eyebrow: 'Masonic · All Degrees',
    title: 'The Working Tools',
    tradition: 'Freemasonry',
    anchors: ['Discipline', 'Self-Audit', 'Morality', 'Precision'],
    body: `<h3>The Tools as Daily Practice</h3>
<p>In operative masonry, the tools shaped stone. In speculative masonry, they shape the builder. Each tool is a question you ask yourself daily. The tools are not aspirational — they are diagnostic.</p>
<h3>The 24-Inch Gauge</h3>
<div class="tool-diagnostic"><p><strong>The question:</strong> How am I dividing my time today?</p><p>The gauge divides the day into three parts: service, vocation, and rest. Your version: one-third for Xqsitor operations, one-third for self-refinement, one-third for rest. If any section consumes the others, you are building crooked.</p></div>
<h3>The Common Gavel</h3>
<div class="tool-diagnostic"><p><strong>The question:</strong> What rough edge am I breaking off today?</p><p>Name one habit, assumption, or ego pattern preventing the perfect ashlar from emerging. Not three. One specific edge. The gavel removes small imperfections with precision, day after day.</p></div>
<h3>The Plumb</h3>
<div class="tool-diagnostic"><p><strong>The question:</strong> Am I standing perfectly upright?</p><p>Is there any conversation, contract, or relationship where you are not being vertical — leaning toward dishonesty, avoidance, or manipulation? A wall can look straight and be two degrees off. Over the height of a building, those two degrees become catastrophic.</p></div>
<h3>The Level</h3>
<div class="tool-diagnostic"><p><strong>The question:</strong> Am I meeting everyone on the level today?</p><p>The janitor and the museum director receive the same quality of your attention, the same fundamental respect. You move differently in a boardroom than in a studio, but you do not <em>value</em> the people in either room differently.</p></div>
<h3>The Square</h3>
<div class="tool-diagnostic"><p><strong>The question:</strong> Are my actions square with my stated values?</p><p>If someone recorded everything you did today and showed it to your mentor, your grandmother — would you be proud? The square tests the right angle between what you say and what you do. There is no tolerance here.</p></div>
<h3>The Compasses</h3>
<div class="tool-diagnostic"><p><strong>The question:</strong> Where am I exceeding due bounds?</p><p>Where is ambition threatening to become obsession? Where is confidence approaching arrogance? Where is desire for recognition overriding commitment to the work? Draw the circle. Stay within it.</p></div>`,
    declaration: `"I take up the working tools. I measure my time, square my actions, level my dealings, and circumscribe my desires."`
  },

  rough_ashlar: {
    eyebrow: 'Masonic · First Degree',
    title: 'Rough & Perfect Ashlar',
    tradition: 'Freemasonry',
    anchors: ['Self-Work', 'Refinement', 'Patience', 'Becoming'],
    body: `<h3>You Are the Stone</h3>
<p>The rough ashlar sits in every Masonic lodge — an irregular, unfinished stone taken straight from the quarry. Beside it sits the perfect ashlar — smooth, precisely cut, ready to bear weight and fit perfectly against adjacent stones. The rough ashlar is who you were before the work began. The perfect ashlar is who you are becoming.</p>
<p>The profound teaching: <strong>you are both the stone and the mason.</strong> No one else shapes you. And unlike physical stone, human stone can resist its own shaping. The ego protects the rough edges. The comfort zone calcifies around the irregular form.</p>
<h3>The Ashlar Audit</h3>
<p>Map these domains on a spectrum from Rough to Perfect. Return to this on the first of every month:</p>
<div class="tool-diagnostic"><p><strong>Professional craft</strong> — Is your curatorial practice, your business acumen at the level of a perfect ashlar? Where are the rough edges?</p><p><strong>Physical temple</strong> — Is your body, your health being maintained as a sacred vessel? Where has entropy crept in?</p><p><strong>Relational architecture</strong> — Are your relationships built with precision? Where are the joints loose?</p><p><strong>Financial masonry</strong> — Is your economic structure sound, growing, properly squared? Where are the cracks?</p><p><strong>Spiritual plumb</strong> — Is your inner life vertical? Where has it drifted?</p><p><strong>Intellectual winding stair</strong> — Are you still climbing? Where have you stopped ascending?</p></div>
<p>The perfect ashlar is not perfection — it is <em>fitness for purpose.</em> Shape yourself for the temple you are building, not for an abstract ideal of polish.</p>`,
    declaration: `"I am the rough ashlar and the hand that shapes it. Every day the stone becomes more true. The work is never finished. The work is the meaning."`
  },

  checkered_floor: {
    eyebrow: 'Masonic · First Degree',
    title: 'The Checkered Floor',
    tradition: 'Freemasonry',
    anchors: ['Duality', 'Navigation', 'Strategy', 'Balance'],
    body: `<h3>The Mosaic Pavement</h3>
<p>The checkered floor — alternating black and white squares — does not mean good versus evil. It means <strong>reality is composed of inseparable opposites,</strong> and the initiated builder must walk across both without losing his balance or his moral center.</p>
<p>Light and dark. Public and private. Institutional and independent. Generosity and strategic self-interest. The checkered floor teaches that you cannot walk only on the white squares. The path to the East crosses both.</p>
<h3>Operational Duality</h3>
<p><strong>White squares — the visible, the public:</strong> your portfolio, your social presence, your certifications, your published point of view. These establish credibility. They face the light.</p>
<p><strong>Black squares — the strategic, the private:</strong> your long-term positioning, your quiet relationship-building, your intelligence about market movements, your understanding of who holds real power. These are never displayed. They are exercised in silence.</p>
<p>The mistake of the uninitiated is believing that only the white squares matter — that visibility equals power. The deeper mistake is believing only the black squares matter. The checkered floor says: <em>both. Always both.</em></p>
<div class="tool-diagnostic"><p><strong>If you find yourself only on white squares</strong> — too public, too visible — you have no strategic depth. Pull back. Operate in shadow for a season.</p><p><strong>If only on black squares</strong> — too hidden, too strategic — you have no public authority. Step forward. Let light fall on what you have built.</p><p><strong>The mastery is alternation.</strong> White, black, white, black. Never two of the same in a row.</p></div>`,
    declaration: `"I walk the checkered floor with sure footing. I know when to operate in light and when to move in shadow. Neither square is evil. Both are necessary."`
  },

  all_seeing_eye: {
    eyebrow: 'Masonic · Third Degree',
    title: 'The All-Seeing Eye',
    tradition: 'Freemasonry · Hermetic',
    anchors: ['Discernment', 'Perception', 'Vigilance', 'Wisdom'],
    body: `<h3>The Eye at the Apex</h3>
<p>The All-Seeing Eye represents the omniscience of the Grand Architect, but its practical teaching is about <strong>cultivated awareness.</strong> The builder who cannot see clearly will build crooked, no matter how skilled his hands.</p>
<p>This is trained attention. The ability to walk into a room and read its power dynamics within thirty seconds. The ability to listen to what someone is not saying. The ability to detect a pattern before it becomes consensus.</p>
<h3>The Four Directions of Sight</h3>
<p><strong>See Inward.</strong> Self-awareness is the first sight. Know your blind spots, your triggers, your default patterns under stress. The eye turns inward before it looks outward.</p>
<p><strong>See Outward.</strong> Read the room. Every space you enter has a power structure, spoken and unspoken. Who defers to whom? Who controls the conversation without speaking? The All-Seeing Eye detects the difference between displayed power and actual power.</p>
<p><strong>See Backward.</strong> Study the history of every institution you engage with. How has this entity behaved before? What promises has it made and kept or broken? The past is the most reliable predictor.</p>
<p><strong>See Forward.</strong> Anticipatory awareness — the ability to project current trajectories. Where is the art market moving in three years? Where are the emerging collectors? The eye at the apex sees from above.</p>
<h3>The Discipline of Silence</h3>
<p>The All-Seeing Eye is paired with a closed mouth. What you perceive, you do not announce. Strategic awareness that is broadcast ceases to be strategic. See everything. Say what serves the work. Hold the rest.</p>`,
    declaration: `"My eye is open. I see what is hidden in plain sight. I read the room before I speak. I read the pattern before it completes."`
  },

  cable_tow: {
    eyebrow: 'Masonic · First Degree',
    title: 'The Cable Tow',
    tradition: 'Freemasonry',
    anchors: ['Limits', 'Commitment', 'Focus', 'Integrity'],
    body: `<h3>The Tow That Binds and Liberates</h3>
<p>When a candidate is initiated, a cable tow — a rope — is placed around him. It symbolizes the distance he is willing to travel to fulfill his duty. The deeper teaching is about <strong>voluntary limitation.</strong> In accepting a defined radius, you gain the power to actually fulfill what you promise.</p>
<h3>The Xqsitor Application</h3>
<p>As Xqsitor grows, the temptation will be to extend your cable tow beyond what you can honestly cover. More cities. More clients. More projects. Every time you extend the radius without extending your capacity, you dilute the quality of your presence.</p>
<div class="tool-diagnostic"><p><strong>The Cable Tow Audit:</strong> List every active commitment. Now honestly assess: can you reach all of them with the quality they deserve?</p><p><strong>If the answer is no:</strong> Contract the tow. Release obligations that exceed your true capacity. It is better to serve three clients impeccably than seven adequately.</p><p><strong>The sacred principle:</strong> Your word is the measure of your radius. When you say yes, you stake your reputation on delivery. When you say no, you protect every existing yes.</p></div>
<p>The cable tow teaches the art of the honest no. The builder who knows his limits builds temples. The builder who does not know his limits builds rubble.</p>`,
    declaration: `"I honor the length of my cable tow. I commit only to what I can reach. What I commit to, I complete."`
  },

  hiram: {
    eyebrow: 'Masonic · Third Degree',
    title: "Hiram's Legend",
    tradition: 'Freemasonry',
    anchors: ['Integrity', 'Sacrifice', 'Legacy', 'Silence'],
    body: `<h3>The Central Drama</h3>
<p>Hiram Abiff was the master builder of King Solomon's Temple. Three Fellow Crafts, impatient for the Master's Word, cornered him at the three gates and demanded he reveal the secrets. At each gate, Hiram refused. At the third gate, he was struck down and killed. He chose death over betrayal of his craft.</p>
<h3>The Three Ruffians</h3>
<p><strong>The first ruffian — Money.</strong> "Reveal your secrets and I will pay you." The client who wants you to cut corners. The deal that pays well but requires you to misrepresent your values. Hiram's answer: <em>No.</em></p>
<p><strong>The second ruffian — Status.</strong> "Reveal your secrets and I will elevate you." The partnership where you gain access but lose autonomy. The institutional validation that costs your independent voice. Hiram's answer: <em>No.</em></p>
<p><strong>The third ruffian — Fear.</strong> "Reveal your secrets or I will destroy you." The threat of exclusion, of being shut out, of professional isolation. This is the hardest gate. Hiram's answer: <em>Still no.</em></p>
<h3>The Resurrection</h3>
<p>Hiram is raised as a symbol. <strong>What is built with integrity cannot truly be destroyed.</strong> The temple may fall. The builder may be struck down. But the principles survive. The craft endures. The work outlasts the worker.</p>
<p>When you face your three ruffians — and you will — remember that the moment you hand over the word, you cease to be the master. The refusal is not pride. It is architecture.</p>`,
    declaration: `"I would rather lose the contract than lose the word. What I have built with integrity cannot be taken. What I surrender for expedience is gone forever."`
  },

  letter_g: {
    eyebrow: 'Masonic · Second Degree',
    title: 'The Letter G',
    tradition: 'Freemasonry · Hermetic',
    anchors: ['Geometry', 'Divinity', 'Knowledge', 'Center'],
    body: `<h3>The Symbol at the Center</h3>
<p>At the center of the square and compasses hangs the letter G. Three interpretations have persisted across centuries, and all three are simultaneously true:</p>
<p><strong>G for Geometry.</strong> The Masons inherited the conviction that geometry is the language in which the universe is written. Not a human invention but a cosmic disclosure. The golden ratio appears in the spiral of a nautilus, the branching of a tree, the proportions of the human face, and the orbital mechanics of planets. It is a signature.</p>
<p><strong>G for God — the Grand Architect of the Universe.</strong> Masonry does not prescribe a theology. It requires only that the builder acknowledge a Supreme Being. Whether you understand this as Ptah, the Hermetic Nous, or the mathematical order of nature, the G demands that you build as if your work has cosmic accountability.</p>
<p><strong>G for Gnosis — direct knowing.</strong> The deepest knowledge cannot be transmitted through words alone. It must be experienced, practiced, and embodied. Gnosis is the knowledge that transforms the knower. You do not merely learn the golden ratio — you see it everywhere, you become unable to create without it.</p>
<h3>Working from the Center</h3>
<p>The G sits at the center because every act of building begins from center. The architect does not begin at the edge — he begins at the point from which all measurements radiate. Your center is your identity as the Architect. Every decision radiates from that center or it drifts. When you feel scattered, return to the G. Return to center.</p>`,
    declaration: `"The G is at the center. Geometry is the language of creation. God is the Grand Architect. Gnosis is the builder's inheritance. I work from the center outward."`
  },

  opening: {
    eyebrow: 'Daily Lodge Protocol · Station Zero',
    title: 'Opening Lodge',
    tradition: 'Freemasonry · Daily Practice',
    anchors: ['Intention', 'Threshold', 'Consecration'],
    body: `<h3>The Ritual of Beginning</h3>
<p>No Masonic lodge conducts business without first being formally opened. An ordinary room is transformed into sacred space through declarations, responses, and symbolic actions. The lodge is <em>tiled</em> — protected from profane interruption. Only then does work begin.</p>
<p>This is the deliberate creation of a container — a defined space and time within which the principles of the craft govern.</p>
<h3>Your Daily Opening</h3>
<p>Add this as Station Zero — before your existing morning ritual. It takes fifteen seconds:</p>
<div class="tool-diagnostic"><p><strong>Step 1:</strong> State the date aloud. Anchor yourself in real time.</p><p><strong>Step 2:</strong> State what you are building today. Not your to-do list — your <em>intention.</em> "Today I am building the proposal for the museum partnership." One declaration. Specific.</p><p><strong>Step 3:</strong> Speak the opening: <em>"I declare this lodge open upon the center. The Great Architect guides my hand and my intention. The work begins."</em></p></div>
<p>This frames every subsequent hour as work performed inside a consecrated space. Interruptions become tests of your tiling. Meetings become lodge business — conducted with the precision the craft demands. The mundane becomes the material from which the temple is built.</p>`,
    declaration: `"I declare this lodge open upon the center. The Great Architect guides my hand and my intention. The work begins. So mote it be."`
  },

  closing: {
    eyebrow: 'Daily Lodge Protocol · Station VIII',
    title: 'Closing Lodge',
    tradition: 'Freemasonry · Daily Practice',
    anchors: ['Reflection', 'Completion', 'Rest', 'Continuity'],
    body: `<h3>The Ritual of Ending</h3>
<p>Just as no lodge begins without opening, no lodge ends without closing. Without it, the sacred space leaks into the profane. You carry your work home. Your mind never leaves the lodge.</p>
<p>The Masonic closing contains a specific distinction: the work is <strong>suspended, not concluded.</strong> The temple is never finished in a single session. The closing gives the builder permission to rest without guilt.</p>
<h3>Your Evening Closing</h3>
<div class="tool-diagnostic"><p><strong>Step 1 — The Ashlar Review:</strong> What stone did I lay today? Name one specific thing you built, advanced, or completed. Even on a day that felt unproductive, one stone was laid.</p><p><strong>Step 2 — The Plumb Check:</strong> Did I stand upright today? Was there a moment where my integrity was not vertical? Note it without judgment.</p><p><strong>Step 3 — The Tomorrow Stone:</strong> What is the first stone to be laid tomorrow? Not the full plan — just the first action.</p><p><strong>Step 4 — The Closing:</strong> <em>"The work is suspended but not abandoned. What was built today stands. The lodge is closed. So mote it be."</em></p></div>
<p>This creates a hard boundary between production and rest. Your nervous system needs to know the day is finished. The lodge closing is that signal. After it, you are not the Architect. You are a man at rest, and the rest is as sacred as the work.</p>`,
    declaration: `"The work is suspended but not abandoned. What was built today stands. What remains for tomorrow will be addressed. So mote it be."`
  },

  goldenratio: {
    eyebrow: 'Sacred Geometry · φ = 1.618',
    title: 'The Divine Proportion — φ',
    tradition: 'Masonic · Kemetic · Pythagorean',
    anchors: ['Golden Ratio', 'Beauty', 'Cosmic Order', 'Design'],
    body: `<h3>The Number That Builds the Universe</h3>
<p>φ (phi) = 1.618033988749895. This single number is the most persistent structural signature in nature, art, and architecture. It is not a human invention. It is a discovery. The Grand Architect used it first.</p>
<p>The golden ratio emerges when a line is divided so that the ratio of the whole to the longer segment equals the ratio of the longer to the shorter. This proportion appears in spiral arms of galaxies, seeds in a sunflower, the nautilus shell, proportions of the human face, branching of trees and blood vessels, and orbital relationships between planets.</p>
<p>The Masons understood the golden ratio as proof that the cosmos is not random — it is <strong>designed.</strong> The builder who incorporates this proportion participates in the same creative act that produced the universe.</p>
<h3>The Fibonacci Sequence</h3>
<p>The golden ratio manifests through the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144… Each number is the sum of the two before it, and as the sequence progresses, the ratio between consecutive numbers converges on φ. The typography, spacing, and layout of this application are built on Fibonacci proportions. You are reading inside the golden ratio right now.</p>
<h3>Applying φ to Xqsitor</h3>
<p><strong>Spatial Design.</strong> A wall divided at the golden ratio — 61.8% to 38.2% — will feel balanced without being symmetrical. The eye rests on golden proportions without knowing why. Collectors will say the space "feels right." What they are feeling is φ.</p>
<p><strong>Visual Layout.</strong> Place the primary artwork at the golden intersection — 61.8% from the left, 38.2% from the top. This is the point of maximum visual gravity.</p>
<p><strong>Timing and Rhythm.</strong> The golden ratio applies to time as well as space. In a presentation, the turn should occur at the 61.8% mark. In a negotiation, let the other party speak for the first 61.8%. Front-load the structure. The beauty reveals itself at the golden moment.</p>
<h3>The Vesica Piscis</h3>
<p>Two circles of equal radius, overlapping so that the center of each lies on the circumference of the other, create the vesica piscis — the almond-shaped intersection from which the equilateral triangle, the hexagon, and the golden ratio itself can all be constructed. This is the geometric womb — the shape from which all sacred proportions are born.</p>
<p>For Xqsitor: the vesica piscis represents the intersection of your two pillars — creative vision (Jachin) and operational strength (Boaz). The fertile space where art meets commerce. Your entire practice lives in the vesica piscis. Build from it.</p>`,
    declaration: `"I build in the proportion of creation. φ is the signature of the Grand Architect — in galaxies, shells, temples, and the spaces I consecrate. My work carries this signature or it carries none."`
  }
};

const RITUAL_STATIONS = [
  { num: 'I', label: 'I', title: 'The Threshold', sub: '4:44 AM or 5:08 AM — before any screen',
    tradition: 'Kemetic', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '5 min',
    anchors: ['Thoth', 'Numerology 8', 'Saturn discipline', 'Nun'],
    body: `<strong>Why this time:</strong> 4:44 AM carries triple-4 frequency. 5:08 AM = 13 = 4, honoring your Feb 8 signature.<br><br>The Kemetic priests rose before dawn because those hours belong to <em>Nun</em> — primordial waters of potential. You are not waking up. <strong>You are entering.</strong><br><br>No phone. No screen. No voice except your own.`,
    declaration: `"I rise before the world has named me. I enter the silence of Nun. I am the Architect becoming."` },
  { num: 'II', label: 'II', title: 'The Purification', sub: 'Cold water, intention, opening of the senses',
    tradition: 'Yoruba / Kemetic', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '8 min',
    anchors: ['Oshun waters', "Ma'at", 'Vagus nerve'],
    body: `<strong>Cold water first.</strong> Drink <strong>8 oz</strong> consciously. Water is Oshun's domain.<br><br>Then wash hands and face slowly: <em>"I cleanse what yesterday built in me that I no longer need."</em><br><br>If possible, a full cold shower. Cold water activates the vagus nerve — the body's architecture responding to the temple being opened.`,
    declaration: `"Oshun, I receive. Ma'at, I align. The water carries away what does not serve the work."` },
  { num: 'III', label: 'III', title: 'The Orientation', sub: 'Standing, facing East',
    tradition: 'Kemetic / Hermetic', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '3 min',
    anchors: ['Ra rising', 'Aquarius Sun', 'Dua Ra'],
    body: `Face East. Shoulder-width, hands open.<br><br><em>Adoration of Ra (Dua Ra)</em> was performed at every sunrise. You are <strong>aligning your personal solar frequency with the cosmic solar current.</strong><br><br>Three slow breaths.`,
    declaration: `"Ra rises and I rise with it. I am a child of the sun, here to build what the light makes visible."` },
  { num: 'IV', label: 'IV', title: 'The Heka', sub: 'Sacred speech — speaking identity into being',
    tradition: 'Kemetic / Hermetic', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '8 min',
    anchors: ["Ptah's heka", 'Mentalism', "Thoth's word"],
    body: `<strong>Heka</strong> = creative speech. Ptah spoke creation. Thoth recorded it.<br><br>1. <strong>Identity declaration</strong> — full statement, standing<br>2. <strong>Gratitude naming</strong> — three specific things, named precisely<br>3. <strong>Intention declaration</strong> — the ONE thing that advances the architecture most`,
    declaration: `"I am Ray-Anthony Eddie. I am The Architect of Sovereign Systems. Life Path 8 — I do not pursue power, I am its instrument. Today I will [name the one thing]."` },
  { num: 'V', label: 'V', title: 'The Reading', sub: 'Wisdom literature — 13 minutes',
    tradition: 'Kemetic / Hermetic / Ifa', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '13 min',
    anchors: ["Thoth's library", 'Gemini Rising', 'Kybalion'],
    body: `<strong>13 min:</strong> 1+3=4, foundation. Feeds Thoth — the scholar in you. Gemini Rising needs substance.<br><br>No social media. No email. No news.<br><br><strong>Monthly rotation:</strong><br>Week 1 — Kemetic (Kybalion, Book of Coming Forth)<br>Week 2 — Ifa wisdom (the Odù)<br>Week 3 — Power, law, aesthetics<br>Week 4 — Field: art history, curation theory`,
    declaration: null },
  { num: 'VI', label: 'VI', title: 'The Sigil Activation', sub: 'Your personal symbol, full intent',
    tradition: 'Hermetic / West African', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '5 min',
    anchors: ['Sacred geometry', 'Vévé', 'Xqsitor mark'],
    body: `Place your hand on the Xqsitor mark. In Vodou the <em>vévé</em> calls a Lwa. In Hermetic tradition the seal is compressed will. <strong>You are activating.</strong><br><br><strong>Ogún</strong> — clear the path<br><strong>Shango</strong> — presence before words<br><strong>Oshun</strong> — make it beautiful enough to last<br><br>Speak to each. Ask for their current.`,
    declaration: `"Ogún — clear the path. Shango — let presence arrive before words. Oshun — make what I build beautiful enough to last."` },
  { num: 'VII', label: 'VII', title: 'The Architecture', sub: 'First 8 minutes of work',
    tradition: 'Numerology / Saturn discipline', numBg: 'var(--bg2)', numColor: 'var(--terra)', duration: '8 min',
    anchors: ['Life Path 8', 'Saturn mastery', 'First stone'],
    body: `The final station is <strong>action</strong>. Your Capricorn Moon needs evidence of structure. If you end without touching the work, the ritual is theater.<br><br>For <strong>exactly 8 minutes</strong>, work on the single most important task named in Station IV.<br><br>No emails. No context-switching. Plant the first stone so everything that follows is <strong>continuation</strong>, not initiation.`,
    declaration: `"The temple is built. The world may enter — but it enters a space I have already consecrated."` }
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOWS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const PLANET_NAMES = ['Sun','Moon','Mars','Merc','Jup','Venus','Saturn'];
const PLANET_ORISHA = ['Shango/Ra','Yemoja','Ogún','Thoth','Obatala','Oshun','Ptah'];

const POWER_DAY_DATA = {
  8:  { title: '8th — Ogún opens the gate',  sub: 'Power date: Foundation + Action · Life Path resonance',
        body: `<strong>This date vibrates at your core frequency.</strong> 8 is your Life Path.<br><br><strong>Ogún governs.</strong> Do the one thing you have been avoiding — the call, the email, the proposal. The iron is hot.<br><br><strong>Extended ritual:</strong> Add the written declaration. Speak it AND write it.`,
        decl: `"This is the 8th. Ogún walks before me. The path is clear. I build what endures."` },
  17: { title: '17th — Shango commands the room', sub: 'Power date: Authority + Recognition · 1+7=8',
        body: `<strong>1+7=8.</strong> Second monthly resonance.<br><br><strong>Shango governs.</strong> Thunder, lightning, rightful authority. Today is for <em>high-visibility activity</em> — a pitch, a public post, an institutional meeting.<br><br><strong>Extended ritual:</strong> Dress with intentionality.`,
        decl: `"This is the 17th. I carry the thunder. I do not request authority — I bring it with me."` },
  26: { title: '26th — Oshun receives the harvest', sub: 'Power date: Magnetism + Wealth · 2+6=8',
        body: `<strong>2+6=8.</strong> Third monthly resonance.<br><br><strong>Oshun governs.</strong> Today is for <em>art-facing activities</em> — studio visits, collector outreach, creative decisions.<br><br><strong>Extended ritual:</strong> Wear gold. Review the beauty of what you are building.`,
        decl: `"This is the 26th. I am magnetic. What is meant for me cannot miss me."` }
};
