<script setup>
/**
 * 思路：
 * 单独取出一列（将这列宽度设为0）用于放置项目元素，项目元素使用绝对定位，项目 left、width 值动态去计算；
 * 因为可能存在时间段交叉的情况，所以需要并排显示，再单独设置一列用于撑起并排显示所需要的高度
 */
import { ref, computed } from 'vue'

// 每个项目的高度
const projectItemHeight = 30
// 并排时项目间隔
const projectItemInterval = 5
// 分钟表头宽度
const minuteColWidth = 20
// 项目每分钟占宽
const perMinuteWidth = minuteColWidth / 10
// 小时表头
const hourCols = new Array(24).fill().map((_, i) => i + '点')
// 分钟表头
const minuteCols = new Array(5).fill().map((_, i) => String((i + 1) * 10))
const cssVars = computed(() => {
  return {
    projectItemHeight: `${projectItemHeight}px`,
  }
})
// 表格原始数据，也就是后端返回的数据
const tableRawData = [
  {
    username: '患者1',
    // start_time 开始时间从小到大排列
    projectList: [
      {
        project_name: '项目名称1',
        start_time: '2022-2-2 02:10',
        end_time: '2022-2-2 04:20',
      },
      {
        project_name: '项目名称2',
        start_time: '2022-2-2 03:10',
        end_time: '2022-2-2 05:20',
      },
      {
        project_name: '项目名称3',
        start_time: '2022-2-2 06:10',
        end_time: '2022-2-2 07:30',
      },
    ],
  },
  {
    username: '患者2',
    projectList: [
      {
        project_name: '项目名称1',
        start_time: '2022-2-2 01:10',
        end_time: '2022-2-2 03:20',
      },
    ],
  },
  {
    username: '患者3',
    projectList: [
      {
        project_name: '项目名称1',
        start_time: '2022-2-2 04:10',
        end_time: '2022-2-2 05:30',
      },
    ],
  },
]
// 往数据里面添加一下项目相关的配置
const finalTableData = computed(() => {
  const result = tableRawData.map((row) => {
    // 计算 left、width
    const projectList = row.projectList.map((p) => {
      const width = (perMinuteWidth * (new Date(p.end_time) - new Date(p.start_time))) / (60 * 1000)
      const left = perMinuteWidth * (new Date(p.start_time).getHours() * 60 + new Date(p.start_time).getMinutes())
      return {
        ...p,
        width,
        left,
      }
    })
    // 分开存在时间交叉的项目
    const crossProjectList = []
    const otherProjectList = []
    if (projectList.length === 1) {
      crossProjectList.push(...projectList)
    } else {
      projectList.reduce((a, b, index) => {
        // 判断时间是否交叉
        const isCross = new Date(b.start_time) - new Date(a.start_time) >= 0 && new Date(b.start_time) - new Date(a.end_time) < 0
        if (isCross) {
          index === 1 ? crossProjectList.push(a, b) : crossProjectList.push(b)
        } else {
          index === 1 ? otherProjectList.push(a, b) : otherProjectList.push(b)
        }
        return b
      })
    }
    const crossProjectNum = crossProjectList.length
    return {
      ...row,
      // maxHeight = 并排项目总高度 + 并排项目间隔总高度
      maxHeight: crossProjectNum * projectItemHeight + projectItemInterval * (crossProjectNum - 1),
      crossProjectList,
      otherProjectList,
    }
  })
  console.log(result)
  return result
})

</script>
<template>
  <el-table :data="finalTableData" style="width: 100%" class="gantt-table">
    <el-table-column label="患者" align="center" prop="username"></el-table-column>
    <el-table-column :width="-1" class-name="project-column">
      <template #default="scope">
        <div class="project-list">
          <div
            class="project-item"
            v-for="(p, index) in scope.row.crossProjectList"
            :style="{
              top: `${index * (projectItemHeight + projectItemInterval)}px`,
              left: `${p.left}px`,
              width: `${p.width}px`,
              // 颜色到时候根据需求去定制一下
              backgroundColor: 'orange',
            }"
          >
            {{ p.project_name }}
          </div>
          <div
            class="project-item"
            v-for="p in scope.row.otherProjectList"
            :style="{
              left: `${p.left}px`,
              width: `${p.width}px`,
              // 颜色到时候根据需求去定制一下
              backgroundColor: 'lightblue',
            }"
          >
            {{ p.project_name }}
          </div>
        </div>
      </template>
    </el-table-column>
    <!-- 并排项目总高度，撑起行高度 -->
    <el-table-column :width="-1">
      <template #default="scope">
        <div
          :style="{
            height: scope.row.maxHeight + 'px',
          }"
        ></div>
      </template>
    </el-table-column>
    <el-table-column v-for="h in hourCols" :label="h" align="center">
      <el-table-column>
        <template #header>
          <span v-for="m in minuteCols" class="minute">{{ m }}</span>
        </template>
        <el-table-column v-for="_ in 6" align="center" :width="minuteColWidth"> </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
.gantt-table {
  ::v-deep(.el-table__row) {
    position: relative;
    .project-column {
      position: absolute;
      z-index: 99;
      .project-list {
        position: absolute;
        .project-item {
          position: absolute;
          height: v-bind('cssVars.projectItemHeight');
          padding: 4px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  ::v-deep(thead).is-group {
    tr:nth-child(2) .el-table__cell {
      padding: 0;
      .cell .minute {
        display: inline-block;
        margin-left: 5px;
        &:first-child {
          margin-left: 10px;
        }
        &:last-child {
          margin-right: 5px;
        }
      }
    }
    tr:nth-child(3) {
      display: none;
    }
  }
}
</style>
