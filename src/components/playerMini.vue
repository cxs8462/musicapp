<template>
  <div class="playMini">
    <div class="jdbar">
      <el-slider
        @change="currentTime"
        v-model="player.currentTime"
        :min="0"
        :max="player.duration"
        :format-tooltip="timeFormet"
      ></el-slider>
    </div>
    <div class="miniLeft">
      <div class="img" v-if="Object.keys(player.selectItem).length">
        <img :src="player.selectItem.picUrl + '?param=300y300'" />
        <p class="btn" @click="playerShow">
          <i v-if="!player.isShow" class="el-icon-arrow-up" /><i
            v-else
            class="el-icon-arrow-down"
          />
        </p>
      </div>
      <div class="ar" v-if="Object.keys(player.selectItem).length">
        <p class="name">
          {{ player.selectItem.name }}--{{ player.selectItem.ar.join("|") }}
        </p>
        <p class="time">
          {{ timeFormet(player.currentTime) }}/{{ timeFormet(player.duration) }}
        </p>
      </div>
    </div>
    <div class="miniCenter">
      <div class="bfbtn" @click="ago">
        <i class="el-icon-caret-left" />
      </div>
      <div v-if="player.paused" @click="play" class="bfbtn">
        <i class="el-icon-video-play" />
      </div>
      <div v-else @click="stop" class="bfbtn">
        <i class="el-icon-video-pause" />
      </div>
      <div class="bfbtn" @click="next">
        <i class="el-icon-caret-right" />
      </div>
    </div>
    <div class="miniRight">
      <i
        class="el-icon-s-unfold"
        @click.stop="listShow"
        style="cursor: pointer;"
      />
      <i
        v-if="vol !== 0"
        @click="
          () => {
            vol = 0;
          }
        "
        class="el-icon-message-solid"
        style="cursor: pointer;"
      />
      <i
        v-else
        @click="
          () => {
            vol = 100;
          }
        "
        class="el-icon-bell"
        style="cursor: pointer;"
      />
      <div class="volbar">
        <el-slider v-model="vol"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { musicTiem } from "@/until/time";

export default {
  name: "playMini",
  mounted() {},
  data() {
    return {
      percentage: 20,
      vol: 100
    };
  },
  watch: {
    vol(value) {
      this.player.player.volume = value / 100;
    }
  },
  computed: {
    player() {
      return this.$store.state.player;
    }
  },
  methods: {
    timeFormet(time) {
      return musicTiem(time);
    },
    playerShow() {
      this.$store.commit("player/setIsShow", !this.player.isShow);
    },
    currentTime(e) {
      this.player.player.currentTime = e;
    },
    play() {
      this.player.player.play();
    },
    stop() {
      this.player.player.pause();
    },
    listShow() {
      this.$store.commit(
        "player/setListShow",
        !this.$store.state.player.listShow
      );
    },
    ago() {
      this.$store.commit("player/ago");
    },
    next() {
      this.$store.commit("player/next");
    }
  }
};
</script>

<style lang="less" scoped>
.playMini {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1000;
  .jdbar {
    position: absolute;
    width: 99%;
    top: -20px;
    z-index: 1000;
  }
  .miniLeft {
    width: 40%;
    padding: 10px;
    height: 60px;
    display: flex;
    align-items: center;
    .img {
      width: 60px;
      height: 60px;
      margin-left: 30px;
      overflow: hidden;
      position: relative;
      img {
        filter: blur(3px);
      }
    }
    .ar {
      margin-left: 20px;
      color: var(--header-color);
      .name {
        font-size: 20px;
      }
      .time {
        font-size: 22px;
      }
    }
    .btn {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 40px;
      color: white;
      transform: translate(-50%, -50%);
    }
  }
  .miniRight {
    width: 40%;
    font-size: 40px;
    display: flex;
    color: var(--header-color);
    justify-content: flex-end;
    margin-right: 20px;
    .volbar {
      display: block;
      margin-left: 20px;
      width: 300px;
      .el-slider__button-wrapper {
        top: -0.14rem !important;
      }
    }
  }
  .miniCenter {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    .bfbtn {
      margin-left: 10px;
      cursor: pointer;
      font-size: 60px;
      color: var(--header-color);
    }
  }
}
</style>
