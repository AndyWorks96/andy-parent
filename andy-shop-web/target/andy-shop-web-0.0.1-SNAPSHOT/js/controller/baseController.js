//
app.controller('baseController',function($scope){
	//分页控件配置 currentPage:当前页 totalItems:总记录数 itemPerPage:每页记录数 perPageOptions:分页选项
	$scope.paginationConf = {
			 currentPage: 1,
			 totalItems: 10,
			 itemsPerPage: 10,
			 perPageOptions: [10, 20, 30, 40, 50],
			 //onchange:当前页码变更后自动触发的方法 reloadlist没有加()
			 onChange: function(){
				 $scope.reloadList();
			 }
	}; 
	//封装方法,刷新列表
	$scope.reloadList=function(){
		//之前是$scope.findPage
		 $scope.search( $scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
	}
	
	//删除
	$scope.selectIds=[];//用户勾选的id集合
	//用户勾选复选框
	$scope.updateSelection=function($event,id){
		if($event.target.checked){
			//$.event.target代表input,$event代表源
			$scope.selectIds.push(id);
		}else{
			var index=$scope.selectIds.indexOf(id);//查找值得位置
			$scope.selectIds.splice(index,1);//移掉某个值 参数1:移除的位置 参数2:移除的个数
		}
			
	}
	
	//提取json字符串数据中某个属性，返回拼接字符串 逗号分隔
	$scope.jsonToString=function(jsonToString,key){
		var json=JSON.parse(jsonToString);
		var value="";
		for(var i=0;i<json.length;i++){
			if(i>0)
				value +=",";
			value +=json[i][key];
		}
		return value;
	}
	
	//从集合中key查询对象
	$scope.searchObjectByKey=function(list,key,keyValue){
		
		for(var i=0;i<list.length;i++){
			
			if(list[i][key]==keyValue)
				return list[i];
		}
		return null;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
