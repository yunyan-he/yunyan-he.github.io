# When AI Becomes a Cognitive Partner: The Limits of Linear Chat and the Search for Non-Linear Interfaces

> I've had a persistent feeling: human thought is inherently divergent — it radiates outward like a graph. But every AI product we have today forces this divergence into a linear chat window. This mismatch isn't a minor UX detail. It's a fundamental structural conflict between how we think and how we're expected to interact. This essay is my attempt to work through this problem fully — including a project I built to address it, what it gets right, and where it falls short.

---

## I. The Real Problem: Not That Chat Is Long, But That the Structure Is Wrong

We've all experienced this scenario.

You ask AI a question. It gives you a detailed answer. Halfway through reading, you notice three points worth exploring further. You follow up on the first, and get another long response. Before you finish it, the second point from the original answer surfaces again. You send another message.

You start scrolling up and down. You start forgetting what your original question was. Responses pile up, growing longer, increasingly overlapping. 

This is the linear chat trap. But the core issue isn't that answers are too long. It's this:

> **Our thinking is divergent, but chat products force it into a single, ever-growing timeline.**

And this timeline problem actually contains three distinct issues that shouldn't be conflated:

**First, attentional structure mismatch.** You may simultaneously be interested in points A, B, and C within a single response — but the chat box forces you to pursue only one at a time. The other two must either be abandoned or held in working memory, which is itself a cognitive cost.

**Second, context contamination.** After ten turns following thread B, returning to ask about thread A brings all of B's context along. Responses become increasingly verbose, increasingly off-target.

**Third, navigation overhead.** Finding something said thirty messages ago requires scrolling, scanning, recognizing. This interrupts thought and consumes attention.

These three problems share one root cause: **linear chat was designed for retrieving answers, not for building understanding.**

---

## II. What the Market Has Tried — And Where It Falls Short

Over the past two years, nearly every major AI product has recognized this problem and offered a response.

**ChatGPT's Projects** address long-term task organization — putting chats, files, and memory into shared containers. Branching is now supported, but branches appear as separate chats rather than as visible nodes in a shared structure. It solves "don't lose the original thread," but not "I have three questions right now and want to explore them in parallel."

**Gemini's branching** lets you fork from a specific response, but fundamentally takes you from one linear chat to another. It provides a fork, but no persistent structural navigation across forks.

**Claude's Artifacts** extract code, documents, and editable content from the chat stream into independent windows. This elegantly solves "the final output is buried in the conversation" — but doesn't address the multi-threaded divergence of the conversation itself.

**Heptabase** lets you drag valuable AI responses onto a whiteboard and manually construct knowledge structures. It solves "converting linear chat into long-term knowledge structure" — but the organization cost is transferred to the user, and it happens *after* thinking rather than *during* it.

| Product | Solves | Doesn't Solve |
|---------|--------|---------------|
| Projects | Long-term topic archiving | Single-session cognitive fragmentation |
| Canvas / Artifacts | Extracting and editing outputs | The conversation itself is still linear |
| Branch Chat | Preserving the original path | Branches become isolated silos |
| Whiteboard Tools | Spatial organization of results | Organizational burden shifts to the user |

No one has announced a definitive UI for the future of AI conversation. Because no one can.

---

## III. LatentLearn: A Concrete Attempt

As I used AI more, I noticed a specific pattern in my own behavior: **when I have a clear learning goal** — reading a paper, understanding a technical concept, analyzing a product — my conversations with AI naturally take on a tree structure.

```
Transformer
├── Attention Mechanism
│   ├── What is QKV?
│   └── What does Multi-head solve?
├── Position Encoding
└── Core differences from LSTM
```

Every question serves the same parent theme. Follow-up questions deepen rather than drift. The whole process converges toward a clear goal.

The problem with linear chat in this context is that **the system has no awareness of the hierarchical relationships between questions**. It treats "What is QKV?" and "How does it differ from LSTM?" as equivalent items on the same timeline — which makes the context increasingly muddled and makes it harder to build a clear mental map.

LatentLearn is my attempt to address this. It's a conversational workspace designed specifically for **Focused Learning** — where you have a defined topic and generate branching questions as you explore it.

### What It Solves

LatentLearn doesn't try to fix all AI conversations. Its target is a specific class of cognitive task: the user has a clear subject, generates questions while exploring it, and needs a tool that helps them:

1. Track the hierarchical relationships between those questions
2. Switch between branches with low cognitive overhead
3. Keep each branch's context relatively isolated to prevent contamination

### How It Works

LatentLearn uses a **Spatial Focus Tree** as its core UI:

- The user converses with AI normally; each follow-up question appears as a child node in a right-side tree directory
- Clicking a tree node switches the central area to that branch's conversation — other branches aren't shown simultaneously
- Each node displays only a title and one-sentence summary by default; full conversation is expanded on demand

On the backend, the project uses **LangGraph multi-agent orchestration**, with a core architecture that includes:

- **Topic Router**: determines whether the current follow-up is an "Elaboration" (deepening the parent node) or a "Topic Shift" (requiring a new root tree). Elaborations become child nodes; topic shifts create parallel trees
- **Context Manager**: each branch inherits only the necessary context from its ancestor path, rather than the entire conversation history
- **Summary Generator**: automatically produces a title and one-sentence summary for each node to power the tree navigation

The tech stack uses FastAPI for backend services, Next.js for the frontend interface, and SSE (Server-Sent Events) for streaming output.

### Where It Falls Short

Building and using LatentLearn made its limitations increasingly clear:

**First, it only works for conversations with a defined focus.** If you're exploring aimlessly — drifting from Wu Zetian to Tang poetry to the history of fermentation — a tree structure becomes a constraint rather than a scaffold. There's no root node worth serving.

**Second, branch explosion is a real risk.** A response containing five claims might spark three follow-ups, each of which sparks more. Very quickly you have dozens of nodes, and the tree itself becomes a navigation burden.

**Third, "off-topic" detection is genuinely hard.** Is jumping from "Li Zhi's health" to "political status of women in the Tang dynasty" a topic shift? From a product standpoint, leaving this entirely to the model tends to interrupt natural exploration; leaving it entirely to the user recreates the "organizational burden transferred to the user" problem.

**Fourth, there's no convergence mechanism.** Trees are good at diverging. They don't naturally help users answer: what did I just learn? Which conclusions are worth keeping? Are there branches that can be merged? Without convergence, a tree is just a prettier "forest of chat garbage."

**Fifth, trees assume knowledge is hierarchical.** But often a new question emerges from two different parent nodes — for example, "Did Wu Zetian's rise come from her own capability or from structural opportunity?" This question comes simultaneously from "Wu Zetian's political abilities" and "Li Zhi's deteriorating health." A pure tree can't express this.

---

## IV. A Bigger Problem: Nobody Has the Answer

Working on LatentLearn led me to a larger realization. This problem has already moved beyond product design into a genuine research question — and the entire HCI academic community is wrestling with it without a consensus answer:

> **As AI becomes a cognitive partner, should the default human-AI interface still be a chat box? If not, what should it be?**

Current leading directions from top labs and research groups:

**Spatial Workspace** advocates argue the problem isn't structure but space — information needs a place to live. CanvasConvo embeds branching conversations in an infinite spatial canvas with timeline navigation, automatic tagging, summaries, and reusable prompts. A 5–7 day field study with 24 participants confirmed the value of non-linear structure for exploratory tasks.

**Branch Conversation** researchers are closest to LatentLearn's approach. They focus on how tree or DAG structures can isolate context across branches in the backend. ContextBranch's experiments showed that branching reduced relevant context messages from an average of 31 to 13 — about a 58.1% reduction — and improved user focus in complex exploration tasks.

**Visual Language** researchers argue that natural language itself may not be the best medium for thought. Diagrams, arrows, spatial relationships, color — these may be closer to how humans actually think. IEEE VL/HCC 2025 hosted a workshop on exactly this: *Beyond Chat: Visual Languages for Embodied Human-LLM Interaction in Sensemaking*.

**Mixed Interaction** is the direction I find most compelling right now. The argument is that the question isn't "which UI structure is best" — it's that humans naturally use different structures in different cognitive phases:

- Exploring → tree-like
- Reading → linear
- Remembering → graph-like
- Articulating → linear again

So the real design challenge isn't finding the optimal data structure. It's designing **smooth transitions between cognitive states**:

```
Linear reading → Notice a question → Create branch → Deep exploration → Auto-summary → Return to main thread
```

The key concept here isn't Tree — it's **Transition**.

---

## V. Future Directions Worth Pursuing

Based on current research and my own experience building LatentLearn, these seem like the most promising paths forward:

**Deferred consumption — a "question inbox."** When users notice a question mid-reading, they shouldn't be forced to immediately consume a full response. A more cognitively natural design allows users to "collect" questions and decide which branches to expand after finishing the main content.

**Progressive disclosure.** Nodes default to title plus one-sentence summary; full text expands on demand. This way the tree serves as a navigation layer, not a reading layer, dramatically reducing visual noise.

**Sub-sentence anchoring.** Instead of creating a child node from an entire AI response, allow users to select a specific sentence as the branch origin. This makes parent-child relationships meaningful rather than loosely attached to an entire parent message.

**DAG in the backend, tree in the frontend by default.** Allow the data layer to support one question having multiple parent nodes. But default the UI to tree view, only surfacing cross-references when the user explicitly needs them. This is the pragmatic version of "start with tree, leave room for graph."

**An explicit convergence step.** When a branch concludes, the system should proactively generate an exploration summary and let the user decide: merge findings back to the main thread, save as a standalone knowledge card, or discard. Divergence without convergence is just beautiful chaos.

---

## Coda: LatentLearn Is a Question, Not Just a Product

When I started building LatentLearn, it was a product in my mind.

As I built it, it became a question: **For focused learning tasks, is linear chat inherently the wrong form?**

Later still, I realized the question has grown beyond product design into HCI research: **In an era when AI is becoming a cognitive partner, does the default paradigm of human-AI interaction need fundamental redesign?**

This is why I find myself paying increasing attention to venues like CHI, UIST, and IUI — not just the AI engineering community. The real problem is happening on the human side, not the model side.

Models are getting smarter. But if we keep them constrained inside a linear chat box, we may just be using the best engine to drive the most winding road.

---

*LatentLearn is still evolving. If you're thinking about non-linear conversation interfaces, HCI research in the AI era, or anything in this essay — I'd love to hear your thoughts.*

*Written July 2026.*
