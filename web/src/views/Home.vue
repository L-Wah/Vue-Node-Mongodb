<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg"
          alt
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg"
          alt
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap _height" :class="{ _height1:more }">
        <!-- <div class="nav-item mb-3" v-for="n in 10" :key="n"> -->
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-storys"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-shop"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3" v-for="n in 5" :key="n">
          <i class="sprite sprite-ts"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-wechat"></i>
          <div class="py-2">公众号</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-introduce"></i>
          <div class="py-2">版本介绍</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="show">
        <i
          class="sprite sprite-arrow mr-1"
          :class="{  spriteArrow : more }"
        ></i>
        <span>{{ more ? "收起" : "展开" }}</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCats: [],
      heroCats: [],
      more: false,
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    show() {
      this.more = !this.more;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

// sprite
.sprite {
  background: url("../assets/images/index.png") no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  &.sprite-news {
    width: 22.9996px;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }
  &.sprite-storys {
    width: 22.9996px;
    height: 1.5385rem;
    background-position: 90.483% 15.614%;
  }
  &.sprite-shop {
    width: 1.4615rem;
    height: 1.6923rem;
    background-position: 36.746% 0.924%;
  }
  &.sprite-ts {
    width: 1.5385rem;
    height: 1.5385rem;
    background-position: 10.408% 15.517%;
  }
  &.sprite-wechat {
    width: 1.8462rem;
    height: 1.5385rem;
    background-position: 0 96.207%;
  }
  &.sprite-introduce {
    width: 1.5385rem;
    height: 1.6154rem;
    background-position: 89.733% 1.266%;
  }
  &.sprite-arrow {
    width: 0.7692rem;
    height: 0.7692rem;
    background-position: 38.577% 52.076%;
    transform: rotate(180deg);
  }
  &.spriteArrow {
    width: 0.7692rem;
    height: 0.7692rem;
    background-position: 38.577% 52.076%;
    transform: rotate(0deg);
  }
}
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
._height {
  height: 4.0754rem;
  overflow: hidden;
}
._height1 {
  height: 14.9985rem;
  overflow: hidden;
}
</style>
