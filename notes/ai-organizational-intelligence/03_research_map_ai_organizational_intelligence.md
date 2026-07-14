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

## 3. 目前主流研究的局限

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

## 4. 研究空白：共识是如何形成的

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

## 5. 新问题框架

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

## 6. 组织结构假设

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

## 7. 人机协同位置

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

## 8. 可能的评估指标

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

## 9. 一个初步研究议程

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

## 10. 这个方向为什么重要

如果模型能力继续提升，单个模型之间的差距可能会逐渐缩小。真正形成差异的，可能是系统如何组织智能。

就像人类组织中，个体能力重要，但组织结构、沟通机制、激励机制和决策机制同样决定最终表现。

AI 也会出现类似问题。

一个强模型加上弱组织，可能产生混乱、重复和不可靠输出。

多个不完美模型加上好的组织，可能产生更稳定、更透明、更可信的集体智能。

这就是 AI 组织智能的核心假设。

## 11. 结论

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
3. Michael Reilly. Agentic AI Orchestration: An Organizational Design Framework. SSRN 页面待进一步核验。
