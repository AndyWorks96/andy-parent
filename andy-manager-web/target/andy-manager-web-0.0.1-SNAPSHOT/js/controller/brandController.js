									
		//定义控制器
		//传入参数response，就是data.json传入的参数结果，就是ajax请求
		//app.controller('brandController',function($scope,$http,brandService)未整合前
		app.controller('brandController',function($scope,$controller,brandService){
			
			//伪继承  必须注入进来才能使用
			$controller('baseController',{$scope:$scope});
			
			
			$scope.findList=function(){
				//$http.get('../brand/findAll.do').success
				brandService.findAll().success(
					function(response){
						$scope.list=response;
					}		
				
				);
			}
			//分页控件配置 currentPage:当前页 totalItems:总记录数 itemPerPage:每页记录数 perPageOptions:分页选项
		/*	$scope.paginationConf = {
					 currentPage: 1,
					 totalItems: 10,
					 itemsPerPage: 10,
					 perPageOptions: [10, 20, 30, 40, 50],
					 //onchange:当前页码变更后自动触发的方法 reloadlist没有加()
					 onChange: function(){
						 $scope.reloadList();
					 }
			}; */
			//封装方法,刷新列表
			/*$scope.reloadList=function(){
				//之前是$scope.findPage
				 $scope.search( $scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
			}*/
			//分页
			$scope.findPage=function(page,sizess){	
				//此处出现错误，是因为rowss复制过来的，而后端写的是page
				//$http.get('../brand/findPage.do?page='+page+'&size='+sizess).success
				//记得findPage里边要传参数
				brandService.findPage(page,sizess).success(
					function(response){
						$scope.list=response.rows;//显示当前页面数据
						$scope.paginationConf.totalItems=response.total;//更新总记录数
					
					
				});
			}
			
			//新增  可以同时增加 修改
			/* $scope.save=function(){
				var methodName='add';//方法名
				if($scope.entity!=null){
					methodName='update';
				}
				$http.post('../brand/'+methodName+'.do',$scope.entity).success(
					function(response){
						if(response.success)
							$scope.reloadList();//刷新
						else
							alert(response.message);
					}
				
				);
				
				
			} */
			$scope.save=function(){
				var object=null;
				if($scope.entity.id!=null){
					object=brandService.update($scope.entity);
				}else{
					object=brandService.add($scope.entity);
				}
				object.success(
					function(response){
						if(response.success)
							$scope.reloadList();//刷新
						else
							alert(response.message);
					}
				
				);
				
				
			} 
			
			//查询实体刚才没有写id=等号，导致页面数据无法正常显示
		 	$scope.findOne=function(id){
				//$http.get('../brand/findOne.do?id='+id).success
				brandService.findOne(id).success(
					function(response){
						$scope.entity=response;		
					}
				);
			}
			
			//删除
			/*$scope.selectIds=[];//用户勾选的id集合
			//用户勾选复选框
			$scope.updateSelection=function($event,id){
				if($event.target.checked){
					//$.event.target代表input,$event代表源
					$scope.selectIds.push(id);
				}else{
					var index=$scope.selectIds.indexOf(id);//查找值得位置
					$scope.selectIds.splice(index,1);//移掉某个值 参数1:移除的位置 参数2:移除的个数
				}
					
			}*/
			//删除  编写错误$scope.selectIds错写称selectIds
			$scope.dele=function(){
				
				if(confirm('确定要删除吗？')){
					
				//$http.get('../brand/delete.do?ids='+$scope.selectIds).success
					brandService.dele($scope.selectIds).success(
						function(response){
							if(response.success){
								$scope.reloadList();//刷新
							}else{
								alert(response.message);
							}
						}
					);
				}
			}
			//下边这句抽不抽都行
			$scope.searchEntity={};
		//条件查询
		$scope.search=function(page,sizess){
//			//post请求,因为后端是@requestBody,需要返回对象给searchEntity
//			//$http.post('../brand/search.do?page='+page+'&size='+sizess,$scope.searchEntity).success
			brandService.search(page,sizess,$scope.searchEntity).success(
					function(response){
						$scope.list=response.rows;	//显示当前页面数据
						$scope.paginationConf.totalItems=response.total;//更新总记录数
					}			
			);
		/*	
		 * success()多加一个方括号
		 * brandService.search(page,sizess,$scope.searchEntity).success({
				function(response){
					$scope.list=response.rows;
					$scope.paginationConf.totalItems=response.total; 	
				}
			});*/
		}
			
			
			
			
		});
		