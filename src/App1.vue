
<template>

  <div class='Home'>

    <h1>童话镇打卡 </h1>
    <h2>今天：{{ date }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">主持：</label>
        <!-- <input type="name" id="name" v-model="selectedName" required> -->

        <select id="name" v-model="selectedName" required>
          <option v-for="(name, index) in nameOptions" :key="index" :value="name">{{name}}</option>
        </select>
      </div>

        <div class="text-box">
        <label for="text">麦序1:</label>
        <textarea id="text1" v-model="text1" required></textarea>
        </div>
        <div class="text-box">
          <label for="text">麦序2:</label>
          <textarea id="text2" v-model="text2"></textarea>
          </div>
        <div>
            <label for="selectedDate">请选择日期：</label>
            <input type="date" id="selectedDate" v-model="selectedDate" required>
        </div>
      <div>
        <label for="time">选择打卡时间段：</label>
        <select id="time" v-model="selectedTime" required>
          <option v-for="(time, index) in timeOptions" :key="index" :value="time">{{time}}</option>
        </select>
      </div>
      <button type="submit" >提交</button>
        <p v-if="showError">密码不正确，请重新输入</p>

    </form>
            <div class="text-box">
        <label for="text">打卡结果：</label>

        <textarea ref="myText" id="result" v-model="result"></textarea>
        
        </div>
        <button @click="copyText">复制</button>

        <div>
          <label for="password">管理密码（不用填）：</label>
          <input type="password" id="password" v-model="password">
        </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      selectedName:'',
      password: '',
      text1: '',
      text2: '',
      selectedTime: '',
      lastSubmitTime: null,
      selectedDate: new Date().toISOString().slice(0, 10),
      date: null,
      timeOptions: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
      nameOptions: ['靓妹','灵生','啵啵','美女嘟嘟','好运','染染','仙女','芭比','酸笋','不晚','点点','迷人甜','辣辣','尤雾','甜甜','好诗','兔子','小熊','清玖','熙熙','童童'],    
      validPassword: '', // 设置有效的密码
      adminPassword: 'dragon666',
      result: "",
    showError: false,
    myData: {},

    };
  },
    mounted() {
        const date = new Date()
        const year = date.getFullYear().toString()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        this.date = `${year}-${month}-${day}`
        if (!localStorage.getItem('savedData')){
          localStorage.setItem('savedData',JSON.stringify({}))
        }
    },
  computed: {
    isDisabled() {
      const now = new Date().getTime();
      const selectedTimeStart = this.getSelectedTimeStart();
      const selectedTimeEnd = this.getSelectedTimeEnd();
      return this.lastSubmitTime && (now - this.lastSubmitTime) < (selectedTimeEnd - selectedTimeStart);
    },
    nextAllowedTime() {
      if (!this.lastSubmitTime) {
        return '';
      }
      const selectedTimeEnd = this.getSelectedTimeEnd();
      const nextAllowedTime = new Date(this.lastSubmitTime + (selectedTimeEnd - this.getSelectedTimeStart()));
      const hours = nextAllowedTime.getHours().toString().padStart(2, '0');
      const minutes = nextAllowedTime.getMinutes().toString().padStart(2, '0');
      const seconds = nextAllowedTime.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  methods: {

    submitForm() {
      if (this.password == this.adminPassword) {
        localStorage.setItem('savedData',JSON.stringify({}))
        alert('清理成功');
        return;
      }
    if (this.password !== this.validPassword) {
        this.showError = true;
        return;
      }
      this.showError = false;
    if (this.text1.includes('\n')) {
        alert('麦序统计里不能换行！');
        return;
    }
    if (this.text2.includes('\n')) {
        alert('麦序统计里不能换行！');
        return;
    }
    // 在这里发送数据到后端保存到数据库中
    this.processData()

      this.lastSubmitTime = new Date().getTime();
      alert('打卡成功！');
        this.name = '';
        this.password = '';
        this.text1 = '';
        this.text2 = '';
        this.selectedTime = '';
    },
    processData(){
      // 处理数据
      const tempText = this.text1+this.text2;
      console.log(tempText);
      this.textArray = tempText.split('@').filter(str => str !== '')
      this.textArray.forEach(key => {
        const trimmedKey = key.trim();
        if (trimmedKey in this.myData) {
          this.myData[trimmedKey]++;
        } else {
          this.myData[trimmedKey] = 1;
        }
      });      
      this.result = `--童话镇打卡表--\n${this.date}\n${this.selectedName}\n${this.selectedTime}\n`
      Object.entries(this.myData).forEach(([key, value]) => {
        this.result += `@${key} ${value} `;
      });
      this.myData = {};

      const allData = JSON.parse(localStorage.getItem('savedData'))
        if (!allData.hasOwnProperty(this.selectedDate)) {
            allData[this.selectedDate] = {};
        }      
        const total = allData[this.selectedDate]
      this.textArray.forEach(key => console.log(key.trim()))
      this.textArray.forEach(key => {
        const trimmedKey = key.trim();
        if (trimmedKey in total) {
          total[trimmedKey]++;
        } else {
          total[trimmedKey] = 1;
        }
      });
      allData[this.selectedDate] = total;
      localStorage.setItem('savedData', JSON.stringify(allData));
    },

    getSelectedTimeStart() {
      const [start, end] = this.selectedTime.split('-');
      return new Date().setHours(Number(start), 0, 0, 0);
    },
    getSelectedTimeEnd() {
        const [start, end] = this.selectedTime.split('-');
        return new Date().setHours(Number(end), 0, 0, 0);
        },

    copyText() {
      this.$refs.myText.select() // 选中文本框内容
      document.execCommand('copy') // 执行复制命令
    }
    },
};
</script>