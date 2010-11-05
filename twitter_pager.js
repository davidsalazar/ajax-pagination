(function($) {

	$.ajax_pager = function(settings) {
		var config = {
			// Next page link, all next page requests will use the href attribute, until this element can no longer be found.  It will then be hidden.
			next_page_link_selector: '#next_page',
			
			// Container in which the items will be appended to.
			item_container_selector: '#posts',
			
			// Items / Records
			item_selector: '#posts div.post'
		};

		if (settings)
		{
			$.extend(config, settings);
		}

		var loading = function(on) {
			if ($(config.next_page_link_selector + '_loading').length == 0)
				return false;

			$(config.next_page_link_selector).css('display', on ? 'none' : '');
			$(config.next_page_link_selector + '_loading').css('display', on ? '' : 'none');
		};

		$(config.next_page_link_selector).click(function(e) {
			e.preventDefault();
			var $next_page_link = $(this);

			loading(true);
			$.get($next_page_link.attr('href'), function(data) {
				var $next_page = $(data);
				var $items = $next_page.find(config.item_selector);
				var next_page_href = $next_page.find(config.next_page_link_selector).attr('href');
				if ($items.length)
				{
					$items.appendTo(config.item_container_selector);

					if (next_page_href)
					{
						$next_page_link.attr('href', next_page_href);				
					}
				}

				loading(false);
				if ($items.length == 0 || !next_page_href)
				{
					$next_page_link.hide();
				}
			});
		});

	};

})(jQuery);