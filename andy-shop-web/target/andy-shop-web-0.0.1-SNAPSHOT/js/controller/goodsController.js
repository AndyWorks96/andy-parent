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
				//显示扩展属性
				$scope.entity.goodsDesc.customAttributeItems=  JSON.parse($scope.entity.goodsDesc.customAttributeItems);

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
	
	
	//读取一级分类   2023.9.19 parentId0 一级分类列表
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
				function(response){
					$scope.itemCat1List=response;
				}
		);
	}
	/*
	以上代码是一个AngularJS控制器中的函数，它用于读取一级分类列表并将结果保存在$scope中，以供页面使用。
	解释如下：
	1. 首先，定义了一个名为$scope.selectItemCat1List的函数。这是AngularJS控制器中的一个作用域函数，可以在HTML页面中调用。
	2. 在函数内部，调用了一个名为itemCatService的服务（这是一个自定义的服务，用于处理分类相关的业务逻辑）。具体来说，调用了该服务的findByParentId方法，传递参数0作为父分类ID。
	3. 使用.success()方法注册了一个回调函数，该回调函数会在成功获取数据后执行。在这个例子中，成功获取到了一级分类列表数据。
	4. 在回调函数中，将服务器返回的数据(response)保存到$scope的itemCat1List属性中。这样，页面上的其它部分就可以通过访问$scope.itemCat1List来获取一级分类列表数据。
	总结：这段代码的目的是通过itemCatService服务从服务器获取一级分类列表数据，并将数据保存在$scope.itemCat1List中，以便在页面中使用。注意，具体的itemCatService服务实现以及页面上的使用没有在这段代码中展示，需要在其他地方查找。
	 */

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
					$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds)//品牌列表由字符串转换为对象
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
		alert(object);
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
