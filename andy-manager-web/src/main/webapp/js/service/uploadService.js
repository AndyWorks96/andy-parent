//创建上传图片服务层
app.service("uploadService",function($http){
	this.uploadFile=function(){
		var formData=new FormData();
		formData.append("file",file.files[0]);
		return $http({
			
			method:'POST',
			url:"../upload.do",
			data:formData,
			headers:{'Content-Type':undefined},
			transformRequest: angular.identity
		
		});
	}
});



/*app.service("uploadService",function($http){
	this.uploadFile=function(){
		var formData=new FormData();
	    formData.append("file",file.files[0]);   
		return $http({
            method:'POST',
            url:"../upload.do",
            data: formData,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        });		
	}	
});*/