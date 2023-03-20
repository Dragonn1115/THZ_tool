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
        <tr v-for="(row, key) in resultData" :key="key">
          <td>{{ key }}</td>
          <td v-for="(value, index) in row" :key="index">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedWeek: 1,
      weeks: ["第1周", "第2周", "第3周", "第4周"],
      days: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      data: [
        { name: "张三", days: [1, 2, 3, 4, 5, 6, 7] },
        { name: "李四", days: [7, 6, 5, 4, 3, 2, 1] },
        { name: "王五", days: [4, 3, 2, 1, 7, 6, 5] },
      ],
      dates: [],
      myData: JSON.parse(localStorage.getItem('savedData'))|| {},
      resultData: {},
    };
  },
  methods: {
    updateTable() {
      // 根据选择的星期更新表格数据
      this.days = this.dates[this.weeks.indexOf(this.selectedWeek)];
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
    if (!localStorage.getItem('savedData')){
      localStorage.setItem('savedData',JSON.stringify({}))
    }
    const startDate = new Date("2023-03-20"); // 设置起始日期
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // 定义星期数组

    let currentDate = startDate;
    let weekCounter = 1;
    var newWeek = [];

    while (currentDate <= endDate) {
      const weekday = weekdays[currentDate.getDay()]; // 获取星期几
      const year = currentDate.getFullYear(); // 获取年份
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
      const day = currentDate.getDate().toString().padStart(2, '0')
    // 打印日期
      console.log(`Week ${weekCounter}: ${year}-${month}-${day} (${weekday})`);
      newWeek.push(`${year}-${month}-${day}`);


      // 如果当前日期是周日，则增加周计数器
      if (weekday === "Sun") {
          weekCounter++;
          this.dates.push(newWeek);
          newWeek = [];

      }

    // 增加一天
    currentDate = new Date(currentDate.getTime() + oneDay);
    }
    const temp = [];

    for (let i = 0; i < this.dates.length; i++) {
      const left = this.dates[i][0];
      const right = this.dates[i][this.dates[i].length-1];
      temp.push(left+'-'+right);
    }
    this.selectedWeek=temp[temp.length-1];
    this.weeks = temp;
    this.days = this.dates[this.weeks.indexOf(this.selectedWeek)];

    console.log(this.myData)
    for (let i = 0; i < this.days.length; i++) {
      const tempData = this.myData[this.days[i]];
      console.log(this.days[i]);
      console.log(tempData);

      for (let key in tempData) {
        if (!this.resultData.hasOwnProperty(key)) {
          this.resultData[key] = new Array(7).fill(0);
        }   
        const value = tempData[key];
        this.resultData[key][i] = value;
      }
      
    }
    console.log(this.resultData);


    this.updateTable();

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
  background-color: #858585;
}
</style>
