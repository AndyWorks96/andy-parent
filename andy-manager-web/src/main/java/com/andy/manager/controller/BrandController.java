 package com.andy.manager.controller;

import java.util.List;
import java.util.Map;

import org.aspectj.apache.bcel.generic.ReturnaddressType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//responsebody和controller的组合

import com.alibaba.dubbo.config.annotation.Reference;
import com.andy.sellergoods.service.BrandService;
import com.pinyougou.pojo.TbBrand;

import entity.PageResult;
import entity.Result;
import net.sf.jsqlparser.util.AddAliasesVisitor;
@RestController
@RequestMapping("/brand")
public class BrandController {
	@Reference
	//@Autowired
	private BrandService brandService;
	
	//通过阿里巴巴json自动转换 
	@RequestMapping("/findAll")
	public List<TbBrand> findAll(){
		return brandService.findAll();
	}
	
	@RequestMapping("/findPage")
	public PageResult findPage(int page,int size){
		return brandService.findPage(page, size);
	}
	
	//添加品牌
	@RequestMapping("/add")
	public Result add(@RequestBody TbBrand tbBrand){
		try {
			brandService.add(tbBrand);
			return new Result(true, "添加成功");
		} catch (Exception e) {
			return new Result(false, "添加失败");
		}
	}
	
	//查询id
	@RequestMapping("/findOne")
	public TbBrand findOne(long id){
		return brandService.findOne(id);
	}
	
	//更新
	@RequestMapping("/update")
	public Result update(@RequestBody TbBrand tbBrand){
		try {
			brandService.update(tbBrand);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			return new Result(false, "修改失败");
		}
	}
	
	//删除
	@RequestMapping("/delete")
	public Result delete(long[] ids){
		try {
			brandService.delete(ids);
			return new Result(true, "删除成功");
		} catch (Exception e) {
			return new Result(false, "删除失败");
		}
	}
	
	//查询	
	@RequestMapping("/search")
	public PageResult search(@RequestBody TbBrand tbBrand,int page,int size){
		return brandService.findPage(tbBrand, page, size);
		
	}
	
	//下拉选项
	@RequestMapping("/selectOptionList")
	public List<Map> selectOptionList(){
		return brandService.selectOptionList();
	}
	
	
	
}
