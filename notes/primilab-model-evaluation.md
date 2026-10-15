# From clean cutouts to usable results: evaluating image models

> PrimiLab · AI Product Management Internship · Work in progress, as of October 2026

## Before asking which model is best

For image cutout and sticker products, a higher score does not automatically mean a usable result. Should a hand holding an object stay in the cutout? Should mesh openings be transparent? Is an enclosed region in an illustration background or part of the subject?

At PrimiLab, my work focused on model evaluation, model selection and on-device feasibility. A central lesson emerged: define what the user wants before deciding which data, rules and experiments should evaluate the model.

## Turning product intent into evaluation rules

I helped structure dimensions including subject selection, completeness, edge quality, transparency and holes, separating unclear product definitions from model limitations. Samples with disputed target subjects or reference annotations need clarification before they can support model comparisons.

Without a shared rule for hands and held objects, two reviewers can reasonably give opposite judgments of the same output. Adding more reviewers does not replace defining the product rule.

## From diagnostic samples to reproducible evaluation

Early diagnostic samples exposed low contrast, hair, thin structures and multiple subjects. They helped reveal failure modes but did not establish performance on the production distribution.

The work expanded to manifests, scenario categories, reference-annotation checks, deduplication, leakage checks and versioned train, validation and test splits. Each run needs to connect model weights, preprocessing, configuration and outputs so that changes between experiments remain traceable.

Automatic metrics support comparisons at scale. Fixed sampling and human review add judgments about product usability. Together, these records inform failure analysis and subsequent data and training iterations.

## What metrics and blind review each answer

IoU, Dice and boundary metrics provide structured comparisons, but cannot independently determine whether someone would use a sticker. I brought scenario coverage, severe failures, human usability and engineering requirements into the evaluation approach.

Fixed samples and blinded A/B comparisons help reduce expectations associated with model names and versions. Disputed annotations or sample assignments need correction before score differences are interpreted. An unfinished review is not a final model-selection decision.

## Bringing engineering constraints into the decision

Quality, speed and deployment constraints need to be considered together. Cloud or experimental runtimes do not substitute for Android device testing. An advantage on difficult examples does not establish suitability for every device or scenario.

My focus was to make these tradeoffs traceable: which scenarios need quality guarantees, which failures need a fallback, and which performance requirements still need validation.

## The method I take forward

Choosing a better model became an iterative process: define the target, check data and reference annotations, fix experimental conditions, combine automatic evaluation with human review, analyze failures, and update data and models.

Further decisions depend on resolving disputed samples and completing reviews. This page shares methods and my approach to the work, without internal data, unfinished rankings or claims about production impact.
