//定义品牌服务
		app.service("brandService",function($http){
			//模型变量绑定视图,剩余部分属于控制层代码,要拿结果response,
			//和后端交互部分
			this.findAll=function(){
				return $http.get('..brand/findAll.do');
			}
			this.findPage=function(page,sizess){
				return $http.get('../brand/findPage.do?page='+page+'&size='+sizess);
			}
			this.findOne=function(id){
				return $http.get('../brand/findOne.do?id='+id);
			}
			
			this.add=function(entity){
				return $http.post('../brand/add.do',entity);
			}
			this.update=function(entity){
				return $http.post('../brand/update.do',entity);
			}
			this.dele=function(ids){
				return $http.get('../brand/delete.do?ids='+ids);
			}
			this.search=function(page,sizess,searchEntity){
				return $http.post('../brand/search.do?page='+page+'&size='+sizess,searchEntity);
			}
			
			//下拉商品选项
			this.selectOptionList=function(){
				return $http.get('../brand/selectOptionList.do');
			}
			
			
			
		});