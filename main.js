let page = 0;

let gitdata = [];

const commit_ids = [];

function visualize() {
    const nodesArr = [];
    const edgesArr = [];

    for (let j = 0; j < gitdata.length; j++) {
        const item = gitdata[j];
        if(commit_ids.indexOf(item.sha) >= 0) continue;
        nodesArr.push({
            id: item.sha
        });
        commit_ids.push(item.sha);
        for (let k = 0; k < item.parents.length; k++) {
            const parent = item.parents[k];
            edgesArr.push({
                from: parent.sha,
                to: item.sha
            });
        }
    }

    const nodes = new vis.DataSet(nodesArr);
    const edges = new vis.DataSet(edgesArr);

    const cont = document.getElementById('network');

    const net = new vis.Network(cont, { nodes, edges }, {});
}

function callAjax() {
    $.ajax("https://api.github.com/repos/3dfxdev/hyper3DGE/commits?access_token=34aa0ed21cda3f4ee8f5e9d498f275e91d86a4ce&page=" + page, {
        dataType: "json",
        success: function (data) {
            page++;
            console.log(data.length);
            if(data.length) {
                gitdata = gitdata.concat(data);
                callAjax();
            } else {
                visualize();
            }
            
        }
    });
}

callAjax();