---
id: c5461b03-abb3-4dfb-9334-a1fd6fe1f70b
title: Fisica
---

# Vettori

Prodotti vettoriali tra i versori degli assi:

# Elettrostatica

``` math
k_0 = 8.99 \cdot 10^9 \frac{Nm^2}{C^2}
```
``` math
 q_e = -1.6 \cdot 10^{-19}C = -e 
```
``` math
 m_e = 9.11\cdot 10^{-31}kg 
```

## Moto di Cariche

``` math

\vec{r} = \vec{r_0} + \vec{v_0}t + \frac{1}{2}\vec{a}t^2
```
``` math

\vec{v} = \vec{v_0}+\vec{a}t
```

Per un corpo con carica $`q`$ e massa $`m`$ in un campo elettrico:
``` math

m\vec{a}=\vec{F}=q\vec{E}\rightarrow \vec{a}=\frac{q\vec{E}}{m}=\frac{q}{m}(E_x\vec{i}+E_y\vec{j})
```

## Lavoro e Energia

``` math
 L_E = |\vec{F}||\vec{s}| \cos{\theta_{\vec{F},\vec{s}}} 
```
``` math
 |\vec{F}| = |-e\vec{E}|=eE   
```

``` math
 L_E = \Delta E_k = \Delta U = q(V_A - V_B)
```
``` math
\Delta E_k = 0 - \frac{1}{2}m_e v_0^2  
```

- in caso di corpo inizialmente fermo

``` math
P_E = \frac{L_E}{\Delta t} = - \frac{eEs}{\Delta t}= - \frac{eEv_0\Delta t}{\Delta t}
```

- potenza sviluppata dal campo elettrico
- negativa nel caso la forza elettrica si opponga al moto

## Legge di Coulomb

``` math
k_e = \frac{1}{4\pi \epsilon}
```

## Campi elettrici

``` math
E(\vec{r})=k_e \frac{q}{|\vec{r}-\vec{r_o}|^2}\vec{u}
```

- campo elettrico prodotto in $`\vec{r}`$ da una carica puntiforme $`q`$ posta in $`r_o`$

``` math
V(\vec{r}) = k_e \frac{q}{ |\vec{r}-\vec{r_o}| }+K  
```

- potenziale prodotto in $`\vec{r}`$ da una carica puntiforme $`q`$ posta in $`r_o`$

$`\vec{F} = q_0\vec{E}`$

- forza su una particella di carica $`q_0`$ posta in un campo elettrico

$`\vec{p} = q\vec{d}`$

- momento di dipolo elettrico

### Dipolo elettrico

Momento del Dipolo $`p=qd`$

1.  Piano Mediano

    Sul piano di direzione del campo elettrico é costante e uguale a quella della congiungente tra i due poli

    - le componenti $`y`$ si annullano

    ``` math
    \vec{E} =- k_e \frac{qa}{(\frac{d^2}{4}+y^2)^{3/2}}\vec{i}
    ```

    - per $`|y| \gg a`$ vale
      ``` math
      \vec{E} =-\frac{kp}{|y|^3}\vec{i}
      ```

2.  Lungo l'Asse

    ``` math
    \vec{E} = k_e \frac{2qxd}{x^2 - \frac{d^2}{4}}\vec{i}
    ```

    - per $`|x| \gg a`$ vale
      ``` math
      \vec{E}= \frac{2kp}{|x|^3}\vec{i}
      ```

### Distribuzione Lineare e Uniforme Infinita

``` math
\vec{E} = 2k_e\frac{\lambda}{r}\vec{u}
```

### Legge di Gauss

Vale sempre, é una legge generale del campo elettrico.
``` math

\Phi_{\vec{\sum}}= \int_{S} \vec{E} \cdot \vec{n} dS = 4\pi k_e \sum_{i\to \infty} Q_i
```
Valgono alcuni casi particolari

1.  Simmetria Sferica di carica

    $`E = k_e \frac{Q}{R^2}`$

2.  Simmetria Assiale

    $`E= 2k_e \frac{\lambda}{R}`$

3.  Simmetria Planare

    $`E = 2 \pi k_e \sigma = \frac{\sigma}{2\epsilon_0}`$

## Circuiti

### Legge di O

$`V=RI`$

### Condensatori

$`C = \frac{q}{V}`$

- Capacitá

$`\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2}`$

- Condensatori in serie

$`C = C_1+C_2`$

- Condensatori in parallelo

$`U_E = \frac{q^2}{2C} = \frac{1}{2}CV^2 = \frac{1}{2}qV`$

- Energia immagazzinata in un condensatore

1.  Condensatore Piano

    $`C=\varepsilon_0 \frac{S}{d}`$

    - 
      ``` math
      \varepsilon_0 = \frac{1}{4\pi k_0} 
      ```

    $`E = \frac{\sigma}{\epsilon_0}`$ $`V=Ed`$

### Resistenze

$`R_{eq} = R_1 + R_2`$ $`\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2}`$

$`P = RI^2`$

- potenza assorbita nella resistenza

$`P=VI`$

- potenza erogata da una forza elettromotrice (*f.e.m.*)

### Kirchhoff

``` math
\sum_i I_i = 0 
```

- nodi

``` math
\sum_j f_j - \sum_k R_kI_k = 0 
```

- maglie

### Circuito RC

$`q(t) = q_0 (1-e^{-t/\tau})`$ $`i(t)=\frac{dq}{dt} = i_0e^{-t/\tau}`$

- dove $`\tau = RC`$

# Magnetismo

$`B=2k_m\frac{I}{r}`$

- modulo del campo magnetico generato da un filo rettilineo di lunghezza infinita percorso da una corrente $`I`$ in punto a distanza $`r`$ dal filo

$`B=4\pi k_mnI = \mu_0nI`$

- modulo del campo magnetico generato da un solenoide rettilineo ideale

``` math
\vec{B}=2k_m\frac{I\pi R^2}{(R^2+z^2)^{3/2}}\vec{n}
```

- Campo generato da una spira circolare percorsa da corrente, lungo l'asse della spira

``` math
\vec{B} = \frac{k_m}{k_e}\vec{v}\times\vec{E}
```
``` math
\vec{B} = \frac{1}{c^2}\vec{v}_a \times \vec{E}_B
```

- Campo generato da una carica in moto in un campo elettrico

$`\vec{F}=q_0\vec{v}\times \vec{B}`$

- forza su una particella carica $`q_0`$ in moto in un campo magnetico

$`\vec{F}=\vec{I}\times\vec{B}l`$

- forza su un filo rettilineo di lunghezza $`l`$ percorso da corrente

``` math
F=2k_m\frac{I_1I_2}{d}l
```

- modulo della forza fra due fili rettilei paralleli percorsi da corrente

$`\vec{m}=IS`$

- momento di dipolo magnetico di una spira di area $`S`$

``` math
\Phi_{\Sigma}(\vec{B})=\int_\Sigma \vec{B}\cdot \vec{n}dS
```

- flusso campo magnetico attraverso una superfice $`\Sigma`$

$`\Phi_B = \vec{B}\cdot\vec{n}S = BS \cos{\theta}`$

## Faraday Lenz

``` math
\varepsilon_i=-\frac{d\Phi_\Sigma(\vec{B}) }{dt}
```

## Fili

``` math
F= \frac{\mu_0I_1I_2l}{2\pi d}
```

- repulsiva con correnti nel verso opposto, attrattiva se nello stesso verso

## Induttanza

$`\varepsilon = -L \frac{dI}{dt}`$

- *f.e.m.* autoindotta

$`L = 4\pi k_mn^2lS = \mu_0 n^2 lS`$

- induttanza di solenoide rettilineo

$`U_M = \frac{1}{2}LI^2`$

- energia immagazzinata in un solenoide

$`L_{eq} = L_1 + L_2`$

- induttanze in serie

$`\frac{1}{L_{eq}} = \frac{1}{L_1} + \frac{1}{L_2}`$

- induttanze in parallelo

Forza elettromotrice autoindotta:

## Circuito LR

$`I=I_0(1-e^{-t/\tau})`$

- corrente dopo chiusura con $`\tau = \frac{L}{R}`$

$`I=I_0 e^{-t/\tau}`$

## Circuito LC

$`q = q_0 \cos{(\omega_0t + \emptyset)}`$

- dove $`\omega_0 = \frac{1}{\sqrt{LC}}`$

## Circuito RLC

$`Z = \sqrt{R^2 + (\omega L - \frac{1}{\omega C})^2}`$

- impedenza in presenza di una *f.e.m.* alternata con pulsazione $`\omega`$
