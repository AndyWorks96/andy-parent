package com.andy.sellergoods.service.impl;
import java.util.List;
import java.util.Map;

import com.mysql.cj.xdevapi.JsonArray;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.alibaba.fastjson.JSON;
import com.andy.sellergoods.service.TypeTemplateService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.mapper.TbTypeTemplateMapper;
import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import com.pinyougou.pojo.TbTypeTemplate;
import com.pinyougou.pojo.TbTypeTemplateExample;
import com.pinyougou.pojo.TbTypeTemplateExample.Criteria;

import entity.PageResult;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
public class TypeTemplateServiceImpl implements TypeTemplateService {

	@Autowired
	private TbTypeTemplateMapper typeTemplateMapper;
	
	/**
	 * 查询全部
	 */
	@Override
	public List<TbTypeTemplate> findAll() {
		return typeTemplateMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbTypeTemplate> page=   (Page<TbTypeTemplate>) typeTemplateMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(TbTypeTemplate typeTemplate) {
		typeTemplateMapper.insert(typeTemplate);		
	}

	
	/**
	 * 修改
	 */
	@Override
	public void update(TbTypeTemplate typeTemplate){
		typeTemplateMapper.updateByPrimaryKey(typeTemplate);
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public TbTypeTemplate findOne(Long id){
		return typeTemplateMapper.selectByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids){
			typeTemplateMapper.deleteByPrimaryKey(id);
		}		
	}
	
	
		@Override
	public PageResult findPage(TbTypeTemplate typeTemplate, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbTypeTemplateExample example=new TbTypeTemplateExample();
		Criteria criteria = example.createCriteria();
		
		if(typeTemplate!=null){			
						if(typeTemplate.getName()!=null && typeTemplate.getName().length()>0){
				criteria.andNameLike("%"+typeTemplate.getName()+"%");
			}
			if(typeTemplate.getSpecIds()!=null && typeTemplate.getSpecIds().length()>0){
				criteria.andSpecIdsLike("%"+typeTemplate.getSpecIds()+"%");
			}
			if(typeTemplate.getBrandIds()!=null && typeTemplate.getBrandIds().length()>0){
				criteria.andBrandIdsLike("%"+typeTemplate.getBrandIds()+"%");
			}
			if(typeTemplate.getCustomAttributeItems()!=null && typeTemplate.getCustomAttributeItems().length()>0){
				criteria.andCustomAttributeItemsLike("%"+typeTemplate.getCustomAttributeItems()+"%");
			}
	
		}
		
		Page<TbTypeTemplate> page= (Page<TbTypeTemplate>)typeTemplateMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}
		
		/*
		 * 返回规格列表功能实现
		 */
		
		//添加数据访问层 自动注入
		@Autowired
		private TbSpecificationOptionMapper specificationOptionMapper;
		
		@Override
		/*public List<Map> findSpecList(long id) {
			
			//首先根据模板id查询规格 
			//查询模板
			TbTypeTemplate tbTypeTemplate = typeTemplateMapper.selectByPrimaryKey(id);
			System.out.println(tbTypeTemplate);
			//将查询出的内容存入map集合中
			List<Map> list = JSON.parseArray(tbTypeTemplate.getSpecIds(), Map.class);
			System.out.println("****************");
			System.out.println(list);
			System.out.println("****************");
			for(Map map:list){
				//查询规格选项列表
				System.out.println(map.toString());
				TbSpecificationOptionExample example=new TbSpecificationOptionExample();
				TbSpecificationOptionExample.Criteria criteria=example.createCriteria();
//				criteria.andIdEqualTo(new Long( (Integer)map.get("id") ) );
				criteria.andSpecIdEqualTo(new Long( (Integer)map.get("id") ) );
				List<TbSpecificationOption> options = specificationOptionMapper.selectByExample(example);
				map.put("options", options);
				System.out.println(map.toString());
			}

			return list;
		}*/
		public List<Map> findSpecList(long id){
			//创造查询模版
			TbTypeTemplate tbTypeTemplate = typeTemplateMapper.selectByPrimaryKey(id);
			System.out.println(tbTypeTemplate.getSpecIds());
			List<Map> list = JSON.parseArray(tbTypeTemplate.getSpecIds(), Map.class);
			for (Map map: list){
				System.out.println(map.toString());
				TbSpecificationOptionExample example = new TbSpecificationOptionExample();
				TbSpecificationOptionExample.Criteria criteria = example.createCriteria();
				criteria.andSpecIdEqualTo(new Long((Integer) map.get("id")));
				List<TbSpecificationOption> options = specificationOptionMapper.selectByExample(example);
				map.put("options", options);
			}
			return list;
		}
}
