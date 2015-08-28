"use strict";

$(function () {
	var $tbody   = $('#tbody');
	var $type    = $('#type');
	var $website = $('#website');
	var $submit  = $('#submit');
	var $remove  = $('.remove');

	$submit.on('click', function () {
		console.log($type.val(), $website.val());
		if ($website.val() === '') return false;

		var obj = saveChanges($type.val(), $website.val());

		buildHtml(obj);

		$website.val('');

		return false;
	});

	$tbody.on('click', '.remove', function () {
		var id = $(this).attr('id');

		chrome.storage.sync.remove(id);

		$('#tr_' + id).remove();

		return false;
	});

	chrome.storage.sync.get(function (resp) {
		for (var key in resp) {
			console.log(resp[key]);
			buildHtml(resp[key]);
		}
	});
});

/*
 chrome.storage.onChanged.addListener(function (changes, namespace) {
 console.log(changes);

 for (var key in changes) {
 var storageChange = changes[key];
 console.log(storageChange);
 }
 });
 */

function buildHtml(val) {
	var $tbody = $('#tbody');
	var button = '<button type="button" id="' + val.id + '" class="remove button-error pure-button">Remove</button>';
	$tbody.append('<tr id="tr_' + val.id + '"><td>' + getTypwe(val.type) + '</td><td class="wrapword">' + val.website + '</td><td>' + button + '</td></tr>');
}


function saveChanges(type, website) {
	var id   = new Date().getTime();
	var obj  = {};
	var data = {'id': id, 'type': type, 'website': website};

	obj[id] = data;

	chrome.storage.sync.set(obj);

	return data;
}


function getTypwe(type) {
	if (type === '1') return 'Containing';
	if (type === '2') return 'Exact Match';
	if (type === '3') return 'Regex Match';
}