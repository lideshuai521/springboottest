package com.lideshuai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author lds
 * @Title: LoginController
 * @Package: com.lideshuai.controller
 * @date 2019/5/8 0008 下午 6:43
 **/
@Controller
public class LoginController {

    @RequestMapping("/login")
    public String toLogin() {
        System.out.println("进入登录页面");
        return "login";
    }

    @RequestMapping("/index")
    public String index(ModelMap map) {
        return "index";
    }

    @RequestMapping("/home") public String toHome() {
        System.out.println("===111-------------home------------");
        return "home";
    }

    @RequestMapping("/home1")
    public String toHome1() {
        System.out.println("===111-------------home------------");
        return "home1";
    }

    @RequestMapping("/{page}") public String toPage(
            @PathVariable("page") String page) {
        return page;
    }


}
