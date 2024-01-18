let arr = [
    {
        "id": 4650,
        "label": "大庆原油",
        "ParentId": 4632,
        "DisplayOrder": 49,
        "RankId": 0,
        "RankName": null
    },
    {
        "id": 4651,
        "label": "石油华北原油",
        "ParentId": 4632,
        "DisplayOrder": 50,
        "RankId": 0,
        "RankName": null
    },
    {
        "id": 4652,
        "label": "石油新疆原油",
        "ParentId": 4632,
        "DisplayOrder": 51,
        "RankId": 0,
        "RankName": null
    }
]
let id = 4652
let newArr = arr.map(e=>{
    if(e.id == id){
        return {
            ...e,
            ...{
                label:'asdasda',
                isUpdate:true
            }
        }
    }else{
        return e
    }
})
console.log(newArr)
