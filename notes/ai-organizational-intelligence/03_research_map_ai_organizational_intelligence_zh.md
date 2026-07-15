# AI 组织智能研究地图：从 Agent Workflow 到 Cognitive Workflow

> 专题导航：返回[主报告](note.html?note=ai-organizational-intelligence/01_from_multi_agent_to_ai_organizational_intelligence)；查看[产品探索](note.html?note=ai-organizational-intelligence/02_collaborative_reasoning_engine_product_exploration)。

## 1. 核心判断

Multi-Agent 已经成为 AI 领域的显性热点。行业和学术界已经意识到，未来 AI 系统的关键不只是单个模型能力，而是多个 Agent 如何协作、通信、共享记忆、调用工具和完成复杂任务。

但目前主流研究仍然主要关注任务完成：

```text
Model -> Agent -> Workflow -> Execution
```

也就是 Automation。

更值得进一步研究的问题是：

```text
Model -> Perspective -> Discussion -> Consensus -> Decision
```

也就是 Reasoning。

这意味着，未来真正重要的方向可能不是 Agent Workflow，而是 Cognitive Workflow：如何组织多个智能体管理认知过程。

## 2. 当前行业与研究已经意识到什么

### 2.1 第一层：Multi-Agent 协作已经是热点

目前最热的问题是：

> Multi-Agent 如何协作？

相关关键词包括：

- Agent Orchestration
- Agent Coordination
- Agent Communication
- Agent Memory
- Agent2Agent
- Model Context Protocol
- Tool Use
- Shared State
- Routing
- Planning

2026 年的综述《LLM-Based Multi-Agent Orchestration》将 orchestration 定义为多 Agent 系统的核心问题，并系统讨论了协调拓扑、框架、协议、生产部署、评估方法和开放挑战。

这说明“多个 Agent 如何一起工作”已经是公认的重要问题。

### 2.2 第二层：企业开始意识到问题不只是模型

企业和工程实践已经开始发现，仅仅换更强模型并不能解决所有问题。

多 Agent 系统会遇到：

- 任务重复。
- 输出矛盾。
- 上下文污染。
- 共享状态不一致。
- 工具调用失控。
- 无法停止。
- 责任难以归属。

因此，研究开始从“模型能力”转向“系统组织”。

一些论文和框架已经开始借鉴组织结构，例如：

```text
Planner
  |
Executor
  |
Critic
  |
Expert
```

或者：

```text
PM
  |
Architect
  |
Engineer
  |
Tester
```

这说明 Agent 已经越来越像一个组织，而不是一个孤立程序。

### 2.3 第三层：组织设计词汇开始进入 AI

最近的讨论中已经出现越来越多管理学词汇：

- Governance
- Accountability
- Policy
- Leadership
- Organization Design
- Role Boundary
- Incentive
- Oversight
- Traceability

《If You Want Coherence, Orchestrate a Team of Rivals》直接提出，可以通过多个有不同角色边界和对立激励的 Agent 来提高可靠性。它的关键思想是：不需要追求一个完美 Agent，而是通过组织一组不完美 Agent 来互相发现错误。

这已经非常接近“AI 组织智能”的方向。

## 3. 行业侧例子：企业正在把 Agent 当作组织单元

如果只看论文，容易以为“AI 组织智能”还是研究社区里的抽象概念。但从产业侧看，企业软件厂商已经在把 agent 当作一种新的组织单元来设计平台。

### 3.1 Salesforce Agentforce：从 CRM 功能到 Agent 平台

Salesforce 的 Agentforce 不是一个单独客服 bot，而是围绕企业客户关系管理构建的 agent 平台。它的产品结构包括 Agentforce Builder、Agentforce Voice、Agentforce Dev Tools、Agentforce Operations、AgentExchange、Sales Agents、Customer Service AI 等模块。

这里有两个信号值得注意。

第一，Salesforce 把“Humans with Agents”作为叙事核心，说明它把 agent 放在人类员工与业务系统之间，而不是把 agent 当作独立替代品。

第二，AgentExchange 类似 agent 生态市场：企业可以连接 agents、apps、实施伙伴和专家。这意味着 agent 不是单点能力，而是可以被分发、组合和治理的组织资源。

### 3.2 Microsoft Copilot Studio：从创建 Agent 到治理 Agent

Microsoft Copilot Studio 的行业信号更直接。它的公开内容已经把主题分成 Agent adoption、Agent governance、Agent security、Agentic AI、Extensibility、Product integrations 等栏目。

同时，Copilot Studio 的内容强调：

- agent evals：谁来评估 evaluator，如何规模化评估 agent 质量。
- agent governance：如何管理 agent 操作、连接应用体验和企业控制。
- agents plus workflows：如何把 AI agents 和 workflows 结合起来自动化业务流程。
- Frontier Tuning：如何让 agent 适配组织内部流程、知识和合规要求。

这说明企业已经意识到：真正的问题不是“能否生成一个 agent”，而是 agent 如何被评估、约束、集成、治理和规模化部署。

### 3.3 Anthropic MCP：从模型能力到连接协议

Anthropic 的 Model Context Protocol 是非常重要的行业例子。MCP 的核心不是让某个模型更聪明，而是解决企业系统里的连接问题：AI 助手需要访问数据、工具、代码仓库、业务系统和开发环境，但碎片化集成无法规模化。

Anthropic 发布 MCP 时提到，它提供了连接 AI 系统与数据源的开放标准，并提供 Google Drive、Slack、GitHub、Git、Postgres、Puppeteer 等预置 MCP servers。早期采用者包括 Block 和 Apollo，开发工具生态中也有 Replit、Sourcegraph 等。

这说明产业已经在建设 agent 的“基础设施层”：让 agent 能够稳定地访问工具和上下文。

### 3.4 Google Agentspace 与 A2A：从工具调用到 Agent 互操作

MCP 解决的是 agent 与工具/数据之间的连接，而 Google 的 Agent2Agent 更关注 agent 与 agent 之间的通信。

Google Cloud Next 2025 的行业报道中提到，Agent2Agent 协议的目标是让不同厂商、不同框架构建的 agents 能在企业生态中通信。报道还提到 Box、Deloitte、Salesforce、UiPath 等伙伴正在参与 Google Cloud 的协议生态。

这说明行业已经开始面对一个更大的问题：企业未来不会只有一个 agent，而会有来自不同平台、不同供应商、不同业务部门的一组 agents。如何发现、连接、授权和协调这些 agents，会成为企业 AI 架构问题。

### 3.5 Pega 与 ServiceNow：Agent 必须进入流程治理

Pega 的 Agentic Process Fabric 和 Blueprint 代表流程厂商的视角。它强调把 agents、apps、systems、data 注册到统一结构里，再根据任务选择合适的 agent。为了避免失控，Pega 强调把 agents 绑定到预定义 workflows、assigned tasks 和 SLAs，并支持审计。

ServiceNow 与 Wipro 等服务商推动 agentic AI workflows 进入 IT、HR、采购和网络安全等企业流程，说明 agent 正在从“助手”进入“运营流程”。这类场景天然要求权限、审计、升级路径、异常处理和人类审批。

这类例子特别重要，因为它们说明企业真正关心的是：

- Agent 是否可控。
- Agent 是否可审计。
- Agent 是否能嵌入已有流程。
- Agent 是否能跨系统协作。
- Agent 失败后谁负责。

也就是说，行业已经开始把 agent 当作组织中的行动者来治理。

### 3.6 小结：行业重点仍然偏执行，而非认知

这些行业例子证明，大家已经意识到“组织 agent”是重点。

但它们大多仍然面向：

- 客服。
- 销售。
- IT 流程。
- HR 流程。
- 采购。
- 网络安全。
- 企业系统集成。
- 工作流自动化。

这仍然属于 Task Completion 和 Workflow Automation。

你的方向更进一步：不是只问 agent 如何替人做事，而是问 agent 如何帮人思考。

因此，可以把当前产业实践和你的研究问题区分为两层：

```text
Industry Today:
Agent -> Workflow -> Execution -> Governance

Open Research/Product Space:
Perspective -> Discussion -> Consensus/Divergence -> Human Judgment
```

这就是为什么“行业已经意识到了”，但多数人意识到的仍然比这个问题浅一层。

## 4. 目前主流研究的局限

尽管行业已经开始研究组织，但大多数研究仍然围绕“如何组织 Agent 完成任务”展开。

典型任务包括：

- 写代码。
- 搜索资料。
- 生成报告。
- 调用工具。
- 处理企业流程。
- 完成业务自动化。

这些研究通常优化：

- Accuracy
- Cost
- Latency
- Task Success
- Tool Use
- Planning Quality
- Error Recovery
- Traceability

这当然重要，但它没有完全回答用户在真实思考场景中的需求。

用户问多个 AI，很多时候不是为了完成一个外部任务，而是为了管理自己的认知不确定性。

例如：

```text
我应该相信哪个观点？
哪些地方已经形成共识？
哪些地方仍然有分歧？
分歧是事实问题还是价值问题？
我现在是否足够有信心行动？
```

这类问题并不是普通的 workflow execution，而是 collective cognition。

## 5. 研究空白：共识是如何形成的

当前多 Agent 研究较少系统处理以下问题：

- 什么时候两个 Agent 应该争论？
- 什么时候应该停止争论？
- 什么时候应该投票？
- 什么时候应该相信专家而不是多数？
- 什么时候应该保留少数意见？
- 什么时候需要引入新 Agent？
- 什么时候 Moderator 应该介入？
- 什么时候人类应该加入？
- 什么时候应该追求一致，什么时候应该保留分歧？

这些问题更像组织行为学和认知科学问题，而不仅是工程问题。

因此，一个可能的新研究方向是：

> Consensus Engineering：研究多个智能体如何形成、解释、验证和呈现高质量共识。

但需要注意，共识不应被理解为所有问题的唯一目标。

对事实问题，目标是验证。

对决策问题，目标是形成足够行动信心。

对价值问题，目标是呈现取舍。

对创意问题，目标可能是保持发散。

所以更广义的方向应该叫：

> Cognitive Workflow Design：为不同问题类型设计不同的认知流程。

## 6. 新问题框架

可以把 AI 组织智能的核心问题拆成三类。

### 5.1 如何分工

研究问题包括：

- 一个任务应该拆成几个 Agent？
- Agent 应该按专业划分，还是按认知功能划分？
- 是否需要固定角色？
- 是否应该动态生成角色？
- 什么时候需要 Critic？
- 什么时候需要 Evidence Checker？
- 什么时候需要 Moderator？
- 什么时候需要 Devil's Advocate？

### 5.2 如何通信

研究问题包括：

- Agent 是否应该看到彼此的完整回答？
- 是否应该先独立思考再讨论？
- 是否应该广播所有消息，还是选择性通信？
- 是否需要共享记忆？
- 哪些信息应该进入公共上下文？
- 哪些信息应该保持隔离，避免群体思维？
- 如何避免上下文污染？

### 5.3 如何决策

研究问题包括：

- 什么时候停止讨论？
- 如何定义共识度？
- 如何解释分歧？
- 如何衡量证据强度？
- 多数意见和专家意见冲突时怎么办？
- 少数意见什么时候应该被保留？
- 用户应该在哪里介入？
- 最终输出应该是结论、概率、风险，还是行动建议？

这三类问题可以构成 AI 组织智能的基础研究框架：

```text
Division of Labor
      |
Communication
      |
Decision Mechanism
```

## 7. 组织结构假设

未来可以系统比较不同 AI 组织结构。

### 6.1 CEO 模式

一个中心 Agent 负责规划、分配和最终决策。

优点是清晰、高效、容易控制。

风险是中心瓶颈和单点偏差。

### 6.2 委员会模式

多个 Agent 独立给出意见，再通过投票或汇总形成结果。

优点是观点多元。

风险是表面民主和低质量多数。

### 6.3 Team of Rivals 模式

多个 Agent 拥有不同立场或对立激励，彼此挑战。

优点是容易发现错误和盲点。

风险是成本较高，且可能难以收敛。

### 6.4 市场模式

不同 Agent 提出观点、下注、竞争资源或评分。

优点是适合大规模观点筛选。

风险是机制复杂，可能激励投机式输出。

### 6.5 教室模式

教师、学生、助教、提问者、总结者共同参与。

优点是适合学习、解释和启发式思考。

风险是效率不一定最高。

### 6.6 科研小组模式

研究员提出假设，批判者寻找反例，证据 Agent 查证，主持人收敛。

优点是适合开放性研究问题。

风险是流程较长，成本较高。

## 8. 人机协同位置

AI 组织智能不能只研究 Agent 之间如何互动，还必须研究人何时进入组织。

人类可以承担几种角色：

- Problem Owner：定义真正的问题。
- Value Judge：决定价值取舍。
- Risk Bearer：承担最终后果。
- Taste Maker：判断创造性输出是否有意义。
- Stop Signal：决定是否继续讨论。
- Domain Expert：在专业领域纠偏。

一个好的系统不应让人类做机械搬运，而应让人类出现在高价值节点。

因此，研究重点不是 Human-in-the-loop 这个泛泛概念，而是：

> Human-at-the-right-moment

也就是人在什么时刻进入最有价值。

## 9. 可能的评估指标

传统多 Agent 系统常用任务成功率、准确率、成本和延迟评估。

但如果研究目标是认知流程，还需要新的指标。

### 8.1 共识质量

- 共识是否基于证据，而不是模型数量。
- 共识是否解释了适用边界。
- 共识是否暴露了不确定性。

### 8.2 分歧质量

- 是否识别出真正分歧。
- 是否区分事实分歧和价值分歧。
- 是否保留有价值的少数意见。

### 8.3 认知负担

- 用户是否减少复制粘贴。
- 用户是否更快理解问题结构。
- 用户是否更容易做出下一步判断。

### 8.4 决策信心

- 用户是否更清楚自己为什么相信某个结论。
- 用户是否知道哪些部分仍需验证。
- 用户是否更愿意采取行动。

### 8.5 用户参与质量

- 用户是否在关键节点参与。
- 用户是否避免被动接受最终答案。
- 用户是否能表达自己的价值偏好。

## 10. 一个初步研究议程

### 方向一：问题类型与组织结构匹配

研究不同问题类型适合什么样的 AI 组织。

假设：

- 事实问题适合 verifier 模式。
- 决策问题适合 consensus 模式。
- 创意问题适合 divergence 模式。
- 价值问题适合 perspective mapping 模式。

### 方向二：共识形成机制

比较不同共识机制：

- 多数投票。
- 专家加权。
- 证据加权。
- 辩论后收敛。
- 用户参与后收敛。

### 方向三：分歧解释机制

研究系统如何向用户解释：

- 分歧来自哪里。
- 哪些分歧可通过证据解决。
- 哪些分歧属于价值选择。
- 哪些分歧应该保留。

### 方向四：停止条件

研究 AI 讨论什么时候应该结束。

可能的停止条件：

- 共识达到阈值。
- 新增信息价值下降。
- 分歧已经转化为价值判断。
- 成本超过收益。
- 用户决定收敛。

### 方向五：人类介入时机

研究什么时候让用户加入最有效：

- 问题定义前。
- 角色生成后。
- 分歧出现时。
- 证据不足时。
- 最终建议前。

## 11. 这个方向为什么重要

如果模型能力继续提升，单个模型之间的差距可能会逐渐缩小。真正形成差异的，可能是系统如何组织智能。

就像人类组织中，个体能力重要，但组织结构、沟通机制、激励机制和决策机制同样决定最终表现。

AI 也会出现类似问题。

一个强模型加上弱组织，可能产生混乱、重复和不可靠输出。

多个不完美模型加上好的组织，可能产生更稳定、更透明、更可信的集体智能。

这就是 AI 组织智能的核心假设。

## 12. 结论

现在行业已经意识到 Multi-Agent Orchestration 是重点，但多数讨论仍然停留在如何完成任务。

更进一步的问题是：

> 组织不仅是为了 Task Completion，也是为了 Cognitive Process Management。

一个好的 AI 组织不仅要能完成任务，还要能控制什么时候发散、什么时候收敛、什么时候质疑、什么时候验证、什么时候形成共识、什么时候保留不同意见，以及什么时候把判断权交还给人。

因此，未来值得研究的对象不是 Agent 本身，而是：

- 认知流程。
- 组织结构。
- 共识机制。
- 分歧解释。
- 人机协同节点。

这个方向位于 AI、HCI、Management、Organizational Behavior 和 Complex Systems 的交叉处，可能成为未来五年非常有潜力的新研究领域。

## 参考来源

1. Yiwen Zhu, Lihe Liu, Jiaqian Yu, Di Zhang. [LLM-Based Multi-Agent Orchestration: A Survey of Frameworks, Communication Protocols, and Emerging Patterns](https://www.mdpi.com/1999-5903/18/6/326). Future Internet, 2026.
2. Gopal Vijayaraghavan, Prasanth Jayachandran, Arun Murthy, Sunil Govindan, Vivek Subramanian. [If You Want Coherence, Orchestrate a Team of Rivals: Multi-Agent Models of Organizational Intelligence](https://arxiv.org/abs/2601.14351). arXiv, 2026.
3. Michael Reilly. [Agentic AI Orchestration: An Organizational Design Framework](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6447261). SSRN.
4. Anthropic. [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol). 2024.
5. Salesforce. [Agentforce: The AI Agent Platform](https://www.salesforce.com/agentforce/).
6. Microsoft. [Microsoft Copilot Studio Blog](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/).
7. Google Cloud Next 2025 coverage. [Google Cloud Next 2025: All the live updates as they happened](https://www.itpro.com/cloud/live/google-cloud-next-2025-all-the-news-and-updates-live). ITPro, 2025.
8. The Economic Times. [Wipro shares rally over 4% on deal with ServiceNow to scale agentic AI](https://m.economictimes.com/markets/stocks/news/wipro-shares-could-rally-18-if-adr-is-an-indicator-heres-why-it-major-is-in-focus/articleshow/131380918.cms). 2026.
