# **Paper Review: Tracking Political Biases in NLP Models**

## **Introduction**

The success of ChatGPT 3.5 was my first real introduction to the concept of Large Language Models (LLMs). From my first use, I felt its responses were as real as a human's. Subsequently, numerous LLMs have entered the market.

I have used several of them, and sometimes out of curiosity, I ask sensitive questions related to politics, gender, religion, race, etc. Most of the time, they provide very neutral answers. Sometimes they avoid answering, and occasionally, their views differ from mine. I became curious about what causes these LLMs to exhibit such attitudes and stances when handling these sensitive topics.

This sparked my concern about the potential bias issues within language models. Therefore, I read the paper, "From Pretraining Data to Language Models to Downstream Tasks: Tracking the Trails of Political Biases Leading to Unfair NLP Models." I hope to understand how political biases in LLMs are passed from pretraining data to downstream tasks, leading to unfair NLP models.

## **Paper Basic Information**

* **Paper Title:** From Pretraining Data to Language Models to Downstream Tasks: Tracking the Trails of Political Biases Leading to Unfair NLP Models  
* **Authors:** Shangbin Feng, Chan Young Park, Yuhan Liu, Yulia Tsvetkov  
* **Conference:** ACL 2023  
* **DOI:** 10.48550/arXiv.2305.08283

## **Abstract and Background**

The authors note that due to increased online political participation and discussion of polarized issues, content with social biases is increasingly part of the training data, which then propagates into downstream models.

Even after data cleaning during model training, the complexity of polarized political issues means that hidden social biases in language are difficult to eliminate completely. These biases often cannot be simply reduced to stereotypes. This has led to a research gap in the study of political bias in NLP models, especially when handling polarized political issues.

The authors' goal is to fill this research gap by quantifying political biases in pretrained language models and exploring how these biases affect the fairness of downstream NLP tasks. To do this, they propose a framework based on political spectrum theory to assess the political leanings of LMs and conduct experiments to explore how biases in pretraining data propagate. The experiments reveal how ideological polarization spreads bias to LMs, which then affects social-oriented downstream tasks.

The study provides a new perspective for the NLP field, emphasizing the potential impact of political bias in LMs and suggesting future research directions for mitigating unfairness. This framework allows researchers to better understand and detect political biases, thereby developing more fair and just NLP applications.

## **Method and Experimental Design**

The researchers propose a two-step method to determine the impact of political bias in pretraining corpora on the fairness of downstream tasks.

First, they developed an LM political assessment framework based on political science literature to measure the inherent political leanings of pretrained LMs. Second, they investigated how these political leanings affect the performance of LMs in downstream social-oriented tasks.

### **Testing the Political Leanings of Models**

The researchers used an LM political assessment framework to test the inherent political leanings of 14 different types of models. Specifically, this framework has two axes representing the model's social and economic values. The researchers analyzed each LM's response to 62 political statements using widely recognized political compass tests. Different responses yield different social and economic scores (ranging from \[-10, 10\]), which are mapped as a 2D vector onto the framework to measure their leanings.

Different methods were used for different models:

* **For encoder-only LMs**, the researchers used mask-filling with prompts from political statements. They constructed specific prompts and had the LMs fill the mask, returning the top 10 most probable tokens. By comparing the overall probabilities of positive and negative words, they mapped responses to different degrees of agreement.  
* **For generative models**, they used a stance detector to determine if the generated response agreed or disagreed with the given statement.

### **Investigating the Impact of Political Leanings**

To investigate how these leanings affect downstream tasks, the researchers further pretrained LMs on different partisan corpora and evaluated their performance differences on hate speech detection and misinformation detection tasks.

First, they collected partisan pretraining corpora for LMs, categorized by two dimensions:

1. **Domain:** News and Social Media  
2. **Political Leaning:** Left, Center, Right

To avoid models generating hate speech, the researchers used a RoBERTa-based hate speech classifier fine-tuned on the TweetEval benchmark. They obtained six pretraining corpora of similar size:

* Left-leaning News (NEWS-LEFT)  
* Center News (NEWS-CENTER)  
* Right-leaning News (NEWS-RIGHT)  
* Left-leaning Social Media (REDDIT-LEFT)  
* Center Social Media (REDDIT-CENTER)  
* Right-leaning Social Media (REDDIT-RIGHT)

The researchers trained RoBERTa and GPT-2 on these six datasets. After training, they re-tested the models' political leanings using the framework from the first step.

To observe the changes more intuitively, they took the base RoBERTa and four variants further pretrained on the REDDIT-LEFT, REDDIT-RIGHT, NEWS-LEFT, and NEWS-RIGHT corpora. They had these variants perform two downstream tasks to observe how political bias affects their behavior.

This way, they investigated how political bias from pretraining data propagates to LMs and affects the fairness of downstream tasks.

## **Experimental Results and Conclusion**

The figure above shows the measured political leanings of various LMs. Compared to the GPT series, BERT and its variants show more pronounced social conservatism. These LMs exhibit stronger biases on social issues (y-axis) and weaker biases on economic issues (x-axis). The average magnitudes for social and economic issues were 2.97 and 0.87, respectively. This suggests greater divergence among LMs on social values, possibly because social issues are discussed more frequently on social media than economic issues, which require more background knowledge.

The figure above shows the political leanings of RoBERTa and GPT-2 after further pretraining on the six partisan corpora. It is clear that LMs acquire political biases from the data. For RoBERTa, user-generated text from social media had a greater impact on social values, while news media had a greater impact on economic values.

The figure above shows the performance of RoBERTa and its four variants on hate speech and misinformation detection. The results indicate that left-leaning LMs generally perform slightly better than right-leaning LMs. The REDDIT-RIGHT corpus was particularly detrimental to downstream performance, lagging far behind the base RoBERTa. These results suggest that the political leaning of the pretraining corpus can impact overall task performance.

The researchers also studied performance variations across different audience identity groups and misinformation sources based on the models' political biases. The figure above shows significant differences in model behavior based on their political leanings.

Models exhibit unfairness. In hate speech detection, left-leaning LMs perform better on hate speech targeting widely recognized minority groups, while right-leaning models tend to better identify hate speech targeting dominant identity groups. For misinformation detection, both left- and right-leaning LMs are less sensitive to misinformation aligned with their own stance but stricter on misinformation from opposing stances. These results highlight concerns about the amplification of political bias from pretraining data, which then propagates to downstream tasks, directly impacting model fairness.

## **Personal Evaluation and Reflection**

In the current frenzy of LLM development, it is crucial to cool down and analyze the potential biases in these models. As their use becomes widespread, so does their social responsibility.

In terms of innovation, this paper proposes a systematic framework for tracking and analyzing political bias in NLP models, which is a highly innovative contribution. Traditional NLP research focuses more on improving performance or optimizing algorithms. This paper shifts the focus to potential political biases in pretraining data and their impact on downstream tasks, filling a research gap and significantly broadening the field of NLP fairness. The paper is clearly written, and the methods and experimental design are reasonable and easy to understand. The authors present complex processes and results intuitively through charts and detailed explanations.

This paper also provides me with new ideas and tools for studying NLP fairness. Through this framework, I learned how to quantify and assess political bias in pretraining data and understand its propagation. In future research, I can reference their methods to design similar experiments for detecting and mitigating model bias.

However, even with its many innovations, I question the generalizability of the experimental results from these specific datasets. The corpora and environments used may differ from other application scenarios, meaning the results might not be reproducible on other datasets. Could their conclusions be validated with more diverse datasets and broader experiments?

The fairness of NLP models is an issue that requires continuous consideration, not just as a technical challenge, but as a topic of social responsibility.