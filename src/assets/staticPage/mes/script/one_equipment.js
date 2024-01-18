reload();

function reload()
{
    try
    {
        const index = document.getElementById('equipmentSelect').value;
        const keyword = document.getElementById('equipmentSelect').options[index].text;
        
        // 获取用于显示数据的容器
        const equipmentLabel = document.getElementById('equipmentName');
        equipmentLabel.innerHTML = keyword
    
        fetch('data/equipment.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.name === keyword) {
                    buildInTable(item.in.data);
                    buildOutTable(item.out.data);
                };
            })
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}


function buildInTable(data){
    try{
        // 获取用于显示数据的容器
        const tablebody = document.getElementById('in-table-body');
        tablebody.innerHTML = ''
        // 使用关键字筛选数据，添加表格行（含三列），并逐一填充
        data.forEach(item => {          
            row = tablebody.insertRow(tablebody.rows.length);
            in_node = row.insertCell(row.length);
            fill_peer_list(item.peer, in_node);
            name_node = row.insertCell(row.length);
            name_node.innerText = "【物料】" + item.material + "\n" + "【入线名】" + item.name;
            inst_node = row.insertCell(row.length);
            fill_inst_list(item, inst_node);
            
            tablebody.appendChild(row);
        });
    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

function buildOutTable(data){
    try{
        // 获取用于显示数据的容器
        const tablebody = document.getElementById('out-table-body');
        tablebody.innerHTML = ''
        // 使用关键字筛选数据并更新表格
        data.forEach(item => {
            row = tablebody.insertRow(tablebody.rows.length);
            inst_node = row.insertCell(row.length); 
            fill_inst_list(item, inst_node);
            name_node = row.insertCell(row.length);
            name_node.innerText = "【物料】" + item.material + "\n" + "【出线名】" + item.name;
            in_node = row.insertCell(row.length);     
            fill_peer_list(item.peer, in_node);
            tablebody.appendChild(row);
        });
    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 加载对端列表（收付通用）
function fill_peer_list(data, elem) {
    try {
        data.forEach(item => {
            if (item.open == true)
            {
                elem.innerHTML += `<div class="row border border-4">
                <div class="col-9">${item.name}</div>
                <div class="col form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggleSwitch" checked>
                <label class="form-check-label text-nowrap" for="toggleSwitch"></label> </div>`;
            }
            else    
            {
                elem.innerHTML += `<div class="row border border-4">
                <div class="col-9">${item.name}</div>
                <div class="col form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggleSwitch">
                <label class="form-check-label text-nowrap" for="toggleSwitch"></label> </div>`;
            }

        });
    }
    catch (error){
        console.error('收付列表数据加载失败:', error);
    }    
}

// 加载仪表数据
function fill_inst_list(item, elem) {
    try{
        const index = document.getElementById('instShow').value;

        if (index == 0)
        {
            elem.innerHTML =`<div class="row border border-4">
            <div class="col-8">[班初值]</div> <div class="col-4">${item.start}</div>
            <div class="col-8">[班初确认]</div> <div class="col-4">${item.start_manu}</div>
            <div class="col-8">[班末值]</div> <div class="col-4">${item.end}</div>
            <div class="col-8">[班末确认]</div> <div class="col-4">${item.end_manu}</div></div>`;
        }
        else if (index == 1)
        {
            elem.innerHTML =`<div class="row border border-4">
            <div class="col-8">[班初值]</div> <div class="col-4">${item.start}</div>
            <div class="col-8">[班初确认]</div> <div class="col-4">${item.start_manu}</div></div>`;
        }
        else if(index == 2)
        {
            elem.innerHTML =`<div class="row border border-4">
            <div class="col-8">[班末值]</div> <div class="col-4">${item.end}</div>
            <div class="col-8">[班末确认]</div> <div class="col-4">${item.end_manu}</div></div>`;
        }
        else
        {
            elem.innerHTML =``;
        }


    }
    catch (error){
        console.error('仪表数据加载失败:', error);
    }    
}
