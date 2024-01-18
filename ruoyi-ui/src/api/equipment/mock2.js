//设备管理模块 假数据
import dayjs from "dayjs";
export const Default = {
  data: [],
  code: 200,
  msg: "查询成功",
};
export const equList = {
  data: [
    {
      "DeviceName": "6缸起动机",
      "DeviceNumber": "D001",
      "ProductionTime": "2021-01-01",
      "PhoneNumber": "1234567890",
      "ResponsiblePerson": "张三",
      "AssociatedDocumentsAndImages": "文档1.jpg",
      "Manufacturer": "制造商A",
      "PurchaseTime": "2020-12-01",
      "Region": "区域1",
      "SpecificationModel": "型号X",
      "StorageLocation": "存放位置1",
      "DeviceType": "1",
      "CurrentStatus": "在役",
      "CurrentStatusID": "1",
      "Remarks": "备注信息",
      parentsId:1,
      tagNumber:12,
      model:"z-6-1002",
      area:'',
      areaID:'',
      startTime:'2023-01-01',
      demandID:1,
      demand:'需求1',
      demandDept:'',
      demandDeptId:'',
      supplier:'供应商111',
      ServiceLife:'7',
      price:25000,
      accessor:[],
      files:[]
    },
    {
      "DeviceName": "设备2",
      "DeviceNumber": "D002",
      "ProductionTime": "2021-02-01",
      "PhoneNumber": "9876543210",
      "ServiceLife": "3年",
      "ResponsiblePerson": "李四",
      "AssociatedDocumentsAndImages": "文档2.jpg",
      "Manufacturer": "制造商B",
      "PurchaseTime": "2020-11-01",
      "Region": "区域2",
      "SpecificationModel": "型号Y",
      "StorageLocation": "存放位置2",
      "DeviceType": "2",
      "CurrentStatus": "备用",
      "Remarks": "备注信息"
    },
    {
      "DeviceName": "设备3",
      "DeviceNumber": "D003",
      "ProductionTime": "2021-03-01",
      "PhoneNumber": "1357924680",
      "ServiceLife": "2年",
      "ResponsiblePerson": "王五",
      "AssociatedDocumentsAndImages": "文档3.jpg",
      "Manufacturer": "制造商C",
      "PurchaseTime": "2020-10-01",
      "Region": "区域3",
      "SpecificationModel": "型号Z",
      "StorageLocation": "存放位置3",
      "DeviceType": "1",
      "CurrentStatus": "停用",
      "Remarks": "备注信息"
    },
    {
      "DeviceName": "设备4",
      "DeviceNumber": "D004",
      "ProductionTime": "2021-04-01",
      "PhoneNumber": "2468135790",
      "ServiceLife": "4年",
      "ResponsiblePerson": "赵六",
      "AssociatedDocumentsAndImages": "文档4.jpg",
      "Manufacturer": "制造商D",
      "PurchaseTime": "2020-09-01",
      "Region": "区域4",
      "SpecificationModel": "型号W",
      "StorageLocation": "存放位置4",
      "DeviceType": "2",
      "CurrentStatus": "试运行",
      "Remarks": "备注信息"
    },
    {
      "DeviceName": "设备5",
      "DeviceNumber": "D005",
      "ProductionTime": "2021-05-01",
      "PhoneNumber": "3698521470",
      "ServiceLife": "1年",
      "ResponsiblePerson": "钱七",
      "AssociatedDocumentsAndImages": "文档5.jpg",
      "Manufacturer": "制造商E",
      "PurchaseTime": "2020-08-01",
      "Region": "区域5",
      "SpecificationModel": "型号V",
      "StorageLocation": "存放位置5",
      "DeviceType": "1",
      "CurrentStatus": "报废",
      "Remarks": "备注信息"
    },
  ],
  total:5,
  code: 200,
  msg: "查询成功",
};
//库存列表
export const spareList = {
  data: [
    {
      spareName:'备件1',
      code:'C-001',
      model:'Z-2022-01',
      SpareType:'备件类型1',
      unit:'个',
      total:200,
      upperLimit:250,
      lowerLimit:30,
      manufacturer:'华东制造厂',
      supplier:'华北平原总销'
    },
    {
      spareName:'备件2',
      code:'C-002',
      model:'Z-2022-02',
      SpareType:'备件类型2',
      unit:'个',
      total:50,
      upperLimit:50,
      lowerLimit:5,
      manufacturer:'华东制造厂',
      supplier:'华北平原总销'
    },
    {
      spareName:'备件3',
      code:'C-003',
      model:'Z-2022-03',
      SpareType:'备件类型3',
      unit:'架',
      total:80,
      upperLimit:100,
      lowerLimit:10,
      manufacturer:'华东制造厂',
      supplier:'华北平原总销'
    },
    {
      spareName:'备件4',
      code:'C-004',
      model:'Z-2022-04',
      SpareType:'备件类型4',
      unit:'盒',
      total:10,
      upperLimit:10,
      lowerLimit:1,
      manufacturer:'华东制造厂',
      supplier:'华北平原总销'
    },
    {
      spareName:'备件5',
      code:'C-005',
      model:'Z-2022-05',
      SpareType:'备件类型5',
      unit:'台',
      total:50,
      upperLimit:50,
      lowerLimit:5,
      manufacturer:'华东制造厂',
      supplier:'华北平原总销'
    },
  ],
  total:5,
  code: 200,
  msg: "查询成功",
};
//入库列表
export const inList = {
  data: [
    {
      "InNumber": "I001", //入库单号
      "InDate": "2021-06-01",      //入库日期
      "InType": "1",      //入库类型
      "InTypeName": "采购入库",
      "SpareName": "备件1",      //备件名称
      "StorageLocation": "仓库1",      //入库仓库
      "TotalAmount": "10000",      //入库总量
      "StorageLocationName": "存放位置1",      //存放位置
      "InPerson": "张三",      //入库人
      "AssociatedDocument": "A2564256",      //关联单号
      "Supplier": "供应商1",      //供应商
      "Remarks": "备注信息",      //备注
    },
    {
      "InNumber": "I002", //入库单号
      "InDate": "2021-07-01",      //入库日期
      "InType": "2",      //入库类型
      "InTypeName": "采购入库",
      "SpareName": "备件1",      //备件名称
      "StorageLocation": "仓库1",      //入库仓库
      "TotalAmount": "10000",      //入库总量
      "StorageLocationName": "存放位置1",      //存放位置
      "InPerson": "张三",      //入库人
      "AssociatedDocument": "A2564257",      //关联单号
      "Supplier": "供应商1",      //供应商
      "Remarks": "备注信息",      //备注
    },
    {
      "InNumber": "I003", //入库单号
      "InDate": "2021-09-01",      //入库日期
      "InType": "3",      //入库类型
      "InTypeName": "采购入库",
      "SpareName": "备件1",      //备件名称
      "StorageLocation": "仓库1",      //入库仓库
      "TotalAmount": "10000",      //入库总量
      "StorageLocationName": "存放位置1",      //存放位置
      "InPerson": "张三",      //入库人
      "AssociatedDocument": "A2564258",      //关联单号
      "Supplier": "供应商1",      //供应商
      "Remarks": "备注信息",      //备注
    },
    {
      "InNumber": "I004", //入库单号
      "InDate": "2021-11-01",      //入库日期
      "InType": "4",      //入库类型
      "InTypeName": "采购入库",
      "SpareName": "备件1",      //备件名称
      "StorageLocation": "仓库1",      //入库仓库
      "TotalAmount": "10000",      //入库总量
      "StorageLocationName": "存放位置1",      //存放位置
      "InPerson": "张三",      //入库人
      "AssociatedDocument": "A2564259",      //关联单号
      "Supplier": "供应商1",      //供应商
      "Remarks": "备注信息",      //备注
    },
    {
      "InNumber": "I005", //入库单号
      "InDate": "2021-01-01",      //入库日期
      "InType": "5",      //入库类型
      "InTypeName": "采购入库",
      "SpareName": "备件1",      //备件名称
      "StorageLocation": "仓库1",      //入库仓库
      "TotalAmount": "10000",      //入库总量
      "StorageLocationName": "存放位置1",      //存放位置
      "InPerson": "张三",      //入库人
      "AssociatedDocument": "A2564260",      //关联单号
      "Supplier": "供应商1",      //供应商
      "Remarks": "备注信息",      //备注
    },
  ],
  total:11,
  code: 200,
  msg: "查询成功",
  }


//报修工单列表
export const workOrderList = {
  data: [
    {
      item1:'BX-20230202-001',
      item2:'六缸起动机',
      item3:'DX-00016',
      item4:'3300W',
      item5:'气动车间',
      item6:'东一区',
      item7:'未提交',
      item8:'运行发生异响',
      item9:'2024年01月10日 13时21分',
      item10:'气动一组',
      item11:'赵小刚',
      item12:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item13:'备注信息...'
    },
    {
      item1:'BX-20230202-002',
      item2:'六缸起动机',
      item3:'DX-00016',
      item4:'3300W',
      item5:'气动车间',
      item6:'东一区',
      item7:'未提交',
      item8:'运行发生异响',
      item9:'2024年01月10日 13时21分',
      item10:'气动一组',
      item11:'赵小刚',
      item12:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item13:'备注信息...'
    },
    {
      item1:'BX-20230202-003',
      item2:'六缸起动机',
      item3:'DX-00016',
      item4:'3300W',
      item5:'气动车间',
      item6:'东一区',
      item7:'未提交',
      item8:'运行发生异响',
      item9:'2024年01月10日 13时21分',
      item10:'气动一组',
      item11:'赵小刚',
      item12:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item13:'备注信息...'
    },
    {
      item1:'BX-20230202-004',
      item2:'六缸起动机',
      item3:'DX-00016',
      item4:'3300W',
      item5:'气动车间',
      item6:'东一区',
      item7:'未提交',
      item8:'运行发生异响',
      item9:'2024年01月10日 13时21分',
      item10:'气动一组',
      item11:'赵小刚',
      item12:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item13:'备注信息...'

    },
    {
      item1:'BX-20230202-005',
      item2:'六缸起机',
      item3:'DX-00016',
      item4:'3300W',
      item5:'气动车间',
      item6:'东一区',
      item7:'未提交',
      item8:'运行发生异响',
      item9:'2024年01月10日 13时21分',
      item10:'气动一组',
      item11:'赵小刚',
      item12:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item13:'备注信息...'
    },
  ],
  code: 200,
  msg: "查询成功",
};

//维修任务列表
export const MaintenanceTasksList = {
  data: [
    {
      item1:'维修任务名称-001',
      item2:'维修任务单号-001',
      item3:'未认领',
      item4:'BX-20230202-00',
      item5:'6缸起动机',
      item6:'1200W',
      item7:'w-1200',
      item8:'东一区',
      item9:'5-4架',
      item10:'电器故障',
      item11:'异响',
      item12:'2024-01-15 15:21:00',
      item13:'2024-01-15 18:02:00',
      item14:'王工',
      item15:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item16:'备注信息...',
    },
    {
      item1:'维修任务名称-002',
      item2:'维修任务单号-002',
      item3:'未认领',
      item4:'BX-20230202-00',
      item5:'6缸起机',
      item6:'1200W',
      item7:'w-1200',
      item8:'东一区',
      item9:'5-4架',
      item10:'电器故障',
      item11:'异响',
      item12:'2024-01-15 15:21:00',
      item13:'2024-01-15 18:02:00',
      item14:'王工',
      item15:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item16:'备注信息...',
    },
    {
      item1:'维修任务名称-003',
      item2:'维修任务单号-003',
      item3:'未认领',
      item4:'BX-20230202-00',
      item5:'6缸起机',
      item6:'1200W',
      item7:'w-1200',
      item8:'东一区',
      item9:'5-4架',
      item10:'电器故障',
      item11:'异响',
      item12:'2024-01-15 15:21:00',
      item13:'2024-01-15 18:02:00',
      item14:'王工',
      item15:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item16:'备注信息...',
    },
    {
      item1:'维修任务名称-004',
      item2:'维修任务单号-004',
      item3:'未认领',
      item4:'BX-20230202-00',
      item5:'6缸起机',
      item6:'1200W',
      item7:'w-1200',
      item8:'东一区',
      item9:'5-4架',
      item10:'电器故障',
      item11:'异响',
      item12:'2024-01-15 15:21:00',
      item13:'2024-01-15 18:02:00',
      item14:'王工',
      item15:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item16:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'未认领',
      item4:'BX-20230202-00',
      item5:'6缸起机',
      item6:'1200W',
      item7:'w-1200',
      item8:'东一区',
      item9:'5-4架',
      item10:'设备故障',
      item11:'异响',
      item12:'2024-01-15 15:21:00',
      item13:'2024-01-15 18:02:00',
      item14:'王工',
      item15:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item16:'备注信息...',
    },
  ],
  code: 200,
  msg: "查询成功",
};
export const experienceList = {
  totle:10,
  data: [
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维修任务名称-005',
      item2:'维修任务单号-005',
      item3:'6缸起机',
      item4:'BX-20230202-00',
      item5:'1200W',
      item6:'w-1200',
      item7:'机械故障',
      item8:'轴承损坏',
      item9:'可能是轴承损坏',
      item10:'老化造成轴承损坏',
      item11:'更换轴承',
      item12:'是',
      item13:'2024-01-15 15:21:00',
      item14:'2024-01-15 18:02:00',
      item15:'王工',
      item16:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    }
  ],
  code: 200,
  msg: "查询成功",
};
//设备维护 维护任务列表
export const tenanceTasksList = {
  total:10,
  data: [
    {
      item1:'维护任务名称-005',
      item2:'维护任务单号-005',
      item3:'未开始',
      item4:'BX-20230202-00',
      item5:'区域1',
      item6:'起动机',
      item7:'日常保养',
      item8:'2024-01-15 15:21:00',
      item9:'2024-01-15 18:00:00',
      item10:'2024-01-15 15:00:00',
      item11:'2024-01-15 18:00:00',
      item12:'王工',
      item13:'高工',
      item14:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维护任务名称-005',
      item2:'维护任务单号-005',
      item3:'未开始',
      item4:'BX-20230202-00',
      item5:'区域1',
      item6:'起电机',
      item7:'日常保养',
      item8:'2024-01-15 15:21:00',
      item9:'2024-01-15 18:00:00',
      item10:'2024-01-15 15:00:00',
      item11:'2024-01-15 18:00:00',
      item12:'王工',
      item13:'高工',
      item14:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维护任务名称-005',
      item2:'维护任务单号-005',
      item3:'未开始',
      item4:'BX-20230202-00',
      item5:'区域1',
      item6:'起电机',
      item7:'日常保养',
      item8:'2024-01-15 15:21:00',
      item9:'2024-01-15 18:00:00',
      item10:'2024-01-15 15:00:00',
      item11:'2024-01-15 18:00:00',
      item12:'王工',
      item13:'高工',
      item14:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维护任务名称-005',
      item2:'维护任务单号-005',
      item3:'未开始',
      item4:'BX-20230202-00',
      item5:'区域1',
      item6:'起电机',
      item7:'日常保养',
      item8:'2024-01-15 15:21:00',
      item9:'2024-01-15 18:00:00',
      item10:'2024-01-15 15:00:00',
      item11:'2024-01-15 18:00:00',
      item12:'王工',
      item13:'高工',
      item14:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    },
    {
      item1:'维护任务名称-005',
      item2:'维护任务单号-005',
      item3:'未开始',
      item4:'BX-20230202-00',
      item5:'区域1',
      item6:'起电机',
      item7:'日常保养',
      item8:'2024-01-15 15:21:00',
      item9:'2024-01-15 18:00:00',
      item10:'2024-01-15 15:00:00',
      item11:'2024-01-15 18:00:00',
      item12:'王工',
      item13:'高工',
      item14:[require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png'),require('@/assets/images/equipment/img.png')],
      item17:'备注信息...',
    }
  ],
  code: 200,
  msg: "查询成功",
};
