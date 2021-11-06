 //控制层 
app.controller('goodsController' ,function($scope,$controller,goodsService,uploadService,itemCatService,typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//增加
	$scope.add=function(){				
		$scope.entity.goodsDesc.introduction=editor.html();	
		goodsService.add( $scope.entity  ).success(
			function(response){
				if(response.success){
					//不需要重新查询 
					alert("保存成功");
		        	//$scope.reloadList();//重新加载
					$scope.entity={};
					editor.html('');//清空富文本编辑器
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	//保存
	/*$scope.add=function(){
		goodsService.add($scope.entity).success()
	}*/
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	$scope.uploadFile=function(){
		//未加括号
		uploadService.uploadFile().success(
				function(response){
					if(response.success){
						$scope.entity_image.url=response.message;
					}
					else{
						alert(reponse.message);
					}
				});
	}
	$scope.entity={goodsDesc:{itemImages:[] , specificationItems:[] }};
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.entity_image);
	}
   
	//列表中移除图片
	$scope.image_remove=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
	}
	
	
	//读取一级分类
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
				function(response){
					$scope.itemCat1List=response;
				}
		);
	}
	
	//读取二级分类
	$scope.$watch('entity.goods.category1Id',function(newValue,oldValue){
		
		//根据选择的值，查询二级分类
		itemCatService.findByParentId(newValue).success(
				function(response){
					$scope.itemCat2List=response;
				}
		);
		
	});
	
	//读取三级分类
	$scope.$watch('entity.goods.category2Id',function(newValue,oldValue){
		
		//根据选择的值，查询三级分类
		itemCatService.findByParentId(newValue).success(
				function(response){
					$scope.itemCat3List=response;
				}
		);
		
	});
	
	//三级分类完成后，读取模板ID
	$scope.$watch('entity.goods.category3Id',function(newValue,oldValue){
		itemCatService.findOne(newValue).success(
				function(response){
					$scope.entity.goods.typeTemplateId=response.typeId;//更新模板ID
				}
		);
	});
	
	//模板ID更新后 更新品牌列表
	$scope.$watch('entity.goods.typeTemplateId',function(newValue,oldValue){
		typeTemplateService.findOne(newValue).success(
				function(response){
					$scope.typeTemplate=response;//获取类型模板
//					alert($scope.typeTemplate.brandIds);
//					alert($scope.typeTemplate);
					$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds)//品牌列表
//					alert($scope.typeTemplate.brandIds);
//					alert($scope.typeTemplate.customAttributeItems);
					$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.typeTemplate.customAttributeItems);//扩展属性
				}
		);
		//查询规格列表
		typeTemplateService.findSpecList(newValue).success(
				function(response){
					alert(response);
					$scope.specList=response;
				}
		);
		
	});
	
	
	//保存选择的规格选项
	$scope.updateSpecAttribute=function($event,name,value){
		var object=$scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems,'attributeName',name);
//		alert(object);
		if(object!=null){
			
			
			if($event.target.checked){
				object.attributeValue.push(value);
			}
			else{
				//取消勾选                                                                                                          indexOf大写，否则无法识别这个函数
				object.attributeValue.splice(object.attributeValue.indexOf(value),1);
				if(object.attributeValue.length==0){
					$scope.entity.goodsDesc.specificationItems.splice(
							$scope.entity.goodsDesc.specificationItems.indexOf(object),1);
				}
			}
		}
		else{
			$scope.entity.goodsDesc.specificationItems.push( {"attributeName":name,"attributeValue":[value]} );
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});	
