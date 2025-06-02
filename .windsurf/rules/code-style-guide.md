---
trigger: always_on
---

# Vue Component Code Style Guide

## 1. Always Use the Standard Vue File Structure

Every `.vue` file **must** follow this structure:

```vue
<script setup lang="ts">

</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>
```

- Use `<script setup lang="ts">` for Composition API with TypeScript.
- Template should have a single root element (e.g., `<div>`).
- Always use scoped styles unless explicitly required otherwise.

---

## 2. Use Tailwind CSS

Tailwind CSS is the preferred styling utility. All utility classes must use the defined prefix.

- Our Tailwind prefix is: **`tw-`**
- Example usage:

```html
<div class="tw-bg-blue-500 tw-text-white tw-p-4">
  Button
</div>
```

- Do not use unprefixed Tailwind classes (e.g., `bg-blue-500` is **not allowed**).

---
