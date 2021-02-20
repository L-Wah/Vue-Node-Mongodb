<template>
  <div>
    <el-breadcrumb separator="/" style="padding-bottom: 10px; font-size: 12px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="15">
      <!-- 左边部分 -->
      <el-col :span="13">
        <!-- 功能列表 -->
        <el-row :gutter="10">
          <el-card style="height: 125px">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <router-link to="/heroes/list">
                  <img
                    src="../assets/1.svg"
                    alt
                    width="60.8px;"
                    style="margin: 0px auto; cursor: pointer; margin-left: 20px"
                  />
                </router-link>
                <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                  英雄列表
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <router-link to="/ads/list">
                  <img
                    src="../assets/2.svg"
                    alt
                    width="60.8px;"
                    style="cursor: pointer; margin-left: 20px"
                  />
                </router-link>
                <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                  广告列表
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <router-link to="/categories/list">
                  <img
                    src="../assets/3.svg"
                    alt
                    width="60.8px;"
                    style="cursor: pointer; margin-left: 20px"
                  />
                </router-link>
                <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                  分类列表
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
              <router-link to="/admin_users/list">
                <img
                  src="../assets/4.svg"
                  alt
                  width="60.8px;"
                  style="cursor: pointer; margin-left: 20px"
                />
              </router-link>
              <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                管理员账号
              </div>
            </el-col>
          </el-card>
          <el-card class="box-card" style="margin-top: 20px; padding: 0px">
            <!-- 用户登入报表 -->
            <div id="loginReport" style="width: 650px; height: 270px"></div>
          </el-card>
        </el-row>
      </el-col>
      <!-- 右边部分 -->
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-card>
            <el-carousel height="180px">
              <el-carousel-item v-for="(item, i) in carousel" :key="i">
                <img :src="item" alt="" style="width: 100%" />
              </el-carousel-item>
            </el-carousel>
            <aplayer
              style="margin-top: 20px; margin-bottom: 30px"
              autoplay
              :music="{
                title: '给我一个理由忘记',
                artist: 'A-Lin',
                src: 'http://music.163.com/song/media/outer/url?id=25640799.mp3',
                pic:
                  'http://p2.music.126.net/0POVOSSjqgVoOUGc5haWBQ==/109951163392311918.jpg',
              }"
              :list="musicList"
            ></aplayer>
            <el-divider></el-divider>
          </el-card>
          <!-- <el-calendar :v-model="new Date()"></el-calendar> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import aplayer from "vue-aplayer";
import * as echarts from "echarts";
export default {
  components: {
    aplayer: aplayer,
  },
  data() {
    return {
      musicList: [
        {
          artist: "Eminem",
          lrc: "",
          title: "Airplanes",
          src: "http://music.163.com/song/media/outer/url?id=26714821.mp3",
          pic: "http://p4.music.126.net/H9HJibEzTL34aIT6nsqKsQ==/5682276092402519.jpg",
        },
      ],
      carousel: [
        "http://myforum.oss-cn-beijing.aliyuncs.com/postImages/1582867606734617c9668-8086-4c9b-867e-efda0bff78d63.png?Expires=1677475607&OSSAccessKeyId=LTAI4FsV5R1tnt8W8kqFqBYh&Signature=3xKM18EXDDD%2BQmsg%2B0t7uDC%2FMGg%3D",
        "http://myforum.oss-cn-beijing.aliyuncs.com/postImages/15828676585536f809b01-a5c3-4229-8ce6-ed29a7bdaaa22.png?Expires=1677475658&OSSAccessKeyId=LTAI4FsV5R1tnt8W8kqFqBYh&Signature=k2fJfFzwKwp7f2c%2BRD7rdH%2FAj%2Bs%3D",
      ],
    };
  },
  methods: {
    /**
     * 加载登入报表数据
     */
    async loginReport(username) {
      const { data: res } = await this.$http.post("system/loginLog/loginReport", {
        username: "蔡徐坤",
      });
      if (!res.success) {
        return this.$message.error("获取登入报表数据失败:" + res.msg);
      } else {
        const $this = this;
        this.xData = [];
        this.yData = [];
        this.myData = [];
        res.data.all.forEach((e1) => {
          $this.xData.push(e1.days);
          $this.yData.push(e1.count);
        });

        for (let i = 0; i < this.xData.length; i++) {
          let count = 0;
          for (let j = 0; j < res.data.me.length; j++) {
            if ($this.xData[i] === res.data.me[j].days) {
              count = res.data.me[j].count;
              break;
            } else {
              count = 0;
            }
          }
          $this.myData.push(count);
        }
      }
      this.draw();
    },

    /**
     * 绘制登入报表
     */
    draw() {
      const myChart = echarts.init(document.getElementById("loginReport"));
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "用户登入统计",
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false }, //  缩放
            magicType: { type: ["bar", "line"] }, ///　　折线  直方图切换
            restore: {}, // 重置
            saveAsImage: {}, // 导出图片
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#eee",
            },
          },
        },
        legend: {
          type: "plain",
          data: ["全部", "我"],
        },
        xAxis: {
          data: this.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "全部",
            data: this.yData,
            type: "bar",
            showBackground: true,
            animationDuration: 1500,
            animationEasing: "cubicInOut",
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(30, 144, 255，0.5)",
            },
          },
          {
            name: "我",
            data: this.myData,
            type: "bar",
            showBackground: true,
            animationDuration: 2000,
            animationEasing: "cubicInOut",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted: function () {
    this.draw();
  },
};
</script>
