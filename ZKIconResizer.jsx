/*
    使用说明
    1. 运行脚本方法: (二选一)
        ① 打开PS->点击菜单栏的[文件]->[脚本]->[浏览]->选择并运行此脚本;
        ② 打开PS->把脚本拖进PS的工作区->自动运行此脚本;
    2. 使用中如果脚本上有其他问题, 请找本人帮忙解决;

    其他说明
    • 输出名称不需要带后缀! !
    • 此脚本作者为子康;
*/


// icon配置
var icons= [
// 请在下方填入 输出名称 & 对应尺寸
{"name":"icon-20",      "size":20},
{"name":"icon-29",      "size":29},
{"name":"icon-40",      "size":40},
{"name":"icon-41",      "size":40},
{"name":"icon-42",      "size":40},
{"name":"icon-58",      "size":58},
{"name":"icon-59",      "size":58},
{"name":"icon-60",      "size":60},
{"name":"icon-76",      "size":76},
{"name":"icon-80",      "size":80},
{"name":"icon-81",      "size":80},
{"name":"icon-87",      "size":87},
{"name":"icon-120",     "size":120},
{"name":"icon-121",     "size":120},
{"name":"icon-152",     "size":152},
{"name":"icon-167",     "size":167},
{"name":"icon-180",     "size":180},
];






///////////////////////////
///////////////////////////
// 以下为脚本代码**请勿乱改**
function batch_resize()
{
    // 打开源文件
    var bigIcon = File.openDialog ("请选择一张icon图片:", "*.png", false);
    if (bigIcon==null) {
        alert("中断! ! 未选择图片");
        return
    }
    // 弹窗选择输出目录
    var outputPath = Folder.selectDialog ("请选择一个输出目录:");
    if (outputPath==null) {
        alert("中断! ! 未选择输出目录");
        return
    }
    // 设置输出格式(不带压缩)
    //var option = new PNGSaveOptions();
    //option.PNG8 = false;    //保证质量
    // 以PNG格式保存(带压缩)
    var option = new ExportOptionsSaveForWeb();
    option.format = SaveDocumentType.PNG;
    option.transparency = true;
    option.includeProfile = false ;
    option.interlaced = false ;
    option.PNG8= false ;
    // 打开文档
    var iconDoc = open(bigIcon, OpenDocumentType.PNG);
    // 保存最初的历史记录
    var startStates = iconDoc.historyStates[0];
    // 开始遍历
    for (var i=0; i<icons.length; i++)
    {
        // 获取元素
        var icon = icons[i];
        // 改变图像大小
        iconDoc.resizeImage (icon.size, icon.size);
        // 文件名称
        var fileName= icon.name + ".png";
        // 输出路径
        var filePath = new File (outputPath + "/" + fileName);
        // 另存为
        //iconDoc.saveAs (filePath, option, true, Extension.LOWERCASE);
        iconDoc.exportDocument(filePath, ExportType.SAVEFORWEB, option);
        // 还原历史记录
        iconDoc.activeHistoryState = startStates;
    }
    // 关闭文档
    iconDoc.close (SaveOptions.DONOTSAVECHANGES);
    // 提示完成
    app.beep();
}
batch_resize();

