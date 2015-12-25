$(function() {
	$('.del').on('click', function(e) {
		var target = $(e.target),
			id = target.data('id'),
			tr = $('.item-id-' + id);

		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		})
		.done(function(results) {
			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove();
				}
			}
		})
	})

	$('#douban').blur(function() {
		var douban = $(this)
		var id = douban.val()
		if (id) {
			$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data) {
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors[0].name)
					$('#inputCountry').val(data.countries[0])
					$('#inputPoster').val(data.images.large)
					$('#inputYear').val(data.year)
					$('#inputSummary').val(data.summary)
				}
			})
			
		}
	})

	$("#save-movie").on('submit', function(e) {
		// stop submit if no category entered or checked
		var inputCategory = $("#inputCategory")
		var checkedRidios = $("input[name='movie[category]']:checked")

		if (inputCategory.val().length || checkedRidios.length) {
			return true;
		} else {
			alert('Enter a category name or check a category')
			return false;
		}
	})
});