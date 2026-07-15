# AI Eats the Value Chain: How AI Products Displace Cognitive Labor, Not Just Competitors

> This essay grew from a conversation about how AI products evolve. It introduces the "AI eats cognitive labor" framework to explain why AI products tend to displace products in unexpected, cross-ecosystem ways.

---

## I. Cross-Ecosystem Displacement: AI Kills Behaviors, Not Competitors

The internet has a recurring pattern: when a new product rises, it rarely kills its direct competitors. Instead, it wipes out something in a completely different part of the ecosystem.

AI follows the same logic. After ChatGPT, I almost stopped using traditional search engines. Not just Baidu — even Google. When I open Google now, I use its AI search: I describe my question in natural language, it searches on my behalf, synthesizes the results, and returns an answer.

On the surface, it looks like ChatGPT replaced Google. But the more accurate version is:

> **It didn't replace an app. It replaced a whole set of user behaviors — formulating keywords, browsing dozens of pages, comparing, and synthesizing information yourself.**

The shift isn't about which tool you use. It's about which cognitive steps still belong to you.

---

## II. The Reshaping of Information Flow

Here's how the information pipeline changed:

**Before:**

```
Information Sources
       ↓
Search Engine (indexing / ranking / snippets)
       ↓
List of links
       ↓
Human (read → filter → synthesize → form judgment)
```

**Now:**

```
Information Sources
       ↓
Search Engine
       ↓
Retrieved documents
       ↓
LLM (understand → reason → organize → generate)
       ↓
Human (review → correct → follow up)
```

The fundamental change: **synthesis used to be done by humans. Now it's done by AI.** This is a role shift — users are moving from Information Processor to Supervisor.

### Four Layers of Information Loss

The "information loss" introduced by AI is not one single problem. It has at least four distinct mechanisms:

| Type | Meaning | Example |
|------|---------|---------|
| **Compression Loss** | 10 articles compressed into 300 words; detail disappears | Like JPEG compression — not an error, but detail is gone |
| **Interpretation Bias** | AI picks one reading of an ambiguous statement | "This may improve performance" → AI writes "This improves performance" |
| **Synthesis Bias** | When sources conflict, AI must choose; minority views vanish | A says effective, B says ineffective, AI writes "generally useful" |
| **Hallucination** | AI fills in information that doesn't exist | The most widely known failure mode |

Each of these requires a different product design response — which is why they matter for anyone building in this space.

---

## III. Two Types of Tasks: Convergent vs. Divergent

Observing how people use AI reveals a useful distinction: tasks fall into two fundamentally different types.

### Convergent Tasks

These tasks have a "good enough" answer:

- Writing an email, translation, resume editing
- Boilerplate code for a function
- Drafting a leave request

Here, AI acts as an **Executor**. The user states a need, AI generates, the user does a quick acceptance check, and the loop closes.

```
State need → AI generates → Quick review → Done
```

### Divergent Tasks

These tasks don't have a terminal answer — they're about **continuously refining your understanding**:

- Exploring an emerging industry trend
- Untangling a complex product's logic
- Building your own mental framework

Here, AI plays **Thinking Partner** or **Cognitive Amplifier**. The conversation is the value. Each answer generates new questions.

```
Propose idea → AI challenges → Revise → New question → Go deeper
```

This distinction matters because it maps to the two trajectories AI products are splitting into: **Do Things** vs. **Think Better**.

---

## IV. The Framework: What Does AI Actually Eat?

Here is a framework for analyzing any AI product:

> **What value did the product originally contain? Which cognitive labor did AI consume? What will the product become?**

Let's apply it to ten cases:

---

### ① Search Engines (Google / Baidu)

**AI consumes:** Keyword formulation + browsing multiple pages + synthesizing results yourself

**What remains:** Search infrastructure, real-time data crawling

**Future form:** Google becomes Information Infrastructure; AI becomes the actual search entry point

---

### ② Travel & Lifestyle Communities (Xiaohongshu / Mafengwo)

Before: Read dozens of travel guides → compare → plan itinerary

**AI consumes:** Comparison + itinerary planning + summarization

**What remains:** Real photos, authentic experiences, recent updates, "can I trust this?"

**Future form:** These communities shift from **knowledge entry point** to **Evidence Base** — AI tells you which posts to read, then you go look at the real photos and comments.

---

### ③ Stack Overflow

Before: Error → Google → Stack Overflow → copy code

**AI consumes:** Finding the same error + understanding the answer + adapting the code

**What remains:** A massive repository of historical cases and edge-case discussions

**Future form:** Increasingly a **historical case database**, not a developer's first stop for questions

---

### ④ Code Editors / IDEs (Cursor, Claude Code)

Many people's first instinct: "It replaced VS Code." But most people still write code in VS Code — they just added an AI plugin.

**What AI actually consumed:** Going to Stack Overflow to search errors, finding similar implementations on GitHub, writing boilerplate, copy-pasting across windows

**Going further:** As conversational IDEs emerge, AI is now starting to handle detailed implementation and framework design — leaving only architectural decisions and high-level judgment to the human.

---

### ⑤ Knowledge Management Tools (Obsidian / Notion)

Before: User handles classification, bi-directional links, summarization, periodic review

**AI consumes:** Auto-organization + auto-linking + auto-generating documents

**Future form:** Shifts from Knowledge Base to **Thinking Workspace** — not storing things, but thinking alongside you

---

### ⑥ Spreadsheets (Excel)

Before: Data → write formulas → pivot tables → analyze

**AI starting to consume:** Formula writing + charting + anomaly detection + pattern summarization

**Future form:** Increasingly a **data Agent**, not just a tabular calculation tool

---

### ⑦ Presentation Tools (PowerPoint)

Before: Write content → design layout → adjust fonts → add animations

**AI can now do:** Auto-generate slides, auto-select images, auto-format

**What remains as real value:** "What do you actually want to say?" — not "how do you animate a transition"

---

### ⑧ Translation Software

Before: Sentence-by-sentence translation

**AI consumes:** Post-translation expression optimization (tone adjustment, localization, adapting to audience)

**Future form:** Translation shifts from "word conversion tool" to "cross-cultural expression collaborator"

---

### ⑨ Legal Databases

Before: Lawyers research statutes + case law + compare + draft opinions

**AI consumes:** The hours spent searching statutes and precedents

**Lawyers' time increasingly concentrated on:** Strategic judgment + client communication + risk ownership

---

### ⑩ Medical Literature Databases

Before: Doctors use PubMed + Google Scholar + read papers

**AI can do:** Summarize dozens of relevant papers directly

**Doctor's judgment concentrated on:** Does this evidence apply to the patient in front of me?

---

## V. The Unifying Pattern: AI Always Eats Cognitive Labor First

Looking across all ten cases, there is one striking commonality.

The core value structure of internet products used to be:

```
Data + Tool + User does cognitive work
```

For example:
- **Google:** Web pages + search tool + user thinks for themselves
- **Obsidian:** Files + editing tool + user organizes for themselves
- **Xiaohongshu:** UGC content + search tool + user synthesizes their own travel guide

After AI arrives, product structure starts becoming:

```
Data + Agent + Human Supervision
```

The middle layer shifted from **Tool** to **Agent**.

And what AI consumed is almost always the same category of behavior:

> Browse → Filter → Organize → Summarize → Synthesize

These behaviors share a name: **Information Processing**.

What remains is almost always:

- Creating new ideas
- Setting goals and direction
- Bearing responsibility
- Value judgment and aesthetic taste
- Final decision-making

These fall under **Human Judgment**.

---

## VI. Three Generations of Product Evolution

From this pattern, we can sketch three generations of internet product evolution:

| Era | Product Form | Examples |
|-----|-------------|----------|
| First generation | Information Platform | Portals, search engines |
| Second generation | Tool Platform | Google Docs, Notion, Figma |
| Third generation | Agent Platform | Cursor, NotebookLM, AI Research Agents |

The evolution paths look like this:

- **Google:** Web search → AI Overview → AI Research Agent
- **Notion:** Documents → AI writes documents → AI manages your entire knowledge base
- **IDE:** Write code → code completion → entire project delegated to Agent

---

## VII. Conclusion: The End Game of the Next Generation

The past twenty years of internet products largely helped humans **Access Information**.

The current decade of AI products is largely helping humans **Process Information**.

What comes after that?

The competition in the next generation may no longer be about who processes information fastest. It may be about **who can best Support Human Judgment**.

These sound similar but are fundamentally different:

- **Processing information** = replacing human information-handling labor
- **Supporting judgment** = helping humans make higher-quality decisions

If this holds, then AI's next competitive frontier won't be efficiency — it will be **improving the quality of human cognition**. And the things humans will be truly irreplaceable for will concentrate into:

> Asking better questions. Making more responsible decisions. Creating genuinely original content.

---

*This essay originated from a deep-dive conversation about AI product evolution, written in July 2026.*
