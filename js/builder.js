$(document).ready(function(){
    
    const userName = "Stalp"

    function gameColGetXML() {
        $.ajax({
            type: "GET" ,
            url: "https://www.boardgamegeek.com/xmlapi2/collection?username=" + userName + "&stats=1&own=1&excludesubtype=boardgameexpansion" ,
            dataType: "xml" ,
            statusCode: {
                202: function() {
                    // WAITS IN CASE OF 202 RESPONSE
                    setTimeout(function() {
                        gameColGetXML()}, 1000);
                }
            } ,
            success: xmlParser
        });
    }

    gameColGetXML();

 });

 $(document).ajaxStop(function(){

    // DEFAULT PAGE SORT BY RANK
    var main = $('.main');
    var divs = main.children('.item').get();
    divs.sort(function(div1, div2) {
        function getValue(div) {
            if ($(div).children('.data').attr('data-rank') === "Not Ranked") {
                return 99999;
            } else {
                return parseInt($(div).children('.data').attr('data-rank'));
            }
        }
        var val1 = getValue(div1), val2 = getValue(div2);
        return (val1 > val2) ? 1 : ((val1 < val2) ? -1 : 0);
    });
    var sortedDivs = $(divs);
   
    main.append(sortedDivs);
 });

 function xmlParser(xml) {
     // BUILDS PAGE FROM ITEMS IN XML RESPONSE
     $(xml).find("item").each(function() {
         $(".main").append(
                  
            '<div class="item" data-objid=' + $(this).attr('objectid') +'>' +
                // DATA DIV HOLDS ALL RELEVANT DATA FOR EACH ITEM
                '<div class="data" data-objid=' + $(this).attr('objectid') + ' ' +
                    'data-title="' + $(this).find("name").text() + '" ' +
                    'data-gamelink="https://boardgamegeek.com/boardgame/' + $(this).attr('objectid') + '" ' +
                    'data-imgthumb="' + $(this).find('thumbnail').text() + '" ' +
                    'data-avg="' + $(this).find('rating average').attr('value') + '" ' +
                    'data-myrating="' + $(this).find('rating').attr('value') + '" ' +
                    'data-minp="' + $(this).find('stats').attr('minplayers') + '" ' +
                    'data-maxp="' + $(this).find('stats').attr('maxplayers') + '" ' +
                    'data-rank="' + $(this).find('ranks rank').attr('value') + '" ' +
                    'data-playtime="' + $(this).find('stats').attr('playingtime') + '" ' +
                    // FIND A WAY TO ADD THIS CONDITIONALLY 'data-howtoplay="' + $(this).find('wishlistcomment').text() + '" ' +
                    // ALSO THIS 'data-comment="' + $(this).find('comment').text() + '" ' +
                '"></div>' + 
                '<div class="title">' + 
                        $(this).find("name").text() + '</a></div>' +
                '<div class="object">' +                
                    '<div class="imagediv">' +
                        '<a class="titlelink" href="https://boardgamegeek.com/boardgame/' + 
                        $(this).attr('objectid') + '" target="_blank" rel="noopener noreferrrer">' + 
                        '<img class="image" src="' + $(this).find('thumbnail').text() + '"></a></div>' +
                    '<div class="info">' +                         
                        '<div class="avgscore">' + 
                            'BGG Rating: ' +
                            Number(parseFloat($(this).find('rating average').attr('value')).toFixed(1)) + '</div>' +
                        '<div class="rank">' + 
                            'BGG Rank: ' + $(this).find('ranks rank').attr('value') + '</div>' +
                        // '<div class="myrating row">' + 
                        //    'My Rating: ' + $(this).find('rating').attr('value') + '</div>' +
                        '<div class="playercount">' +
                            'Players: ' + $(this).find('stats').attr('minplayers') + ' - ' +
                            $(this).find('stats').attr('maxplayers') + '</div>' +
                        '<div class="playtime">' +
                            'Playing Time: ' + $(this).find('stats').attr('playingtime') + 'm</div>' +
                        // ADD INFO HERE TO KEEP IN SAME COLUMN
                    '</div>' +
                '</div>' + 
            '</div>');
     });
 };

function rankSort() {

    // PAGE SORT BY RANK
    var main = $('.main');
    var divs = main.children('.item').get();
    divs.sort(function(div1, div2) {
        function getValue(div) {
            if ($(div).children('.data').attr('data-rank') === "Not Ranked") {
                return 99999;
            } else {
                return parseInt($(div).children('.data').attr('data-rank'));
            }
        }
        var val1 = getValue(div1), val2 = getValue(div2);
        
        if ($('#arrow').find(":selected").val() === "desc") {
            /* ASCENDING (LOW TO HIGH) RETURN */
            return (val1 < val2) ? 1 : ((val1 > val2) ? -1 : 0);
        } else if ($('#arrow').find(":selected").val() === "asc") {
            /* DESCENDING (HIGH TO LOW) RETURN */
            return (val1 > val2) ? 1 : ((val1 < val2) ? -1 : 0);
        }
    });
    var sortedDivs = $(divs);
   
    main.append(sortedDivs);
};

function nameSort() {

    // PAGE SORT BY GAME TITLE
    var main = $('.main');
    var divs = main.children('.item').get();
    divs.sort(function(div1, div2) {
        function getValue(div) {
            return $(div).children('.data').attr('data-title');
        }
        var val1 = getValue(div1), val2 = getValue(div2);
        
        if ($('#arrow').find(":selected").val() === "desc") {
            /* ASCENDING (LOW TO HIGH) RETURN */
            return (val1 < val2) ? 1 : ((val1 > val2) ? -1 : 0);
        } else if ($('#arrow').find(":selected").val() === "asc") {
            /* DESCENDING (HIGH TO LOW) RETURN */
            return (val1 > val2) ? 1 : ((val1 < val2) ? -1 : 0);
        }
    });
    var sortedDivs = $(divs);
   
    main.append(sortedDivs);
};

function ratingSort() {

    // PAGE SORT BY AVERAGE RATING
    var main = $('.main');
    var divs = main.children('.item').get();
    divs.sort(function(div1, div2) {
        function getValue(div) {
            return parseFloat($(div).children('.data').attr('data-avg'));
        }
        var val1 = getValue(div1), val2 = getValue(div2);

        if ($('#arrow').find(":selected").val() === "desc") {
            /* ASCENDING (LOW TO HIGH) RETURN */
            return (val1 < val2) ? 1 : ((val1 > val2) ? -1 : 0);
        } else if ($('#arrow').find(":selected").val() === "asc") {
            /* DESCENDING (HIGH TO LOW) RETURN */
            return (val1 > val2) ? 1 : ((val1 < val2) ? -1 : 0);
        }
    });
    var sortedDivs = $(divs);
   
    main.append(sortedDivs);
};

function timeSort() {

    // PAGE SORT BY BGG PLAYING TIME
    var main = $('.main');
    var divs = main.children('.item').get();
    divs.sort(function(div1, div2) {
        function getValue(div) {
            return parseInt($(div).children('.data').attr('data-playtime'));
        }
        var val1 = getValue(div1), val2 = getValue(div2);
        
        if ($('#arrow').find(":selected").val() === "desc") {
            /* ASCENDING (LOW TO HIGH) RETURN */
            return (val1 < val2) ? 1 : ((val1 > val2) ? -1 : 0);
        } else if ($('#arrow').find(":selected").val() === "asc") {
            /* DESCENDING (HIGH TO LOW) RETURN */
            return (val1 > val2) ? 1 : ((val1 < val2) ? -1 : 0);
        }
    });
    var sortedDivs = $(divs);
   
    main.append(sortedDivs);
};

function sortFunc() {

    // DETERMINES WHICH SORT FUNCTION TO CALL BASED ON SORT SELECTION
    var value = $('#sort').find(":selected").val();
        /* console.log(value) */
    
    if (value === "rank") {
        rankSort();
    } else if (value === "name") {
        nameSort();
    } else if (value === "rating") {
        ratingSort();
    } else if (value === "playtime") {
        timeSort();
    }
};