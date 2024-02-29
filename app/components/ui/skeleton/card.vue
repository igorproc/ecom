<template>
  <div class="ui-card-skeleton card-skeleton">
    <ui-skeleton-image class="card-skeleton__image" />

    <div class="card-skeleton__content skeleton-content">
      <div class="skeleton-content__title" />
      <div class="skeleton-content__description" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-card-skeleton {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  @media #{map-get($display-rules, 'md')} {
    width: 310rem;
  }

  @media #{map-get($display-rules, 'xl')} {
    width: 285rem;
    height: 410rem;

    .card-skeleton__image {
      width: 100%;
      height: 301rem;
      border-radius: 0;
    }

    .card-skeleton__content {
      padding: 8rem 12rem;
      width: 100%;
      height: 109rem;
      display: flex;
      flex-direction: column;
      gap: 8rem;
      background-color: map-get($white-color-palette, 'white-5');

      .skeleton-content__title,
      .skeleton-content__description {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        animation: shine 2s infinite;
      }

      .skeleton-content__title {
        height: 18rem;
        width: 70%;
      }
      .skeleton-content__description {
        height: 16rem;
        width: 55%;
      }
    }
  }
}
</style>
