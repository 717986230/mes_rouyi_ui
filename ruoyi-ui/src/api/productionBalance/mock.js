import dayjs from "dayjs";
export const Default = {
  data: [],
  code: 200,
  msg: "查询成功",
};
export const RuleData = {
  data: [
    {
      "ItemId": "R001",
      "ItemName": "装置指标约束",
      "Num": 0
    },
    {
      "ItemId": "R002",
      "ItemName": "高准确度节点基准",
      "Num": 1
    },
    {
      "ItemId": "R003",
      "ItemName": "单路优先规则",
      "Num": 1
    }
  ],
  code: 200,
  msg: "查询成功",
};
export const LoadResult = {
  data: {
    "delta": 15,
    "deltaData": [
      {
        "ConfigKey": "DELTA",
        "ConfigName": "大误差判定比例",
        "ConfigValue": "0.15",
        "ConfigType": "PB",
        "Des": "0-100"
      }
    ],
    "ratio": 15,
    "ratioData": [
      {
        "ConfigKey": "RATIO",
        "ConfigName": "误差提示比例",
        "ConfigValue": "0.15",
        "ConfigType": "PB",
        "Des": "0-100"
      }
    ],
    "comp": 5,
    "compData": [
      {
        "ConfigKey": "COMP",
        "ConfigName": "小组分判定比例",
        "ConfigValue": "0.05",
        "ConfigType": "PB",
        "Des": "0-100"
      }
    ]
  },
  code: 200,
  msg: "查询成功",
};

//解析器展示列表
export const GetQueryData = {
  data: [
    {
      "MtrlMoveDataId": 22035457,
      "SrNodeId": 240080,
      "SrNodeName": "聚合2万吨装置PA-6出料（化工）",
      "TgNodeId": 241020,
      "TgNodeName": "2万吨切片散装进料（化工）",
      "SrMtrlId": -1,
      "SrMtrlName": "无定义",
      "TgMtrlId": -1,
      "TgMtrlName": "无定义",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035457,
          "NodeName": "聚合2万吨装置PA-6出料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035457,
          "NodeName": "2万吨切片散装进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035470,
      "SrNodeId": 240670,
      "SrNodeName": "08单元21.5%烟酸出料线（化工）",
      "TgNodeId": 309532,
      "TgNodeName": "TK0808A",
      "SrMtrlId": 1500000,
      "SrMtrlName": "硫酸105%",
      "TgMtrlId": 1500000,
      "TgMtrlName": "硫酸105%",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035470,
          "NodeName": "08单元21.5%烟酸出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035470,
          "NodeName": "TK0808A",
          "NodePreRaw": 334.003,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035476,
      "SrNodeId": 240670,
      "SrNodeName": "08单元21.5%烟酸出料线（化工）",
      "TgNodeId": 350027,
      "TgNodeName": "TK0808B",
      "SrMtrlId": 1500000,
      "SrMtrlName": "硫酸105%",
      "TgMtrlId": 1500000,
      "TgMtrlName": "硫酸105%",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035476,
          "NodeName": "08单元21.5%烟酸出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035476,
          "NodeName": "TK0808B",
          "NodePreRaw": 359.653,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035460,
      "SrNodeId": 309532,
      "SrNodeName": "TK0808A",
      "TgNodeId": 241083,
      "TgNodeName": "二己21.5%烟酸进料线（化工）",
      "SrMtrlId": 1500000,
      "SrMtrlName": "硫酸105%",
      "TgMtrlId": 1500000,
      "TgMtrlName": "硫酸105%",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035460,
          "NodeName": "TK0808A",
          "NodePreRaw": 334.003,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035460,
          "NodeName": "二己21.5%烟酸进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035459,
      "SrNodeId": 350027,
      "SrNodeName": "TK0808B",
      "TgNodeId": 241083,
      "TgNodeName": "二己21.5%烟酸进料线（化工）",
      "SrMtrlId": 1500000,
      "SrMtrlName": "硫酸105%",
      "TgMtrlId": 1500000,
      "TgMtrlName": "硫酸105%",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035459,
          "NodeName": "TK0808B",
          "NodePreRaw": 359.653,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035459,
          "NodeName": "二己21.5%烟酸进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035469,
      "SrNodeId": 240680,
      "SrNodeName": "08单元98.5%酸出料线（化工）",
      "TgNodeId": 309529,
      "TgNodeName": "TK0805",
      "SrMtrlId": 1500130,
      "SrMtrlName": "硫酸98.5%",
      "TgMtrlId": 1500130,
      "TgMtrlName": "硫酸98.5%",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035469,
          "NodeName": "08单元98.5%酸出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035469,
          "NodeName": "TK0805",
          "NodePreRaw": 131.145,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035479,
      "SrNodeId": 309529,
      "SrNodeName": "TK0805",
      "TgNodeId": 510193,
      "TgNodeName": "化工汽车衡98.5%硫酸出厂点",
      "SrMtrlId": 1500130,
      "SrMtrlName": "硫酸98.5%",
      "TgMtrlId": 1500130,
      "TgMtrlName": "硫酸98.5%",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035479,
          "NodeName": "TK0805",
          "NodePreRaw": 131.145,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035479,
          "NodeName": "化工汽车衡98.5%硫酸出厂点",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 5
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "05",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035472,
      "SrNodeId": 240770,
      "SrNodeName": "13双氧水出料线（化工）",
      "TgNodeId": 309568,
      "TgNodeName": "V13702B",
      "SrMtrlId": 1500090,
      "SrMtrlName": "双氧水",
      "TgMtrlId": 1500090,
      "TgMtrlName": "双氧水",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035472,
          "NodeName": "13双氧水出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035472,
          "NodeName": "V13702B",
          "NodePreRaw": 98.549,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035461,
      "SrNodeId": 241081,
      "SrNodeName": "14单元肟去重排量（化工）",
      "TgNodeId": 241084,
      "TgNodeName": "二己环己酮肟进料线（化工）",
      "SrMtrlId": -1,
      "SrMtrlName": "无定义",
      "TgMtrlId": -1,
      "TgMtrlName": "无定义",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035461,
          "NodeName": "14单元肟去重排量（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035461,
          "NodeName": "二己环己酮肟进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035466,
      "SrNodeId": 241086,
      "SrNodeName": "二己酰胺油出料线（化工）",
      "TgNodeId": 243538,
      "TgNodeName": "二己酰胺油进料线（化工）",
      "SrMtrlId": -1,
      "SrMtrlName": "无定义",
      "TgMtrlId": -1,
      "TgMtrlName": "无定义",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035466,
          "NodeName": "二己酰胺油出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035466,
          "NodeName": "二己酰胺油进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035465,
      "SrNodeId": 241088,
      "SrNodeName": "二己硫酸铵出料线（化工）",
      "TgNodeId": 241098,
      "TgNodeName": "二套AS散装进料（化工）",
      "SrMtrlId": -1,
      "SrMtrlName": "无定义",
      "TgMtrlId": -1,
      "TgMtrlName": "无定义",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035465,
          "NodeName": "二己硫酸铵出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035465,
          "NodeName": "二套AS散装进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035454,
      "SrNodeId": 309503,
      "SrNodeName": "TK6006B",
      "TgNodeId": 240810,
      "TgNodeName": "14单元NH3进料（化工）",
      "SrMtrlId": 1500500,
      "SrMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "TgMtrlId": 1500500,
      "TgMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035454,
          "NodeName": "TK6006B",
          "NodePreRaw": 286.12,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035454,
          "NodeName": "14单元NH3进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035458,
      "SrNodeId": 309503,
      "SrNodeName": "TK6006B",
      "TgNodeId": 241082,
      "TgNodeName": "二己气氨进料线（化工）",
      "SrMtrlId": 1500500,
      "SrMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "TgMtrlId": 1500500,
      "TgMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035458,
          "NodeName": "TK6006B",
          "NodePreRaw": 286.12,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035458,
          "NodeName": "二己气氨进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035467,
      "SrNodeId": 309503,
      "SrNodeName": "TK6006B",
      "TgNodeId": 243572,
      "TgNodeName": "储运送动力站液氨进料线（化工）",
      "SrMtrlId": 1500500,
      "SrMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "TgMtrlId": 1500500,
      "TgMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035467,
          "NodeName": "TK6006B",
          "NodePreRaw": 286.12,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035467,
          "NodeName": "储运送动力站液氨进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035475,
      "SrNodeId": 241093,
      "SrNodeName": "二己己内酰胺出料线（化工）",
      "TgNodeId": 330005,
      "TgNodeName": "T17802A（化工）",
      "SrMtrlId": 1500310,
      "SrMtrlName": "液体己内酰胺(半成品A)",
      "TgMtrlId": 1500310,
      "TgMtrlName": "液体己内酰胺(半成品A)",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035475,
          "NodeName": "二己己内酰胺出料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        },
        {
          "MtrlNodeDataId": 22035475,
          "NodeName": "T17802A（化工）",
          "NodePreRaw": 370.986,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564105800000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "02",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035478,
      "SrNodeId": 309507,
      "SrNodeName": "TK6501B（化工）",
      "TgNodeId": 500080,
      "TgNodeName": "化工汽车衡液CPL出厂点",
      "SrMtrlId": 1500310,
      "SrMtrlName": "液体己内酰胺(半成品A)",
      "TgMtrlId": 1500110,
      "TgMtrlName": "己内酰胺液体",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035478,
          "NodeName": "TK6501B（化工）",
          "NodePreRaw": 270.694,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564104000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035478,
          "NodeName": "化工汽车衡液CPL出厂点",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 5
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "05",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035450,
      "SrNodeId": 330005,
      "SrNodeName": "T17802A（化工）",
      "TgNodeId": 240070,
      "TgNodeName": "2万吨CPL进料（化工）",
      "SrMtrlId": 1500310,
      "SrMtrlName": "液体己内酰胺(半成品A)",
      "TgMtrlId": 1500310,
      "TgMtrlName": "液体己内酰胺(半成品A)",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035450,
          "NodeName": "T17802A（化工）",
          "NodePreRaw": 370.986,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564105800000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035450,
          "NodeName": "2万吨CPL进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035477,
      "SrNodeId": 330005,
      "SrNodeName": "T17802A（化工）",
      "TgNodeId": 500080,
      "TgNodeName": "化工汽车衡液CPL出厂点",
      "SrMtrlId": 1500310,
      "SrMtrlName": "液体己内酰胺(半成品A)",
      "TgMtrlId": 1500110,
      "TgMtrlName": "己内酰胺液体",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035477,
          "NodeName": "T17802A（化工）",
          "NodePreRaw": 370.986,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564105800000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035477,
          "NodeName": "化工汽车衡液CPL出厂点",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 5
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "05",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035464,
      "SrNodeId": 309542,
      "SrNodeName": "TK6004",
      "TgNodeId": 241095,
      "TgNodeName": "二己碱液进（化工）",
      "SrMtrlId": 1510111,
      "SrMtrlName": "(氢氧化钠30%)",
      "TgMtrlId": 1510111,
      "TgMtrlName": "(氢氧化钠30%)",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035464,
          "NodeName": "TK6004",
          "NodePreRaw": 136.68,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035464,
          "NodeName": "二己碱液进（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035451,
      "SrNodeId": 309551,
      "SrNodeName": "TK0804（化工）",
      "TgNodeId": 240650,
      "TgNodeName": "08单元S进料线（化工）",
      "SrMtrlId": 1500674,
      "SrMtrlName": "工业硫磺\\液体(一等)",
      "TgMtrlId": 1500674,
      "TgMtrlName": "工业硫磺\\液体(一等)",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035451,
          "NodeName": "TK0804（化工）",
          "NodePreRaw": 284.478,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035451,
          "NodeName": "08单元S进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035471,
      "SrNodeId": 600011,
      "SrNodeName": "炼油送液硫至化纤硫酸装置",
      "TgNodeId": 309551,
      "TgNodeName": "TK0804（化工）",
      "SrMtrlId": 1500675,
      "SrMtrlName": "工业硫磺\\液体(优等)",
      "TgMtrlId": 1500674,
      "TgMtrlName": "工业硫磺\\液体(一等)",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035471,
          "NodeName": "炼油送液硫至化纤硫酸装置",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 6
        },
        {
          "MtrlNodeDataId": 22035471,
          "NodeName": "TK0804（化工）",
          "NodePreRaw": 284.478,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "06",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035456,
      "SrNodeId": 309566,
      "SrNodeName": "V13701",
      "TgNodeId": 240820,
      "TgNodeName": "14单元双氧水进料（化工）",
      "SrMtrlId": 1500090,
      "SrMtrlName": "双氧水",
      "TgMtrlId": 1500090,
      "TgMtrlName": "双氧水",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035456,
          "NodeName": "V13701",
          "NodePreRaw": 561.439,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035456,
          "NodeName": "14单元双氧水进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035455,
      "SrNodeId": 350028,
      "SrNodeName": "V13806A",
      "TgNodeId": 240820,
      "TgNodeName": "14单元双氧水进料（化工）",
      "SrMtrlId": 1500090,
      "SrMtrlName": "双氧水",
      "TgMtrlId": 1500090,
      "TgMtrlName": "双氧水",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035455,
          "NodeName": "V13806A",
          "NodePreRaw": 634.857,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035455,
          "NodeName": "14单元双氧水进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035453,
      "SrNodeId": 309570,
      "SrNodeName": "TK6014",
      "TgNodeId": 240800,
      "TgNodeName": "14单元环己酮进料（化工）",
      "SrMtrlId": 1500520,
      "SrMtrlName": "环己酮",
      "TgMtrlId": 1500520,
      "TgMtrlName": "环己酮",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035453,
          "NodeName": "TK6014",
          "NodePreRaw": 712.378,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564104000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035453,
          "NodeName": "14单元环己酮进料（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035473,
      "SrNodeId": 500160,
      "SrNodeName": "环己酮管输进厂点",
      "TgNodeId": 309570,
      "TgNodeName": "TK6014",
      "SrMtrlId": 1500520,
      "SrMtrlName": "环己酮",
      "TgMtrlId": 1500520,
      "TgMtrlName": "环己酮",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035473,
          "NodeName": "环己酮管输进厂点",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 5
        },
        {
          "MtrlNodeDataId": 22035473,
          "NodeName": "TK6014",
          "NodePreRaw": 712.378,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564104000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "05",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035463,
      "SrNodeId": 330003,
      "SrNodeName": "T17302",
      "TgNodeId": 241092,
      "TgNodeName": "二己萃取苯进料线（化工）",
      "SrMtrlId": 1500010,
      "SrMtrlName": "石油苯",
      "TgMtrlId": 1500010,
      "TgMtrlName": "石油苯",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035463,
          "NodeName": "T17302",
          "NodePreRaw": 187.2,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        },
        {
          "MtrlNodeDataId": 22035463,
          "NodeName": "二己萃取苯进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "03",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035474,
      "SrNodeId": 600012,
      "SrNodeName": "石油苯供化纤",
      "TgNodeId": 330003,
      "TgNodeName": "T17302",
      "SrMtrlId": 1500010,
      "SrMtrlName": "石油苯",
      "TgMtrlId": 1500010,
      "TgMtrlName": "石油苯",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035474,
          "NodeName": "石油苯供化纤",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 6
        },
        {
          "MtrlNodeDataId": 22035474,
          "NodeName": "T17302",
          "NodePreRaw": 187.2,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564092000000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "06",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035468,
      "SrNodeId": 500150,
      "SrNodeName": "液氨管输进厂点",
      "TgNodeId": 309502,
      "TgNodeName": "TK6006A",
      "SrMtrlId": 1500500,
      "SrMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "TgMtrlId": 1500500,
      "TgMtrlName": "液氨\\(≥99.8%) 一级品 散装",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035468,
          "NodeName": "液氨管输进厂点",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 5
        },
        {
          "MtrlNodeDataId": 22035468,
          "NodeName": "TK6006A",
          "NodePreRaw": 385.03,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1564106700000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 3
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "05",
      "TgState": "03",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035452,
      "SrNodeId": 600000,
      "SrNodeName": "炼油氢气送化纤",
      "TgNodeId": 240760,
      "TgNodeName": "13双氧水氢气进料线（化工）",
      "SrMtrlId": 1500653,
      "SrMtrlName": "氢气\\氢气",
      "TgMtrlId": 1500653,
      "TgMtrlName": "氢气\\氢气",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035452,
          "NodeName": "炼油氢气送化纤",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 6
        },
        {
          "MtrlNodeDataId": 22035452,
          "NodeName": "13双氧水氢气进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "06",
      "TgState": "02",
      "SortByDataState": 0
    },
    {
      "MtrlMoveDataId": 22035462,
      "SrNodeId": 600000,
      "SrNodeName": "炼油氢气送化纤",
      "TgNodeId": 241091,
      "TgNodeName": "二己氢气进料线（化工）",
      "SrMtrlId": 1500653,
      "SrMtrlName": "氢气\\氢气",
      "TgMtrlId": 1500653,
      "TgMtrlName": "氢气\\氢气",
      "SrRawVal": 0,
      "TgRawVal": 0,
      "MoveBegTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
      "MoveEndTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
      "Mfid": 2,
      "Mfn": "石化纤",
      "MoveTypeName": "常规移动",
      "NodeAreaId": "0",
      "ListSub": [
        {
          "MtrlNodeDataId": 22035462,
          "NodeName": "炼油氢气送化纤",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 6
        },
        {
          "MtrlNodeDataId": 22035462,
          "NodeName": "二己氢气进料线（化工）",
          "NodePreRaw": 0,
          "NodeAftRaw": 0,
          "NodeRawVal": 0,
          "NodePreTime": dayjs(1699833600000).format('YYYY-MM-DD HH:mm:ss'),
          "NodeAftTime": dayjs(1699876800000).format('YYYY-MM-DD HH:mm:ss'),
          "IsCmtFlg": 0,
          "IsExistFlg": 2
        }
      ],
      "SrAlert": null,
      "TgAlert": null,
      "SrState": "06",
      "TgState": "02",
      "SortByDataState": 0
    }
  ],
  code: 200,
  msg: "查询成功",
};

//通用解锁罐区 下拉数据
export const GetTankArea = {
  data: [
    {
      "value": 1010,
      "label": "油品0#罐区"
    },
    {
      "value": 1011,
      "label": "油品1#罐区"
    },
    {
      "value": 1012,
      "label": "油品2#罐区"
    },
    {
      "value": 1013,
      "label": "油品3#罐区"
    },
    {
      "value": 1014,
      "label": "油品4#罐区"
    },
    {
      "value": 1015,
      "label": "油品5#罐区"
    },
    {
      "value": 1016,
      "label": "油品6#罐区"
    },
    {
      "value": 1017,
      "label": "油品7#罐区"
    },
    {
      "value": 1018,
      "label": "油品8#罐区"
    },
    {
      "value": 1019,
      "label": "油品9#罐区"
    },
    {
      "value": 1020,
      "label": "油品28A罐区"
    },
    {
      "value": 1021,
      "label": "油品28B罐区"
    },
    {
      "value": 1022,
      "label": "油品43罐区"
    },
    {
      "value": 1023,
      "label": "航煤首站罐区"
    },
    {
      "value": 1024,
      "label": "卸车罐区"
    },
    {
      "value": 1025,
      "label": "蜡油脱氮罐区"
    },
    {
      "value": 1026,
      "label": "碱罐区"
    },
    {
      "value": 1027,
      "label": "污油罐区"
    },
    {
      "value": 1028,
      "label": "烷基化车间罐区"
    },
    {
      "value": 1029,
      "label": "芳烃装置中间罐区"
    },
    {
      "value": 1030,
      "label": "生物柴油罐区"
    },
    {
      "value": 1031,
      "label": "气体、烧焦罐区(虚拟)"
    },
    {
      "value": 1032,
      "label": "化纤代存甲苯罐区"
    },
    {
      "value": 1033,
      "label": "油库乙醇罐区"
    },
    {
      "value": 1034,
      "label": "油库1#罐区"
    },
    {
      "value": 1035,
      "label": "油库2#罐区"
    },
    {
      "value": 1036,
      "label": "油库3#罐区"
    },
    {
      "value": 1050,
      "label": "原料罐区"
    },
    {
      "value": 1051,
      "label": "液体CPL产品罐区"
    },
    {
      "value": 1052,
      "label": "苯甲醛罐区"
    },
    {
      "value": 1053,
      "label": "苯甲酸罐区"
    },
    {
      "value": 1054,
      "label": "CCA罐区"
    },
    {
      "value": 1055,
      "label": "NTR罐区"
    },
    {
      "value": 1056,
      "label": "酸团罐区"
    },
    {
      "value": 1057,
      "label": "酰胺油罐区"
    },
    {
      "value": 1058,
      "label": "烟酸罐区"
    },
    {
      "value": 1059,
      "label": "液体CPL罐区"
    },
    {
      "value": 1060,
      "label": "苯罐区"
    },
    {
      "value": 1061,
      "label": "2万吨CPL罐区"
    },
    {
      "value": 1062,
      "label": "水己罐区"
    },
    {
      "value": 1063,
      "label": "燃料罐区"
    },
    {
      "value": 1064,
      "label": "烧碱罐区"
    },
    {
      "value": 1065,
      "label": "废苯罐区"
    },
    {
      "value": 1066,
      "label": "正己烷罐区"
    },
    {
      "value": 1067,
      "label": "粗苯甲醛罐区"
    },
    {
      "value": 1068,
      "label": "氢气罐区（虚拟）"
    },
    {
      "value": 1069,
      "label": "硝酸罐区"
    },
    {
      "value": 1070,
      "label": "环己烷罐区（虚拟）"
    },
    {
      "value": 1071,
      "label": "苯甲酸B罐区"
    },
    {
      "value": 1072,
      "label": "含油废液罐区（虚拟）"
    },
    {
      "value": 1073,
      "label": "废浮油罐区（虚拟）"
    },
    {
      "value": 1074,
      "label": "液硫罐区"
    },
    {
      "value": 1076,
      "label": "精制车间中间罐区"
    },
    {
      "value": 1077,
      "label": "5千吨CPL罐区"
    },
    {
      "value": 1078,
      "label": "双氧水罐区"
    },
    {
      "value": 1079,
      "label": "环保稀酰胺油罐区"
    },
    {
      "value": 1080,
      "label": "环己酮罐区"
    },
    {
      "value": 1081,
      "label": "化纤在制品罐区"
    },
    {
      "value": 1082,
      "label": "氨肟化甲苯罐区"
    },
    {
      "value": 1083,
      "label": "化工虚拟空气罐区"
    },
    {
      "value": 1084,
      "label": "油品402单元"
    },
    {
      "value": 1085,
      "label": "油品407单元"
    },
    {
      "value": 1086,
      "label": "油品401单元"
    },
    {
      "value": 1087,
      "label": "油品403单元"
    },
    {
      "value": 1088,
      "label": "油品404单元"
    },
    {
      "value": 1089,
      "label": "油品405单元"
    },
    {
      "value": 1090,
      "label": "炼油垫底罐区"
    },
    {
      "value": 1202,
      "label": "二己炼油纯苯罐区（化工）"
    },
    {
      "value": 1203,
      "label": "二己硝酸罐区（化工）"
    },
    {
      "value": 1204,
      "label": "化纤包装硫铵罐区（化工）"
    },
    {
      "value": 1205,
      "label": "管网虚拟罐区"
    },
    {
      "value": 1206,
      "label": "物装自用油罐区"
    },
    {
      "value": 1207,
      "label": "己内酰胺包装装置固体己内酰胺罐区（化工）",

    }
  ],
  code: 200,
  msg: "查询成功",
};

//通用解锁 装卸台
export const GetInoutArea = {
  data: [
    {
      "value": 4030,
      "label": "供销公司汽车衡装卸台",
    },
    {
      "value": 4374,
      "label": "空气、水介质进厂装卸台",
    },
    {
      "value": 4340,
      "label": "管输计量台",
    },
    {
      "value": 4380,
      "label": "化工聚合CPL卸车台",
    },
    {
      "value": 4310,
      "label": "火车检尺计量装卸台",
    },
    {
      "value": 4330,
      "label": "汽车衡计量装卸台",
    },
    {
      "value": 4070,
      "label": "环己酮管输进厂装卸台",
    },
    {
      "value": 4370,
      "label": "南轨道衡计量装卸台",
    },
    {
      "value": 4050,
      "label": "双氧水装卸台",
    },
    {
      "value": 4020,
      "label": "硫酸硫铵车间硫磺装卸台",
    },
    {
      "value": 4375,
      "label": "反应污水介质出厂装卸台",
    },
    {
      "value": 4300,
      "label": "火车定量计量装卸台",
    },
    {
      "value": 4376,
      "label": "8万吨硫磺回收装置液硫汽车装卸台",
    },
    {
      "value": 4090,
      "label": "外购液硫装卸台",
    },
    {
      "value": 4000,
      "label": "发烟硫酸装卸台",
    },
    {
      "value": 4320,
      "label": "汽车定量计量装卸台",
    },
    {
      "value": 4350,
      "label": "罐检尺计量台",
    },
    {
      "value": 4360,
      "label": "北轨道衡计量装卸台",
    },
    {
      "value": 4373,
      "label": "醇酮装卸台",
    },
    {
      "value": 4060,
      "label": "液氨管输进厂装卸台",
    },
    {
      "value": 4371,
      "label": "化工甲苯汽车衡进厂装卸台",
    },
    {
      "value": 4379,
      "label": "化工汽车衡98.5%硫酸装卸台",
    },
    {
      "value": 4378,
      "label": "石脑油火车进厂装卸台",
    },
    {
      "value": 4372,
      "label": "石化纤火车装卸台",
    }
  ],
  code: 200,
  msg: "查询成功",
};
//MES工厂列表
export const LoadMesFactorys = {
  data: [
    {
      "value": -1,
      "label": "无定义",
    },
    {
      "value": 1,
      "label": "石炼化",
    },
    {
      "value": 2,
      "label": "石化纤",
    }
  ],
  code: 200,
  msg: "查询成功",
};
export const GetIoType = {
  data: [
    {
      "IoTypeId": -1,
      "IoTypeName": "全部"
    },
    {
      "IoTypeId": 0,
      "IoTypeName": "进"
    },
    {
      "IoTypeId": 1,
      "IoTypeName": "出"
    },
    {
      "IoTypeId": 2,
      "IoTypeName": "消耗"
    }
  ],
  code: 200,
  msg: "查询成功",
};
