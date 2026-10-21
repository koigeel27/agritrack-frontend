<template>
  <div>
    <a class="skip-link" href="#main">Skip to main content</a>
    <AppHeader />
    <main id="main" class="container" tabindex="-1">
      <slot />
    </main>
    <footer class="container project-footer">
      <small>AgriTrack &middot; ITE 18 Midterm Project</small>
    </footer>
  </div>
</template>
