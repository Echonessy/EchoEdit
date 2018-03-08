/**
 * Created by Echonessy on 2018/3/6.
 */


window.EchoEdit = (function () {
    var InitEdit = function () {};
    InitEdit.prototype = {
        //初始化
        Init:function () {
            this.SelectDom = $('.SelectList');
            this.SelectBox = $('.SelectBox');
            this.Select = $('.Select');
            this.SelectColor = $('.SelectColor');
            this.ColorBox = $('.ColorBox');
            this.SelectLi = $('.Select>li');
            this.MainTextIn = $('#MainTextIn');
            this.FontValue = $('#FontValue');//字号
            this.ColorBtn = $('#ColorBtn');//字体颜色
            this.ExamColor = $('#ExamColor');//字体颜色示例
            this.FontFaValue = $('#FontFaValue');//字体
            this.DefultColor = '#000000';
            this.OldStyle = ''
            this.Golbal = true;
            this.RangText = '';
            this.Code = false;
            this.InitFun()
        },
        //初始化函数
        InitFun:function () {
            this.SelectEvt(); // 下拉选择事件
            this.CreatColor(); // 创建画板
            this.RangeEvt(); // 选择事件
            this.MainEvt(); // 主要菜单事件
            this.LoadFont(0); //初始化字体库
            this.LoadFont(1); // 初始化字体大小
            this.LoadFont(2);// 初始化字体颜色
        },
        //封装字体更改
        LoadFont :function (Type) {
            var that = this;
            Type = Type.toString();
            switch (Type) {
                case '0' :that.UpdataFF();break;
                case '1' :that.UpdataSize();break;
                case '2' :that.UpdataColor();break;
                case '3' :that.UpdataWeight();break;
                case '4' :that.UpdataItalic();break;
                case '5' :that.UpdataUnderline();break;
                case '6' :that.UpdataUrl();break;
                case '7' :that.UpdataUnUrl();break;
                case '8' :that.UpdataList();break;
                case '9' :that.UpdataUnList();break;
                case '10' :that.UpdataFontLeft();break;
                case '11' :that.UpdataFontCenter();break;
                case '12' :that.UpdataFontRight();break;
            };
            return false;
        },
        //构建字体颜色画板数据
        CreatColorArr:function () {
            var Arr = [
                ["#ffffff","#000000","#eeece1","#1f497d","#4f81bd",
                "#c0504d","#9bbb59","#8064a2","#4bacc6","#f79646", ],
                ["#f2f2f2","#7f7f7f","#ddd9c3","#c6d9f0","#dbe5f1",
                    "#f2dcdb","#ebf1dd","#e5e0ec","#dbeef3","#fdeada", ],
                ["#d8d8d8","#595959","#c4bd97","#8db3e2","#b8cce4",
                    "#e5b9b7","#d7e3bc","#ccc1d9","#b7dde8","#fbd5b5", ],
                ["#bfbfbf","#3f3f3f","#938953","#548dd4","#95b3d7",
                    "#d99694","#c3d69b","#b2a2c7","#92cddc","#fac08f", ],
                ["#a5a5a5","#262626","#494429","#17365d","#366092",
                    "#953734","#76923c","#5f497a","#31859b","#e36c09", ],
                ["#7f7f7f","#0c0c0c","#1d1b10","#0f243e","#244061",
                    "#632423","#4f6128","#3f3151","#205867","#974806", ],
                ["#c00000","#ff0000","#ffc000","#ffff00","#92d050",
                    "#00b050","#00b0f0","#0070c0","#002060","#7030a0", ]
            ];
            return Arr;
        },
        //创建字体颜色
        CreatColor:function () {
          var Data = this.CreatColorArr();
          var that = this;
          var Html = '';
          for(var i=0;i<Data.length;i++) {
              var DataIn = Data[i];
              if(i==Data.length-1) {
                  Html += '<p class="ColorTit">标准颜色</p>';
              }
              Html += '<ul class="ColorList">';
              for(var j=0;j<DataIn.length;j++) {
                  Html += '<li class="ColorLi" title="'+DataIn[j]+'"></li>';
              }
              Html += '</ul>';
          }
          $("#ColorMain").html(Html).find('.ColorList').eq(0).addClass('MainColor');
          that.LoadColorList();
          that.ChangeColor();
          that.HoverColor();
        },
        //渲染字体颜色列表
        LoadColorList:function () {
            var that = this;
            $('.ColorList>li').each(function(){
                $(this).css('background',$(this).attr('title'))
            });
        },
        //改变示例字体颜色
        ChangeColor:function () {
            $(".ExamColor").css('background',this.DefultColor)
            $(".HtmlColorInput").val(this.DefultColor)
        },
        //颜色板选择相关事件
        HoverColor:function () {
            var that = this ;
            $('.ColorLi').on('click',function (e) {
                that.stopBubble(e)
                that.DefultColor = $(this).attr('title');
                that.ChangeColor();
            })
            $('#ClearColor').on('click',function (e) {
                that.stopBubble(e)
                that.DefultColor = '#000000';
                that.ChangeColor();
            })

            $('#ChangeColor').on('click',function (e) {
                that.stopBubble(e);
                that.LoadFont(2);
                that.ChangeColor();
                $(this).parents('.ColorBox').slideUp(50);
            })
        },
        //点击事件集
        SelectEvt:function () {
            var that = this;
            $(document).on('click',function (e) {
                that.Select.slideUp(50);
            })
            this.SelectDom.on('click',function (e) {
                that.stopBubble(e)
                $(this).find('.Select').slideToggle(150);
            })
            this.SelectBox.on('click',function (e) {
                that.stopBubble(e)
                $(this).parents('li').siblings().find('.Select').slideUp(50);
            })
            this.SelectColor.on('click',function (e) {
                that.stopBubble(e)
                that.ColorBox.slideDown(150);
            })
            this.SelectLi.on('click',function (e) {
                that.stopBubble(e)
                var Value = $(this).attr('data-value');
                var Type = $(this).attr('type');
                var Data = $(this).html();
                $(this).parents('.Select').siblings('.SelectValue').attr('data-value',Value).html(Data);
                that.LoadFont(Type);
                $(this).parents('.Select').slideUp(50);
            })
        },
        //禁止右键，失去焦点重定向
        RangeEvt:function () {
            var that = this
            this.MainTextIn.on('contextmenu',function(evt){
                var evt=evt||window.event;
                if(evt&&evt.preventDefault)
                {
                    evt.preventDefault();
                }
                else {
                    window.event.returnValue=false;
                }
            });
            this.MainTextIn.on('blur',function () {
                $(this).focus();
                var NowTxt = '';
                try{
                    NowTxt = window.getSelection().toString();
                }catch(e){
                    NowTxt =  document.selection.createRange().text;
                }
                that.RangText = NowTxt;
                if(that.RangText.length == 0) {
                    that.Golbal = true;
                } else {
                    that.Golbal = false;
                }
            });
        },
        //更改字体库
        UpdataFF:function () {
            var that = this;
            if(this.Golbal){
                that.MainTextIn.css('font-family',that.FontFaValue.attr('data-value'))
                $('font').each(function(){
                    $(this).removeAttr('face');
                });
            } else {
                document.execCommand('FontName',true,that.FontFaValue.attr('data-value'));
            }
        },
        //更改字体大小
        UpdataSize:function () {
            var that = this;
            if(this.Golbal){
                that.MainTextIn.css('font-size',that.FontValue.attr('data-value')+'px')
                $('font').each(function(){
                    $(this).removeAttr('size');
                });
            } else {
                document.execCommand('FontSize',true,that.FontValue.attr('data-value')+'px');
            }
        },
        //更改字体颜色
        UpdataColor:function () {
            var that = this;
            if(this.Golbal){
                that.MainTextIn.css('color',that.DefultColor);
                $('font').each(function(){
                    $(this).removeAttr('color');
                });
                $('#CoIco').css('border-bottom-color',that.DefultColor)
            } else {
                document.execCommand('ForeColor',true,that.DefultColor);
                $('#CoIco').css('border-bottom-color',that.DefultColor);
            }

        },
        //更改字体加粗
        UpdataWeight:function () {
            var that = this;
            if(this.Golbal){
                if(that.MainTextIn.css('font-weight') == '400'||that.MainTextIn.css('font-weight') == 'normal') {
                    that.MainTextIn.css('font-weight','bold')
                } else {
                    that.MainTextIn.css('font-weight','normal')
                    $('b').each(function(){
                        $(this).css('font-weight','normal');
                    });
                }
            } else {
                document.execCommand('Bold',true,null);
            }

        },
        //更改字体倾斜
        UpdataItalic:function () {
            var that = this;
            if(this.Golbal){
                if(that.MainTextIn.css('font-style') == 'italic') {
                    that.MainTextIn.css('font-style','normal');
                    $('i').each(function(){
                        $(this).css('font-style','normal');
                    });
                } else {
                    that.MainTextIn.css('font-style','italic')
                }
            } else {
                document.execCommand('Italic','false',null);
            }

        },
        //下划线
        UpdataUnderline:function () {
            var that = this;
            if(this.Golbal){
                if(that.MainTextIn.css('text-decoration').indexOf('underline') !=-1 ) {
                    that.MainTextIn.css('text-decoration','none');
                    $('u').each(function(){
                        $(this).css('text-decoration','none');
                    });
                } else {
                    that.MainTextIn.css('text-decoration','underline')
                }
            } else {
                document.execCommand('Underline','false',null);
            }
        },
        //超链接
        UpdataUrl:function () {
            var that = this;
            if(this.Golbal){
                var Html = that.MainTextIn.html()
                var Node = '<a href="#" class="Golbal">'+Html+'</a>';
                that.MainTextIn.html(Node);
            } else {
                document.execCommand('CreateLink',false,null);
            }
        },
        //取消超链接
        UpdataUnUrl:function () {
            var that = this;
            if(this.Golbal){
                $('a').each(function(){
                    $(this).replaceWith($(this).html())
                });
            } else {
                document.execCommand('Unlink',false,null);
            }
        },
        //有序列表
        UpdataList:function () {
            document.execCommand('InsertOrderedList',false,null);
        },
        //无序列表
        UpdataUnList:function () {
            document.execCommand('InsertUnorderedList',false,null);
        },
        //左对齐
        UpdataFontLeft:function () {
            this.MainTextIn.css('text-align','left');
        },
        //中心对齐
        UpdataFontCenter:function () {
            this.MainTextIn.css('text-align','center');
        },
        //右对齐
        UpdataFontRight:function () {
            this.MainTextIn.css('text-align','right');
        },
        //全选
        UpdataFontAll:function () {
            document.execCommand('SelectAll',false,null);
        },
        //剪切
        CutTxt:function () {
            var NowTxt = '';
            try{
                NowTxt = window.getSelection().toString();

            }catch(e){
                NowTxt =  document.selection.createRange().text;
            }
            if(NowTxt.length>0) {
                document.execCommand('Cut',false,null);
                this.MsgEvt('已剪切');
            }
        },
        //复制
        CopyTxt:function () {
            var NowTxt = '';
            try{
                NowTxt = window.getSelection().toString();

            }catch(e){
                NowTxt =  document.selection.createRange().text;
            }
            if(NowTxt.length>0) {
                document.execCommand('Copy',false,null);
                this.MsgEvt('已复制')
            }
        },
        //打印
        PrintTxt:function () {
            document.execCommand('Print',false,null);
        },
        //清除格式
        ClearTxt:function () {
            var Before = this.MainTextIn.text();
            this.DefultColor = '#000000';
            this.FontValue.attr('data-value','12');
            this.LoadFont(0); //初始化字体库
            this.LoadFont(1); // 初始化字体大小
            this.LoadFont(2);// 初始化字体颜色
            this.MainTextIn.removeAttr('style')
            this.MainTextIn.html(Before);
        },
        //核心事件
        MainEvt:function () {
            var that = this;
            $("#FontBold").on('click',function () {that.LoadFont(3);});
            $("#FontItalic").on('click',function () {that.LoadFont(4);});
            $("#FontUnderline").on('click',function () {that.LoadFont(5);});
            $("#FontUrl").on('click',function () {that.LoadFont(6);});
            $("#FontUnUrl").on('click',function () {that.LoadFont(7);});
            $("#FontList").on('click',function () {that.LoadFont(8);});
            $("#FontUnList").on('click',function () {that.LoadFont(9);});
            $("#FontLeft").on('click',function () {that.LoadFont(10);});
            $("#FontCenter").on('click',function () {that.LoadFont(11);});
            $("#FontRight").on('click',function () {that.LoadFont(12);});
            $("#FontAll").on('click',function () {that.UpdataFontAll();});
            $("#CutBtn").on('click',function () {that.CutTxt();});
            $("#CopyBtn").on('click',function () {that.CopyTxt();});
            $("#PrintBtn").on('click',function () {that.PrintTxt();});
            $("#ClearBtn").on('click',function () {that.ClearTxt();});
            $("#FontCode").off('click');
            $("#FontCode").on('click',function () {
                if(!that.Code){
                    $(this).parents('li').siblings().find('.SelectBox').css('background','#ccc');
                    $(this).parents('li').siblings().find('.FadeOut').css({'display':'block','z-index':"999999"});
                    var Html = that.MainTextIn.html();
                    console.log(that.MainTextIn.attr('style'))
                    Html = '<div class="NewCode" style="'+that.MainTextIn.attr("style")+'">'+Html+'</div>';
                    that.MainTextIn.text(Html);
                    that.OldStyle = that.MainTextIn.attr('style')
                    that.MainTextIn.removeAttr('style')
                    that.Code= true;
                } else {
                    $(this).parents('li').siblings().find('.SelectBox').css('background','');
                    $(this).parents('li').siblings().find('.FadeOut').css({'display':'none','z-index':'0'});
                    var Html = that.MainTextIn.html();
                    Html=Html.replace(/\&lt;/g,'<');
                    Html=Html.replace(/\&gt;/g,'>');
                    Html=Html.replace(/\&quot;/g,'"');
                    Html=Html.replace(/\&amp;#39;/g,'´');
                    Html=Html.replace(/\&amp;nbsp;/g, "");
                    Html=Html.replace(/\&rsquo;/g,"'");
                    Html=Html.replace(/\&ldquo;/g,'"');
                    Html=Html.replace(/\&rdquo;/g,'"');
                    that.MainTextIn.attr('style',that.OldStyle)
                    that.MainTextIn.html(Html);
                    that.MainTextIn.html($('.NewCode').html());
                    that.Code= false;
                }
            });
            $("#MainTextIn").on('input',function () {
                var Num = $(this).html().length;
                var Hmlt = '当前字数:'+'<span style="font-size: 14px;">'+Num+'</span>'
                $('#CodeNum').html(Hmlt)
            });
        },

        //提示框
        MsgEvt:function (Msg) {
          var Time = null;
          $('#FadeMsg').html(Msg).fadeIn(150)
          if(Time) {clearTimeout(Time)}
          Time=setTimeout(function () {
              $('#FadeMsg').html(Msg).fadeOut(250)
          },1500)
        },
        //阻止冒泡
        stopBubble:function(evt) {
            var evt = evt||window.event;
            if (evt.stopPropagation) {
                evt.stopPropagation();
            }
            else {
                window.event.cancelBubble = true;
            }
        }
    }
    return InitEdit;
})()
