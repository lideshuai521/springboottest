package com.lideshuai.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author lds
 * @Title: LoginController
 * @Package: com.lideshuai.controller
 * @date 2019/5/8 0008 下午 6:43
 **/
@RestController
public class LoginController {

    @RequestMapping("/login")
    public String login(){

        return "jenkins 测试成功";
    }
}
