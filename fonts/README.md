# Example: <br> `preload` font

### Add the following to the `HTML` file:

```
<link rel="preload" href="/web/public/assets/fonts/Inconsolata-VariableFont_wdth,wght.ttf" as="font" type="font/truetype" crossorigin="anonymous" />
```

and

```
<h3>Data Analytics | People Operations | Mathematics</h3>
```

---

### Add `@font-face` to the `CSS` file:

```
@font-face {
  font-family: saira_condensed_medium;
  src: url("fonts/SairaCondensed-Medium.ttf") format("truetype");
}
```

#### add `style` to the `.css` file:

```
h3 {
  font-family: saira_condensed_medium;
}
```

<mark> Revised </mark>

---

### Concept

[**variable fonts**](https://www.digitalocean.com/community/tutorials/how-to-load-and-use-custom-fonts-with-css)
: which are single font files from which multiple fonts can be interpolated,
providing a high-degree of tuning and font customization.

```
yarn add parcel
```
