<template>
  <div>
    <h1>Bupt Reservation</h1>
  </div>
  <div>
    项目
    <el-select v-model="type_value" class="m-2" placeholder="Select">
      <el-option
        v-for="item in type_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div>
    时段
    <el-select v-model="time_value" multiple class="m-2" placeholder="Select">
      <el-option
        v-for="item in time_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div>
    场地
    <el-select v-model="number_value" class="m-2" placeholder="Select">
      <el-option
        v-for="item in number_options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div>
    日期
    <el-input v-model="data_value" placeholder="Please input" />
  </div>
  <div>
    <el-button type="primary" @click="generator()" plain>确认</el-button>
  </div>
  <div>
    当前时间：{{now_time}}
  </div>
  <div>
    到10点自动跳转
  </div>
  <div v-if="showlink">
    <div>先在体育馆预约登录，然后在微信中打开下链接</div>
    <el-input class="tt" v-model="result" type="textarea"> </el-input>
    <div>
      <a :href="result"> 快速通道</a>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      area_list: ["5982", "5983", "5984", "5985"],
      type_value: 0,
      type_options: [],
      time_value: [],
      time_options: [],
      number_value: 15426,
      number_options: [],
      data_value: "",
      result: "",
      showlink: 0,
      timer: null,
      now_time: null,
    };
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.data_timer = setInterval(this.auto_jump, 100);
      this.type_options = [
        {
          value: 0,
          label: "羽毛球",
        },
        // {
        //   value: 1,
        //   label: "乒乓球",
        // },
        // {
        //   value: 2,
        //   label: "游泳馆",
        // },
        {
          value: 3,
          label: "健身房",
        },
      ];

      for (var i = 1, t = 8; i <= 14; i++, t++) {
        if (t != 14) {
          this.time_options.push({
            value: i,
            label: String(t) + ":00-" + String(t + 1) + ":00",
          });
        }
      }
      var n = 0;
      for (i = 1, n = 15418; n <= 15426; i++, n++) {
        this.number_options.push({
          value: n,
          label: String(i) + "号场地",
        });
      }
      this.data_value = moment().add(1, "days").format("YYYYMMDD");
    },

    generator() {
      var len = this.time_value.length;
      if (len == 0) {
        this.$notify({
          title: "Warn",
          message: "时间段不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (len > 2) {
        this.$notify({
          title: "Warn",
          message: "时间段不能超过2个",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      this.time_value.sort();
      if (len == 2 && this.time_value[1] - this.time_value[0] != 1) {
        this.$notify({
          title: "Warn",
          message: "预约的时间段需要相邻",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      var area_id = this.area_list[this.type_value];
      this.result = `https://reservation.bupt.edu.cn/index.php/Wechat/Booking/confirm_booking?area_id=${area_id}&td_id=`;
      console.log("area_id", area_id);
      for (var i = 0; i < len; i++) {
        if (i != 0) {
          this.result += ",";
        }
        var str =
          String(this.number_value) +
          "_" +
          this.data_value +
          String(this.time_value[i]);
        this.result += str;
        console.log("str", str);
      }
      console.log(this.result);
      this.showlink = 1;
    },

    auto_jump() {
      this.now_time = moment().format("YYYY/MM/DD HH:mm:ss")
      let t = moment(
        moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
        "YYYY/MM/DD HH:mm:ss.SSS"
      ).valueOf();
      let target = moment()
        .year(moment().get("year"))
        .month(moment().get("month"))
        .date(moment().get("date"))
        .hour(10)
        .minutes(0)
        .seconds(0)
        .format("YYYY-MM-DD HH:mm:ss");
      target = moment(
        moment(target).format("YYYY/MM/DD HH:mm:ss.SSS"),
        "YYYY/MM/DD HH:mm:ss.SSS"
      ).valueOf();
      console.log("target", target)
      console.log("now", t)
      if (t > target && this.showlink == 1) {
        window.location.href = this.result;
      }
    },
  },
};
</script> 



<style>
.el-input {
  width: 250px;
}

.el-button {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.tt {
  margin-top: 20px;
  height: 100px;
  width: 300px;
}
</style>

