# Does changing the language change a model’s judgment?

> Independent research · Credit-bearing project at Fraunhofer IAIS XAI Lab · March–August 2026

## Starting with a translation question

Would a model make the same judgment about an ethical situation in Chinese and English? Multilingual products can easily treat translated prompts as equivalent inputs. I wanted to investigate whether language conditions affect a model’s stance, and whether those differences can be located and tested inside the model.

I proposed the topic and independently completed the research design, dataset, experiments, analysis, final report and presentation. Fraunhofer IAIS researchers provided feedback at milestone and final reviews. This was a credit-bearing research project.

## Making the question measurable

Abstract moral questionnaires showed limited sensitivity in pilot experiments. I moved to concrete ethical conflicts across family responsibility, group harmony, obedience to authority and social order, building paired Chinese and English scenarios and checking semantic equivalence.

The evaluation combined repeated generation, model-judge scoring and agreement checks between judges. Cross-model comparisons and explicit-principle prompts helped investigate model-specific behavior, default language priors and instruction following. Observed differences need to be interpreted within their domains and experimental conditions; they do not establish a fixed mapping between language and values.

## From responses to representations

After behavioral evaluation, I extracted internal activations and used layer-wise linear probes to investigate whether stance could be predicted. Sparse autoencoder analysis then helped identify candidate features, alongside checks for language and lexical confounds.

Predicting stance from activations does not establish a mechanism that controls it. A feature associated with a response may also reflect language, topic or other factors that change together.

## Testing explanations through intervention

I tested vector steering and sparse-feature interventions. These provided different levels of evidence: vector steering produced a shift, while single-feature results remained exploratory and did not establish a reliable stance control mechanism.

Correlation is useful for proposing explanations; intervention puts those explanations to a stronger test. Non-significant results also help define what the evidence can support.

## Implications for AI product evaluation

- Multilingual products need behavioral consistency checks alongside translation checks.
- Preserve scenarios and domains instead of reporting only an aggregate score.
- Validate model judges; agreement between judges is not objective ground truth.
- Report behavior, representation correlations and intervention effects separately.

For further work, I would build a reusable evaluation workflow earlier and investigate multi-feature, multi-layer interventions. This page describes the research question, methods and limitations; it is not a full experimental report or a claim of publication.
