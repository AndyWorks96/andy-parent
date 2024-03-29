package com.andy.manager.controller;

import entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import util.FastDFSClient;


@RestController
public class UploadController {

	@Value("${FILE_SERVER_URL}")
	private String file_server_url;
	
	@RequestMapping("/upload")
	public Result upload(MultipartFile file){
	
		//获取文件名的扩展名
		String originalFilename = file.getOriginalFilename();
		String extName=originalFilename.substring(originalFilename.lastIndexOf(".")+1);
		try {
			//创建客户端
			FastDFSClient fastDFSClient=new FastDFSClient("classpath:config/fdfs_client.conf");
			//执行文件上传处理
			String path = fastDFSClient.uploadFile(file.getBytes(), extName);
			
			//将ip地址和图片进行拼接
			String url=file_server_url+path;
			System.out.println(url);
			return new Result(true,url);
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "上传失败");
		}
	}
}
