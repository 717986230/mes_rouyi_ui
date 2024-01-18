export const Default = {
  code: 200,
  msg: "查询成功",
  rows: [],
  total:0,
};
/*
*     status: '状态1',
    measurementPointName: '测量点1',
    position: '位号1',
    lastReading: '上次读数1',
    realTimeReading: '实时读数1',
    confirmationReading: '确认读数1',
    currentUsage: '当期用量1',
    preZeroReading: '复零前读数1',
    postZeroReading: '复零后读数1',
    originalValue: '原始量1',
    correctionValue: '校正量1',
    date: '2022-01-01 12:00:00',
    confirmationValue: '确认量1'*/
export const pointsTotalList = {
  code: 200,
  msg: "查询成功",
  rows: [
    {
      status: true,
      measurementPointName: '测量点1',
      position: '位号1',
      lastReading: 50.26,//上次读数
      realTimeReading: '',//实时读数
      confirmationReading: '',//确认读数
      currentUsage: '',//复零前读数
      preZeroReading: '',//复零前读数
      postZeroReading: '',//复零后读数
      originalValue: '',//原始量
      correctionValue: '',//校正量
      date: new Date().toISOString(),
      confirmationValue: ''//确认量
    },
    {
      status: false,
      measurementPointName: '测量点2',
      position: '位号2',
      lastReading: (Math.random() * 100).toFixed(2),
      realTimeReading: (Math.random() * 100).toFixed(2),
      manualFormCollection: (Math.random() * 100).toFixed(2),
      confirmationReading: (Math.random() * 100).toFixed(2),
      currentUsage: (Math.random() * 100).toFixed(2),
      preZeroReading: (Math.random() * 100).toFixed(2),
      postZeroReading: (Math.random() * 100).toFixed(2),
      originalValue: (Math.random() * 100).toFixed(2),
      correctionValue: (Math.random() * 100).toFixed(2),
      date: new Date().toISOString(),
      confirmationValue: (Math.random() * 100).toFixed(2)
    },
  ],
  total:2,
};
/*
* 节点量确认 列表
* "状态" (status)
"测点名称" (measurementName)
"原始值" (originalValue)
"确认值" (confirmedValue)
"节点名称" (nodeName)
"节点类型" (nodeType)
"开始时间" (startTime)
"结束时间" (endTime)
"原始量" (originalQuantity)
"确认量" (confirmedQuantity)
"计算公式" (calculationFormula)*/
export const nodeConfirmList = {
  code: 200,
  msg: "查询成功",
  rows: [
          {
            status: 1,
            childList: [
              {
                measurementName: "Point A",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point B",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point C",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
            ],

            nodeName: "节点 1",
            nodeType: "Type A",
            startTime: "2022-01-01 09:00:00",
            endTime: "2022-01-01 10:00:00",
            originalQuantity: 20,
            confirmedQuantity: 18,
            calculationFormula: "A + B",
            actions: "Edit/Delete"
          },
          {
            status: 0,
            childList: [
              {
                measurementName: "Point A",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point B",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point C",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
            ],
            nodeName: "节点 2",
            nodeType: "Type B",
            startTime: "2022-01-02 14:00:00",
            endTime: "2022-01-02 15:00:00",
            originalQuantity: 15,
            confirmedQuantity: 13,
            calculationFormula: "A - B",
            actions: "Edit/Delete"
          },
          {
            status: 2,
            childList: [
              {
                measurementName: "Point A",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point B",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point C",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
            ],
            nodeName: "节点 3",
            nodeType: "Type C",
            startTime: "2022-01-03 11:00:00",
            endTime: "2022-01-03 12:00:00",
            originalQuantity: 25,
            confirmedQuantity: 23,
            calculationFormula: "A * B",
            actions: "Edit/Delete"
          },
          {
            status: 2,
            childList: [
              {
                measurementName: "Point A",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point B",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
              {
                measurementName: "Point C",
                originalValue: 10.5,
                confirmedValue: 9.8,
              },
            ],
            nodeName: "节点 4",
            nodeType: "Type D",
            startTime: "2022-01-04 16:00:00",
            endTime: "2022-01-04 17:00:00",
            originalQuantity: 30,
            confirmedQuantity: 28,
            calculationFormula: "A / B",
            actions: "Edit/Delete"
          }
  ],
  total:4
}
/*
* 能源互供仲裁确认 列表
* 状态（Status）
* 源节点（Source Node）
* 目的节点（Destination Node）
* 源节点量（Source Node Quantity）
* 目的节点量（Destination Node Quantity）
* 公式量（Formula Quantity）
* 确认量（Confirmation Quantity）
* 计算公式（Calculation Formula）
* */
export const energyExchangeList = {
  code: 200,
  msg: "查询成功",
  rows: [
    {
      status: 1,
      sourceNode: "节点 1",
      destinationNode: "节点 2",
      sourceNodeQuantity: 10,
      destinationNodeQuantity: 10,
      formulaQuantity: 10,
      confirmationQuantity: 10,
      calculationFormula: "A + B",
      childList:[
        {
          "nodeName": "Node A",
          "startTime": "2022-01-01 09:00:00",
          "endTime": "2022-01-01 10:00:00",
          "originalValue": 10,
          "confirmationValue": 8,
        },
        {
          "nodeName": "Node B",
          "startTime": "2022-02-01 14:30:00",
          "endTime": "2022-02-01 15:30:00",
          "originalValue": 15,
          "confirmationValue": 12,
        },
        {
          "nodeName": "Node C",
          "startTime": "2022-03-01 11:30:00",
          "endTime": "2022-03-01 12:30:00",
          "originalValue": 20,
          "confirmationValue": 16,
        },
        {
          "nodeName": "Node D",
          "startTime": "2022-04-01 16:30:00",
          "endTime": "2022-04-01 17:30:00",
          "originalValue": 25,
          "confirmationValue": 20,
        }
      ]
    },
    {
      status: 0,
      sourceNode: "节点 2",
      destinationNode: "节点 3",
      sourceNodeQuantity: 10,
      destinationNodeQuantity: 10,
      formulaQuantity: 10,
      confirmationQuantity: 10,
      calculationFormula: "A - B",
      childList:[
        {
          "nodeName": "Node A",
          "startTime": "2022-01-01 09:00:00",
          "endTime": "2022-01-01 10:00:00",
          "originalValue": 10,
          "confirmationValue": 8,
        },
        {
          "nodeName": "Node B",
          "startTime": "2022-02-01 14:30:00",
          "endTime": "2022-02-01 15:30:00",
          "originalValue": 15,
          "confirmationValue": 12,
        },
        {
          "nodeName": "Node C",
          "startTime": "2022-03-01 11:30:00",
          "endTime": "2022-03-01 12:30:00",
          "originalValue": 20,
          "confirmationValue": 16,
        },
        {
          "nodeName": "Node D",
          "startTime": "2022-04-01 16:30:00",
          "endTime": "2022-04-01 17:30:00",
          "originalValue": 25,
          "confirmationValue": 20,
        }
      ]
    },
    {
      status: 2,
      sourceNode: "节点 3",
      destinationNode: "节点 4",
      sourceNodeQuantity: 10,
      destinationNodeQuantity: 10,
      formulaQuantity: 10,
      confirmationQuantity: 10,
      calculationFormula: "A * B",
      childList:[
        {
          "nodeName": "Node A",
          "startTime": "2022-01-01 09:00:00",
          "endTime": "2022-01-01 10:00:00",
          "originalValue": 10,
          "confirmationValue": 8,
        },
        {
          "nodeName": "Node B",
          "startTime": "2022-02-01 14:30:00",
          "endTime": "2022-02-01 15:30:00",
          "originalValue": 15,
          "confirmationValue": 12,
        },
        {
          "nodeName": "Node C",
          "startTime": "2022-03-01 11:30:00",
          "endTime": "2022-03-01 12:30:00",
          "originalValue": 20,
          "confirmationValue": 16,
        },
        {
          "nodeName": "Node D",
          "startTime": "2022-04-01 16:30:00",
          "endTime": "2022-04-01 17:30:00",
          "originalValue": 25,
          "confirmationValue": 20,
        }
      ]
    },
    {
      status: 2,
      sourceNode: "节点 4",
      destinationNode: "节点 1",
      sourceNodeQuantity: 10,
      destinationNodeQuantity: 10,
      formulaQuantity: 10,
      confirmationQuantity: 10,
      calculationFormula: "A / B",
      childList:[
        {
          "nodeName": "Node A",
          "startTime": "2022-01-01 09:00:00",
          "endTime": "2022-01-01 10:00:00",
          "originalValue": 10,
          "confirmationValue": 8,
        },
        {
          "nodeName": "Node B",
          "startTime": "2022-02-01 14:30:00",
          "endTime": "2022-02-01 15:30:00",
          "originalValue": 15,
          "confirmationValue": 12,
        },
        {
          "nodeName": "Node C",
          "startTime": "2022-03-01 11:30:00",
          "endTime": "2022-03-01 12:30:00",
          "originalValue": 20,
          "confirmationValue": 16,
        },
        {
          "nodeName": "Node D",
          "startTime": "2022-04-01 16:30:00",
          "endTime": "2022-04-01 17:30:00",
          "originalValue": 25,
          "confirmationValue": 20,
        }
      ]
    },
    {
      status: 2,
      sourceNode: "节点 5",
      destinationNode: "节点 2",
      sourceNodeQuantity: 10,
      destinationNodeQuantity: 10,
      formulaQuantity: 10,
      confirmationQuantity: 10,
      calculationFormula: "A + B",
      childList:[
        {
          "nodeName": "Node A",
          "startTime": "2022-01-01 09:00:00",
          "endTime": "2022-01-01 10:00:00",
          "originalValue": 10,
          "confirmationValue": 8,
        },
        {
          "nodeName": "Node B",
          "startTime": "2022-02-01 14:30:00",
          "endTime": "2022-02-01 15:30:00",
          "originalValue": 15,
          "confirmationValue": 12,
        },
        {
          "nodeName": "Node C",
          "startTime": "2022-03-01 11:30:00",
          "endTime": "2022-03-01 12:30:00",
          "originalValue": 20,
          "confirmationValue": 16,
        },
        {
          "nodeName": "Node D",
          "startTime": "2022-04-01 16:30:00",
          "endTime": "2022-04-01 17:30:00",
          "originalValue": 25,
          "confirmationValue": 20,
        }
      ]
    },
  ],
  total:5,
};

/*
* 能源管网平衡 列表
* */
export const energyNetworkBalanceList = {
  code: 200,
  msg: "查询成功",
  rows: [
    {
      "status": 0,
      "nodeName": "Node 1",
      "originalValue": 100,
      "confirmedValue": 95,
      "balanceAmount": '',
      "allocationRule": "Proportional",
      "differenceAmount": '',
      "nodeType": "Type A"
    },
    {
      "status": 1,
      "nodeName": "Node 2",
      "originalValue": 200,
      "confirmedValue": 180,
      "balanceAmount": 20,
      "allocationRule": "Fixed",
      "differenceAmount": 0,
      "nodeType": "Type B"
    },
    {
      "status": 2,
      "nodeName": "Node 3",
      "originalValue": 150,
      "confirmedValue": 150,
      "balanceAmount": 0,
      "allocationRule": "Proportional",
      "differenceAmount": 0,
      "nodeType": "Type A"
    },
    {
      "status": 2,
      "nodeName": "Node 4",
      "originalValue": 80,
      "confirmedValue": 75,
      "balanceAmount": 5,
      "allocationRule": "Fixed",
      "differenceAmount": 0,
      "nodeType": "Type B"
    },
    {
      "status": 2,
      "nodeName": "Node 5",
      "originalValue": 120,
      "confirmedValue": 120,
      "balanceAmount": 0,
      "allocationRule": "Proportional",
      "differenceAmount": 0,
      "nodeType": "Type A"
    }
  ],
  total: 5,
  }

  /*
  * 能源统计平衡 列表
  * */
export const energyStatisticsBalanceList = {
  code: 200,
  msg: "查询成功",
  total:5,
  rows: [
    {
      "status": 0,
      "accountingUnit": "Unit 1",
      "consumptionAmount": 100,
      "selfProductionAmount": 80,
      "interSupplyInAmount": 20,
      "interSupplyOutAmount": 10,
      "externalPurchaseAmount": 30,
      "externalSupplyAmount": 15,
      "originalValue": 200,
      "confirmedValue": 180,
      "startTime": "2021-01-01",
      "endTime": "2021-12-31",
      "formula": "consumptionAmount = selfProductionAmount + interSupplyInAmount - interSupplyOutAmount + externalPurchaseAmount - externalSupplyAmount",
      "childList": [
        {
          "accountingUnit": "Unit 1",
          "originalValue": 100,
          "confirmedValue": 95,
          "networkBalanceAmount": 5,
          "actualAccountingAmount": 80,
          "ordinaryAllocationAmount": 50,
          "commonAllocationAmount": 30,
          "accountingUnitSettlementAmount": 110
        },
        {
          "accountingUnit": "Unit 2",
          "originalValue": 200,
          "confirmedValue": 180,
          "networkBalanceAmount": 20,
          "actualAccountingAmount": 150,
          "ordinaryAllocationAmount": 100,
          "commonAllocationAmount": 50,
          "accountingUnitSettlementAmount": 220
        }
      ]
    },
    {
      "status": 1,
      "accountingUnit": "Unit 2",
      "consumptionAmount": 150,
      "selfProductionAmount": 120,
      "interSupplyInAmount": 30,
      "interSupplyOutAmount": 20,
      "externalPurchaseAmount": 40,
      "externalSupplyAmount": 25,
      "originalValue": 300,
      "confirmedValue": 280,
      "startTime": "2021-01-01",
      "endTime": "2021-12-31",
      "formula": "consumptionAmount = selfProductionAmount + interSupplyInAmount - interSupplyOutAmount + externalPurchaseAmount - externalSupplyAmount",
      "childList": [
        {
          "accountingUnit": "Unit 3",
          "originalValue": 150,
          "confirmedValue": 150,
          "networkBalanceAmount": 0,
          "actualAccountingAmount": 120,
          "ordinaryAllocationAmount": 80,
          "commonAllocationAmount": 40,
          "accountingUnitSettlementAmount": 180
        },
        {
          "accountingUnit": "Unit 4",
          "originalValue": 80,
          "confirmedValue": 75,
          "networkBalanceAmount": 5,
          "actualAccountingAmount": 60,
          "ordinaryAllocationAmount": 40,
          "commonAllocationAmount": 20,
          "accountingUnitSettlementAmount": 90
        }
      ]
    },
    {
      "status": 2,
      "accountingUnit": "Unit 3",
      "consumptionAmount": 80,
      "selfProductionAmount": 60,
      "interSupplyInAmount": 10,
      "interSupplyOutAmount": 5,
      "externalPurchaseAmount": 20,
      "externalSupplyAmount": 10,
      "originalValue": 150,
      "confirmedValue": 140,
      "startTime": "2021-01-01",
      "endTime": "2021-12-31",
      "formula": "consumptionAmount = selfProductionAmount + interSupplyInAmount - interSupplyOutAmount + externalPurchaseAmount - externalSupplyAmount",
      "childList": [
        {
          "accountingUnit": "Unit 5",
          "originalValue": 120,
          "confirmedValue": 120,
          "networkBalanceAmount": 0,
          "actualAccountingAmount": 100,
          "ordinaryAllocationAmount": 70,
          "commonAllocationAmount": 30,
          "accountingUnitSettlementAmount": 130
        }
      ]
    },
    {
      "status": 1,
      "accountingUnit": "Unit 4",
      "consumptionAmount": 120,
      "selfProductionAmount": 100,
      "interSupplyInAmount": 30,
      "interSupplyOutAmount": 15,
      "externalPurchaseAmount": 40,
      "externalSupplyAmount": 20,
      "originalValue": 250,
      "confirmedValue": 230,
      "startTime": "2021-01-01",
      "endTime": "2021-12-31",
      "formula": "consumptionAmount = selfProductionAmount + interSupplyInAmount - interSupplyOutAmount + externalPurchaseAmount - externalSupplyAmount",
      "childList": []
    },
    {
      "status": 0,
      "accountingUnit": "Unit 5",
      "consumptionAmount": 90,
      "selfProductionAmount": 70,
      "interSupplyInAmount": 15,
      "interSupplyOutAmount": 10,
      "externalPurchaseAmount": 25,
      "externalSupplyAmount": 15,
      "originalValue": 180,
      "confirmedValue": 170,
      "startTime": "2021-01-01",
      "endTime": "2021-12-31",
      "formula": "consumptionAmount = selfProductionAmount + interSupplyInAmount - interSupplyOutAmount + externalPurchaseAmount - externalSupplyAmount",
      "childList": []
    }
  ]
}
/*
* 能源绩效指标规则 列表
* */
//能源绩效指标规则 列表
export const energyPerformanceIndicatorRuleList = {
  code: 200,
  msg: "查询成功",
  rows: [
    {
      "name": "Energy Consumption",
      "ruleLevel": "全厂级",
      "valueType": "生产量",
      "energyMedium": "水力",
      "metricQuantity": "80",
      "metricType": "日指标",
      "enableFlag": true,
      "effectiveStartTime": "2022-01-01",
      "effectiveEndTime": "2022-12-31",
      "remarks": "This is the fifth entry"
    },
    {
      "name": "Production Quantity",
      "ruleLevel": "区域级",
      "valueType": "消耗量",
      "energyMedium": "天然气",
      "metricQuantity": "60",
      "metricType": "日指标",
      "enableFlag": true,
      "effectiveStartTime": "2022-04-01",
      "effectiveEndTime": "2022-07-31",
      "remarks": "This is the fourth entry"
    },
    {
      "name": "Energy Consumption",
      "ruleLevel": "全厂级",
      "valueType": "单耗",
      "energyMedium": "石油",
      "metricQuantity": "30",
      "metricType": "班指标",
      "enableFlag": true,
      "effectiveStartTime": "2022-02-01",
      "effectiveEndTime": "2022-09-30",
      "remarks": "This is the third entry"
    },
    {
      "name": "Production Quantity",
      "ruleLevel": "区域级",
      "valueType": "生产量",
      "energyMedium": "燃气",
      "metricQuantity": "90",
      "metricType": "日指标",
      "enableFlag": true,
      "effectiveStartTime": "2022-03-01",
      "effectiveEndTime": "2022-06-30",
      "remarks": "This is the second entry"
    },
    {
      "name": "Energy Consumption",
      "ruleLevel": "全厂级",
      "valueType": "消耗量",
      "energyMedium": "电力",
      "metricQuantity": "40",
      "metricType": "班指标",
      "enableFlag": true,
      "effectiveStartTime": "2022-01-01",
      "effectiveEndTime": "2022-12-31",
      "remarks": "This is the first entry"
    }
  ],
  total:5,
};
//预警报警规则设置
export const warningRuleSetting = {
  code: 200,
  msg: "查询成功",
  rows: [
    {
      "name": "Test Data 4",
      "ruleLevel": "设备级",
      "measurementType": "实时耗水",
      "energyMedium": "Energy Medium 4",
      "alarmUpperLimit": "150",
      "alarmLowerLimit": "50",
      "enableFlag": true,
      "remarks": "Remark for test data 4."
    },
    {
      "name": "Test Data 3",
      "ruleLevel": "区域级",
      "measurementType": "日累积消耗量",
      "energyMedium": "Energy Medium 3",
      "alarmUpperLimit": "200",
      "alarmLowerLimit": "100",
      "enableFlag": false,
      "remarks": "Test remark for data 3."
    },
    {
      "name": "Test Data 2",
      "ruleLevel": "管网级",
      "measurementType": "实时温度",
      "energyMedium": "Energy Medium 2",
      "alarmUpperLimit": "80",
      "alarmLowerLimit": "20",
      "enableFlag": true,
      "remarks": "This is another test remark."
    },
    {
      "name": "Test Data 1",
      "ruleLevel": "全厂级",
      "measurementType": "实时负荷",
      "energyMedium": "Energy Medium 1",
      "alarmUpperLimit": "100",
      "alarmLowerLimit": "50",
      "enableFlag": true,
      "remarks": "This is a test remark."
    }
  ],
  total:0,
};
