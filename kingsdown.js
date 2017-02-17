// ie 콘솔 에러
var alertFallback = true;
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    if (alertFallback) {
        console.log = function(msg) {
            //            alert(msg);
        };
    } else {
        console.log = function() {};
    }
}

// 웹 모바일 구분
var strBrowser = "";
var userAgent = navigator.userAgent;

function checkBrowser() {
    if (userAgent.indexOf("Mobile") > 0) {
        return "mobile";

    } else if (userAgent.indexOf("MSIE") > 0) {
        var msIndex = userAgent.indexOf("MSIE") + 5;

        for (var i = 6; i < 11; i++) {
            var target = i + "";
            if (userAgent.indexOf(target, msIndex) == msIndex) return target;
        }
    } else {
        return "else";
    }
    return undefined;
}
if (checkBrowser() == "mobile") {
    strBrowser = "m";
} else {
    strBrowser = "w";
}

var snbNum = getHttpParam("sub");

function openWindow(url) {
    window.location = url;
}

function getHttpParam(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null) {
        return "";
    } else {
        return results[1];
    }

    console.log(results);
}

var NS = (function(NS, $, undefined) {

    var btnGnb = $(".btn_gnb");
    var gnbMask = $(".gnb_mask");
    var gnbBoxWrap = $(".gnb_box_wrap");
    var gnbWrap = $(".gnb_wrap");
    var gnbList = gnbWrap.children("li");
    NS.gnbSet = function() {
        btnGnb.on('click', NS.gnbHandler);
    };

    NS.gnbHandler = function(e) {
        e.preventDefault();
        if (!$(btnGnb).hasClass("on")) {
            scrollFlag = false;
            gnbFlag = false;
            gnbOpen();
        } else {
            scrollFlag = true;
            gnbFlag = true;
            gnbClose();
        }
    };

    function gnbOpen() {
        $(btnGnb).addClass("on");
        $(gnbMask).fadeTo(300, 0.9);
        $(gnbBoxWrap).css({
            display: "table"
        });
        $("html, body").css({
            overflowY: "hidden"
        });
        for (var i = 0, len = gnbList.length; i < len; i++) {
            $(gnbList[i]).stop().delay(100 * i).animate({
                opacity: "1"
            }, 600);
        }
    }

    function gnbClose() {
        $(btnGnb).removeClass("on");
        $(gnbMask).fadeOut(300);
        $(gnbBoxWrap).css({
            display: "none"
        });
        $("html, body").css({
            overflowY: ""
        });
        for (var i = 0, len = gnbList.length; i < len; i++) {
            $(gnbList[i]).stop().delay(100 * i).animate({
                opacity: "0"
            }, 0);
        }
    }

    return NS; //리턴을 해야함

})(window.NS || {}, jQuery); //객체 없으면 생성
NS.gnbSet();






// 시작시작

(function($, window, document, undefined) {

    if (!snbNum) {
        idx = 0;
    } else {
        idx = Number(snbNum);
    }

    var mainNum = 0;
    var endNum = 60;
    var arrImage = new Array();
    var loadingChk = false;
    var upDownChk = true;
    this.scrollFlag = true;
    this.gnbFlag = true;
    this.setFlag = true;
    var loadingFlag = true;
    var speed = 800;
    var conHeight = [];

    $.fn.scrollSet = function() {
        var slideBox = $(this); // $(".slide_wrap")
        var conPaging = $(".con_paging").children("li"); //페이저 pager

        if (setFlag) {

            //페이지 설정
            for (var i = 0, len = slideBox.length; i < len; i++) {
                if (idx == i) {
                    //현재 페이지 보여주기
                    $(slideBox[i]).find(".left_slide").css({
                        top: 0
                    });
                    $(slideBox[i]).find(".right_slide").css({
                        top: 0
                    });
                    $(conPaging[i]).addClass("on");
                } else if (idx > i) {
                    //윗 페이지 숨기기
                    $(slideBox[i]).find(".left_slide").css({
                        top: 100 + "%"
                    });
                    $(slideBox[i]).find(".right_slide").css({
                        top: -100 + "%"
                    });
                } else {
                    //아래 페이지 숨기기
                    $(slideBox[i]).find(".left_slide").css({
                        top: -100 + "%"
                    });
                    $(slideBox[i]).find(".right_slide").css({
                        top: 100 + "%"
                    });
                }
            }

            $(".con_paging").css({
                marginTop: -($(".con_paging").height() / 2)
            }); //페이저 위치 중앙정렬

            // $(slideBox) === $(".slide_wrap")[0]
            // 섹션이 1개일때의 배경 고정
            if (0 === $(".left_slide").length - 1) {
                $(slideBox).find(".left_slide").css({
                    display: "",
                    top: ""
                });
            }

            $(slideBox).find(".left_slide").css({
                display: ""
            });
            $(slideBox).find(".right_slide").css({
                display: ""
            });

            //
            // if ($("div").hasClass("kingdw_story")) {
            //     for (var i = 0, len = slideBox.length; i < len; i++) {
            //         if (idx >= i) {
            //             $(".story_con_wrap").eq(i).children(".history_year_img").find("img").css({
            //                 marginTop: 0
            //             });
            //             $(".story_con_wrap").eq(i).children(".history_year_num").find("img").css({
            //                 marginTop: 0
            //             });
            //             $(".story_con_wrap").eq(i).children(".history_year_txt").find("span").css({
            //                 marginTop: 0
            //             });
            //         } else {
            //             $(".story_con_wrap").eq(i).children(".history_year_img").find("img").css({
            //                 marginTop: 300
            //             });
            //             $(".story_con_wrap").eq(i).children(".history_year_num").find("img").css({
            //                 marginTop: 300
            //             });
            //             $(".story_con_wrap").eq(i).children(".history_year_txt").find("span").css({
            //                 marginTop: 300
            //             });
            //         }
            //     }
            // }

        } else {

            // if (0 != $(".left_slide").length - 1) {
            //     for (var i = 0, len = slideBox.length; i < len; i++) {
            //         if (idx == i) {
            //             $(slideBox[i]).find(".left_slide").css({
            //                 display: "block"
            //             });
            //             $(slideBox[i]).find(".right_slide").css({
            //                 display: "block"
            //             });
            //         } else {
            //             $(slideBox[i]).find(".left_slide").css({
            //                 display: "none"
            //             });
            //             $(slideBox[i]).find(".right_slide").css({
            //                 display: "none"
            //             });
            //         }
            //     }
            // }
            //
            // $(slideBox).find(".left_slide").css({
            //     top: ""
            // });
            // $(slideBox).find(".right_slide").css({
            //     top: ""
            // });
            //
            // if ($("div").hasClass("kingdw_story")) {
            //     $(slideBox).find(".left_slide").css({
            //         display: "block"
            //     });
            //     $(slideBox).find(".right_slide").css({
            //         display: "block"
            //     });
            //     $(".story_con_wrap").children(".history_year_img").find("img").css({
            //         marginTop: ""
            //     });
            //     $(".story_con_wrap").children(".history_year_num").find("img").css({
            //         marginTop: ""
            //     });
            //     $(".story_con_wrap").children(".history_year_txt").find("span").css({
            //         marginTop: ""
            //     });
            // }

        }

        $.scrollPrev = function() {
            /* 00 */
            if (idx > 0) {
                if (idx == 1) {
                    console.log("끗");
                }
                $(slideBox[idx]).find(".left_slide").animate({
                    top: -100 + "%"
                }, speed, "easeInSine");

                $(slideBox[idx]).find(".right_slide").animate({
                    top: 100 + "%"
                }, speed, "easeInSine");

                // if ($("div").hasClass("kingdw_main")) {
                //     if (loadingChk == true) {
                //         addEnterFrame();
                //         upDownChk = false;
                //     }
                // }
                // if ($("div").hasClass("kingdw_story")) {
                //     $(slideBox[idx - 1]).find(".right_slide").animate({
                //         top: 0
                //     }, speed, "easeOutCirc", function() {
                //         $(".story_con_wrap").eq(idx + 1).children(".history_year_img").find("img").css({
                //             marginTop: 300
                //         });
                //         $(".story_con_wrap").eq(idx + 1).children(".history_year_num").find("img").css({
                //             marginTop: 300
                //         });
                //         $(".story_con_wrap").eq(idx + 1).children(".history_year_txt").find("span").css({
                //             marginTop: 300
                //         });
                //     });
                // } else {
                //     $(slideBox[idx - 1]).find(".left_slide").animate({
                //         top: 0
                //     }, speed, "easeInSine");
                //     $(slideBox[idx - 1]).find(".right_slide").animate({
                //         top: 0
                //     }, speed, "easeInSine");
                // }

                idx = idx - 1;
                $(conPaging).removeClass("on");
                $(conPaging[idx]).addClass("on");
                $.subContentHeight();
            }
        };

        $.scrollNext = function() {
            if (idx < slideBox.length - 1) {
                idx = idx + 1;
                if (idx == slideBox.length - 1) {
                    console.log("끗");
                }
                if (idx != $(".left_slide").length) {
                    $(slideBox[idx]).find(".left_slide").animate({
                        top: 0
                    }, speed, "easeOutSine");
                    $(slideBox[idx - 1]).find(".left_slide").animate({
                        top: 100 + "%"
                    }, speed, "easeOutSine");
                }
                $(slideBox[idx]).find(".right_slide").animate({
                    top: 0
                }, speed, "easeOutSine");
                $(conPaging).removeClass("on");
                $(conPaging[idx]).addClass("on");
                if ($("div").hasClass("kingdw_main")) {
                    if (loadingChk === true) {
                        addEnterFrame();
                        upDownChk = true;
                    }
                }
                if ($("div").hasClass("kingdw_story")) {
                    $(slideBox[idx - 1]).find(".right_slide").animate({
                        top: -100 + "%"
                    }, speed, "easeInCirc");
                    $(".story_con_wrap").eq(idx).children(".history_year_img").find("img").delay(100).animate({
                        marginTop: 0
                    }, 1000, "easeOutBack");
                    $(".story_con_wrap").eq(idx).children(".history_year_num").find("img").delay(200).animate({
                        marginTop: 0
                    }, 1000, "easeOutBack");
                    $(".story_con_wrap").eq(idx).children(".history_year_txt").find("span").delay(300).animate({
                        marginTop: 0
                    }, 1000, "easeOutBack");
                } else {
                    $(slideBox[idx - 1]).find(".right_slide").animate({
                        top: -100 + "%"
                    }, speed, "easeOutSine");
                }
                $.subContentHeight();
            }
        };
        /* [end]: 00 */

        // $.subContentHeight = function() {
        //     for (var i = 0, len = slideBox.length; i < len; i++) {
        //         if (idx == i) {
        //             if ($(window).height() > $(slideBox[i]).find(".sub_contents_wrap").innerHeight()) {
        //                 $("#wrap").css({
        //                     height: $(window).height()
        //                 });
        //             } else {
        //                 $("#wrap").css({
        //                     height: conHeight[i]
        //                 });
        //             }
        //         }
        //     }
        // }
        //
        // $.subContentHeightSet = function() {
        //     for (var k = 0, len = slideBox.length; k < len; k++) {
        //         var posH = $(slideBox[k]).find(".sub_contents_wrap").innerHeight();
        //         if (idx == k) {
        //             if ($(window).height() > posH) {
        //                 $("#wrap").css({
        //                     height: $(window).height()
        //                 });
        //             } else {
        //                 $("#wrap").css({
        //                     height: posH
        //                 });
        //             }
        //         }
        //         conHeight[k] = posH;
        //     }
        // }

    };

    /* scrollSet */

    function mouseWheelControl() {
        var isScrolling = false;
        $("html, body").on("mousewheel", function(e, delta) {
            //			console.log(isScrolling)
            //		if ($(":animated").length) { return false; };
            if (!isScrolling) {
                isScrolling = true;
                if (scrollFlag && gnbFlag) {
                    if ($("body").prop("scrollHeight") != $("body").height()) {
                        if (delta > 0) {
                            if ($(window).scrollTop() === 0) {
                                $.scrollPrev();
                            }
                        } else {
                            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                                $.scrollNext();
                            }
                        }
                    } else {
                        if (delta > 0) {
                            $.scrollPrev();
                        } else {
                            $.scrollNext();
                        }
                    }
                }
                e.preventDefault();
                setTimeout(function() {
                    isScrolling = false;
                }, 500);
            }
        });
    }

    function subResizeCheck() {
        if (loadingFlag === true) {
            $("#wrap").css({
                visibility: "visible"
            }).hide().fadeIn(800, function() {
                $("#loadingBarWrap").css({
                    display: "none"
                });
            });
            loadingFlag = false;
        }
        var resizeTimer;
        $(window).resize(function() {
            var winResizeW = window.innerWidth;
            var winResizeH = window.innerHeight;
            if (checkBrowser() <= 8) {
                winResizeW = $(window).width();
                winResizeH = $(window).height();
            }
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function() {
                resizeTimer = null;
                if (strBrowser == "w") {
                    if (winResizeW > 1041) {
                        scrollFlag = true;
                        setFlag = true;
                        $(".slide_wrap").scrollSet();
                        if ($("div").hasClass("kingdw_line") || $("div").hasClass("kingdw_institute") || $("div").hasClass("kingsdw_match") || $("div").hasClass("kingsdw_contact")) {
                            resizeRatio();
                        }
                        if ($("div").hasClass("get_con")) {
                            $.subContentHeightSet();
                        } else {
                            $("#wrap").css({
                                height: 100 + "%"
                            });
                        }
                    } else {
                        scrollFlag = false;
                        setFlag = false;
                        $(".slide_wrap").scrollSet();
                        if ($("div").hasClass("kingdw_line") || $("div").hasClass("kingdw_institute") || $("div").hasClass("kingsdw_match") || $("div").hasClass("kingsdw_contact")) {
                            ratioReset();
                        }
                        $("#wrap").css({
                            height: ""
                        });
                    }
                } else {
                    scrollFlag = false;
                    setFlag = false;
                    $(".slide_wrap").scrollSet();
                    if ($("div").hasClass("kingdw_line") || $("div").hasClass("kingdw_institute") || $("div").hasClass("kingsdw_match") || $("div").hasClass("kingsdw_contact")) {
                        ratioReset();
                    }
                    $("#wrap").css({
                        height: ""
                    });
                }
            }, 0);
        }).resize();
    }

    function resizeRatio() {
        var imgW = 1800;
        var imgH = 1200;
        var wrapW = $(".sub_visual_img").width();
        var wrapH = $(".sub_visual_img").height();
        var widthratio = wrapW / imgW;
        var heightratio = wrapH / imgH;
        var widthdiff = heightratio * imgW;
        var heightdiff = widthratio * imgH;
        $(".ratio_img>li").css({
            marginLeft: (wrapW / 2) - widthdiff / 2,
            marginTop: 0,
            width: widthdiff,
            height: wrapH
        });
        if (wrapW > $(".ratio_img>li").width()) {
            $(".ratio_img>li").css({
                marginLeft: 0,
                marginTop: (wrapH / 2) - heightdiff / 2,
                width: wrapW,
                height: heightdiff
            });
        }
    }

    function ratioReset() {
        $(".ratio_img>li").css({
            marginLeft: "",
            marginTop: "",
            width: "",
            height: ""
        });
    }

    var countNum = 0;
    var totalNum = $('body img').length;

    $('body img').imgpreload({
        each: function() {
            countNum = countNum + 1;
            percentage = Math.floor(countNum / totalNum * 100);
            //			console.log(percentage+"%")
            console.log($(this).data("loaded"));
            imageLoader();
            $(".loading_line").animate({
                height: percentage + "%"
            }, 2);
        },
        all: function() {
            $(".line_left2").animate({
                top: 0
            }, 400, function() {
                $(".line_top2").animate({
                    left: 0
                }, 400, function() {
                    $(".line_right2").animate({
                        top: 0
                    }, 400, function() {
                        $(".line_bottom2").animate({
                            right: 0
                        }, 400, function() {
                            $("#loadingBarWrap").animate({
                                opacity: "0"
                            }, 500, function() {
                                setTimeout(function() {
                                    subResizeCheck();
                                    mouseWheelControl();
                                    loadingChk = true;
                                    if ($("div").hasClass("kingdw_main")) {
                                        NS.mainVisualMotion();
                                    } else if ($("div").hasClass("kingdw_story")) {
                                        NS.storyMain();
                                    } else if ($("div").hasClass("kingdw_institute")) {
                                        NS.instituteTabMenu();
                                    } else if ($("div").hasClass("kingsdw_match")) {
                                        NS.matchVisualMotion();
                                    } else if ($("div").hasClass("kingsdw_contact")) {
                                        NS.contactVisualMotion();
                                    } else if ($("div").hasClass("kingsdw_news")) {
                                        NS.kingsDownNews();
                                    }
                                }, 100);
                                setTimeout(function() {
                                    arrowlMotion();
                                }, 1000);
                            });
                        });
                    });
                });
            });
        }
    });

    var updownCount = 0;

    function arrowlMotion() {
        $(".scroll_arrow").animate({
            bottom: 20
        }, 1200, "easeOutBack", function() {
            arrowlUpDown();
        });

    }

    function arrowlUpDown() {
        $(".scroll_arrow_up").animate({
            top: 20
        }, 500).animate({
            top: 15
        }, 500, function() {
            updownTimer = setTimeout(function() {
                if (updownCount != 2) {
                    updownCount = updownCount + 1;
                    arrowlUpDown();
                } else {
                    clearTimeout(updownTimer);
                }
            }, 0);
        });
        $(".scroll_arrow_down").animate({
            bottom: 20
        }, 500).animate({
            bottom: 15
        }, 500);
    }




    $.fn.productGallery = function(idxNum) {
        var touch_start_y = 0;
        var touch_start_x = 0;
        var save_x = 0;
        var save_y = 0;
        var move_dx = 0;
        var imgNum;
        var tabId = $(this);
        var btnPrev = tabId.children(".line_prev");
        var btnNext = tabId.children(".line_next");
        var galleryWrap = tabId.children(".ratio_img");
        var galleryCon = galleryWrap.children("li");
        var pagingWrap = tabId.children(".pro_paging_m");
        var btnPaging = pagingWrap.children("li");
        var list_Width = galleryWrap.width();

        galleryWrap.on("touchstart", handleTouchStart);
        galleryWrap.on("touchmove", handleTouchMove);
        galleryWrap.on("touchend", handleTouchEnd);

        $(btnPrev).on("click", function(e) {
            e.preventDefault();
            galleryPrev();
        });

        $(btnNext).on("click", function(e) {
            e.preventDefault();
            galleryNext();
        });

        function gallerySet() {
            $(galleryCon).css({
                display: "none"
            });
            $(galleryCon[idxNum]).css({
                display: "block"
            });
            $(btnPaging).removeClass("on");
            $(btnPaging[idxNum]).addClass("on");
            imgNum = idxNum;
        };

        function handleTouchStart(evt) {
            if (evt.type === 'touchstart' && evt.originalEvent.touches.length === 1 || evt.type == "dragstart") {
                touch_start_x = evt.pageX || evt.originalEvent.touches[0].pageX;
                touch_start_y = evt.pageY || evt.originalEvent.touches[0].pageY;
                console.log("start");
            }
        }

        function handleTouchMove(evt) {
            var drag_dist = 0;
            var scroll_dist = 0;
            if (evt.type === 'touchmove' && evt.originalEvent.touches.length === 1 || evt.type == "drag") {
                drag_dist = (evt.pageX || evt.originalEvent.touches[0].pageX) - touch_start_x;
                scroll_dist = (evt.pageY || evt.originalEvent.touches[0].pageY) - touch_start_y;
                move_dx = (drag_dist / list_Width) * 100;
                if (Math.abs(drag_dist) > Math.abs(scroll_dist)) {
                    evt.preventDefault();
                }
            }
        };

        function handleTouchEnd(evt) {
            if (evt.type === 'touchend' && evt.originalEvent.touches.length === 0 || evt.type == "dragend") {
                if (Math.abs(move_dx) > 20) {
                    if (move_dx > 0) {
                        galleryPrev();
                    } else {
                        galleryNext();
                    }
                } else {
                    //					console.log("더끌어")
                }
                touch_start_y = 0;
                touch_start_x = 0;
                move_x = 0;
                move_y = 0;
                move_dx = 0;

                evt.preventDefault();
            }
        };

        function swipeNext() {
            var galleryWidth = galleryWrap.width();
        }

        function galleryNext() {
            if (imgNum < galleryCon.length - 1) {
                imgNum = imgNum + 1;
            } else if (imgNum == galleryCon.length - 1) {
                imgNum = 0;
            }
            if (scrollFlag) {
                $(galleryCon).stop().fadeOut(800);
                $(galleryCon[imgNum]).stop().fadeIn(800);
            } else {
                $(galleryCon).css({
                    display: "none"
                });
                $(galleryCon[imgNum]).css({
                    display: "block"
                });
                $(btnPaging).removeClass("on");
                $(btnPaging[imgNum]).addClass("on");
            }
        }

        function galleryPrev() {
            if (imgNum > 0) {
                imgNum = imgNum - 1;
            } else if (imgNum === 0) {
                imgNum = galleryCon.length - 1;
            }
            if (scrollFlag) {
                $(galleryCon).stop().fadeOut(800);
                $(galleryCon[imgNum]).stop().fadeIn(800);
            } else {
                $(galleryCon).css({
                    display: "none"
                });
                $(galleryCon[imgNum]).css({
                    display: "block"
                });
                $(btnPaging).removeClass("on");
                $(btnPaging[imgNum]).addClass("on");
            }
        }

        gallerySet();
    };

    function imageLoader() {
        var lNum = 0;
        for (var i = 0; i < endNum; i++) {
            arrImage[i] = new Image();
            $(arrImage[i]).load(function() {
                lNum = lNum + 1;
                if (lNum == endNum) {
                    loadingChk = true;
                }
            });
            if (10 > i) {
                arrImage[i].src = "../images/main/bed_0000" + i + ".jpg";
            } else if (100 > i) {
                arrImage[i].src = "../images/main/bed_000" + i + ".jpg";
            }
        }
    };

    function addEnterFrame() {
        imgTimer = setTimeout(function() {
            if (upDownChk == true) {
                mainNum = mainNum + 1;
                clearTimeout(imgTimer);
            } else {
                clearTimeout(imgTimer);
                mainNum = mainNum - 1;
            }
            var imgSRc = $(arrImage[mainNum]).attr("src");
            $(".main_visual_img>img").attr("src", imgSRc);
            addEnterFrame();
            if (imgSRc == undefined) {
                clearTimeout(imgTimer);
            }
            //			$(".main_visual_img>img").css({display:"none"});
            //			$(".main_visual_img>img").eq(mainNum).css({display:"block"});
            //			addEnterFrame();
            //			if (mainNum >= $(".main_visual_img>img").length-1){
            //				clearTimeout(imgTimer);
            //			}else if(mainNum==0){
            //				clearTimeout(imgTimer);
            //			}
        }, 30);
    }

})(jQuery, window, document);