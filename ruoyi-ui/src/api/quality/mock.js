import dayjs from "dayjs";
export const Default = {
  data: [],
  code: 200,
  msg: "查询成功",
};

export const checkList = {
  data: [
    {
      "inspectionNumber": "JD001", // 检验单号
      "inspector": "John", // 送检员
      "department": "Department A", // 部门
      "receivingWarehouse": "Warehouse A", // 收料仓库
      "location": "Location A", // 仓位
      "itemType": "Type A", // 物品类型
      "itemName": "Item A", // 物品名称
      "itemCode": "Code A", // 物品编码
      "specification": "Specification A", // 规格型号
      "unit": "KG", // 单位
      "batchNumber": "Batch001", // 批号
      "inspectionQuantity": 100, // 报检数量
      "inspector2": "Inspector A", // 检验员
      "inspectionDate": "2022-01-01", // 检验日期
      "inspectionMethod": "Method A", // 检验方式
      "inspectionQuantity2": 90, // 检验数量
      "sampleDestructionCount": 2, // 样本破坏数
      "nonconformingQuantity": 5, // 不合格数量
      "conformingQuantity": 85, // 合格数量
      "inspectionResult": "合格", // 检验结果
      "inspectionItemCount": 10, // 检验项目数量
      "submitter": "Submitter A", // 提交人
      "submissionTime": "2022-01-01 10:00:00", // 提交时间
      "updateTime": "2022-01-01 12:00:00" // 更新时间
    },
    {
      "inspectionNumber": "JD002", // 检验单号
      "inspector": "John", // 送检员
      "department": "Department A", // 部门
      "receivingWarehouse": "Warehouse A", // 收料仓库
      "location": "Location A", // 仓位
      "itemType": "Type A", // 物品类型
      "itemName": "Item A", // 物品名称
      "itemCode": "Code A", // 物品编码
      "specification": "Specification A", // 规格型号
      "unit": "KG", // 单位
      "batchNumber": "Batch001", // 批号
      "inspectionQuantity": 100, // 报检数量
      "inspector2": "Inspector A", // 检验员
      "inspectionDate": "2022-01-01", // 检验日期
      "inspectionMethod": "Method A", // 检验方式
      "inspectionQuantity2": 90, // 检验数量
      "sampleDestructionCount": 20, // 样本破坏数
      "nonconformingQuantity": 20, // 不合格数量
      "conformingQuantity": 50, // 合格数量
      "inspectionResult": "不合格", // 检验结果
      "inspectionItemCount": 10, // 检验项目数量
      "submitter": "Submitter A", // 提交人
      "submissionTime": "2022-01-01 10:00:00", // 提交时间
      "updateTime": "2022-01-01 12:00:00" // 更新时间
    },
    {
      "inspectionNumber": "JD002", // 检验单号
      "inspector": "John", // 送检员
      "department": "Department A", // 部门
      "receivingWarehouse": "Warehouse A", // 收料仓库
      "location": "Location A", // 仓位
      "itemType": "Type A", // 物品类型
      "itemName": "Item A", // 物品名称
      "itemCode": "Code A", // 物品编码
      "specification": "Specification A", // 规格型号
      "unit": "KG", // 单位
      "batchNumber": "Batch001", // 批号
      "inspectionQuantity": 100, // 报检数量
      "inspector2": "Inspector A", // 检验员
      "inspectionDate": "2022-01-01", // 检验日期
      "inspectionMethod": "Method A", // 检验方式
      "inspectionQuantity2": 90, // 检验数量
      "sampleDestructionCount": 2, // 样本破坏数
      "nonconformingQuantity": 5, // 不合格数量
      "conformingQuantity": 85, // 合格数量
      "inspectionResult": "合格", // 检验结果
      "inspectionItemCount": 10, // 检验项目数量
      "submitter": "Submitter A", //
      "submissionTime": "2022-01-01 10:00:00", // 提交时间
      "updateTime": "2022-01-01 12:00:00" // 更新时间
    },
    {
      "inspectionNumber": "JD002", // 检验单号
      "inspector": "John", // 送检员
      "department": "Department A", // 部门
      "receivingWarehouse": "Warehouse A", // 收料仓库
      "location": "Location A", // 仓位
      "itemType": "Type A", // 物品类型
      "itemName": "Item A", // 物品名称
      "itemCode":"Code A", // 物品编码
      "specification": "Specification A", // 规格型号
      "unit": "KG", // 单位
      "batchNumber": "Batch001", // 批号
      "inspectionQuantity": 100, // 报检数量
      "inspector2": "Inspector A", // 检验员
      "inspectionDate": "2022-01-01", // 检验日期
      "inspectionMethod": "Method A", // 检验方式
      "inspectionQuantity2": 90, // 检验数量
      "sampleDestructionCount": 2, // 样本破坏数
      "nonconformingQuantity": 5, // 不合格数量
      "conformingQuantity": 85, // 合格数量
      "inspectionResult": "合格", // 检验结果
      "inspectionItemCount": 10, // 检验项目数量
      "submitter": "Submitter A", // 提交人
      "submissionTime": "2022-01-01 10:00:00", // 提交时间
      "updateTime": "2022-01-01 12:00:00" // 更新时间
    },
    {
      "inspectionNumber": "JD002", // 检验单号
      "inspector": "John",
      "department": "Department A", // 部门
      "receivingWarehouse": "Warehouse A", // 收料仓库
      "location": "Location A", // 仓位
      "itemType": "Type A", // 物品类型
      "itemName": "Item A", // 物品名称
      "itemCode": "Code A", // 物品编码
      "specification": "Specification A", // 规格型号
      "unit": "KG", // 单位
      "batchNumber": "Batch001", // 批号
      "inspectionQuantity": 100, // 报检数量
      "inspector2": "Inspector A", // 检验员
      "inspectionDate": "2022-01-01", // 检验日期
      "inspectionMethod": "Method A", // 检验方式
      "inspectionQuantity2": 90, // 检验数量
      "sampleDestructionCount": 2, // 样本破坏数
      "nonconformingQuantity": 5, // 不合格数量
      "conformingQuantity": 85, // 合格数量
      "inspectionResult": "合格", // 检验结果
      "inspectionItemCount": 10, // 检验项目数量
      "submitter": "Submitter A", // 提交人
      "submissionTime": "2022-01-01 10:00:00", //
      "updateTime": "2022-01-01 12:00:00" // 更新时间
    },
    {
      "inspectionNumber": "JD002", // 检验单号
      "inspector": "John", // 送检员
      "department": "Department A", // 部门
      "receivingWarehouse": "Warehouse A", // 收料仓库
      "location": "Location A", // 仓位
      "itemType": "Type A", // 物品类型
      "itemName": "Item A", // 物品名称
      "itemCode": "Code A", // 物品编码
      "specification": "Specification A", // 规格型号
      "unit": "KG", // 单位
      "batchNumber": "Batch001", // 批号
      "inspectionQuantity": 100, // 报检数量
      "inspector2": "Inspector A", // 检验员
      "inspectionDate": "2022-01-01", // 检验日期
      "inspectionMethod": "Method A", // 检验方式
      "inspectionQuantity2": 90, // 检验数量
      "sampleDestructionCount": 2, // 样本破坏数
      "nonconformingQuantity": 5, // 不合格数量
      "conformingQuantity": 85, // 合格数量
      "inspectionResult": "合格", // 检验结果
      "inspectionItemCount": 10, // 检验项目数量
      "submitter": "Submitter A", // 提交人
      "submissionTime": "2022-01-01 10:00:00", // 提交时间
      "updateTime": "2022-01-01 12:00:00" // 更新时间
    }
  ],
  code: 200,
  msg: "查询成功",
};

export const inspectionPlan = {
  data: [
    {
      inspectionNumber:'FAN2002025',
      name:'材料检验',
      establish:'定性分析',
      inspectionItemCount:6,
      submitter:'赵丽丽',
      submissionTime:'2022-02-02 10:00:00',
      updateTime:'2023-02-06 10:00:00'
    },
    {
      inspectionNumber:'FAN2002025',
      name:'材料检验',
      establish:'定性分析',
      inspectionItemCount:6,
      submitter:'李小明',
      submissionTime:'2022-02-02 10:00:00',
      updateTime:'2023-02-06 10:00:00'
    },
    {
      inspectionNumber:'FAN2002025',
      name:'材料检验',
      establish:'定性分析',
      inspectionItemCount:6,
      submitter:'王小红',
      submissionTime:'2022-02-02 10:00:00',
      updateTime:'2023-02-06 10:00:00'
    },
    {
      inspectionNumber:'FAN2002025',
      name:'材料检验',
      establish:'定性分析',
      inspectionItemCount:6,
      submitter:'赵丽丽',
      submissionTime:'2022-02-02 10:00:00',
      updateTime:'2023-02-06 10:00:00'
    },
  ],
  total:10,
  code: 200,
  msg: "查询成功",
};