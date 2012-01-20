(function($) { $(document).ready(function() {

  var idea          = $('.idea'),
      ideaComment   = $('.icon-comment'),
      ideaMap       = $('.icon-locate'),
      navItems      = $('.nav-item'),
      animSpeed     = 250,
      ideaNavXinit  = 20,
      ideaNavXend   = -50,
      windowHeight, windowWidth;

  idea.hover(function() {
    $(this).find('.idea-nav').animate( { bottom: ideaNavXinit }, animSpeed );
  }, function() {
    $(this).find('.idea-nav').animate({
      bottom: ideaNavXend
    }, animSpeed);
    closeUIelements($(this));
  });

  var commentOpen = false,
      mapOpen     = false;
  
  function openComment(el)
  {
    el.parents('.idea-nav').prev('.idea-map').prev('.idea-comments').animate({
      top: 0 
    }, animSpeed, function() {
      commentOpen = true;
    });  
  }

  function openMap(el)
  {
    el.parents('.idea-nav').prev('.idea-map').animate({
      top: 0 
    }, animSpeed, function() {
      mapOpen = true;  
    });  
  }

  ideaComment.click(function(e) {
    var that = $(this);
    if ( mapOpen )
    {
      $(this).parents('.idea-nav').prev('.idea-map').animate({
        top: -480
      }, animSpeed, function() {
        mapOpen = false;
        openComment( that );
      });
      e.preventDefault();
      return;
    }
    openComment( that );
    e.preventDefault();
  });

  ideaMap.click(function(e) {
    var that = $(this);
    if ( commentOpen )
    {
      $(this).parents('.idea-nav').prev('.idea-map').prev('.idea-comments').animate({
        top: -480
      }, animSpeed, function() {
        commentOpen = false;
        openMap( that );
      });
      e.preventDefault();
      return;
    }
    openMap( that );
    e.preventDefault();
  });

  function posElements()
  {
    windowHeight  = $(window).height();
    windowWidth   = $(window).width(); 
    
    navItems.css( { top: windowHeight/2 - ( navItems.height() / 2 ) } ); 
  }
  posElements();

  window.onresize = function() {
    posElements();
  }

  function closeUIelements(parent)
  {
    parent.find('.idea-comments').animate({
      top: -480 
    }, animSpeed);
    parent.find('.idea-map').animate({
      top: -480 
    }, animSpeed); 
    commentOpen = false;
    mapOpen     = false;
  }

  $('.fancyb').fancybox();



  /* IDEA NAV */

  var currentIdea = 0,
      navPrev     = $('#nav-left'),
      navNext     = $('#nav-right'),
      ideas       = $('#ideas-loaded > li'),
      ideasLength = ideas.length-1,
      navInactive = 'nav-inactive';

  $('#ideas-loaded li:eq(0)').addClass('first-idea');
  
  /*
  window.onkeydown = function(e) {
    switch (e.keyCode)
    {
      case 37:
        prevIdea();
        e.preventDefault();
      case 39:
        nextIdea();
        e.preventDefault();
        break;
    }
  };
  */

  function nextIdea()
  {
    if ( currentIdea == ideasLength ) return false;
    moveFromRTL( $(ideas[currentIdea+1]) );
    moveOffLeft( $(ideas[currentIdea]) );
    currentIdea++;
    changeIdea();   
  }

  function prevIdea()
  {
    if ( currentIdea == 0 ) return false;
    moveFromLTR( $(ideas[currentIdea-1]) );
    moveOffRight( $(ideas[currentIdea]) );
    currentIdea--;
    changeIdea();   
  }
    
  navNext.click(function(e) {
    nextIdea();
    e.preventDefault();
  });

  navPrev.click(function(e) {
    prevIdea();
    e.preventDefault();
  });

  function changeIdea()
  {
    if ( currentIdea == 0 )
    {
      navPrev.addClass(navInactive);
    }
    if ( currentIdea == 1 )
    {
      navPrev.removeClass(navInactive);
    }

    if ( currentIdea == ideasLength )
    {
      navNext.addClass(navInactive);
    }

    if ( currentIdea == ideasLength-1 )
    {
      navNext.removeClass(navInactive);
    }
  }

  function moveFromRTL(el)
  {
    el.css({ left: windowWidth });
    el.animate({
      left: 0
    }, animSpeed);
  }

  function moveFromLTR(el)
  {
    el.css({ left: (windowWidth - windowWidth * 2 - 960) });
    el.animate({
      left: 0
    }, animSpeed);
  }

  function moveOffLeft(el)
  {
    el.animate({
      left: (windowWidth - windowWidth * 2 - 960)
    }, animSpeed);
  }

  function moveOffRight(el)
  {
    el.animate({
      left: (windowWidth + windowWidth * 2 + 960)
    }, animSpeed);
  }

  /* maps */

  var myLatlng, myOptions, map, marker;

  var markers = new Array();
  markers[0]  = {
    x: 51.4492732630874,
    y: -2.6192092895507812 
  }
  markers[1]  = {
    x: 51.44590324923581,
    y: -2.5896835327148438 
  }
  markers[2]  = {
    x: 51.4410082623466,
    y: -2.5618743896484375 
  }

  // i = 1 for liquid
  for (var i = 1; i <= ideasLength+1; i++) 
  {
    myLatlng = new google.maps.LatLng(markers[i].x,markers[i].y);
    myOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"+i), myOptions);

    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hello World!"
    });
    myLatlng = null, myOptions = null, map = null, marker = null;
  }

}); })(jQuery);