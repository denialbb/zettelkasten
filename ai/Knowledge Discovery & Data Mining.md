---
date: "\\[2023-02-27 Mon 10:53\\]"
id: fad85788-53f8-4de6-9e3c-775c3907e07c
title: Knowledge Discovery & Data Mining
---

- [[Bike Sharing Dataset]]

# Cycle of Analytics

## Preprocessing

- data transformation
- data reduction
  - in **big data** situation it is wise to choose a subset of the data to query.
  - reduce attributes or data
  - different strategies
    - **dimensionality reduction**
    - **numerosity reduction**
      - sampling
        - random selection, performance might suffer because of skew in the data
        - stratified sampling (cluster)
- cleaning of data
- integration of data
  - **assumption**: the data we have is incomplete
- data privacy concerns have to be considered

To accomplish this you can use visualizations, ask a domain expert.

**NB** there is no straightforward way to do all this, it takes intelligent thought.

The first goal is to arrive to a **clean and complete dataset**, one that fulfills the requirements.

## Interpretation

Statistics is not everything, the data experts/domain experts need to interpret the information the `ML` application produces.

From the novelties you extract from the data you take **action** based on them.

## Visualization

## Anonymity

See [[k-Anonymity- A Model for Protecting Privacy]]

Privacy concerns are important to consider when studying datasets, personal information should not be exposed or even used.

We have to define security classes or accessibility control systems.

- a matrix $`M(i,j)`$ which specifies $`\{Access, Update, Select\}`$ for examples
  - where $`i`$ is an object (database views) and $`j`$ is a subject
- classes can be `Strictly Confidential` \> `Confidential` \> `Uncritical` and users are assigned one of these

Even sanitized data can still be *critical* not for its contents per-se but for the possibility of being combined with other sources.

To solve this we can **generalize** the data. To do this we need the data to have some kind of hierarchy, either assumed or defined.

The approach is to use a. \$k\$​-anonymity

- generalisation and suppression of data values
- find equivalence classes that contain $`\geq k`$ records
- kinds of attributes
  - *uncritical data* is not considered when constructing these classes
  - *non-sensitive data* or *quasi-identifier* are to be combined and generalized
  - *sensitive data* has to be published
- Samarati's approach\[[k-Anonymous Data Mining- A Survey]]\]:
  - different nodes indicate a combination of levels of generalization in each attribute
  - starting by the lowest node, the most specific, going up the data is generalized
  - *height* is defined to the number of steps in the graph needed to traverse from the bottom to the top
  - start at level
    ``` math
    \lfloor\sqrt{\text{height}}\rfloor
    ```

b\. \$l\$​-diversity\[[l-Diversity- Privacy Beyond k-Anonymity]]\]

- homogeneity in the sensitive attribute is not desirable as it offers some possible privacy exploits
- $`l`$ number of minimum <u>different sensitive data values</u> in an *equivalence class*

c\. \$t\$​-closeness

- $`t`$ measures the how similar the individual class distribution is against the total distribution, again the minimum value
- higher is better again
- **Earth-Mover distance** is one of the measures used

# Machine Learning

- life cycle of a `ML` systems
- each cycle brings a different level of bias into the system
  - historical, in the collected data there can be missing information that is representative of the world today and wasn't in the past
  - representation
  - measurement
  - aggregation
  - learning
  - evaluation
  - deployment

## Association Discovery

## Sequential Pattern Mining

## Classification

- supervised, training data accompanied by labels

2 steps

- model construction w/ training data
- model usage for future predictions
  - **accuracy is estimated**
    - *accuracy* based on **test set**
      - accuracy may be biased be dependencies between an attribute and the label
    - a test set used to select models is called a **validation set**

### Support Vector Machines

### Decision Trees

Induction based approach, usually goes until stop condition is reached, can be a minimum purity, number of levels. To decide the condition on the split we use criteria like **entropy** from Information Theory.\[[Entropy]]\]

## Clustering

- unsupervised
