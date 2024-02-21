<template>
  <footer class="app-footer footer">
    <span class="footer__copyright">
      2023 Specto. All rights reverved
    </span>
  </footer>
</template>

<style lang="scss">
.app-footer {
  margin-top: 25rem;
  padding: 10rem 15rem;
  .footer__copyright {
    font-size: 10rem;
    font-weight: bold;
  }

  @media #{map-get($display-rules, 'md')} {
    .footer__copyright {
      font-size: 18rem;
    }
  }

  @media #{map-get($display-rules, 'xl')}{
    padding: 25rem 65rem;
  }
}

</style>
