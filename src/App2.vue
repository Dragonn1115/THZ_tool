<template>
  <div>
    <select v-model="selectedWeek" @change="updateTable">
      <option v-for="week in weeks" :value="week">{{ week }}</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th v-for="day in days">{{day}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td>{{ row.name }}</td>
          <td v-for="day in row.days">{{ day }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedWeek: "第1周",
      weeks: ["第1周", "第2周", "第3周", "第4周"],
      days: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      data: [
        { name: "张三", days: [1, 2, 3, 4, 5, 6, 7] },
        { name: "李四", days: [7, 6, 5, 4, 3, 2, 1] },
        { name: "王五", days: [4, 3, 2, 1, 7, 6, 5] },
      ],
      myData: JSON.parse(localStorage.getItem('savedData')),
    };
  },
    mounted() {
    },
  methods: {
    updateTable() {
      // 根据选择的星期更新表格数据
      const weekIndex = this.weeks.indexOf(this.selectedWeek);
      const newData = [
        { name: "张三", days: [1, 2, 3, 4, 5, 6, 7].map((day) => day + 7 * weekIndex) },
        { name: "李四", days: [7, 6, 5, 4, 3, 2, 1].map((day) => day + 7 * weekIndex) },
        { name: "王五", days: [4, 3, 2, 1, 7, 6, 5].map((day) => day + 7 * weekIndex) },
      ];
      this.data = newData;
    },
  },
  mounted() {
    this.updateTable();

    const startDate = new Date("2023-03-19"); // 设置起始日期
    const endDate = new Date("2023-03-31"); // 设置结束日期

    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // 定义星期数组

    let currentDate = startDate;
    let weekCounter = 1;

    while (currentDate <= endDate) {
    const weekday = weekdays[currentDate.getDay()]; // 获取星期几
    const day = currentDate.getDate(); // 获取日期
    const month = currentDate.getMonth() + 1; // 获取月份
    const year = currentDate.getFullYear(); // 获取年份

    // 打印日期
    console.log(`Week ${weekCounter}: ${year}-${month}-${day} (${weekday})`);

    // 如果当前日期是周六，则增加周计数器
    if (weekday === "Sat") {
        weekCounter++;
    }

    // 增加一天
    currentDate = new Date(currentDate.getTime() + oneDay);
    }
  },
};
</script>
<style>
table {
  border-collapse: collapse;
  margin: 20px;
  font-family: Arial, sans-serif;
  width: 100%;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
</style>
