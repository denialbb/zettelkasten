---
date: "\\[2022-05-27 Fri 00:40\\]"
id: 0d27872a-3b4b-44ae-9479-dd9f51cae2e8
title: QMK Italian accents
---

See [this keymap](https://github.com/umbacos/qmk_firmware/blob/master/keyboards/planck/keymaps/umbacos2x2u/keymap.c), in particular:

``` example
[_ACCENT] = LAYOUT_planck_2x2u(
    _______, IT_EURO, IT_AT, IT_EACC, _______, _______, _______, IT_UACC, IT_IACC, IT_OACC, _______, _______,  \
    _______, IT_AACC, _______, _______, _______, _______, _______, _______, _______, _______, _______, _______,   \
    KC_LSFT, _______, _______, _______, _______, _______, _______, _______, IT_SCLN, IT_COLN, _______, _______,   \
    _______, _______, _______, _______, _______, _______, _______, _______, _______, _______ \
),
```
