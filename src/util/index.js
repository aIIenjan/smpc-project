//获取cookie、
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

// 时间差
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime =new Date(startTime); //开始时间
    var eTime =new Date(endTime); //结束时间
    //作为除数的数字
    var timeType =1;
    switch (diffType) {
        case"second":
            timeType =1000;
        break;
        case"minute":
            timeType =1000*60;
        break;
        case"hour":
            timeType =1000*3600;
        break;
        case"day":
            timeType =1000*3600*24;
        break;
        default:
        break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}

// 当前时间
export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

// 获取当前是星期的第几天
export function getDay() {
    var now = new Date() //当前日期 
    var nowDayOfWeek = now.getDay() //今天本周的第几天 
    return nowDayOfWeek
}

// 计算星期几
export function Monday(n) {
    var now = new Date();
    var nowTime = now.getTime() ; 
    var day = now.getDay();
    var oneDayLong = 24*60*60*1000 ; 
    var date = nowTime + (n-day)*oneDayLong;
    var date = new Date(date);
    var seperator1 = "";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}

export function transdate(dateStr) {
    var newstr = dateStr.replace(/-/g,'/'); 
    var date =  new Date(newstr); 
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}

// 比较日期与当前时间差
export function dateComparate(date) {
    var timestamp1 = new Date(date), timestamp2 = new Date();
    var d = timestamp1.getTime() - timestamp2.getTime();
    return d;
}

// 比较日期与当前时间差
export function dateComparate1(date) {
    var timestamp1 = new Date(date), timestamp2 = new Date();
    var d = timestamp2.getTime() - timestamp1.getTime();
    return d;
}

// 比较日期时间差
export function ComparateDiff(date1,date2) {
    var timestamp1 = new Date(date1), timestamp2 = new Date(date2);
    var d = timestamp1.getTime() - timestamp2.getTime();
    return d;
}

// 百分比
export function percentNum(num, num2) { 
    return (Math.round(num / num2 * 10000) / 100.00 + "%")
}

//
export function dateCompa(date1,date2) {
    let year1 = date1.substr(0,4)
    let month1 = date1.substr(4,2)
    let day1 = date1.substr(6,2)
    let hour1 = date1.substr(8,2)
    let minute1 = date1.substr(10,2)
    let second1 = date1.substr(12,2)
    let d1 = year1+'-'+month1+'-'+day1+' '+hour1+':'+minute1+':'+second1

    let year2 = date2.substr(0,4)
    let month2 = date2.substr(4,2)
    let day2 = date2.substr(6,2)
    let hour2 = date2.substr(8,2)
    let minute2 = date2.substr(10,2)
    let second2 = date2.substr(12,2)
    let d2 = year2+'-'+month2+'-'+day2+' '+hour2+':'+minute2+':'+second2
    return ComparateDiff(d1,d2)
}

export function dateCompa1 (date) {
    let year = date.substr(0,4)
    let month = date.substr(4,2)
    let day = date.substr(6,2)
    let hour = date.substr(8,2)
    let minute = date.substr(10,2)
    let second = date.substr(12,2)
    let d = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
    return dateComparate1(d)
}