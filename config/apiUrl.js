// let ipUrl = 'http://127.0.0.1:7001/default/' 
let ipUrl = 'http://152.136.195.13:7001/default/' 
console.log(process.env)

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
		getTypeInfo:ipUrl + 'getTypeInfo',  // 文章类别接口
		getListById:ipUrl + 'getListById/',  // 根据类别获取文章
}
export default servicePath;
