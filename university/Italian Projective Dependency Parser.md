---
date: "\\[2024-06-06 Thu 19:59\\]"
id: cfd74497-ade8-4704-b9fa-a29414a38458
title: Italian Projective Dependency Parser
---

- Related: [[Parsing English in 500 Lines of Python]], [[NLP]], [[Tecnologie del Linguaggio Naturale]]
- Repo: <https://github.com/dnbias/dependency-parser-it>
- ISDT: <https://github.com/UniversalDependencies/UD_Italian-ISDT>
  - used commit `5bb0bf3`

Run with:

``` bash
python parser.py model_dir wsj_train.dep wsj_train.pos wsj_test.dep
```

Obtain `wsj_train.dep`[^1]:

``` bash
for f in $1/*.mrg; do
    echo $f
    grep -v CODE $f > "$f.2"
    out="$f.dep"
    java -mx800m -cp "$scriptdir/*:" edu.stanford.nlp.trees.EnglishGrammaticalStructure \
-treeFile "$f.2" -basic -makeCopulaHead -conllx > $out
done
```

Convert to `conll-x` format[^2]:

``` bash
perl conllu_to_conllx.pl < file.conllu > file.conll
```

[^1]: <https://explosion.ai/blog/parsing-english-in-python>

[^2]: <https://github.com/UniversalDependencies/tools>
