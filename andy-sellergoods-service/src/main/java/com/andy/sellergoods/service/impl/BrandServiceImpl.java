package com.andy.sellergoods.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.dubbo.config.annotation.Service;
import com.andy.sellergoods.service.BrandService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.TbBrandExample;
import com.pinyougou.pojo.TbBrandExample.Criteria;

import entity.PageResult;
@Service
public class BrandServiceImpl implements BrandService {
	//本地调用
	@Autowired
	private TbBrandMapper brandMapper;
	
	@Override
	public List<TbBrand> findAll() {
		return brandMapper.selectByExample(null);
	}
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		
		PageHelper.startPage(pageNum, pageSize);//分页
		Page<TbBrand> page=	(Page<TbBrand>) brandMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}
	
	//增加
	@Override
	public void add(TbBrand tbBrand) {
		brandMapper.insert(tbBrand);
	}
	
	@Override
	public TbBrand findOne(long id) {
		return brandMapper.selectByPrimaryKey(id);
	}
	@Override
	public void update(TbBrand tbBrand) {
		brandMapper.updateByPrimaryKey(tbBrand);
	}
	@Override
	public void delete(long[] ids) {
		for(long id:ids){
			brandMapper.deleteByPrimaryKey(id);
		}
		
	}
	@Override
	public PageResult findPage(TbBrand tbBrand, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);//分页
		
		TbBrandExample example=new TbBrandExample();
		//创造条件
		Criteria criteria=example.createCriteria();
		//模糊查询
		if(tbBrand!=null){
			if(tbBrand.getName()!=null&&tbBrand.getName().length()>0){
				criteria.andNameLike("%"+tbBrand.getName()+"%");
			}
		if(tbBrand.getFirstChar()!=null&&tbBrand.getFirstChar().length()>0){
			criteria.andFirstCharLike("%"+tbBrand.getFirstChar()+"%");
			}
		}
		Page<TbBrand> page=	(Page<TbBrand>) brandMapper.selectByExample(example);
		return new PageResult(page.getTotal(), page.getResult());
	}
	@Override
	public List<Map> selectOptionList() {
		return brandMapper.selectOptionList();
	}

}
