( function() {
    var gObj   = {};
    var gConf  = {};
    var gIndex = 0;
    var gPath  = '../';
    var gTmpl  = 'tmpl/';
    var gAsset = 'assets/';
    var gMenu  = {};
    var gItem  = {};
    var gLabel = 'label';
    var gNav   = {};
    var gFlag  = true;

    function callLogin() {
        $.ajax({
            url: gAsset + 'menu.json',
            datatype: 'json',
            success: function(data) {
                gMenu = data;
            }
        }).done( function() {
            $.ajax({
                url: gAsset + 'item.json',
                datatype: 'json',
                success: function(data) {
                    gItem = data;
                }
            }).done( function() {
                callTmpl( 'main', callMain );
            });
        });
    }

    function callMain( html ) {
        $('#main').html( html );
        callTmpl( 'menu', callMenu );
    }

    function callMenu( html ) {
        // add menu
        $('#menu').html( html );
        $('#menu > ul').accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });

        $('#menu ul li h3').on('click', function(e) {
            gNav.h3ID = $(this).parents('li').attr('id');
        });
                
        $('#menu ul li ul li h4').on('click', function(e) {
            gNav.h4ID = $(this).parents('li').attr('id');
            gNav.iID = gNav.h4ID.replace('menu', 'item');
            callTmpl( 'container', callContainer ); 
        });

        $('#menu-0 h3').click();
        $('#menu-0-0 h4').click();
    }

    function callContainer( html ) {
        $('#container').html( html );
        $('#container_hd').html( '<b>' + gMenu[ gNav.h3ID ][ gLabel ] + '&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;' + gMenu[ gNav.h4ID ][ gLabel ] + '</b>' );
        switch( gNav.h3ID )
        {
        case 'menu-0':
            // portal
            callTmpl( gNav.iID, callPortal );
            break;
        default: 
            switch( gNav.h4ID )
            {
            case 'menu-1-0':
            case 'menu-1-1':
            case 'menu-5-1':
            case 'menu-6-0':
            case 'menu-6-1':
            case 'menu-6-2':
                // tabs
                callTmpl( gNav.iID, callTabs ); 
                break;
            default:
                // table
                callTmpl( gNav.iID, callMix ); 
            }
        }
    }

    function callPortal( html ) {
        $('#container_main').html( html );   

        $( ".column" ).sortable({
          connectWith: ".column",
          handle: ".portlet-header",
          cancel: ".portlet-toggle",
          placeholder: "portlet-placeholder ui-corner-all"
        });
     
        $( ".portlet" )
          .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
          .find( ".portlet-header" )
            .addClass( "ui-widget-header ui-corner-all" )
            .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
     
        $( ".portlet-toggle" ).click(function() {
          var icon = $( this );
          icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
          icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
        });

        var tbl = {};
        switch( gNav.h4ID )
        {
        case 'menu-0-0':
            $('#' + gNav.iID + '-0 div.portlet-content').html( callDemo( gNav.iID + '-0' ) );
            $('#' + gNav.iID + '-1 div.portlet-content').html( );


            break;
        case 'menu-0-1':
            $('#' + gNav.iID + '-0 div.portlet-content').html( callDemo( gNav.iID + '-0' ) );

            break;
        case 'menu-0-2':
            $('#' + gNav.iID + '-0 div.portlet-content').html( callDemo( gNav.iID + '-0' ) );
            $('#' + gNav.iID + '-1 div.portlet-content').html( callDemo( gNav.iID + '-1' ) );
            $('#' + gNav.iID + '-2 div.portlet-content').html( callDemo( gNav.iID + '-2' ) );
            $('#' + gNav.iID + '-3 div.portlet-content').html( callDemo( gNav.iID + '-3' ) );
            $('#' + gNav.iID + '-4 div.portlet-content').html( callDemo( gNav.iID + '-4' ) );
            $('#' + gNav.iID + '-5 div.portlet-content').html( callDemo( gNav.iID + '-5' ) );
            $('#' + gNav.iID + '-6 div.portlet-content').html( callDemo( gNav.iID + '-6' ) );
            $('#' + gNav.iID + '-7 div.portlet-content').html( callDemo( gNav.iID + '-7' ) );

            break;
        case 'menu-0-3':
            $('#' + gNav.iID + '-0 div.portlet-content').html( callDemo( gNav.iID + '-0' ) );
            $('#' + gNav.iID + '-1 div.portlet-content').html( callDemo( gNav.iID + '-1' ) );

            break;
        }
    }

    function callTabs( html ) {
        $('#container_main').html( html );   
        $('.tabs').tabs();

        var dt = {};
        var ds = {};
        var tbl = {};
        switch( gNav.h4ID )
        {
        case 'menu-1-0':
            $('#' + gNav.iID + '-0').html( callDemo( gNav.iID + '-0' ) );
            
            break;
        case 'menu-6-0':
            $('#' + gNav.iID + '-0').html( callDemo( gNav.iID + '-0' ) );

            break;
        }
    }

    function callMix( html ) {
         $('#container_main').html( html );
         $('#' + gNav.iID).html( callDemo( gNav.iID ) );

         var dt = {};
         var ds = {};
         var tbl = {};

         switch( gNav.iID )
         {
         case 'item-2-0':
            $('#' + gNav.iID ).html( callDemo( gNav.iID ) );

             break;
         case 'item-3-0':
            $('#' + gNav.iID ).html( callDemo( gNav.iID ) );

             break;
         case 'item-5-0':
            $('#' + gNav.iID ).html( callDemo( gNav.iID ) );

             break;
         case 'item-5-2':
            $('#' + gNav.iID ).html( callDemo( gNav.iID ) );

             break;
         case 'item-5-3':
            $('#' + gNav.iID ).html( callDemo( gNav.iID ) ); 

            break;
         case 'item-5-4':
            $('#' + gNav.iID ).html( callDemo( gNav.iID ) );

            break;
         }
    }

    function callTable( html ) {
         $('#container_main').html( html );   

    }

    function callChart( html ) {
         $('#container_main').html( html );   

    }

    function callTmpl( tmpl, callback ) {
        $.ajax({
            url: gTmpl + tmpl + '.tmpl',
            success: function(data) {
                callback( callParser( tmpl, data ) );
            }
        });
    }

    function callParser( tmpl, data ) {
        switch( tmpl )
        {
        case 'menu':
            for (var x in gMenu)
                data = data.replace( '@@@' + x + '@@@', gMenu[ x ][ gLabel ] );
            break;
        default: 
            for (var x in gItem)
                data = data.replace( '@@@' + x + '@@@', gItem[ x ][ gLabel ] );
        }
        return data;
    }

    function callDemo( item ) {
        var data;
        
        return data;
    }

    // get config 
    callLogin();
})();
