(function($, undefined) {
    $(document).ready(function() {
        var flag4 = 1;
        var _t = 60; // 倒计时时间
        var subFlag = "1";
        var flag = 0;
        var wait = 300;
        var flagJPG=0;
        var verify1 = "";
        var verify2 = "";
        var flag1 = false;
        var flaghave = 0;
        var flag3 = 1;
        var $invist = $("._invist");
        var $invist_msg = $("._invist_msg");
        var $getKey = $("._getkey");
        var $phoneyanzhengma = $("._yanzhengma");
        var $yanzhengma = $("#jpgVerify");
        var $yanzhengmatishi = $('#jpgVerifys');
        var invist_flag = true;
        var $changeCapcherButton = $("._changeCapcherButton");
        var $phoneMsg = $('#phoneJy');
        var login = {
            init: function() {
                login._bind();
            },
            _bind: function() {
                $invist.on('blur', function(event) {
                    event.preventDefault();
                    login.validateInvist();
                    return false;
                });
               $getKey.on('click', function(event) {
                    event.preventDefault();

                    if (flag4 == 1) {
                        flag4 = 0;
                        login._ya($(this));
                    }
                    return false;
                });
                $("._phoneNum").on('blur keyup', function(event) {
                    event.preventDefault();
                    login.phoneYz();
                    return false;
                });
                $("._phonVerify").on('blur', function(event) {
                    event.preventDefault();
                    login.checkSecurity($(this));
                    return false;
                });
                $("._userName").on('blur', function(event) {
                    event.preventDefault();
                    login.strVerify($(this));
                    return false;
                });
                $("._password").on('blur', function(event) {
                    event.preventDefault();
                    login.strVerify($(this));
                    return false;
                });
                $("._repeatPassword").on('blur', function(event) {
                    event.preventDefault();
                    login.strVerify($(this));
                    return false;
                });
                $yanzhengma.on('blur', function(event) {
                    event.preventDefault();
                    login.checkCode($(this));
                    return false;
                });
                $phoneyanzhengma.on('blur', function(event) {
                    event.preventDefault();
                    login.verify($(this));
                    return false;
                });
                $("._ajaxSubmit").on('click', function(event) {
                    event.preventDefault();
                    login.ajaxSubmit($(this));
                    return false;
                });
            },
            _ya: function(o) {
                if (login.phoneSend(o)) {
                    if (flaghave != "1") {
                        login._daojishi();
                    }
                } else {
                    flag4 = 1;
                }
            },
         checkCode:  function () {

            var inputCode = document.getElementById("jpgVerify").value.toUpperCase();
            var codeToUp = code.toUpperCase();
            if (inputCode.length = 0) {
                $("#jpgVerifys").html("验证码不能为空").css("color", "red");
            } else if (inputCode != codeToUp) {
                $("#jpgVerifys").html("验证码输入错误").css("color", "red");
            } else {
                $("#jpgVerifys").html("验证码输入正确").css("color", "green");
                flagJPG = 1;
            }
        },
            phoneYz: function() { // 手机号验证
                var utel = $("#phone");
                var str = utel.val();
                var regPartton = /^1[3-9]\d{9}$/;
                if (str.length > 11) {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:#ff7800>手机号格式不正确</span>");
                    flag = 1;
                    return false;
                }
                if (!str || str == null) {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:#ff7800>手机号不可为空</span>");
                    flag = 1;
                    return false;
                } else if (!regPartton.test(str)) {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:#ff7800>手机号格式不正确</span>");
                    flag = 1;
                    return false;
                } else {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:green>手机号格式正确</span>");
                    flag = 0;
                    return true;
                }
            },
            phoneSend: function(o) {
                if(flagJPG==0){
                    return false;
                }
                if (!login.phoneYz()) {
                    return false;
                }
                if (flag == "1") {
                    return false;
                }

                var isSuccess = false;
                $.ajax({
                    type: "post", //请求方式
                    dataType: "json",
                    url:"/user/check", //发送请求地址
                    async: false,
                    data: { //发送给数据库的数据
                        phone: $("#phone").val(),
                    },
                    //请求成功后的回调函数有两个参数
                    success: function(data) {
                        flag4 = 1;
                        if (data['msg'] == "1") { //新号码
                            wait = 300;
                            flaghave = 1;
                            $phoneMsg.text("");
                            $phoneMsg.html("<span style=color:#ff7800>该手机号码已经注册</span>");
                        } else if (data['msg'] == "3") {
                            wait = 300;
                            flaghave = 1;
                            $phoneMsg.text("");
                            $phoneMsg.html("<span style=color:#ff7800>发送手机号发生错误,请刷新重试</span>");
                        } else if (data['msg'] == "4") {
                            wait = 300;
                            flaghave = 1;
                            $phoneMsg.text("");
                            $phoneMsg.html("<span style=color:#ff7800>一分钟之内只能发送一次验证码</span>");
                        } else {
                            flag4 = 0;
                            isSuccess = true;
                        }
                    },
                    error: function(data, textStatus) {
                        flag4 = 1;
                    }
                });
                if (isSuccess) {
                    login._changetCapther();
                    o.val("重新发送(" + wait + ")");
                    wait--;
                    return true;
                } else {
                    return false;
                }
            },
         checkSecurity: function(vr) {
             var byName = vr.data('_id');
             var ids = '#' + byName;
             $.ajax({
                    type: "post", //请求方式
                    dataType: "json",
                    url:"/user/verifyCode", //发送请求地址
                    data: { //发送给数据库的数据
                        verifyCode: $("#phonVerify").val(),
                    },
                    //请求成功后的回调函数有两个参数
                    success: function(data) {
                        $("phonVerifys").text("");
                        if (data['msg'] == "1") {
                            $(".infomation").css("color", "green");
                            $(".infomation").html("验证成功");
                            flag1 = true;

                        } else {
                            $(".infomation").css("color", "yellow");
                            $(".infomation").html("验证失败");
                            flag1 = false;

                        }
                    },
                    error: function(data, textStatus) {

                    }
                });
            },
            strVerify: function(event) {
                var strName = event.attr('id');
                var strVal = event.val();
                var ids = '#' + strName + 'Alt';
                //验证用户名
                if (strName == 'userName') {
                    if (strVal == null || strVal == '') {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>用户名不能为空</span>");
                        return false;
                    }
                    if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,20})$/.test(strVal)) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>用户名只能为以字母开头,英文,数字,下划线和减号 6-20位组成</span>");
                        return false;
                    } else if (strVal.length < 6 || strVal.length > 20) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>用户名小于6位或者大于24位</span>");
                        return false;
                    } else {
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            url: "/user/verifyName", //发送请求地址
                            data: {

                                userName: strVal
                        },
                            //请求成功后的回调函数有两个参数
                            success: function(data) {
                                var msg1 = data['msg']
                                if (msg1=='1') {
                                    $(ids).text("");
                                    $(ids).append("<span style=color:green>填入信息可用</span>")
                                } else {
                                    $(ids).text("");
                                    $(ids).append("<span style=color:#ff7800>用户名已存在</span>")
                                }
                            }
                        });
                    }
                } else
                //验证密码
                if (strName == 'password') {
                    if (strVal == null || strVal == '') {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>密码不能为空</span>");
                    }
                    if (strVal.length < 6 || strVal.length > 24) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>密码小于6位或者大于24位</span>");
                    }
                    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(strVal)) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>密码必须是由6-21字母和数字组合</span>");
                    } else {
                        $(ids).text("");
                        $(ids).append("<span style=color:green>填入信息可用</span>");
                    }
                }
                //重复密码
                if (strName == 'repeatPassword') {
                    if ($("#repeatPassword").val() != $("#password").val()) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>两次输入密码不一样</span>");
                    } else {
                        $(ids).text("");
                        $(ids).append("<span style=color:green>密码输入一致</span>");
                    }
                }
                //结束
            },
         /*   verify: function(vr) {
                var byName = vr.attr("id");
                var ids = '#' + byName;
                $.ajax({
                    type: "post", //请求方式
                    dataType: "json",
                    cache: false,
                    async: false,
                    url: "/user/verifyCode", //发送请求地址
                     ++
                    data: { //发送给数据库的数据
                        verifyCode: $(ids).val(),
                    },
                    //请求成功后的回调函数有两个参数
                    success: function(data) {
                        $(ids + "s").text("");
                        if (data.msg == "1") {
                            $(ids + "s").append("<span style=color:green>验证成功</span>");
                            flag3 = 0;
                            if (byName == "phonVerify") {
                                verify1 = "1";
                            } else {
                                verify2 = "1";
                            }
                        } else {
                            $(ids + "s").append("<span style=color:#ff7800>验证失败</span>");
                            flag3 = 1;
                            if (byName == "phonVerify") {
                                verify1 = "2";
                            } else {
                                verify2 = "2";
                            }
                        }
                    },
                    error: function(data, textStatus) {
                        alsert(textStatus);
                    }
                });
            },*/
            ajaxSubmit: function() {
                var selectedItems = new Array();
                $("input[name='protocol']:checked").each(function() {
                    selectedItems.push($(this).val());
                });
                var pattern = /^[a-zA-Z]([-_a-zA-Z0-9]{5,20})$/;
                var pattern2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

                if ($('#userName').val() == null || $('#userName').val() == '') {
                    $('#userNameAlt').text("");
                    $('#userNameAlt').append("<span style=color:#ff7800>用户名不能为空</span>");
                    return false;
                }else if (!pattern.test($('#userName').val())) {
                    $('#userNameAlt').text("");
                    $('#userNameAlt').append("<span style=color:#ff7800>用户名只能为以字母开头,字母、数字下划线组成</span>");
                    return false;
                }  else if ($('#password').val() == null || $('#password').val() == '') {
                    $('#passwordAlt').text("");
                    $('#passwordAlt').append("<span style=color:#ff7800>密码不能为空</span>");
                    return false;
                } else if ($('#password').val().length < 6 || $('#password').val().length > 24) {
                    $('#passwordAlt').text("");
                    $('#passwordAlt').append("<span style=color:#ff7800>密码小于6位或者大于24位</span>");
                    return false;
                } else if (!pattern2.test($('#password').val())) {
                    $('#passwordAlt').text("");
                    $('#passwordAlt').append("<span style=color:#ff7800>密码必须是数字和字符组合</span>");
                    return false;
                } else if ($("#repeatPassword").val() != $("#password").val()) {
                    $('#repeatPasswordAlt').text("");
                    $('#repeatPasswordAlt').append("<span style=color:#ff7800>两次密码输入不一致</span>");
                    return false;
                } else if (selectedItems.length == 0) {
                    $('#protocolAlt').text("");
                    $('#protocolAlt').append("<span style=color:#ff7800>请点击投贷宝注册协议</span>");
                    return false;
                } else if (!flag1) {
                    $("#phonVerifys").html("<span style=color:#ff7800>验证失败</span>");
                    return false;
                } else if (!invist_flag && $invist.val() != "") {
                    $invist_msg.css("color", "#ff7800");
                    $invist_msg.html("推荐人不存在!");
                    return false;
                } else {
                    if (subFlag == "1") {
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            async: false,
                            cache: false,
                            url: "/user/verify", //发送请求地址
                            data: {
                                "userName": $('#userName').val(),
                                "password": $('#password').val(),
                                "telephone": $("#phone").val(),
                                "refereeName": $(".input1_invist").val()
                            },
                            //请求成功后的回调函数有两个参数
                            success: function (data) {
                                if (data['msg']== "1") {
                                    window.location = "/goto/register1";}
                                else if (data['msg']=="2"){
                                    alert("用户名已经被注册");
                                }
                                else if (data['msg']=="3"){
                                    alert("注册失败");
                                }
                            },
                            error:function(){
                                alert("注册失败");
                            }

                        });
                        subFlag = "2";
                    }
                }
            },
            _daojishi: function() {
                login._setti(_t);
            },
            _setti: function(i) {
                setTimeout(function() {
                    if (i == 0) {
                        $getKey.html("获取验证码");
                        flag4 = 1;
                    } else {
                        $getKey.html("重新发送(" + i + ")");
                        login._setti(parseInt(i - 1));
                    }
                }, 1000);
            },
            validateInvist: function() {
                $.ajax({
                    url: "/user/findref",
                    type: 'post',
                    dataType: 'json',
                    data: {
                        i_n: $invist.val()
                    },
                    success:function(data) {
                        if (data['msg'] == "1") {
                            $invist_msg.css("color", "green");
                            $invist_msg.html("推荐人正确");
                            invist_flag = true;
                        } else {
                            $invist_msg.css("color", "#ff7800");
                            $invist_msg.html("推荐人不存在!");
                            invist_flag = false;
                        }
                    },
                    error: function() {
                        alert("fail");
                    }
                });
            },
            _changetCapther: function() {
                $changeCapcherButton.trigger('click');
                flag3 = 1;
                return false;
            }
        };
        login.init();
    });
})(jQuery)