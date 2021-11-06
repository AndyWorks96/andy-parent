package com.andy.sellergoods.service;


import java.util.List;
import java.util.Map;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

/**
 * 品牌接口
 * @author 李星
 *
 */
public interface BrandService {
	public List<TbBrand> findAll();
	/**
	 * 品牌分页
	 * @param pageNum 当前页面页码
	 * @param pageSize每页记录数
	 * @return
	 */
	public PageResult findPage(int pageNum,int pageSize);
	/**
	 * 增加品牌
	 */
	public void add(TbBrand tbBrand);
	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	public TbBrand findOne(long id);
	/**
	 * 修改
	 * @param tbBrand
	 */
	public void update(TbBrand tbBrand);
	/**
	 * 删除
	 * @param ids
	 */
	public void delete(long[] ids);
	/**
	 * 条件分页
	 * @param tbBrand
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public PageResult findPage(TbBrand tbBrand,int pageNum,int pageSize);
	/**
	 * 品牌下拉框数据
	 */
	public List<Map> selectOptionList();
	
}
