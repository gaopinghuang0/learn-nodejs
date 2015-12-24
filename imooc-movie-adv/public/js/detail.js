$(function() {
	$('.comment').on('click', function(e) {
		// Credit: http://stackoverflow.com/questions/8380759/why-isnt-this-textarea-focusing-with-focus
		e.preventDefault();  // to prevent default focus to <a>, and focus textarea
		var target = $(this)
		var toId = target.data('tid')
		var commentId = target.data('cid')

		$('#commentForm').find('textarea').focus()

		if ($('#toId').length > 0) {
			$('#toId').val(toId)
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm')
		}

		if ($("#commentId").length > 0) {
			$('#commentId').val(commentId)
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm')
		}
	})
})