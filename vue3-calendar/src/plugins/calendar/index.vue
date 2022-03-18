<template>
  <div class="calendar_box">
    <div class="title_box">
      <span class="pre_year_btn btn" @click="handleYearClick('prev')"
        >&lt;&lt;</span
      >
      <span class="pre_month_btn btn" @click="handleMonthClick('prev')"
        >&lt;</span
      >
      <span class="time_box">{{ state.currentTimeStr }}</span>
      <span class="next_month_btn btn" @click="handleMonthClick('next')"
        >&gt;</span
      >
      <span class="next_year_btn btn" @click="handleYearClick('next')"
        >&gt;&gt;</span
      >
    </div>
    <ul class="weekly_box">
      <li v-for="item in week">{{ item }}</li>
    </ul>
    <ul class="day_box" v-for="row in state.dayAry">
      <li
        v-for="item in row"
        :class="[
          { isCurrentMonth: item.isCurrentMonth },
          { select: item.isSelect },
        ]"
        @click="handleDayClick(item)"
      >
        {{ item.text }}
      </li>
    </ul>
    <button>button</button>
  </div>
</template>
  
<script setup>
/**
 * 日历组件
 * 1号是星期几
 * [[],....]
 * vue3: v-model modelValue prop 配合 update:modelValue
 */
import { defineProps, defineEmit, ref, reactive, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: String,
});
const state = reactive({
  dayAry: [],
  innerDate: null,
  currentTimeStr: "",
});
const week = ["一", "二", "三", "四", "五", "六", "日"];
const emit = defineEmit(["update:modelValue", "change"]);

// 不能直接watch props.modelValue
// watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types
watch(
  () => props.modelValue,
  (val) => {
    render(val);
  },
  {
    immediate: true,
  }
);

const handleDayClick = (item) => {
  if (!item.isCurrentMonth) return;
  const date = state.innerDate;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  emit("update:modelValue", `${year}-${month}-${item.text}`);
  emit('change', `${year}-${month}-${item.text}`)
};

function handleMonthClick(action) {
  const date = state.innerDate;
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  if (action == "prev") {
    month--;
  } else if (action == "next") {
    month++;
  }
  render(new Date(year, month, day));
}
function handleYearClick(action) {
  const date = state.innerDate;
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  if (action == "prev") {
    year--;
  } else if (action == "next") {
    year++;
  }
  render(new Date(year, month, day));
}

function render(value) {
  state.innerDate = new Date(value);
  state.currentTimeStr = formatDate(value);
  const result = getRenderData(value);
  state.dayAry = result;
}

function formatDate(dateStr) {
  const currDate = new Date(dateStr);
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth() + 1;
  const currDay = currDate.getDate();
  return `${currYear}年${currMonth}月${currDay}日`;
}

// 根据 dateStr 渲染当月日历
function getRenderData(dateStr) {
  let result = [];
  const currDate = new Date(dateStr);
  const currDay = currDate.getDate();
  const [days, first] = getMonthDays(dateStr);
  let [prev_month_day] = getMonthDays(
    new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1)
  );
  let day = 1;
  let next_month_day = 1;
  for (let i = 0; i < 6; i++) {
    let rowArr = [];
    for (let j = 1; j <= 7; j++) {
      if (i == 0) {
        if (j < first) {
          rowArr.unshift({
            text: prev_month_day--,
            isSelect: false,
            isCurrentMonth: false,
          });
        } else {
          const obj = {
            text: day++,
            isSelect: false,
            isCurrentMonth: true,
          };
          if (obj.text == currDay) {
            obj.isSelect = true;
          }
          rowArr.push(obj);
        }
      } else {
        if (day > days) {
          rowArr.push({
            text: next_month_day++,
            isSelect: false,
            isCurrentMonth: false,
          });
        } else {
          let obj = {
            text: day++,
            isSelect: false,
            isCurrentMonth: true,
          };
          if (obj.text == currDay) {
            obj.isSelect = true;
          }
          rowArr.push(obj);
        }
      }
    }
    result.push(rowArr);
  }

  return result;

  // 获取当前月份的天数、1号是星期几
  function getMonthDays(dateStr) {
    const currDate = new Date(dateStr);
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth() + 1;
    return [
      new Date(currYear, currMonth, 0).getDate(),
      new Date(currYear, currMonth - 1, 1).getDay(),
    ];
  }
}
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
.calendar_box {
  width: 400px;
  margin: 0 auto;
  .title_box {
    > span {
      display: inline-block;
      cursor: pointer;
      user-select: none;
    }
    .pre_year_btn {
    }
    .pre_month_btn {
      margin-left: 10px;
    }
    .time_box {
      margin: 0 20px;
      cursor: default;
    }
    .next_year_btn {
    }
    .next_month_btn {
      margin-right: 10px;
    }
  }
  .weekly_box {
    border-top: 1px solid;
    border-bottom: 1px solid;
    display: flex;
    justify-content: center;
    li {
      width: 50px;
      // padding: 0 20px;
    }
  }
  .day_box {
    display: flex;
    justify-content: center;
    li {
      width: 50px;
      // padding: 0 20px;
      color: #999;
      cursor: not-allowed;
      &.isCurrentMonth {
        color: #333;
        cursor: pointer;
      }
      &.select {
        background-color: red;
      }
    }
  }
}
</style>