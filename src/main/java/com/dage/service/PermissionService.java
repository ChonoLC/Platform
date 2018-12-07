package com.dage.service;

import com.dage.entity.Permission;

import java.util.List;

/**
 * @className:PermissionService
 * @discription:
 * @author:ProMonkey-K
 * @creatTime:2018-12-07 15:29
 */
public interface PermissionService {
    /**
     * 根据登陆角色信息，查询对应权限，出对应的权限树
     * @param
     * @return
     */
    List<Permission> getListByRole();
}