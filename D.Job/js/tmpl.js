function genHTML( type, func ) {
    var tmp;

    switch( type )
    {
    case 'login':
        tmp = '<div class="' + type + '" id="' + type + '">';
        tmp +=   '<table>';
        tmp +=     '<caption>D.Job Web Manager</caption>';
        tmp +=     '<tr>';
        tmp +=       '<td class="alignRight" colspan="3"><hr/></td>';
        tmp +=     '</tr>';
        tmp +=     '<tr>';
        tmp +=       '<th class="alignLeft px80">';
        tmp +=         '帳號';
        tmp +=       '</th>';
        tmp +=       '<th class="px40">';
        tmp +=       ':';
        tmp +=       '</th>';
        tmp +=       '<td>';
        tmp +=         '<input type="text" id="username" />';
        tmp +=       '</td>';
        tmp +=     '</tr>';
        tmp +=     '<tr>';
        tmp +=       '<td class="alignRight" colspan="3"><hr/></td>';
        tmp +=     '</tr>';
        tmp +=     '<tr>';
        tmp +=       '<th class="alignLeft px80">';
        tmp +=         '密碼';
        tmp +=       '</th>';
        tmp +=       '<th class="px40">';
        tmp +=       ':';
        tmp +=       '</th>';
        tmp +=       '<td>';
        tmp +=         '<input type="password" id="userpass" />';
        tmp +=       '</td>';
        tmp +=     '</tr>';
        tmp +=     '<tr>';
        tmp +=       '<td class="alignRight" colspan="3"><hr/></td>';
        tmp +=     '</tr>';
        tmp +=     '<tr>';
        tmp +=       '<td class="alignRight" colspan="3">';
        tmp +=         '<button id="btnLogin" class="yui3-button" title="登入"><span class="ui-icon"></span></button>';
        tmp +=       '</td>';
        tmp +=     '</tr>';
        tmp +=   '</table>';
        tmp += '</div>';
        break;
    case 'cooked':
        tmp  = '<div id="menu"></div>';
        tmp += '<div id="main">';
        tmp +=   '<div id="main_hd">';
        tmp +=   '</div>';
        tmp +=   '<div id="main_bd">';
        tmp +=   '</div>';
        tmp +=   '<div id="main_ft">';
        tmp +=   '</div>';
        tmp += '</div>';
        break;
    case 'menu':
        tmp = '<div id="menu_btn">';
        tmp += '<button class="radio" id="menu-company">公司</button>';
        tmp += '<button class="radio" id="menu-customer">客戶</button>';
        tmp += '<button class="radio" id="menu-employee">員工</button>';
        tmp += '<button class="radio" id="menu-reports">報表</button>';
        tmp += '</div>';
        break;
    case 'header' :
        tmp = '<div id="submenu">';
        switch( func )
        {
        case 'employee':
            tmp += '<button class="radio" id="submenu-list"></button>';
            tmp += '<button class="radio" id="submenu-create"></button>';
            break;
        case 'company':
            break;
        }
        tmp += '</div>';
        break;
    case 'report':
        switch( func )
        {
        case 'dailyJob':
            break;
        case 'monthlyJob':
            break;
        }
        break;
    case 'input':
        switch( func )
        {
        case 'employee':
            tmp = '<div id="input-employee">';
            tmp += '<table>';

            tmp += '<tr>';
            tmp += '<th class="px80">';
            tmp += '<label for="name">姓名</label>';
            tmp += '</th>';
            tmp += '<td class="alignLeft px160">';
            tmp += '<input type="text" id="name" />';
            tmp += '</td>';
            tmp += '<th class="px80">';
            tmp += '<label for="gender">性別</label>';
            tmp += '</th>';
            tmp += '<td class="alignLeft px120">';
            tmp += '<select id="gender"></select>';
            tmp += '</td>';
            tmp += '<td class="200px" rowspan="5" colspan="2">';
            tmp += '照片<input type="file" id="headShot" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="age">年齡</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="age"></select>';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="birth">生日</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '民國&nbsp;<select id="birthYear"></select>&nbsp;年&nbsp;';
            tmp += '<select id="birthMonth"></select>&nbsp;月&nbsp;';
            tmp += '<select id="birthDay"></select>&nbsp;日&nbsp;';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="mobile">手機</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="mobile" />';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="tel">電話</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="tel" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="permanent">戶籍地址</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="permanent" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="residence">居住地址</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="residence" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="educational">學歷</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="educational"></select>';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="identity">身份証字號</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="identity" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="marriage">婚姻狀況</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="marriage"></select>';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="blood">血型</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="blood"></select>';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="height">身高</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="height" />';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="weight">體重</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="weight" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="experience">經驗</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<textarea id="experience"></textarea>';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="workingDays">可工作星期：</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="workingDays" multiple></select>';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="workingHours">工作時間：</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="workingHours"></select>';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="informedSrc">消息來源</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="informedSrc" multiple></select>';
            tmp += '</td>';
            tmp += '<th>';
            tmp += '<label for="informedOther">其它</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<input type="text" id="informedOthers" />';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="note">備註：</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<textarea id="note"></textarea>';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for="applyDate">填表日期</label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '<select id="applyYear"></select>&nbps;年&nbsp;';
            tmp += '<select id="applyMonth"></select>&nbps;月&nbps;';
            tmp += '<select id="applyDay"></select>&nbps;日&nbsp;';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '</table>';
            tmp += '</div>';
            break;
        case 'company':
            tmp = '<div id="input-company">';
            tmp += '<table>';

            tmp += '<tr>';
            tmp += '<th>';
            tmp += '<label for=""></label>';
            tmp += '</th>';
            tmp += '<td>';
            tmp += '';
            tmp += '</td>';
            tmp += '</tr>';

            tmp += '</table>';
            tmp += '</div>';
            break;
        case 'customer':
            tmp = '<div id="input-customer">';
            tmp += '</div>';
            break;
        }
        break;
    case 'readonly':
        switch( func )
        {
        case 'employee':
            break;
        case 'company':
            break;
        case 'customer':
            break;
        }
        break;
    }
    return tmp;
}

function genInnerHTML( ) {

}
