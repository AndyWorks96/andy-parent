package com.andy.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.andy.sellergoods.service.SellerService;
import com.pinyougou.pojo.TbSeller;

import javax.swing.*;

/**
 * 认证类
 * 这个地方就是通过自己写的方法从数据库读
 * @author 李星
 *
 */
public class UserDetailsServiceImpl implements UserDetailsService {
	
	private SellerService sellerService;
	
	public void setSellerService(SellerService sellerService) {
		this.sellerService = sellerService;
	}

	@Override
	//ctrl+t
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("经过了UserDetailsServiceImpl");

		//new 一个空集合
		//构建角色列表
		List<GrantedAuthority> grantAuths=new ArrayList<>();

		grantAuths.add(new SimpleGrantedAuthority("ROLE_SELLER"));
		// option+space
		//得到商家对象
		TbSeller seller = sellerService.findOne(username);

		if(seller!=null){
			//此处"1" 写成了 '1'导致登录页面无法正常登录
			if(seller.getStatus().equals("1")){
				return new User(username, seller.getPassword(), grantAuths);
			}else{
				return null;
			}
		}else{
			return null;
		//用户名不存在返回null
		}
	}
}